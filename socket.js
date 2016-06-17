'use strict';

module.exports = function (app) {
  var io = require('socket.io')(app.server);
  io.on('connection', function (socket) {
    console.log('New connection from: ' + socket.request.connection.remoteAddress);
    app.events.on('taskAdded', function (task) {
      socket.emit('taskAdded', task);
    });
  });
};
