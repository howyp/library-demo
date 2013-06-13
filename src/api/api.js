var http      = require('http');
var express   = require('express');
var user      = require('./endpoint-user');
var book      = require('./endpoint-book');

var port = 80;
var app = express();
app.use(express.bodyParser());

app.get ('/api/authenticate', user.load);
app.get ('/api/books',        book.list);
app.post('/api/books',        book.edit, book.create);
app.get ('/api/books/:id',    book.loadById);


app.use('/angular', express.static(__dirname + '/src/angular'))

if (require.main === module) { 
	app.listen(port);
	console.log("Started angular demo on http://localhost:" + port);
} 
else exports.app = app;
