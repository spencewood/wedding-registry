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
 * Validate
 * @return {Bool or String} Returns false if invalid, otherwise returns a string
 */
GuestController.prototype.validate = function () {
    if(typeof this.params.firstName === 'undefined' ||
        this.params.firstName.length === 0) {
        return 'Must specifiy a first name';
    }

    if(typeof this.params.lastName === 'undefined' ||
        this.params.lastName.length === 0) {
        return 'Must specify a last name';
    }

    if(typeof this.params.emailAddress === 'undefined' ||
        this.params.emailAddress.length === 0) {
        return 'Must specify an email address';
    }

    if(!email.validate(this.params.emailAddress)) {
        return 'Invalid email';
    }

    return false;
};

/**
 * Returns boolean on whether the passed in parameters are valid
 * @return {Boolean}
 */
GuestController.prototype.isValid = function () {
    return !this.validate() && GuestController.canStillRegister();
};

/**
 * Add guest
 * @return {guest} The added guest
 */
GuestController.prototype.addGuest = function (cb) {
    if(this.isValid()){
        var guest = new Guest(this.params);
        return guest.save(cb);
    }
    //if we are this far, the caller should know
    throw new Error('Invalid');
};

/**
 * Get all guests
 * @return [{guest}] Array of guests registered
 */
 GuestController.getAll = function (cb) {
    Guest.find({}, cb);
 };

/**
 * Whether the cutoff time has been reached for RSVP
 * @return {Boolean}
 */
GuestController.canStillRegister = function () {
    return Date.now() <= config.cutOffDate.getTime();
};

module.exports = GuestController;