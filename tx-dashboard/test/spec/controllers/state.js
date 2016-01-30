'use strict';

describe('Controller: StateCtrl', function () {

  // load the controller's module
  beforeEach(module('txDashboardApp'));

  var StateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StateCtrl = $controller('StateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StateCtrl.awesomeThings.length).toBe(3);
  });
});
