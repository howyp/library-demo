var http      = require('http');
var httpProxy = require('http-proxy');
var express   = require('express');

var app = express();

app.listen(3000);
app.use(express.static(__dirname + '/src/main/webapp'))

httpProxy.createServer({
	pathnameOnly: true,
	router: {
		'/api': '127.0.0.1:8080/', 
		'/angular': '127.0.0.1:3000/' 
	}
}).listen(80);
console.log('Listening on port 80');
