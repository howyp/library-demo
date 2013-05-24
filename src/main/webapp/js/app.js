var libraryApp = angular.module('library', [ 'libraryServices', 'ngCookies' ]);

libraryApp.config(function($routeProvider) {
	$routeProvider.when('/login', {
		controller : LoginCtrl,
		templateUrl : 'partials/login.html'
	
	}).when('/books', {
		controller : BookListCtrl,
		templateUrl : 'partials/book-list.html'
	
	}).when('/books/new', {
		controller : BookDetailCtrl,
		templateUrl : 'partials/book-detail.html'

	}).when('/books/:bookId', {
		controller : BookDetailCtrl,
		templateUrl : 'partials/book-detail.html'

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
	function errorInterceptor($q, $log, $location) {
		function success(response) {
			return response;
		}
		function error(response) {
			if (response.status == 500) {
				$('#error-dialog').modal().on('hidden', function() {
					window.location = '.';
				});
			}
			return $q.reject(response);
		}
		return function(promise) {
			return promise.then(success, error);
		};
	}
	$httpProvider.responseInterceptors.push(errorInterceptor);

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
