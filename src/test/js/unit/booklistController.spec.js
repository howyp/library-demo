describe('BookListCtrl', function() {
	var $scope = null;
	var $httpBackend = null;
	var $controller = null;

	var books = [ {
		id : 1,
		title : "Domain-Driven Design",
		isbn : "0-321-12521-5",
		author : "Eric Evans"
	}, {
		id : 3,
		title : "Java Persistence with Hibernate",
		isbn : "1-932394-88-5",
		author : "Christian Bauer, Gavin King"
	} ];

	beforeEach(module('library.services'));

	beforeEach(inject(function($rootScope, _$controller_, _$httpBackend_) {
		$scope = $rootScope.$new();
		$httpBackend = _$httpBackend_;
		$controller = _$controller_;
	}));

	beforeEach(function() {
		this.addMatchers({
			// we need to use toEqualData because the Resource hase extra
			// properties which make simple .toEqual not work.
			toEqualData : function(expect) {
				return angular.equals(expect, this.actual);
			}
		});
	});
	
	beforeEach(function() {
		$httpBackend.when('GET', '/api/books').respond( books );
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});
	
	it('loads all books when started', function() {

		$httpBackend.expectGET('/api/books').respond( books );

		$controller(BookListCtrl, {
			$scope : $scope
		});

		expect($scope.search).toBeDefined();
		expect($scope.searchIcon).toBeDefined();
		expect($scope.select).toBeDefined();

		expect($scope.books).toEqual([]);

		$httpBackend.flush();

		expect($scope.books).toEqualData( books );

	});

	it('should search for books using query', function() {

		$controller(BookListCtrl, { $scope : $scope });
		
		$httpBackend.expectGET('/api/books?q=query').respond(books);

		$scope.query = 'query';
		$scope.search($scope.query);
		
		$httpBackend.flush();
		
		expect($scope.showClear).toBe(true);
		
		$scope.query = '';
		$scope.$apply('query');
		expect($scope.showClear).toBe(false);


		
	});

	it('should hide the clear button for an empty search', function() {

		$controller(BookListCtrl, { $scope : $scope });
		
		$httpBackend.expectGET('/api/books?q=').respond(books);

		$scope.search('');
		
		$httpBackend.flush();
		
		expect($scope.showClear).toBe(false);
		
		
	});


	it('should select a book by id', inject(function($location) {

		$controller(BookListCtrl, { $scope : $scope });
		$httpBackend.flush();
		
		spyOn($location, 'path');
		
		$scope.select(1);
		
		expect($location.path).toHaveBeenCalledWith('/books/1');

	}));

	it('should clear search when icon clear clicked', function() {

		$controller(BookListCtrl, { $scope : $scope });
		$httpBackend.flush();

		spyOn($scope, 'search');
		
		$scope.showClear = true;
		$scope.query = 'query';
		$scope.searchIcon();

		expect($scope.search).toHaveBeenCalledWith('');

	});

	it('should execute search when icon search clicked', function() {

		$controller(BookListCtrl, { $scope : $scope });
		$httpBackend.flush();
		
		spyOn($scope, 'search');
		$scope.showClear = false;
		$scope.query = 'query';

		$scope.searchIcon();

		expect($scope.search).toHaveBeenCalledWith('query');

	});


});
