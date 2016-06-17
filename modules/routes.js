'use strict';

module.exports = function (app) {

  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/getTasks', function (req, res) {
    app.mongo.models.task.find().exec(function (err, tasks) {
      res.json({
        err: err || false,
        tasks: tasks
      });
    });
  });

  app.post('/addTask', function (req, res) {
    app.mongo.models.task.create({
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
