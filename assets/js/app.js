/* global Vue */
'use strict';

(function () {

  // Cutting the Mustard
  if ('querySelector' in document && 'addEventListener' in window) {
    document.addEventListener('DOMContentLoaded', ()=> {

      new Vue({
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
            }).then(function (response) {
              if (response && !response.err) {
                app.tasks.push(response.data.task);
              }
            });
          }

        }
      });

    });
  }

})();
