function LoginCtrl($scope, $http, $location) {
	$scope.login = function(user) {
		$http.post("api/authenticate", {
			username : user.username,
			password : user.password

		}).success(function(data) {
			$location.path("/books");

		}).error(function(data) {
			$scope.error = "Invalid username or password.";
			user.password = undefined;

		});
	};

	$('#inputUsername').focus();

}

function BookListCtrl($scope, bookService) {
	$scope.books = bookService.query();
	$scope.search = function(query) {
		$scope.books = bookService.query({
			q : query
		});
	};

}

function BookDetailCtrl($scope, $routeParams, $location, bookService) {
	var id = $routeParams.bookId;
	if (!_.isUndefined(id))
		$scope.book = bookService.get({
			bookId : id
		});

	$scope.save = function(book) {
		bookService.save(book, function() {
			$location.path("/books");
		});
	};

	$scope.cancel = function() {
		$location.path("/books");
	};

	$('#inputTitle').focus();

}


