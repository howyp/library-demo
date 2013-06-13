var supertest = require('supertest');
var appUnderTest = require('./../../../../app.js');
var request = supertest(appUnderTest.app);

describe("The library demo api", function() {
	it("should allow the user to authenticate", function(done) {
		request.get('/authenticate')
			   .expect('Content-Type', /json/)
			   .expect(200, done);
	});
});