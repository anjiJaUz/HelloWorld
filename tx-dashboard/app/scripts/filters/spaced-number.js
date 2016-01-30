'use strict';

/**
 * @ngdoc filter
 * @name txDashboardApp.filter:spacedNumber
 * @function
 * @description
 * # spacedNumber
 * Filter in the txDashboardApp.
 */
angular.module('txDashboardApp')
  .filter('spacedNumber', function ($filter) {
    return function (number) {
      return $filter('number')(number, 2).replace(/,/g, ' ');
    };
  });
