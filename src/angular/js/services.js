angular.module('library.services', [ 'ngResource' ])

.factory('bookService', ['$resource', function($resource) {
	return $resource('/api/books/:bookId', {}, {});
}])

.service('userService', function() {
	this.currentUser = null;
	this.isLoggedIn = function() { return this.currentUser !== null; };
})

.factory('loginService', ['$http', function($http) {
	return {
		setHeaders : function(username, password) {
			$http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode(username + ':' + password);
		}
	};	
}]);

