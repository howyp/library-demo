var LoginCtrl = function LoginCtrl($scope, $http, $location, userService, loginService) {
	$scope.login = function(user) {
		loginService.setHeaders(user.username, user.password);
		$http.get("/api/authenticate").success(function(data) {
			userService.currentUser = data;
			$location.path("/books");

		}).error(function(data) {
			$scope.error = "Invalid username or password.";
			user.password = undefined;
		});
	};

	$('#inputUsername').focus();
}
LoginCtrl.$inject = ['$scope', '$http', '$location', 'userService', 'loginService'];

var BookListCtrl = function BookListCtrl($scope, $location, bookService) {
	$scope.books = bookService.query();
	$scope.query = '';

	$scope.search = function(query) {
		$scope.books = bookService.query({
			q : query
		}, function() {
			$scope.showClear = !_.isEmpty(query);
		});
	};

	$scope.$watch('query', function() {
		if (_.isEmpty($scope.query)) {
			$scope.showClear = false;
		}
	});

	$scope.searchIcon = function() {
		if ($scope.showClear) {
			$scope.query = '';
		}
		$scope.search($scope.query);
	};

	$scope.select = function(id) {
		$location.path("/books/" + id);
	};

}
BookListCtrl.$inject = ['$scope', '$location', 'bookService'];

function BookShowCtrl($scope, $routeParams, bookService) {
	this.id = $routeParams.bookId;
	if (!_.isUndefined(this.id))
		$scope.book = bookService.get({
			bookId : this.id      
		});
}

var BookDetailCtrl = function BookDetailCtrl($scope, $routeParams, $location, bookService) {
	this.prototype = new BookShowCtrl($scope, $routeParams, bookService)

	$scope.edit = function(id) {
		$location.path("/books/" + id + "/edit");
	};

}
BookDetailCtrl.$inject = ['$scope', '$routeParams', '$location', 'bookService'];

var BookEditCtrl = function BookEditCtrl($scope, $routeParams, $location, bookService) {
	this.prototype = new BookShowCtrl($scope, $routeParams, bookService)

	$scope.save = function(book) {
		bookService.save(book, function() {
			$location.path("/books/" + book.id);
		});
	};

	$scope.remove = function(id) {
		bookService.remove({
			bookId : id
		}, function() {
			$location.path("/books");
		});
	};

	$scope.cancel = function() {
		$location.path("/books");
	};

	$('#inputTitle').focus();

}
BookEditCtrl.$inject = ['$scope', '$routeParams', '$location', 'bookService'];
