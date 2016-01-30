'use strict';

/**
 * @ngdoc service
 * @name txDashboardApp.RenderWatcher
 * @description
 * # RenderWatcher
 * Factory in the txDashboardApp.
 */
angular.module('txDashboardApp')
  .factory('RenderWatcher', function ($q, $interval) {

    var waitRendering = function(el){
      return $q(function(resolve, reject) {
        var stop = $interval(function() {
          var rect = el.getBoundingClientRect();
          if (rect.width > 0) {
            if (angular.isDefined(stop)) {
              $interval.cancel(stop);
              stop = undefined;
            }
            resolve();
          }
        }, 100);
      });
    };

    // Public API here
    return {
      waitRendering: waitRendering
    };
  });
