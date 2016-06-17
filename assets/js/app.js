/* global Vue, io */
'use strict';

(function () {

  // Cutting the Mustard
  if ('querySelector' in document && 'addEventListener' in window) {
    document.addEventListener('DOMContentLoaded', ()=> {

      var socket = io.connect(window.location.origin);

      // socket.on('connect', function(){});
      // socket.on('disconnect', function(){});

      socket.on('task:created', function (task) {
        vue.tasks.push(task);
      });

      socket.on('task:removed', function (id) {
        for (let i = 0; i < vue.tasks.length; i++) {
          if (vue.tasks[i]._id === id) {
            vue.tasks.splice(i, 1);
            break;
          }
        }
      });

      var vue = new Vue({
        el: '#app',
        data: {
          newTask: {},
          tasks: []
        },
        ready: function () {
          this.tasks = this.getTasks();
        },
        methods: {

          getTasks: function () {
            this.$http.get('/tasks').then(function (response) {
              if (response && !response.err) {
                this.tasks = response.data.tasks;
              }
            });
          },

          createTask: function () {
            this.$http.put('/task', {
              text: this.newTask.text
            });
          },

          removeTask: function (task) {
            this.$http.delete('/task', {
              id: task._id
            });
          }

        }
      });

    });
  }

})();
