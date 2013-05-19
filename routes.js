var express = require('express');
var GuestController = require('./controllers/guest-controller');
var Guest = require('./models/guest-model');
var config = require('./config');

var auth = express.basicAuth(function (user, pass) {
    return (user === 'admin' && pass === config.password);
}, 'Enter your username and password');

var getFirstError = function (errs) {
    var retErr = '';
    for(var err in errs){
        if(errs.hasOwnProperty(err)) {
            retErr = errs[err].type;
            break;
        }
    }
    return retErr;
};

var routes = function (server) {
    /**
     * Cross-origin for all calls
     */
    server.all('/*', function(req, res, next) {
        //check if the referer is correct
        var referer = req.header('Referer');
        if(typeof referer !== 'undefined' && config.allowedDomains.indexOf(referer) + '/' === -1){
            res.send(403, 'Cannot save from ' + referer);
        }

        //add cross-domain access if allowed access in config
        if(config.allowedDomains.indexOf(req.headers.origin) >= 0){
            res.header('Access-Control-Allow-Origin', req.headers.origin);
        }
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');

        next();
    });

    /**
     * Guest
     */
    server.post('/guests', function (req, res, next) {
        var controller = new GuestController(req.body);

        try{
            controller.addGuest(function (err, model) {
                if(err !== null){
                    next(err);
                }
                //successful entry
                res.send(200);
            });
        }catch(e){
            next(e);
        }
    });

    server.get('/guests', auth, function (req, res) {
        Guest.getAll(function (err, models) {
            res.json(models);
        });
    });

    server.get('/guests/receptioncount', auth, function (req, res) {
        Guest.getReceptionCount(function (count) {
            res.send(count.toString());
        });
    });

    server.get('/guests/ceremonycount', auth, function (req, res) {
        Guest.getCeremonyCount(function (count) {
            res.send(count.toString());
        });
    });

    //Error handling
    server.use(function (err, req, res, next) {
        switch(err.name){
        case 'MongoError':
            if(err.code === 11000){
                res.send(409, 'Oops, looks like you have already registered!');
            }
            break;
        case 'ValidationError':
            res.send(500, getFirstError(err.errors));
            break;
        case 'TooLateError':
            res.send(500, 'You are too late to register!');
            break;
        }

        res.send(500, 'Unable to save record');
    });
};

module.exports = routes;