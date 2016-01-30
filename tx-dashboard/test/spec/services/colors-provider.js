'use strict';

describe('Service: colorsProvider', function () {

  // load the service's module
  beforeEach(module('txDashboardApp'));

  // instantiate service
  var colorsProvider;
  beforeEach(inject(function (_colorsProvider_) {
    colorsProvider = _colorsProvider_;
  }));

  it('should do something', function () {
    expect(!!colorsProvider).toBe(true);
  });

});
