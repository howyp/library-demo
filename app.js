var http      = require('http');
var express   = require('express');

app = express();

app.get('/api/authenticate', function(req, res) {
	res.send(200, {});
});

app.listen(3000);
app.use('/angular', express.static(__dirname + '/src/main/webapp'));

exports.app = app;