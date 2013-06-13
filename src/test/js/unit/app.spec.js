var supertest = require('supertest');
var appUnderTest = require('./../../../../app.js');
var request = supertest(appUnderTest.app);

describe("The library demo api", function() {
	it("should allow the user to authenticate", function(done) {
		request.get('/api/authenticate')
			   .expect('Content-Type', /json/)
			   .expect(200)
			   .expect({"name" : "Neil Moorcroft",
			   	        "id" : 1,
			   	        "username" : "neil"}).end(done);
	});
	it("have a list of books available", function(done) {
		request.get('/api/books')
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
						"author" : "Mark"}]).end(done);
	});
});
