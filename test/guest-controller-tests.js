var Controller = require('../controllers/guest-controller');
var Guest = require('../models/guest-model');
var should = require('should');

var clear = function (done) {
    Guest.collection.remove(done);
};

describe('Guest Controller', function () {
    describe('validate', function () {
        it('should be valid with proper details', function () {
            new Controller({
                firstName: 'first',
                lastName: 'last',
                emailAddress: 'email@email.com'
            }).isValid().should.be.true;
        });

        it('should not be valid with blank first name', function () {
            new Controller({
                firstName: '',
                lastName: 'last',
                emailAddress: 'email@email.com'
            }).isValid().should.be.false;
        });

        it('should not be valid with blank last name', function () {
            new Controller({
                firstName: 'first',
                lastName: '',
                emailAddress: 'email@email.com'
            }).isValid().should.be.false;
        });

        it('should not be valid with blank email', function () {
            new Controller({
                firstName: 'first',
                lastName: 'last',
                emailAddress: ''
            }).isValid().should.be.false;
        });

        it('should not be valid with an invalid email', function () {
            new Controller({
                firstName: 'first',
                lastName: 'last',
                emailAddress: 'email'
            }).isValid().should.be.false;
        });
    });

    describe('addGuest', function () {
        beforeEach(function (done) {
            clear(done);
        });

        after(function (done) {
            clear(done);
        });

        it('should add a proper guest', function (done) {
            new Controller({
                firstName: 'first',
                lastName: 'last',
                emailAddress: 'email@email.com'
            }).addGuest(function () {
                done();
            });
        });

        it('should not add two guests with the same email', function (done) {
            new Controller({
                firstName: 'first',
                lastName: 'last',
                emailAddress: 'email@email.com'
            }).addGuest(function () {
                new Controller({
                    firstName: 'first',
                    lastNmae: 'last',
                    emailAddress: 'email@email.com'
                }).addGuest(function (err) {
                    should.exist(err);
                    done();
                });
            });
        });
    });
});