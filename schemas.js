'use strict';

module.exports = function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    return {
        todo: new Schema({
            text:  String,
            date: { type: Date, default: Date.now }
        })
    };
};
