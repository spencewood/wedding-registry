var Guest = require('./controllers/guest-controller');
var config = require('./config');

var routes = function (server) {
    /**
     * Cross-origin for all calls
     */
    server.all('/*', function(req, res, next) {
        config.allowedDomains.forEach(function (domain) {
            res.header('Access-Control-Allow-Origin', domain);
        });
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        next();
    });

    /**
     * Guest
     */
    server.post('/guest', function (req, res) {
        var controller = new Guest(req.body);

        //check if the referer is correct and if the passed in params are correct
        if(config.allowedDomains.indexOf(req.header('Referer')) === -1){
            res.send(500, 'Cannot save from ' + req.header('Referer'));
        }
        else if(controller.isValid()) {
            try{
                controller.addGuest(function (err) {
                    if(err !== null){
                        //there is some error with saving, like duplicate entry
                        res.send(500, err);
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
            //parameters not valid
            res.send(500, 'Incorrect parameters');
        }
    });
};

module.exports = routes;