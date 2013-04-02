var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');

var server = express();
server.use(express.bodyParser());
var routes = require('./routes')(server);

server.listen(config.port, function () {
    console.log('Listening on ' + config.port);
});