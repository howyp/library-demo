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

exports.list = books;

exports.save = function(book) {
	if (!book.id || !book.title || !book.isbn || !book.author)
		return false;
	else {
		books[book.id] = book;
		return true;
	}
};

exports.loadById = function(id) {
	return books[id];
}

exports.maxId = function() {
	var maxId = 0;
	for (var id in books) { maxId = Math.max(maxId, id) }
	return maxId;
}