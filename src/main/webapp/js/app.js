var libraryApp = angular.module('library', [ 'libraryServices', 'ngCookies' ]);

libraryApp.config(function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl : 'partials/login.html',
		controller : LoginCtrl
	}).when('/books', {
		templateUrl : 'partials/book-list.html',
		controller : BookListCtrl
	}).when('/books/new', {
		templateUrl : 'partials/book-detail.html',
		controller : BookDetailCtrl
	}).when('/books/:bookId', {
		templateUrl : 'partials/book-detail.html',
		controller : BookDetailCtrl
	}).when('/logout', {
		resolve : { controller : LogoutCtrl }
	}).otherwise({
		redirectTo : '/books'
	});
});

libraryApp.config(function($httpProvider) {
	function authInterceptor($q, $log, $location) {
		function success(response) {
			return response;
		}
		function error(response) {
			var status = response.status;
			if (status == 401) {
				$location.path("/login");
			}
			return $q.reject(response); 
		}
		return function(promise) {
			return promise.then(success, error);
		};
	}
	$httpProvider.responseInterceptors.push(authInterceptor);
});


libraryApp.config(function($httpProvider) {
	function authTransform(data, headersGetter) {
		var $rootScope = angular.element(document).injector().get('$rootScope');
		var $cookieStore = angular.element(document).injector().get('$cookieStore');
		var authToken = $rootScope.authToken;
		if (_.isUndefined(authToken)) {
			authToken = $cookieStore.get('authToken');
		}
		if (!_.isUndefined(authToken)) {
			var headers = headersGetter();
			headers['Authorization'] = authToken;
		}
		return data;
	}
	$httpProvider.defaults.transformRequest.push(authTransform);

});










