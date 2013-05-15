describe("Controllers", function() {

	describe('BookListCtrl', function() {

		it('should get books from bookService', inject(function($rootScope, $controller) {

			var scope = $rootScope.$new();
			
			var mockBookService = { query : jasmine.createSpy() };
			
			$controller(BookListCtrl, { $scope : scope, bookService : mockBookService });

			expect(mockBookService.query).toHaveBeenCalled();
			
			expect(scope.search).toBeDefined();
			
		}));

		it('should search books from bookService', inject(function($rootScope, $controller) {

			var scope = $rootScope.$new();
			
			var mockBookService = { query : jasmine.createSpy() };
			
			$controller(BookListCtrl, { $scope : scope, bookService : mockBookService });

			scope.search('query');
			
			expect(mockBookService.query).toHaveBeenCalledWith( { q : 'query' });
			
		}));
	});

	describe('LoginCtrl', function() {

		it('should login via auth service', inject(function($httpBackend, $rootScope, $controller, $location) {

			var scope = $rootScope.$new();

			$controller(LoginCtrl, { $scope : scope });

			var expected = { username : 'username', password : 'password' };
			
			$httpBackend.expectPOST('api/authenticate', expected).respond();

			spyOn($location, 'path');
			
			scope.login({ username: 'username', password : 'password' });
			$httpBackend.flush();

			expect($location.path).toHaveBeenCalledWith('/books');

			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();

			
		}));

	});

});
