'use strict';

/**
 * @ngdoc function
 * @name txDashboardApp.controller:ErrorsModalCtrl
 * @description
 * # ErrorsModalCtrl
 * Controller of the txDashboardApp
 */
angular.module('txDashboardApp')
  .controller('ErrorsModalCtrl', function ($scope, $uibModalInstance) {

    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
