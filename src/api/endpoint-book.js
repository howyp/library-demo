module.exports = function(service) {

	function validateAndSave(book) {
		if (service.save(book))
			res.send(200);
		else {
			res.send(400);
		}
	};

	return {
		list : function(req, res) {
			booksWithoutId = [];
			for (var id in service.list) { booksWithoutId.push(service.list[id]); }
			res.send(200, booksWithoutId);
		},

		edit : function(req, res, next) {
			if (!req.body.id) next();
			else validateAndSave(req.body);
		},

		create : function(req, res) {
			validateAndSave({"id" : service.maxId() + 1,
							 "title" : req.body.title,
							 "isbn" : req.body.isbn,
							 "author" : req.body.author});
		},

		loadById : function(req, res) {
			var book = service.loadById(req.params.id);
			if (!book) res.send(404, "Book not found");
			else res.send(200, book);
		},
	};
};
