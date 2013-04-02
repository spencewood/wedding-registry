var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailAddress: String
});

module.exports = schema;