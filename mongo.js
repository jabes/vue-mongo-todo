'use strict';

module.exports = function (app) {
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/VueTodo');

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
