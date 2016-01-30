'use strict';

/**
 * @ngdoc function
 * @name txDashboardApp.controller:StateCtrl
 * @description
 * # StateCtrl
 * Controller of the txDashboardApp
 */
angular.module('txDashboardApp')
  .controller('StateCtrl', function ($scope) {

    $scope.today = new Date();
    $scope.yesterday = new Date( new Date().setDate(new Date().getDate() - 1) );
    $scope.twoDaysBefore = new Date( new Date().setDate(new Date().getDate() - 2) );

  });
