var http      = require('http');
var express   = require('express');

var port = 80;
var app = express();
app.use(express.bodyParser());

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
app.post('/api/books', function(req, res) {
	var newId = 4;
	books.push({"id" : newId,
				"title" : req.body.title,
				"isbn" : req.body.isbn,
				"author" : req.body.author});
	res.send(200, books);
});
app.get('/api/books/:id', function(req, res) {
	var booksWithId = books.filter(function(book) {return book.id == req.params.id});
	if (booksWithId.length == 0) res.send(404);
	else res.send(200, booksWithId[0]);
});

app.use('/angular', express.static(__dirname + '/src/main/webapp'))

if (require.main === module) { 
	app.listen(port);
	console.log("Started angular demo on http://localhost:" + port);
} 
else exports.app = app;
