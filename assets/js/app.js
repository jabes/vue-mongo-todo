/* global Vue, io */
'use strict';

(function () {

  // Cutting the Mustard
  if ('querySelector' in document && 'addEventListener' in window) {
    document.addEventListener('DOMContentLoaded', ()=> {

      var socket = io.connect('//localhost:8080');

      // socket.on('connect', function(){});
      // socket.on('disconnect', function(){});

      socket.on('taskAdded', function(task) {
        vue.tasks.push(task);
      });

      var vue = new Vue({
        el: '#app',
        data: {
          newTask: {},
          tasks: []
        },
        ready: function () {
          var app = this;
          app.tasks = app.getTasks();
        },
        methods: {

          getTasks: function () {
            var app = this;
            app.$http.get('/getTasks').then(function (response) {
              if (response && !response.err) {
                app.tasks = response.data.tasks;
              }
            });
          },

          addTask: function () {
            var app = this;
            app.$http.post('/addTask', {
              task: app.newTask.text
            });
          }

        }
      });

    });
  }

})();
