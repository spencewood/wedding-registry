var email = require('../helpers/email');

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
    var valid = false;

    if(typeof this.params.first_name === 'undefined' ||
        this.params.first_name.length === 0) {
        return 'Must specifiy a first name';
    }

    if(typeof this.params.last_name === 'undefined' ||
        this.params.last_name.length === 0) {
        return 'Must specify a last name';
    }

    if(typeof this.params.email_address === 'undefined' ||
        this.params.email_address.length === 0) {
        return 'Must specify an email address';
    }

    if(!email.validate(this.params.email_address)) {
        return 'Invalid email';
    }

    return valid;
};

module.exports = GuestController;