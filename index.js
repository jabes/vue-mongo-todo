'use strict';

var rootDir = __dirname;
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);

require('./mongo')(app);
require('./socket')(server);

app.locals.pretty = true;

app.locals.styles = [
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.min.css',
  '/static/css/app.css'
];

app.locals.scripts = [
  'https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.24/vue.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/vue-resource/0.8.0/vue-resource.min.js',
  '/socket.io/socket.io.js',
  '/static/js/app.js'
];

app.set('views', `${rootDir}/views`);
app.set('view engine', 'jade');

app.use('/static', express.static(`${rootDir}/assets`));
app.use(bodyParser.json());

server.listen(process.env.PORT || 8080, function () {
  console.log('Server listening on port:', this.address().port);
});

app.get('/', function (req, res) {
  res.render('index');
});

module.exports = app;
