var GuestController = require('./controllers/guest-controller');
var Guest = require('./models/guest-model');
var config = require('./config');

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
    server.post('/guests', function (req, res) {
        var controller = new GuestController(req.body);

        controller.addGuest(function (err, model) {
            if(err !== null){
                //console.log(err.code, err.message);
            }
            else{
                //successful entry
                res.send(200);
            }
        });
    });

    server.get('/guests', function (req, res) {
        //simple auth
        if(req.query.password === config.password) {
            Guest.getAll(function (err, models) {
                res.json(models);
            });
        }
        else{
            //unauthorized
            res.send(401);
        }
    });

    server.get('/guests/count', function (req, res) {
        //simple auth
        if(req.query.password === config.password) {
            Guest.getCount(function (count) {
                res.send(count.toString());
            });
        }
        else{
            //unauthorized
            res.send(401);
        }
    });
};

module.exports = routes;