'use strict';

module.exports = function (app) {
  var db = 'vue-todo';
  var dbURI = 'mongodb://localhost/' + db;
  var mongoose = require('mongoose');
  mongoose.connect(dbURI);

  // When successfully connected
  mongoose.connection.on('connected', function () {
    console.log('Mongoose successfully connected to: ' + dbURI);
  });

  // If the connection throws an error
  mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose was disconnected');
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

  var mongo = {
    schemas: schemas,
    models: models
  };

  app.mongo = mongo;
  return mongo;
};
