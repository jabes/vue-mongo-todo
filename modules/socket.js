'use strict';

module.exports = function (app) {
  var io = require('socket.io')(app.server);
  io.on('connection', function (socket) {

    var ipAddr = socket.request.connection.remoteAddress;
    console.log(`Socket connected: ${ipAddr}`);
    socket.on('disconnect', function () {
      console.log(`Socket disconnected: ${ipAddr}`);
    });

    app.on('app:task:created', function (task) {
      socket.emit('socket:task:created', task);
    });

    app.on('app:task:removed', function (id) {
      socket.emit('socket:task:removed', id);
    });

  });
};
