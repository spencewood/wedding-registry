var should = require('should');
var request = require('supertest');
var express = require('express');
var server = express();
server.use(express.bodyParser());
var routes = require('../routes')(server);


describe('API', function () {
    describe('/guest POST', function () {
        it('responds with 500 when not posting proper parameters', function (done) {
            request(server)
                .post('/guest')
                .expect(500, done);
        });
    });
});