var mongoose = require('mongoose');
var schema = require('./schemas/guest-schema');
var config = require('../config').database;
var db = mongoose.createConnection(config.url);

var getCountAndAdditional = function (models) {
    return models.reduce(function (prev, curr) {
        return prev + curr.additionalCount;
    }, 0) + models.length;
};

var Guest = db.model('Guest', schema);

/**
 * Get all guests
 * @return [{guest}] Array of guests registered
 */
 Guest.getAll = function (cb) {
    Guest.find({}, cb);
 };

/**
 * Get count of guests attending ceremony
 * 
 */
Guest.getCeremonyCount = function (cb) {
    Guest.find({isAttendingCeremony: true}, function (err, models) {
        cb(getCountAndAdditional(models));
    });
};

/**
 * Get count of guests attending reception
 * 
 */
Guest.getReceptionCount = function (cb) {
    Guest.find({isAttendingReception: true}, function (err, models) {
        cb(getCountAndAdditional(models));
    });
};

module.exports = Guest;