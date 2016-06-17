'use strict';

/**
 * @param {Object} app
 * @param {function} app.get
 * @param {function} app.post
 * @param {function} app.put
 * @param {function} app.delete
 * @param {function} app.on
 * @param {function} app.emit
 */
module.exports = function (app) {

  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/tasks', function (req, res) {
    app.mongo.models.task.find().exec(function (err, tasks) {
      res.json({
        err: err || false,
        tasks: tasks
      });
    });
  });

  app.put('/task', function (req, res) {
    app.mongo.models.task.create({
      text: req.body.text
    }, function (err, task) {
      if (!err) { app.emit('app:task:created', task); }
      res.json({
        err: err || false,
        task: task
      });
    })
  });

  app.delete('/task', function (req, res) {
    app.mongo.models.task.findByIdAndRemove(req.body.id, function (err) {
      if (!err) { app.emit('app:task:removed', req.body.id); }
      res.json({
        err: err || false,
        id: req.body.id
      });
    })
  });

};
