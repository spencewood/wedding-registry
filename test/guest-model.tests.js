var Guest = require('../models/guest-model');
var should = require('should');
var sinon = require('sinon');
var config = require('../config');

var clear = function (done) {
    Guest.collection.remove(done);
};

describe('Guest Model', function () {
    beforeEach(function (done) {
        clear(done);
    });

    after(function (done) {
        clear(done);
    });

    describe('validate', function () {
        it('should be valid with proper details', function () {
            new Guest({
                firstName: 'first',
                lastName: 'last',
                emailAddress: 'email@email.com'
            }).save(function (err, model) {
                should.not.exist(err);
            })
        });

        it('should not be valid with blank first name', function () {
            new Guest({
                firstName: '',
                lastName: 'last',
                emailAddress: 'email@email.com'
            }).save(function (err, model) {
                should.exist(err);
            });
        });

        it('should not be valid with blank last name', function () {
            new Guest({
                firstName: 'first',
                lastName: '',
                emailAddress: 'email@email.com'
            }).save(function (err, model) {
                should.exist(err);
            });
        });

        it('should not be valid with blank email', function () {
            new Guest({
                firstName: 'first',
                lastName: 'last',
                emailAddress: ''
            }).save(function (err, model) {
                should.exist(err);
            });
        });

        it('should not be valid with an invalid email', function () {
            new Guest({
                firstName: 'first',
                lastName: 'last',
                emailAddress: 'email'
            }).save(function (err, model) {
                should.exist(err);
            });
        });
    });

    describe('getAll', function () {
        it('should return the records with a callback', function (done) {
            new Guest({
                firstName: 'first',
                lastName: 'last',
                emailAddress: 'email@email.com',
                isAttendingReception: true,
                isAttendingCeremony: true
            }).save(function () {
                Guest.getAll(function (err, models) {
                    models.should.be.instanceOf(Array);
                    done();
                });
            });
        });
    });

    describe('getCeremonyCount', function () {
        it('should return the correct total count in a callback', function (done) {
            new Guest({
                firstName: 'first',
                lastName: 'last',
                emailAddress: 'email@email.com',
                additionalCount: 3,
                isAttendingCeremony: true
            }).save(function () {
                Guest.getCeremonyCount(function (count) {
                    count.should.equal(4);
                    done();
                });
            });
        });
    });

    describe('getReceptionCount', function () {
        it('should return the correct total count in a callback', function (done) {
            new Guest({
                firstName: 'first',
                lastName: 'last',
                emailAddress: 'email@email.com',
                additionalCount: 3,
                isAttendingReception: true
            }).save(function () {
                Guest.getReceptionCount(function (count) {
                    count.should.equal(4);
                    done();
                });
            });
        });
    });
});