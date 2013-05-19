if(process.env.NODETIME_ACCOUNT_KEY) {
    require('nodetime').profile({
        accountKey: process.env.NODETIME_ACCOUNT_KEY,
        appName: 'Wedding Registry'
    });
}

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');
var cors = require('express-ie-cors');
var validator = require('express-validator');

var server = express();
server.use(cors({
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
}));
server.use(validator);
server.use(express.bodyParser());


var routes = require('./routes')(server);

server.listen(config.port, function () {
    console.log('Listening on ' + config.port);
});