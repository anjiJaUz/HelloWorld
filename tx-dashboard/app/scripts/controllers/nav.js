'use strict';

/**
 * @ngdoc function
 * @name txDashboardApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the txDashboardApp
 */
angular.module('txDashboardApp')
  .controller('NavCtrl', function ($scope, $location) {

    $scope.today = new Date();
    $scope.yesterday = new Date( new Date().setDate(new Date().getDate() - 1) );
    $scope.twoDaysBefore = new Date( new Date().setDate(new Date().getDate() - 2) );

    $scope.menuItems = [
      {url: '#/transactions', name: 'Transactions', icon: 'glyphicon-transfer',         isActive: false},
      {url: '#/entities',     name: 'Entities',     icon: 'glyphicon-tree-deciduous',   isActive: false},
      {url: '#/problems',     name: 'Problems',     icon: 'glyphicon-flash',            isActive: false},
      {url: '#/state',        name: 'State',        icon: 'glyphicon-dashboard',        isActive: false},
      {url: '#/errors',       name: 'Errors',       icon: 'glyphicon-exclamation-sign', isActive: false},
    ];

    $scope.$on('$routeChangeSuccess', function() { 
      // $scope.menuItems.forEach(function(item){
      //   item.isActive = (item.url === '#' + $location.path());
      // });
      $scope.isVisible = ($location.path() !== '/');
    });

    $scope.isActive = function(url){
      // console.log($location.path(), url, $location.path().endsWith(url));
      return url.endsWith($location.path());
    };

  });
