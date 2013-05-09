var libraryServices = angular.module('libraryServices', [ 'ngResource' ]);

libraryServices.factory('bookService', function($resource) {
	return $resource('api/books/:bookId', {}, {});
});

