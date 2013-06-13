var supertest = require('supertest');
var appUnderTest = require('../../src/api/api.js');
var request = supertest(appUnderTest.app);

describe("The library demo api", function() {
	it("allows the user to authenticate", function(done) {
		request.get('/api/authenticate')
			   .expect('Content-Type', /json/)
			   .expect(200)
			   .expect({"name" : "Neil Moorcroft",
			   	        "id" : 1,
			   	        "username" : "neil"}).end(done);
	});
	it("has a list of books available", function(done) {
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
	it("is able to query for a specific book", function(done) {
		request.get('/api/books/1')
			   .expect('Content-Type', /json/)
			   .expect(200)
			   .expect({"id" : 1,
						"title" : "Neil's Book",
						"isbn" : "1234567",
						"author" : "Neil"}).end(done);
	});
	it("gives an error if a given book id does not exist", function(done) {
		request.get('/api/books/9999')
			   .expect(404).end(done);
	});
	it("does not create a book if the title is missing", function(done) {
		request.post('/api/books')
			   .type('json')
			   .send({"author" : "Tim",
			   	      "isbn" : "4567890"})
			   .expect(400).end(function() {});
		request.get('/api/books/4').expect(404).end(done);
	});
	it("does not create a book if the author is missing", function(done) {
		request.post('/api/books')
			   .type('json')
			   .send({"title" : "Tim's Book",
			   	      "isbn" : "4567890"})
			   .expect(400).end(function() {});
		request.get('/api/books/4').expect(404).end(done);
	});
	it("does not create a book if the isbn is missing", function(done) {
		request.post('/api/books')
			   .type('json')
			   .send({"title" : "Tim's Book",
			   	      "author" : "Tim"})
			   .expect(400).end(function() {});
		request.get('/api/books/4').expect(404).end(done);
	});
	it("does not create a book if the title is empty", function(done) {
		request.post('/api/books')
			   .type('json')
			   .send({"title" : "",
			   	      "author" : "Tim",
			   	      "isbn" : "4567890"})
			   .expect(400).end(function() {});
		request.get('/api/books/4').expect(404).end(done);
	});
	it("does not create a book if the author is empty", function(done) {
		request.post('/api/books')
			   .type('json')
			   .send({"title" : "Tim's Book",
			   	      "author" : "",
			   	      "isbn" : "4567890"})
			   .expect(400).end(function() {});
		request.get('/api/books/4').expect(404).end(done);
	});
	it("does not create a book if the isbn is empty", function(done) {
		request.post('/api/books')
			   .type('json')
			   .send({"title" : "Tim's Book",
			   	      "author" : "Tim",
			   	      "isbn" : ""})
			   .expect(400).end(function() {});
		request.get('/api/books/4').expect(404).end(done);
	});
	it("creates new books", function(done) {
		request.post('/api/books')
			   .type('json')
			   .send({"title" : "Tim's Book",
			   	      "author" : "Tim",
			   	      "isbn" : "4567890"})
			   .expect(200).end(function() {});
		request.post('/api/books')
			   .type('json')
			   .send({"title" : "Chris's Book",
			   	      "author" : "Chris",
			   	      "isbn" : "7890123"})
			   .expect(200).end(function() {});
		request.get('/api/books/4')
			   .expect('Content-Type', /json/)
			   .expect(200)
			   .expect({"id" : 4,
						"title" : "Tim's Book",
			   	        "author" : "Tim",
			   	        "isbn" : "4567890"}).end(function() {});
		request.get('/api/books/5')
			   .expect('Content-Type', /json/)
			   .expect(200)
			   .expect({"id" : 5,
					    "title" : "Chris's Book",
			   	        "author" : "Chris",
			   	        "isbn" : "7890123"}).end(done);
	});
	it("edits books", function(done) {
		request.get('/api/books/1')
			   .expect('Content-Type', /json/)
			   .expect(200)
			   .expect({"id" : 1,
						"title" : "Neil's Book",
						"isbn" : "1234567",
						"author" : "Neil"})
			   .end(function() {});;
		request.post('/api/books')
			   .type('json')
			   .send({"id" : 1,
			   		  "title" : "Martin's Book",
			   	      "author" : "Martin",
			   	      "isbn" : "5678901"})
			   .expect(200).end(function() {});
		request.get('/api/books/1')
			   .expect('Content-Type', /json/)
			   .expect(200)
			   .expect({"id" : 1,
			   		    "title" : "Martin's Book",
			   	        "author" : "Martin",
			   	        "isbn" : "5678901"}).end(done);
	});
});
