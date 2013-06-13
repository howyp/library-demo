var http      = require('http');
var express   = require('express');

var port = 80;
var app = express();
app.use(express.bodyParser());

var books = {};
books[1] = {"id" : 1,
			"title" : "Neil's Book",
			"isbn" : "1234567",
			"author" : "Neil"};
books[2] = {"id" : 2,
			"title" : "Howy's Book",
			"isbn" : "2345678",
			"author" : "Howy"};
books[3] = {"id" : 3,
			"title" : "Mark's Book",
			"isbn" : "3456789",
			"author" : "Mark"};

app.get('/api/authenticate', function(req, res) {
	res.send(200, {"name":"Neil Moorcroft",
		   	       "id":1,
		   	       "username":"neil"});
});
app.get('/api/books', function(req, res) {
	booksWithoutId = [];
	for (var id in books) { booksWithoutId.push(books[id])}
	res.send(200, booksWithoutId);
});
app.post('/api/books', function(req, res) {
	var id = req.body.id || 4;
	if (!req.body.title || !req.body.isbn || !req.body.author)
		res.send(400);
	else {
		books[id] = {"id" : id,
					 "title" : req.body.title,
					 "isbn" : req.body.isbn,
					 "author" : req.body.author};
		res.send(200, books);
	}
});
app.get('/api/books/:id', function(req, res) {
	var book = books[req.params.id];
	if (!book) res.send(404, "Book not found");
	else res.send(200, book);
});

app.use('/angular', express.static(__dirname + '/src/angular'))

if (require.main === module) { 
	app.listen(port);
	console.log("Started angular demo on http://localhost:" + port);
} 
else exports.app = app;
