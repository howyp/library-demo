var libraryServices = angular.module('libraryServices', [ 'ngResource' ]);

libraryServices.factory('bookService', function($resource) {
	return $resource('http://localhost:8080/angularjs-demo/api/books/:bookId', {}, {});
});

