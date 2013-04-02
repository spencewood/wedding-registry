var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailAddress: {
        type: String,
        unique: true
    }
});

module.exports = schema;