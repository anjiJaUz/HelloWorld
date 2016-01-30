'use strict';

describe('Directive: txPieChart', function () {

  // load the directive's module
  beforeEach(module('txDashboardApp'));

  // var element;
  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // it('should make hidden element visible', inject(function ($compile) {
  //   element = angular.element('<tx-pie-chart></tx-pie-chart>');
  //   element = $compile(element)(scope);
  //   expect(element.text()).toBe('this is the txPieChart directive');
  // }));
});
