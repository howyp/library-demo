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
	}).otherwise({
		redirectTo : '/books'
	});
});

libraryApp.run(function($rootScope, $location, userService) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		if (next.templateUrl !== "partials/login.html" && !userService.isLoggedIn()) {
			$location.path('/login');
		}
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

libraryApp.directive('navbar', function(userService) {
	return {
		replace : true,
		templateUrl : "partials/navbar.html",
		link : function(scope, element, attrs) {
			scope.fullName = userService.currentUser.name;
			$(element).find('ul.nav li').each(function() {
				if ($(this).hasClass(attrs.selected)) {
					$(this).addClass('active');
				}
			});
		}
	};
});
