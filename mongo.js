'use strict';

const dbURI = 'mongodb://localhost/VueTodo';

module.exports = function (app) {
  var mongoose = require('mongoose');
  mongoose.connect(dbURI);

  // When successfully connected
  mongoose.connection.on('connected', function () {
    console.log('Mongoose connected: ' + dbURI);
  });

  // If the connection throws an error
  mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
  });

  var gracefulExit = function () {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected through app termination');
      process.exit(0);
    });
  };

  // If the Node process ends, close the Mongoose connection
  process
    .on('SIGINT', gracefulExit) // interrupt signal
    .on('SIGTERM', gracefulExit); // termination signal

  var schemas = {
    task: new mongoose.Schema({
      text: String,
      date: {type: Date, default: Date.now}
    })
  };

  var models = {
    task: mongoose.model('Task', schemas.task)
  };

  app.get('/getTasks', function (req, res) {
    models.task.find().exec(function (err, tasks) {
      res.json({
        err: err || false,
        tasks: tasks
      });
    });
  });

  app.post('/addTask', function (req, res) {
    models.task.create({
      text: req.body.task
    }, function (err, task) {
      if (!err) { app.events.emit('taskAdded', task); }
      res.json({
        err: err || false,
        task: task
      });
    })
  });

};
