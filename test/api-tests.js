require('should');
var request = require('supertest');
var express = require('express');
var server = express();
server.use(express.bodyParser());
var routes = require('../routes')(server);


describe('API', function () {
    describe('/guest POST', function () {
        it('responds with 500 when not posting valid parameters', function (done) {
            request(server)
                .post('/guest')
                .expect(500, done);
        });

        it('responds with 200 when passing valid first name, last name and email', function (done) {
            request(server)
                .post('/guest')
                .send({
                    first_name: 'first',
                    last_name: 'last',
                    email_address: 'email@email.com'
                })
                .expect(200, done);
        });
    });
});