describe("demo controllers", function() {

	describe('LoginCtrl', function() {

		it('should create login function', function() {
			var scope = {}, http = {}, location = {};
			var ctrl = new LoginCtrl(scope, http, location);

			expect(scope.login).toBeDefined();
			
		});
	});
	
});

