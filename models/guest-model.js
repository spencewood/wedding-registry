var mongoose = require('mongoose');
var schema = require('./schemas/guest-schema');
var config = require('../config').database;
var db = mongoose.createConnection(config.url);

var Guest = db.model('Guest', schema);

module.exports = Guest;