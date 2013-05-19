var mongoose = require('mongoose');
var validate = require('mongoose-validator').validate;

var schema = new mongoose.Schema({
    registeredDate: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        trim: true,
        default: '',
        validate: [
            validate({message: 'Must specifiy a first name'}, 'notEmpty'),
            validate({message: 'Must specifiy a first name'}, 'notNull')
        ]
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
        validate: [
            validate({message: 'Must specifiy a last name'}, 'notEmpty'),
            validate({message: 'Must specifiy a last name'}, 'notNull')
        ]
    },
    emailAddress: {
        type: String,
        unique: true,
        trim: true,
        default: '',
        validate: [validate({message: 'Invalid email'}, 'isEmail')]
    },
    additionalCount: {
        type: Number,
        default: 0,
        max: 7,
        min: 0
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