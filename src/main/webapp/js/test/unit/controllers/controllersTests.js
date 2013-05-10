//
// test/unit/controllers/controllersSpec.js
//
describe("Unit: Testing Controllers", function() {
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    this.scope = $rootScope.$new();
    $controller('LoginCtrl', {
      $scope: this.scope
    });
  }));

  it('should have a LoginCtrl controller', function() {
    expect(library.LoginCtrl).not.to.equal(null);
  });
  
  it('should have a LoginCtrl controller', function() {
	    expect(library.LoginCtrl).not.to.equal(null);
	  });


});


