'use strict';

module.exports = function (app) {
  var io = require('socket.io')(app.server);

  io.on('connection', function (socket) {
    app.events.on('taskAdded', function (task) {
      socket.emit('taskAdded', task);
    })
  });
};
