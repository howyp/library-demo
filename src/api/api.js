var http              = require('http');
var express           = require('express');
var user              = require('./endpoint-user');
var bookService       = require('./service-inmemory-book')
var bookEndpoint      = require('./endpoint-book')(bookService);

var port = 80;
var app = express();
app.use(express.bodyParser());

app.get ('/api/authenticate', user.load);
app.get ('/api/books',        bookEndpoint.list);
app.post('/api/books',        bookEndpoint.edit, bookEndpoint.create);
app.get ('/api/books/:id',    bookEndpoint.loadById);


app.use('/angular', express.static(__dirname + '/src/angular'))

if (require.main === module) { 
	app.listen(port);
	console.log("Started angular demo on http://localhost:" + port);
} 
else exports.app = app;
