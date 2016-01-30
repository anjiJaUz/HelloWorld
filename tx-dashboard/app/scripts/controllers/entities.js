'use strict';

/**
 * @ngdoc function
 * @name txDashboardApp.controller:EntitiesCtrl
 * @description
 * # EntitiesCtrl
 * Controller of the txDashboardApp
 */
angular.module('txDashboardApp')
  .controller('EntitiesCtrl', function ($scope, $filter, ColorsProvider) {

    $scope.data = [

      ['TXFLT',      'OPE_CREDIT',        354252, 1771,],
      ['',           'OPE_DEBIT',         41150, 205,],
      ['',           'SPTR_CREDIT',       31052, 155 ,],
      ['',           'SPTR_DEBIT',        63530, 317,],
      ['',           'STC_CREDIT',        27545, 137,],
      ['',           'STC_DEBIT',         16002, 80,],
      ['Batch',      'Batch_Alerts',      897342, 4486,],
      ['Behavioral', 'Online BHV Alerts', 897342, 4486,],
      ['',           'Total',             1632, 1632,],

    ];

    $scope.rightCols = [false, false, true, true];

    var color = ColorsProvider.get;

    $scope.tx = {
      name: 'root',
      children: [
        {
          name: 'TXFLT',
          color: color('TXFLT'),
          children: [
            { name: 'OPE_CREDIT',  color: color('OPE_CREDIT'), size: 354252 },
            { name: 'OPE_DEBIT',   color: color('OPE_DEBIT'), size: 41150 },
            { name: 'SPTR_CREDIT', color: color('SPTR_CREDIT'), size: 31052 },
            { name: 'SPTR_DEBIT',  color: color('SPTR_DEBIT'), size: 63530 },
            { name: 'STC_CREDIT',  color: color('STC_CREDIT'), size: 27545 },
            { name: 'STC_DEBIT',   color: color('STC_DEBIT'), size: 16002 },
          ]
        },
        {
          name: 'Batch',
          color: color('Batch'),
          children: [ { name: 'Batch_Alerts', color: color('Batch_Alerts'), size: 897342 }, ]
        },
        {
          name: 'Behavioral',
          color: color('Behavioral'),
          children: [ { name: 'Online BHV Alerts', color: color('Online BHV Alerts'), size: 897342 }, ]
        }
      ]
    };

    $scope.alerts = {
      name: 'root',
      children: [
        {
          name: 'TXFLT',
          color: color('TXFLT'),
          children: [
            { name: 'OPE_CREDIT',  color: color('OPE_CREDIT'),  size: 1771 },
            { name: 'OPE_DEBIT',   color: color('OPE_DEBIT'),   size: 205 },
            { name: 'SPTR_CREDIT', color: color('SPTR_CREDIT'), size: 155 },
            { name: 'SPTR_DEBIT',  color: color('SPTR_DEBIT'),  size: 317 },
            { name: 'STC_CREDIT',  color: color('STC_CREDIT'),  size: 137 },
            { name: 'STC_DEBIT',   color: color('STC_DEBIT'),   size: 80 },
          ]
        },
        {
          name: 'Batch',
          color: color('Batch'),
          children: [ { name: 'Batch_Alerts', color: color('Batch_Alerts'),  size: 4486 }, ]
        },
        {
          name: 'Behavioral',
          color: color('Behavioral'),
          children: [ { name: 'Online BHV Alerts', color: color('Online BHV Alerts'),  size: 4486 }, ]
        }
      ]
    };

    $scope.periodOptions = [
      {days: 7,  label: 'Week'},
      {days: 14, label: 'Two Weeks'},
      {days: 30, label: 'Month'},
    ];
    $scope.period = $scope.periodOptions[0].days;

    $scope.typeOptions = [
      {type: 'line', label: 'Line Chart'},
      {type: 'bar',  label: 'Bar Chart'},
    ];
    $scope.type = $scope.typeOptions[0].type;

    $scope.settings = {series: {}, type: 'bar'};
    $scope.daysData = {};

    $scope.isChecked = function(name) {
      return $scope.settings.series[name];
    };

    $scope.toggle = function(name) {
      $scope.settings.series[name] = !$scope.settings.series[name];
    };

    var TXFLTkeys = ['OPE_CREDIT', 'OPE_DEBIT', 'SPTR_CREDIT', 'SPTR_DEBIT', 'STC_CREDIT', 'STC_DEBIT'];
    $scope.isTXFLT = function(){
      var val = true;
      TXFLTkeys.forEach(function(k){ val = val && $scope.isChecked(k); });
      return val;
    };

    $scope.toggleTXFLT = function(){
      TXFLTkeys.forEach(function(k){ $scope.toggle(k); });
    };

    var keys = [
      'OPE_CREDIT', 'OPE_DEBIT', 'SPTR_CREDIT', 'SPTR_DEBIT',
      'STC_CREDIT', 'STC_DEBIT', 'Batch_Alert', 'Online BHV Alerts'
    ];
    var initDaysData = {};
    var initDaysCount = 60;
    function generateData(){
      var columns = [];
      var axes = {};
      keys.forEach(function(k) {
        columns.push([k]);
        axes[k] = 'y2';
        $scope.settings.series[k] = true;
      });
      var dates = ['x'];
      for (var i = initDaysCount; i > 0; i--) {
        var currDate = new Date();
        currDate.setDate(currDate.getDate() - i);
        dates.push($filter('date')(currDate, 'yyyy-MM-dd'));
        columns.forEach(function(c) {
          c.push(Math.ceil(Math.random() * 10));
        });
      }
      columns.push(dates);

      initDaysData = {
        x: 'x',
        columns: columns,
        axes: axes,
      };
    }
    
    $scope.updateData = function(period) {
      $scope.period = period;
      var columns = [];
      for (var i = 0; i < initDaysData.columns.length; i++) {
        columns[i] = initDaysData.columns[i].slice(-period);
        columns[i].unshift(initDaysData.columns[i][0]);
      }
      $scope.daysData = {
        x: 'x',
        columns: columns,
        axes: initDaysData.axes,
      };
    };

    $scope.updateSettings = function(type) {
      $scope.type = type;
      $scope.settings = {
        series: $scope.settings.series,
        type: type
      };
    };

    function init(){
      generateData();
      $scope.updateData($scope.period);
      $scope.updateSettings($scope.type);
    }

    init();

  });
