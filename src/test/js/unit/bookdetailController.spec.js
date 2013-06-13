describe('BookDetailCtrl', function() {
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

		$controller(BookDetailCtrl, { $scope: $scope, $routeParams: { bookId : 1 }});
		
		$httpBackend.flush();

		expect($scope.edit).toBeDefined();
		
	}));

	it('should allow a book to be edited', inject(function($location) {

		$controller(BookDetailCtrl, { $scope : $scope });
		// $httpBackend.flush();
		
		spyOn($location, 'path');
		
		$scope.edit(1);
		
		expect($location.path).toHaveBeenCalledWith('/books/1/edit');

	}));

});