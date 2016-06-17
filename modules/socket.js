'use strict';

module.exports = function (app) {
  var io = require('socket.io')(app.server);
  io.on('connection', function (socket) {

    var ipAddr = socket.request.connection.remoteAddress;
    console.log(`Socket connected: ${ipAddr}`);
    socket.on('disconnect', function () {
      console.log(`Socket disconnected: ${ipAddr}`);
    });

    app.events.on('task:created', function (task) {
      socket.emit('task:created', task);
    });

    app.events.on('task:removed', function (id) {
      socket.emit('task:removed', id);
    });

  });
};
