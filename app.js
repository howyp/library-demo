var http      = require('http');
var express   = require('express');

var port = 80;

var app = express();

var books = [];
books.push({"id" : 1,
			"title" : "Neil's Book",
			"isbn" : "1234567",
			"author" : "Neil"});
books.push({"id" : 2,
			"title" : "Howy's Book",
			"isbn" : "2345678",
			"author" : "Howy"});
books.push({"id" : 3,
			"title" : "Mark's Book",
			"isbn" : "3456789",
			"author" : "Mark"});

app.get('/api/authenticate', function(req, res) {
	res.send(200, {"name":"Neil Moorcroft",
		   	       "id":1,
		   	       "username":"neil"});
});
app.get('/api/books', function(req, res) {
	res.send(200, books);
});
app.get('/api/books/:id', function(req, res) {
	res.send(200, books.filter(function(book) {return book.id == req.params.id})[0]);
});

app.use('/angular', express.static(__dirname + '/src/main/webapp'))

if (require.main === module) { 
	app.listen(port);
	console.log("Started angular demo on http://localhost:" + port);
} 
else exports.app = app;
