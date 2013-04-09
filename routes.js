var Guest = require('./controllers/guest-controller');
var config = require('./config');

var routes = function (server) {
    /**
     * Cross-origin for all calls
     */
    server.all('/*', function(req, res, next) {
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
        var isValid = controller.isValid();

        //check if the referer is correct and if the passed in params are correct
        var referer = req.header('Referer');
        if(typeof referer === 'undefined' || config.allowedDomains.indexOf(referer) + '/' === -1){
            res.send(500, 'Cannot save from ' + referer);
        }
        else if(isValid){
            try{
                controller.addGuest(function (err) {
                    if(err !== null){
                        var message = 'Unable to save record';
                        //there is some error with saving, like duplicate entry
                        switch(err.code){
                            case 11000:
                                message = 'Looks like you have already registered!';
                                break;
                        }
                        res.send(500, message);
                    }
                    //successful entry
                    res.send(200);
                });
            }catch(e){
                //an error has happened with saving to the database, like model validation
                res.send(500, 'Error saving record');
            }
        }
        else{
            res.send(500, controller.validate());
        }
    });
};

module.exports = routes;