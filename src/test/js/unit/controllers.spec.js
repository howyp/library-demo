describe("Controllers", function() {

	describe('BookListCtrl', function() {

		var ctrl, scope, mockBookService;
		
		beforeEach(inject(function($rootScope, $controller) {
			mockBookService = { query : jasmine.createSpy('mockBookService.query') };
			scope = $rootScope.$new();
			ctrl = $controller(BookListCtrl, { $scope : scope, bookService : mockBookService });
		}));

		it('loads all books when loaded', function() {
			
			expect(mockBookService.query).toHaveBeenCalled();
			expect(scope.search).toBeDefined();
			
		});

		it('should search for books using query', function() {

			scope.search('query');
			expect(mockBookService.query).toHaveBeenCalledWith( { q : 'query' }, jasmine.any(Function) );
			
		});

	});

	describe('LoginCtrl', function() {

		it('should login via auth service', inject(function($httpBackend, $rootScope, $controller, $location) {

			var scope = $rootScope.$new();
			
			var mockUserService = { };

			$controller(LoginCtrl, { $scope : scope, userService : mockUserService });

			$httpBackend.expectGET('api/authenticate').respond( { name : 'Me' });

			spyOn($location, 'path');
			
			scope.login({ username: 'username', password : 'password' });
			$httpBackend.flush();

			expect(mockUserService.currentUser.name).toBe('Me');
			expect($location.path).toHaveBeenCalledWith('/books');

			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();

			
		}));

	});

});
