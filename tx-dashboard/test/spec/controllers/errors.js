'use strict';

describe('Controller: ErrorsCtrl', function () {

  // load the controller's module
  beforeEach(module('txDashboardApp'));

  var ErrorsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ErrorsCtrl = $controller('ErrorsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
