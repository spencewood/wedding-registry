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
    },
    additionalCount: {
        type: Number,
        default: 0,
        max: 7
    },
    isAttendingReception: {
        type: Boolean,
        default: false
    },
    isAttendingCeremony: {
        type: Boolean,
        default: false
    },
    message: String
});

module.exports = schema;