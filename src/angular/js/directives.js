angular.module('library.directives', [])

.directive('navbar', ['userService', function(userService) {
	return {
		replace : true,
		templateUrl : "partials/navbar.html",
		link : ['scope', 'element', 'attrs', function(scope, element, attrs) {
			scope.fullName = userService.currentUser.name;
			$(element).find('ul.nav li').each(function() {
				if ($(this).hasClass(attrs.selected)) {
					$(this).addClass('active');
				}
			});
		}]
	};	
}]);

