var email = require('../helpers/email');
var Guest = require('../models/guest-model');
var config = require('../config');

/**
 * The Guest Controller
 * @param {Object} params Parameters that should be persisted
 */
var GuestController = function (params) {
    this.params = params;
};

/**
 * Returns boolean on whether the passed in parameters are valid
 * @return {Boolean}
 */
GuestController.prototype.isValid = function () {
    return GuestController.canStillRegister();
};

/**
 * Add guest
 * @return {guest} The added guest
 */
GuestController.prototype.addGuest = function (cb) {
    if(this.isValid()){
        var guest = new Guest(this.params);
        guest.save(function (err, model) {
            if(err !== null){
                console.log(err);
            }

            cb(err, model);
        });
    }
};

/**
 * Whether the cutoff time has been reached for RSVP
 * @return {Boolean}
 */
GuestController.canStillRegister = function () {
    return Date.now() <= config.cutOffDate.getTime();
};

module.exports = GuestController;