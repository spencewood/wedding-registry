var email = require('../helpers/email');
var should = require('should');

describe('Email', function () {
    it('should validate "test@gmail.com" as true', function () {
        email.validate('test@gmail.com').should.be.true;
    });

    it('should validate "test.test@gmail.com" as true', function () {
        email.validate('test.test@gmail.com').should.be.true;
    });

    it('should validate "test@ as false', function () {
        email.validate('test@').should.be.false;
    });

    it('should validate "test@..com" as false', function () {
        email.validate('test@..com').should.be.false;
    });
});