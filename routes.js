var Guest = require('./controllers/guest-controller');

var routes = function (server) {
    /**
     * Guest
     */
    server.post('/guest', function (req, res) {
        var controller = new Guest(req.body);

        //check if the referer is correct and if the passed in params are correct
        if(/bethandtyler\.com/.test(req.header('Referer')) && controller.isValid()) {
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