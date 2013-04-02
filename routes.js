var GuestController = require('./controllers/guest-controller');

var routes = function (server) {
    /**
     * Guest
     */
    server.post('/guest', function (req, res) {
        res.send(500, 'Incorrect parameters');
    });
};

module.exports = routes;