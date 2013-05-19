var Controller = require('../controllers/guest-controller');
var Guest = require('../models/guest-model');
var should = require('should');
var sinon = require('sinon');
var config = require('../config');

var clear = function (done) {
    Guest.collection.remove(done);
};

describe('Guest Controller', function () {
    beforeEach(function (done) {
        clear(done);
    });

    after(function (done) {
        clear(done);
    });

    describe('addGuest', function () {
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
                }).addGuest(function (err, model) {
                    should.exist(err);
                    done();
                });
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

        it('should not let you have too many guests', function (done) {
            new Controller({
                firstName: 'first',
                lastName: 'last',
                emailAddress: 'email@email.com',
                additionalCount: 10
            }).addGuest(function (err) {
                should.exist(err);
                done();
            });
        });

        it('should not let you have fewer than zero guests', function (done) {
            new Controller({
                firstName: 'first',
                lastName: 'last',
                emailAddress: 'email@email.com',
                additionalCount: -1
            }).addGuest(function (err) {
                should.exist(err);
                done();
            });
        });

        it('should take and save the optional message parameter', function (done) {
            new Controller({
                firstName: 'first',
                lastName: 'last',
                emailAddress: 'email@email.com',
                message: 'Horay!'
            }).addGuest(function () {
                Guest.findOne({emailAddress: 'email@email.com'}, function (err, guest) {
                    guest.message.should.equal('Horay!');
                    done();
                });
            });
        });

        it('should set the optional attending properties to false by default', function (done) {
            new Controller({
                firstName: 'first',
                lastName: 'last',
                emailAddress: 'email@email.com'
            }).addGuest(function () {
                Guest.findOne({emailAddress: 'email@email.com'}, function (err, guest) {
                    guest.isAttendingReception.should.be.false;
                    guest.isAttendingCeremony.should.be.false;
                    done();
                });
            });
        });

        it('should be able to set the attending properties to true', function (done) {
            new Controller({
                firstName: 'first',
                lastName: 'last',
                emailAddress: 'email@email.com',
                isAttendingReception: true,
                isAttendingCeremony: true
            }).addGuest(function () {
                Guest.findOne({emailAddress: 'email@email.com'}, function (err, guest) {
                    guest.isAttendingReception.should.be.true;
                    guest.isAttendingCeremony.should.be.true;
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