var http      = require('http');
var express   = require('express');

var app = express();

app.get('/api/authenticate', function(req, res) {
	res.send(200, {"name":"Neil Moorcroft",
		   	       "id":1,
		   	       "username":"neil"});
});

app.listen(3000);
app.use('/angular', express.static(__dirname + '/src/main/webapp'))

