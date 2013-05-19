var mongoose = require('mongoose');
var schema = require('./schemas/guest-schema');
var config = require('../config').database;
var db = mongoose.createConnection(config.url);

var Guest = db.model('Guest', schema);

/**
 * Get all guests
 * @return [{guest}] Array of guests registered
 */
 Guest.getAll = function (cb) {
    Guest.find({}, cb);
 };

 /**
  * Get total guest count, including additional
  * @return Number Guest count
  */
Guest.getCount = function (cb) {
    Guest.find({}, function (err, models) {
        var additionalTotalCount = models.reduce(function (prev, curr){
            return prev + curr.additionalCount;
        }, 0);

        cb(models.length + additionalTotalCount);
    });
};

module.exports = Guest;