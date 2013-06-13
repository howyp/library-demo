var supertest = require('supertest');
var request = supertest('http://localhost:80/api');

resultHandler = function(done) {
	return function(err, res) {
		       		if (err) return done(err);
		        	done();
	}
}

describe("The library demo api", function() {
	it("should allow the user to authenticate", function(done) {
		request.get('/authenticate')
			   .expect('Content-Type', /json/)
			   .expect(200)
			   .expect({"name" : "Neil Moorcroft",
			   	        "id" : 1,
			   	        "username" : "neil"})
		       .end(resultHandler(done));
	});
	it("have a list of books available", function(done) {
		request.get('/books')
			   .expect('Content-Type', /json/)
			   .expect(200)
			   .expect([{"id" : 1,
						"title" : "Neil's Book",
						"isbn" : "1234567",
						"author" : "Neil"},
					   {"id" : 2,
						"title" : "Howy's Book",
						"isbn" : "2345678",
						"author" : "Howy"},
					   {"id" : 3,
						"title" : "Mark's Book",
						"isbn" : "3456789",
						"author" : "Mark"}])
		       .end(resultHandler(done));
	});
});