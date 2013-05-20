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
 * Add guest
 * @return {guest} The added guest
 */
GuestController.prototype.addGuest = function (cb) {
    if(GuestController.canStillRegister()){
        var guest = new Guest(this.params);
        guest.save(cb);
    }
    else{
        //Too late
        throw {
            name: 'TooLateError'
        };
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