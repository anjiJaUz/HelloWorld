'use strict';

describe('Controller: TransactionsCtrl', function () {

  // load the controller's module
  beforeEach(module('txDashboardApp'));

  var TransactionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransactionsCtrl = $controller('TransactionsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
