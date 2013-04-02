var GuestController = require('./controllers/guest-controller');

var routes = function (server) {
    /**
     * Guest
     */
    server.post('/guest', function (req, res) {
        var controller = new GuestController(req.body);

        if(controller.isValid()) {
            controller.addGuest(function (err) {
                if(typeof err !== 'undefined'){
                    res.send(500, err);
                }
                res.send(200);
            });
        }

        res.send(500, 'Incorrect parameters');
    });
};

module.exports = routes;