//
// test/unit/controllers/controllersSpec.js
//
describe("Unit: Testing Controllers", function() {


  
  beforeEach(module('library'));

  describe('PhoneCat controllers', function() {
	   
	   describe('PhoneListCtrl', function(){
	  
	     it('should create "phones" model with 3 phones', function() {
	       var scope = {},
	           ctrl = new PhoneListCtrl(scope);
	  
	       expect(scope.phones.length).toBe(3);
	     });
	   });
	 });
  
	   
	  
  describe('Testing a controller', function() {

	    var ctrl, scope, httpMock;

	    beforeEach(inject(function($controller, $rootScope, $httpBackend, $http, $location, $cookieStore) {
	        httpMock = $httpBackend;
	        scope = $rootScope.$new();
	        
	        
	    	$cookieStore.put('authToken', "testtoken");

	        ctrl = $controller;
	        ctrl(LogoutCtrl, {
	            $cookieStore: $cookieStore,
	            $location: $location
	        });
	    }));

	    it("clears out token and redirects to root", function() {
	      expect($cookieStore['authToken']).isUndefined();
	    });
	});
  
 /* describe('Testing Book list controller', function() {

	    var ctrl, scope, httpMock;
	    var bookServiceMock;
	    
	    beforeEach(function() {
	    	bookServiceMock = {
                bookService = [{id:"1", title:"Harry Potter", isbn:"1717"}],

                requestPeople: function() {
                    deferred = q.defer();
                    return deferred.promise;
                }
            };
        });
	    
	    

	    it("clears out token and redirects to root", function() {
	      expect($cookieStore['authToken']).isUndefined();
	    });
	});*/
	    
	  /*     expect(scope.phones.length).toBe(3);
	     });
	   });
	 });*/
/*  var ctrl, myScope;

  beforeEach(inject(function($controller, $rootScope) {
      myScope = $rootScope.$new();
      ctrl = $controller('LoginCtrl', {
          $scope: myScope
      });
  }));
*/  
  /*it('In the scope, the initial value for a=2', function() {
      expect(myScope.a).toBe(2);
});*/
  

  
	/*it('should ....', inject(function($controller) {
		//expect($controller('LoginCtrl')).toBeTruthy();
		expect($controller('TestController')).not.to.equal(null);
	}));
	*/
	/* var ctrl, scope;

	  beforeEach(module('library'));

	  beforeEach(inject(function ($rootScope, $controller) {
	    scope = $rootScope.$new();
	    ctrl = $controller('TestController', {$scope: scope});
	  }));

	  it("has spices", function () {
		  expect(ctrl).not.to.equal(null);
	  });*/
});
