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
			   .expect({"name":"Neil Moorcroft",
			   	        "id":1,
			   	        "username":"neil"})
		       .end(resultHandler(done));
	});
});