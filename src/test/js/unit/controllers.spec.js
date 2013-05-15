describe("demo controllers", function() {

	describe('LoginCtrl', function() {

		it('should create login function', function() {
			var scope = {}, http = {}, location = {};
			
			new LoginCtrl(scope, http, location);
			
			expect(scope.login).toBeDefined();
			
		});
	});
	
	describe('BookListCtrl', function() {
		
		it('should create books', function() {
			var scope = {};
			var books = {};
			var bookService = {
				query: function() {
					return books;
				}
			};
			
			new BookListCtrl(scope, bookService);
			
			expect(scope.books).toEqual(books);
			
		});
		
		
	});
	
	
});

