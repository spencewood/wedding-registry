var GuestController = require('./controllers/guest-controller');

var routes = function (server) {
    /**
     * Guest
     */
    server.post('/guest', function (req, res) {
        if(typeof req.body.first_name !== 'undefined' &&
            typeof req.body.first_name !== 'undefined' &&
            typeof req.body.email_address !== 'undefined') {
            res.send(200);
        }

        res.send(500, 'Incorrect parameters');
    });
};

module.exports = routes;