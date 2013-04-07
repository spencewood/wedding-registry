var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    registeredDate: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    emailAddress: {
        type: String,
        unique: true,
        trim: true
    }
});

module.exports = schema;