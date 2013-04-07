var Guest = require('./controllers/guest-controller');

var routes = function (server) {
    /**
     * Guest
     */
    server.post('/guest', function (req, res) {
        var controller = new Guest(req.body);

        if(controller.isValid()) {
            controller.addGuest(function (err) {
                if(err !== null){
                    res.send(500, err);
                }
                res.send(200);
            });
        }
        else{
            res.send(500, 'Incorrect parameters');
        }
    });
};

module.exports = routes;