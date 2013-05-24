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
			expect(scope.searchIcon).toBeDefined();
			
		});

		it('should search for books using query', function() {

			scope.search('query');
			expect(mockBookService.query).toHaveBeenCalledWith( { q : 'query' }, jasmine.any(Function) );
			
		});

		it('should clear search when icon clear clicked', function() {

			spyOn(scope, 'search');
			scope.showClear = true;
			scope.query = 'query';
			
			scope.searchIcon();
			
			expect(scope.search).toHaveBeenCalledWith( '' );
			
		});

		it('should execute search when icon search clicked', function() {

			spyOn(scope, 'search');
			scope.showClear = false;
			scope.query = 'query';
			
			scope.searchIcon();
			
			expect(scope.search).toHaveBeenCalledWith( 'query' );
			
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

		it('should display error for invalid username/password', inject(function($httpBackend, $rootScope, $controller, $location) {

			var scope = $rootScope.$new();
			
			var mockUserService = { };

			$controller(LoginCtrl, { $scope : scope, userService : mockUserService });

			$httpBackend.expectGET('api/authenticate').respond( 401, '');

			scope.login({ username: 'username', password : 'password' });

			$httpBackend.flush();

			expect(scope.error).toBe('Invalid username or password.');

			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();

			
		}));

		it('should set headers when user changes', inject(function($httpBackend, $rootScope, $controller, $location) {

			var scope = $rootScope.$new();
			
			var mockUserService = { };

			$controller(LoginCtrl, { $scope : scope, userService : mockUserService });
			
			scope.user = {};
			scope.user.username = "neil";

			
		}));

	});

});
