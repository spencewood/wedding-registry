var Controller = require('../controllers/guest-controller');
var Guest = require('../models/guest-model');
var should = require('should');
var sinon = require('sinon');
var config = require('../config');

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
                (function () {
                    new Controller({
                        firstName: 'first',
                        lastNmae: 'last',
                        emailAddress: 'email@email.com'
                    }).addGuest();
                }).should.throw();
                done();
            });
        });

        it('should take and save the optional additionalCount parameter', function (done) {
            new Controller({
                firstName: 'first',
                lastName: 'last',
                emailAddress: 'email@email.com',
                additionalCount: 3
            }).addGuest(function () {
                Guest.findOne({emailAddress: 'email@email.com'}, function (err, guest) {
                    guest.additionalCount.should.equal(3);
                    done();
                });
            });
        });
    });

    describe('canStillRegister', function () {
        it('should be true if the date is sometime in April', function () {
            var clock = sinon.useFakeTimers(new Date('04/10/2013').getTime());
            Controller.canStillRegister().should.be.true;
            clock.restore();
        });

        it('should be true if the date is sometime in May', function () {
            var clock = sinon.useFakeTimers(new Date('05/10/2013').getTime());
            Controller.canStillRegister().should.be.true;
            clock.restore();
        });

        it('should be true if the date is sometime in June', function () {
            var clock = sinon.useFakeTimers(new Date('06/10/2013').getTime());
            Controller.canStillRegister().should.be.true;
            clock.restore();
        });

        it('should be true in early July', function (){
            var clock = sinon.useFakeTimers(new Date('07/03/2013').getTime());
            Controller.canStillRegister().should.be.true;
            clock.restore();
        });

        it('should be true on the exact time of registration end', function () {
            var clock = sinon.useFakeTimers(config.cutOffDate.getTime());
            Controller.canStillRegister().should.be.true;
            clock.restore();
        });

        it('should be false any time after the cut off time', function () {
            var clock = sinon.useFakeTimers(new Date('07/07/2013').getTime());
            Controller.canStillRegister().should.be.false;
            clock.restore();
        });
    });
});