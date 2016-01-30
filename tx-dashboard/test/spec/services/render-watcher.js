'use strict';

describe('Service: RenderWatcher', function () {

  // load the service's module
  beforeEach(module('txDashboardApp'));

  // instantiate service
  var RenderWatcher;
  beforeEach(inject(function (_RenderWatcher_) {
    RenderWatcher = _RenderWatcher_;
  }));

  it('should do something', function () {
    expect(!!RenderWatcher).toBe(true);
  });

});
