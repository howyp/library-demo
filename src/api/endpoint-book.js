var books = {}
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

exports.list = function(req, res) {
	booksWithoutId = [];
	for (var id in books) { booksWithoutId.push(books[id])}
	res.send(200, booksWithoutId);
};

exports.edit = function(req, res, next) {
	if (!req.body.id) next();
	else validateAndSave(req.body);
};

exports.create = function(req, res) {
	validateAndSave({"id" : maxId(books) + 1,
					 "title" : req.body.title,
					 "isbn" : req.body.isbn,
					 "author" : req.body.author});
};

exports.loadById = function(req, res) {
	var book = books[req.params.id];
	if (!book) res.send(404, "Book not found");
	else res.send(200, book);
};

function validateAndSave(book) {
	if (!book.id || !book.title || !book.isbn || !book.author)
		res.send(400);
	else {
		books[book.id] = book;
		res.send(200);
	}
}

function maxId(books) {
	var maxId = 0;
	for (var id in books) { maxId = Math.max(maxId, id) }
	return maxId;
}
