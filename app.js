var http      = require('http');
var express   = require('express');

var app = express();

app.listen(3000);
app.use('/angular', express.static(__dirname + '/src/main/webapp'))

