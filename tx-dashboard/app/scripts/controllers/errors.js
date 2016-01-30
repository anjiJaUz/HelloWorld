'use strict';

/**
 * @ngdoc function
 * @name txDashboardApp.controller:ErrorsCtrl
 * @description
 * # ErrorsCtrl
 * Controller of the txDashboardApp
 */
angular.module('txDashboardApp')
  .controller('ErrorsCtrl', function ($scope, $uibModal) {

    $scope.open = function() {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/errors-modal.html',
        controller: 'ErrorsModalCtrl'
      });

      modalInstance.result.then(function () {}, function () {});
    };

  })
  .controller('ErrorsModalCtrl', function ($scope, $uibModalInstance) {

    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
