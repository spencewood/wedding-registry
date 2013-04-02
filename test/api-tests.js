require('should');
var request = require('supertest');
var express = require('express');
var server = express();
server.use(express.bodyParser());
var routes = require('../routes')(server);
var Guest = require('../models/guest-model');

var clear = function (done) {
    Guest.collection.remove(done);
};

describe('API', function () {
    describe('/guest POST', function () {
        it('should respond with 500 when not posting valid parameters', function (done) {
            request(server)
                .post('/guest')
                .expect(500, done);
        });

        it('should respond with 500 when passing validation but failing database entry', function (done) {
            //enter the same guest twice into db
            request(server)
                .post('/guest')
                .send({
                    firstName: 'first',
                    lastName: 'last',
                    emailAddress: 'email@email.com'
                });

            request(server)
                .post('/guest')
                .send({
                    firstName: 'first',
                    lastName: 'last',
                    emailAddress: 'email@email.com'
                })
                .expect(500, clear(done));

        });

        it('should respond with 200 when passing valid first name, last name and email', function (done) {
            request(server)
                .post('/guest')
                .send({
                    firstName: 'first',
                    lastName: 'last',
                    emailAddress: 'email@email.com'
                })
                .expect(200, clear(done));
        });
    });
});