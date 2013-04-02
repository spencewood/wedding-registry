var express = require('express');

var server = express();
server.use(express.bodyParser());
var routes = require('./routes')(server);

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Listening on ' + port);
});