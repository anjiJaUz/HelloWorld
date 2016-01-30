'use strict';

/**
 * @ngdoc function
 * @name txDashboardApp.controller:TransactionsCtrl
 * @description
 * # TransactionsCtrl
 * Controller of the txDashboardApp
 */
angular.module('txDashboardApp')
  .controller('TransactionsCtrl', function ($scope, $filter, ColorsProvider) {

    $scope.data = [

      ['TXFLT',      'OPE_CREDIT',        354252, 55334162.40, 1771, 553260.40,],
      ['',           'OPE_DEBIT',         41150,  4619087.50, 205, 46022.50,],
      ['',           'SPTR_CREDIT',       31052,  6534893.40, 155, 65239.50,],
      ['',           'SPTR_DEBIT',        63530,  15275788.50, 317, 152445.30,],
      ['',           'STC_CREDIT',        27545,  11049676.75, 137, 109915.10,],
      ['',           'STC_DEBIT',         16002,  2249081.10, 80, 22488.00,],
      ['Batch',      'Batch_Alerts',      897342, 102700791.90, 4486, 1026845.40,],
      ['Behavioral', 'Online BHV Alerts', 897342, 102700791.90, 4486, 1026845.40,],
      ['',           'Total',             1632,   1342453.45, 1632, 1342453.45,],

    ];

    $scope.rightCols = [false, false, true, true, true, true];

    var color = ColorsProvider.get;

    $scope.amount = {
      name: 'root',
      children: [
        {
          name: 'TXFLT',
          color: color('TXFLT'),
          children: [
            { name: 'OPE_CREDIT',  color: color('OPE_CREDIT'),  size: 55334162.40 },
            { name: 'OPE_DEBIT',   color: color('OPE_DEBIT'),   size: 4619087.50 },
            { name: 'SPTR_CREDIT', color: color('SPTR_CREDIT'), size: 6534893.40 },
            { name: 'SPTR_DEBIT',  color: color('SPTR_DEBIT'),  size: 15275788.50 },
            { name: 'STC_CREDIT',  color: color('STC_CREDIT'),  size: 11049676.75 },
            { name: 'STC_DEBIT',   color: color('STC_DEBIT'),   size: 2249081.10 },
          ]
        },
        {
          name: 'Batch',
          color: color('Batch'),
          children: [
            { name: 'Batch_Alerts', color: color('Batch_Alerts'), size: 102700791.90 },
          ]
        },
        {
          name: 'Behavioral',
          color: color('Behavioral'),
          children: [
            { name: 'Online BHV Alerts', color: color('Online BHV Alerts'),  size: 102700791.90 },
          ]
        }
      ]
    };

    $scope.count = {
      name: 'root',
      children: [
        {
          name: 'TXFLT',
          color: color('TXFLT'),
          children: [
            { name: 'OPE_CREDIT',  color: color('OPE_CREDIT'),  size: 354252 },
            { name: 'OPE_DEBIT',   color: color('OPE_DEBIT'),   size: 41150 },
            { name: 'SPTR_CREDIT', color: color('SPTR_CREDIT'), size: 31052 },
            { name: 'SPTR_DEBIT',  color: color('SPTR_DEBIT'),  size: 63530 },
            { name: 'STC_CREDIT',  color: color('STC_CREDIT'),  size: 27545 },
            { name: 'STC_DEBIT',   color: color('STC_DEBIT'),   size: 16002 },
          ]
        },
        {
          name: 'Batch',
          color: color('Batch'),
          children: [
            { name: 'Batch_Alerts', color: color('Batch_Alerts'), size: 897342 },
          ]
        },
        {
          name: 'Behavioral',
          color: color('Behavioral'),
          children: [
            { name: 'Online BHV Alerts', color: color('Online BHV Alerts'), size: 897342 },
          ]
        }
      ]
    };

    $scope.alertRate = {
      name: 'root',
      children: [
        {
          name: 'TXFLT',
          color: color('TXFLT'),
          children: [
            { name: 'OPE_CREDIT',  color: color('OPE_CREDIT'),  size: 553260.40 / 1771 },
            { name: 'OPE_DEBIT',   color: color('OPE_DEBIT'),   size: 46022.50 / 205 },
            { name: 'SPTR_CREDIT', color: color('SPTR_CREDIT'), size: 65239.50 / 155 },
            { name: 'SPTR_DEBIT',  color: color('SPTR_DEBIT'),  size: 152445.30 / 317 },
            { name: 'STC_CREDIT',  color: color('STC_CREDIT'),  size: 109915.10 / 137 },
            { name: 'STC_DEBIT',   color: color('STC_DEBIT'),   size: 22488.00 / 80 },
          ]
        },
        {
          name: 'Batch',
          color: color('Batch'),
          children: [
            { name: 'Batch_Alerts', color: color('Batch_Alerts'), size: 1026845.40 / 4486 },
          ]
        },
        {
          name: 'Behavioral',
          color: color('Behavioral'),
          children: [
            { name: 'Online BHV Alerts', color: color('Online BHV Alerts'), size: 1026845.40 / 4486 },
          ]
        }
      ]
    };

    $scope.periodOptions = [
      {days: 7,  label: 'Week'},
      {days: 14, label: 'Two Weeks'},
      {days: 30, label: 'Month'},
    ];
    $scope.period = $scope.periodOptions[0].days;

    $scope.showOptions = ['Count and Amount', 'Amount', 'Count'];
    $scope.show = $scope.showOptions[0];

    $scope.typeOptions = [
      {type: 'line', label: 'Line Chart'},
      {type: 'bar',  label: 'Bar Chart'},
    ];
    $scope.type = $scope.typeOptions[0].type;

    $scope.settings = {series: {}, type: 'bar'};
    $scope.daysData = {};

    $scope.isChecked = function(name) {
      var show = $scope.show;
      return ($scope.settings.series[name + ' amount'] && (show === 'Count and Amount' || show === 'Amount')) ||
             ($scope.settings.series[name + ' count'] && (show === 'Count and Amount' || show === 'Count'));
    };

    $scope.toggle = function(name) {
      var show = $scope.show;
      if (show === 'Count and Amount' || show === 'Amount') {
        $scope.settings.series[name + ' amount'] = !$scope.settings.series[name + ' amount'];
      }

      if (show === 'Count and Amount' || show === 'Count') {
        $scope.settings.series[name + ' count'] = !$scope.settings.series[name + ' count'];
      }
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
        var key = k + ' amount';
        columns.push([key]);
        axes[key] = 'y';
        $scope.settings.series[key] = true;

        key = k + ' count';
        columns.push([key]);
        axes[key] = 'y2';
        $scope.settings.series[key] = true;
      });
      var dates = ['x'];
      for (var i = initDaysCount; i > 0; i--) {
        var currDate = new Date();
        currDate.setDate(currDate.getDate() - i);
        dates.push($filter('date')(currDate, 'yyyy-MM-dd'));
        columns.forEach(function(c) {
          var val = (Math.random() * 100000).toFixed(2);
          if (c[0].indexOf('count') > -1) {
            val = Math.ceil(val / 1000);
          }
          c.push(val);
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

    $scope.updateSettings = function(show, type) {
      $scope.type = type;

      var series = {};
      keys.forEach(function(k) {
        var key = k + ' amount';
        if ($scope.isChecked(k)) {
          series[key] = (show === 'Count and Amount' || show === 'Amount');
        }

        key = k + ' count';
        if ($scope.isChecked(k)) {
          series[key] = (show === 'Count and Amount' || show === 'Count');
        }
      });
      $scope.show = show;

      $scope.settings = {
        series: series,
        type: type
      };
    };

    function init(){
      generateData();
      $scope.updateData($scope.period);
      $scope.updateSettings($scope.show, $scope.type);
    }

    init();

  });


