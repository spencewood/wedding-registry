require('should');
var sinon = require('sinon');
var request = require('supertest');
var express = require('express');
var server = express();
server.use(express.bodyParser());
var routes = require('../routes')(server);
var Guest = require('../models/guest-model');
var config = require('../config');

var clear = function (done) {
    Guest.collection.remove(done);
};

describe('API', function () {
    beforeEach(function (done) {
        clear(done);
    });

    after(function (done) {
        clear(done);
    });

    describe('/guests POST', function () {
        it('should respond with 500 when not posting valid parameters', function (done) {
            request(server)
                .post('/guests')
                .set('Referer', 'http://www.bethandtyler.com')
                .expect(500, done);
        });

        it('should respond with 409 when passing validation but failing database entry', function (done) {
            //enter the same guest details twice
            var details = {
                firstName: 'first',
                lastName: 'last',
                emailAddress: 'email@email.com'
            };

            var guest = new Guest(details);

            guest.save(function () {
                request(server)
                    .post('/guests')
                    .set('Referer', 'http://www.bethandtyler.com')
                    .send(details)
                    .expect(409, done);
            });
        });

        it('should respond with meaningful errors in response', function (done) {
            request(server)
                .post('/guests')
                .set('Referer', 'http://www.bethandtyler.com')
                .send({
                    lastName: 'last',
                    emailAddress: 'email@email.com'
                })
                .end(function (err, res) {
                    res.text.should.match(/first\sname/i);
                    done();
                });
        });

        it('should respond with 200 when passing valid first name, last name and email', function (done) {
            request(server)
                .post('/guests')
                .set('Referer', 'http://www.bethandtyler.com')
                .send({
                    firstName: 'first',
                    lastName: 'last',
                    emailAddress: 'email@email.com'
                })
                .expect(200, done);
        });

        it('should fail if registering late', function (done) {
            var clock = sinon.useFakeTimers(new Date('07/07/2013').getTime());
            request(server)
                .post('/guests')
                .set('Referer', 'http://www.bethandtyler.com')
                .send({
                    firstName: 'first',
                    lastName: 'last',
                    emailAddress: 'email@email.com'
                })
                .end(function (err, res) {
                    res.status.should.equal(500);
                    clock.restore();
                    done();
                });
        });
    });

    describe('/guests GET', function () {
        it('should return 401 if the password is not correct', function () {
            request(server)
                .get('/guests')
                .set('Referer', 'http://www.bethandtyler.com')
                .expect(401);
        });

        it('should return json data', function () {
            request(server)
                .get('/guests')
                .set('Referer', 'http://www.bethandtyler.com')
                .send({password: config.password})
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('/guests/receptioncount GET', function () {
        it('should return 401 if the password is not correct', function () {
            request(server)
                .get('/guests/count')
                .set('Referer', 'http://www.bethandtyler.com')
                .expect(401);
        });

        it('should return 200 status when the password is right', function () {
            request(server)
                .get('/guests/count')
                .set('Referer', 'http://www.bethandtyler.com')
                .expect(200);
        });
    });

    describe('/guests/ceremonycount GET', function () {
        it('should return 401 if the password is not correct', function () {
            request(server)
                .get('/guests/count')
                .set('Referer', 'http://www.bethandtyler.com')
                .expect(401);
        });

        it('should return 200 status when the password is right', function () {
            request(server)
                .get('/guests/count')
                .set('Referer', 'http://www.bethandtyler.com')
                .expect(200);
        });
    });
});