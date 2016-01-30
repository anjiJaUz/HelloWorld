'use strict';

describe('Filter: spacedNumber', function () {

  // load the filter's module
  beforeEach(module('txDashboardApp'));

  // initialize a new instance of the filter before each test
  var spacedNumber;
  beforeEach(inject(function ($filter) {
    spacedNumber = $filter('spacedNumber');
  }));

  it('should return the input prefixed with "spacedNumber filter:"', function () {
    var text = 'angularjs';
    expect(spacedNumber(text)).toBe('spacedNumber filter: ' + text);
  });

});
