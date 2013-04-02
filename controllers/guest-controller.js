var email = require('../helpers/email');
var Guest = require('../models/guest-model');

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
    return !this.validate();
};

/**
 * Add guest
 */
GuestController.prototype.addGuest = function (cb) {
    var guest = new Guest(this.params);
    return guest.save(cb);
};

module.exports = GuestController;