describe('BookEditCtrl', function() {
	var $scope = null;
	var $httpBackend = null;
	var $controller = null;

	beforeEach(module('library.services'));

	beforeEach(inject(function($rootScope, _$controller_, _$httpBackend_) {
		$scope = $rootScope.$new();
		$httpBackend = _$httpBackend_;
		$controller = _$controller_;
	}));
	
	beforeEach(function() {
		$httpBackend.when('GET', '/api/books/1').respond({
			id : 1,
			title : "Domain-Driven Design",
			isbn : "0-321-12521-5",
			author : "Eric Evans"
		});
	});
	
	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should load a book by id', inject(function($location) {

		$httpBackend.expectGET('/api/books/1').respond({});

		$controller(BookEditCtrl, { $scope: $scope, $routeParams: { bookId : 1 }});
		
		$httpBackend.flush();

		expect($scope.save).toBeDefined();
		expect($scope.remove).toBeDefined();
		expect($scope.cancel).toBeDefined();
		
	}));

	it('should load an empty book', inject(function($location) {

		$controller(BookEditCtrl, { $scope: $scope });
		
		expect($scope.save).toBeDefined();
		expect($scope.remove).toBeDefined();
		expect($scope.cancel).toBeDefined();
		
		$httpBackend.verifyNoOutstandingRequest();

	}));

	it('should save a book', inject(function($location) {

		spyOn($location, 'path');
		
		$httpBackend.expectPOST('/api/books').respond({});

		$controller(BookEditCtrl, { $scope: $scope, $routeParams: { bookId : 1 }});

		$scope.save({
			id : 1,
			title : "Domain-Driven Design - modified",
			isbn : "0-321-12521-5",
			author : "Eric Evans"
		});
		
		$httpBackend.flush();
		
		expect($location.path).toHaveBeenCalledWith('/books/1');

		
	}));

	it('should remove a book', inject(function($location) {

		spyOn($location, 'path');
		
		$httpBackend.expectDELETE('/api/books/1').respond({});

		$controller(BookEditCtrl, { $scope: $scope, $routeParams: { bookId : 1 }});

		$scope.remove(1);
		
		$httpBackend.flush();

		expect($location.path).toHaveBeenCalledWith('/books');

	}));

	it('should cancel', inject(function($location) {
		spyOn($location, 'path');
		$controller(BookEditCtrl, { $scope: $scope, $routeParams: { bookId : 1 }});
		$httpBackend.flush();
		$scope.cancel(1);
		expect($location.path).toHaveBeenCalledWith('/books');
	}));

});