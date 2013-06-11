describe('LoginCtrl', function() {
	var $scope = null;
	var $httpBackend = null;
	var $controller = null;

	beforeEach(module('library.services'));

	beforeEach(inject(function($rootScope, _$controller_, _$httpBackend_) {
		$scope = $rootScope.$new();
		$httpBackend = _$httpBackend_;
		$controller = _$controller_;
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should login via auth service', inject(function($location) {

		var mockUserService = {};

		$controller(LoginCtrl, {
			$scope : $scope,
			userService : mockUserService
		});
		
		$scope.user = {};
		$scope.user.username = "neil";
		$scope.$apply('user');

		$httpBackend.expectGET('/api/authenticate', undefined, function(headers) {
			return headers['Authorization'] == 'ssss';
		}).respond({ name : 'Me' });

		spyOn($location, 'path');

		$scope.login({
			username : 'username',
			password : 'password'
		});
		
		$httpBackend.flush();

		expect(mockUserService.currentUser.name).toBe('Me');
		expect($location.path).toHaveBeenCalledWith('/books');

	}));

	it('should display error for invalid username/password', inject(function($location) {

		var mockUserService = {};

		$controller(LoginCtrl, {
			$scope : $scope,
			userService : mockUserService
		});

		$httpBackend.expectGET('/api/authenticate').respond(401, '');

		$scope.login({
			username : 'username',
			password : 'password'
		});

		$httpBackend.flush();

		expect($scope.error).toBe('Invalid username or password.');


	}));

});