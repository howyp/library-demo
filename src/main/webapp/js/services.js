'use strict';

var libraryServices = angular.module('libraryApp.services', [ 'ngResource' ]);

libraryServices.factory('bookService', function($resource) {
	return $resource('api/books/:bookId', {}, {});
});

libraryServices.factory('userService', function() {
	return { 
		currentUser : null,
		isLoggedIn : function() {
			return this.currentUser !== null;
		}
	};
});
