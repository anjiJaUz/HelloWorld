'use strict';

describe('Directive: txLineBarChart', function () {

  // load the directive's module
  beforeEach(module('txDashboardApp'));

  // var element;
  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // it('should make hidden element visible', inject(function ($compile) {
  //   element = angular.element('<tx-line-bar-chart></tx-line-bar-chart>');
  //   element = $compile(element)(scope);
  //   expect(element.text()).toBe('this is the txLineBarChart directive');
  // }));
});
