var Controller = require('../controllers/guest-controller');
require('should');

describe('Guest Controller', function () {
    describe('validate', function () {
        it('should not be valid with blank first name', function () {
            new Controller({
                first_name: '',
                last_name: 'last',
                email_address: 'email@email.com'
            }).isValid().should.be.false;
        });

        it('should not be valid with blank last name', function () {
            new Controller({
                first_name: 'first',
                last_name: '',
                email_address: 'email@email.com'
            }).isValid().should.be.false;
        });

        it('should not be valid with blank email', function () {
            new Controller({
                first_name: 'first',
                last_name: 'last',
                email_address: ''
            }).isValid().should.be.false;
        });

        it('should not be valid with an invalid email', function () {
            new Controller({
                first_name: 'first',
                last_name: 'last',
                email_address: 'email'
            }).isValid().should.be.false;
        });
    });
});