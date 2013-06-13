var http      = require('http');
var express   = require('express');

var port = 80;

var app = express();

app.get('/api/authenticate', function(req, res) {
	res.send(200, {"name":"Neil Moorcroft",
		   	       "id":1,
		   	       "username":"neil"});
});

app.use('/angular', express.static(__dirname + '/src/main/webapp'))

app.listen(port);
console.log("Started angular demo on http://localhost:" + port);