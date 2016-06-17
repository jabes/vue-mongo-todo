'use strict';

// ORDER IS IMPORTANT
var app = require('./modules/app')(__dirname);
require('./modules/mongo')(app);
require('./modules/socket')(app);
require('./modules/routes')(app);
