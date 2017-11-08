var path = require('path');
var express = require('express');

var app = express();
app.set('port', process.env.PORT || 9001);
app.use(express.static("dist"));
app.use(express.static("src"));
app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, "./src/index.html"));
});


var server = app.listen(app.get('port'), function() {
    console.log('listening on port ', server.address().port);
});