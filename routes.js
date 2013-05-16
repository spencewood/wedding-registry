var useragent = require('useragent');
var Guest = require('./controllers/guest-controller');
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
    server.post('/guest', function (req, res) {
        var controller = new Guest(req.body);
        var status = '';

        var ua = useragent.lookup(req.headers['user-agent']);
        //if Internet Explorer
        if(ua.family === 'IE'){
            //treat our return status as always 200
            //so that the error messages can be relayed to the browser
            status = 200;
        }

        if(controller.isValid()){
            try{
                controller.addGuest(function (err) {
                    if(err !== null){
                        //there is some error with saving, like duplicate entry
                        switch(err.code){
                        case 11000:
                            return res.send(status || 409, 'Oops, looks like you have already registered!');
                        default:
                            return res.send(status || 500, 'Unable to save record');
                        }
                    }
                    //successful entry
                    res.send(200);
                });
            }catch(e){
                //an error has happened with saving to the database, like model validation
                res.send(status || 500, 'Error saving record');
            }
        }
        else{
            res.send(status || 500, controller.validate());
        }
    });
};

module.exports = routes;