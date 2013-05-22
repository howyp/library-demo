var libraryServices = angular.module('libraryServices', [ 'ngResource' ]);

libraryServices.factory('bookService', function($resource) {
	return $resource('api/books/:bookId', {}, {});
});

libraryServices.factory('userService', function() {
	return { 
		currentUser : null,
		isLoggedIn : function() {
			return currentUser != null;
		}
	};
});
