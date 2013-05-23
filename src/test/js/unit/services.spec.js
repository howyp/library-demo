describe('Services', function() {
	

	describe('userService', function() {
		beforeEach(module('libraryServices'));
		
		it('should not be logged in', inject(function(userService) {
			expect(userService.isLoggedIn()).toBe(false);
			
		}));

		it('should be logged in', inject(function(userService) {
			userService.currentUser = { name : 'Me' };
			expect(userService.isLoggedIn()).toBe(true);
			
		}));

	});
	

	describe('bookService', function() {
		
		beforeEach(module('libraryServices'));
		
		it('should get from api/books', inject(function(bookService, $httpBackend) {
			$httpBackend.expectGET('api/books').respond();
			
			bookService.query();

			$httpBackend.flush();
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
			
			
		}));
		
	});
	
});