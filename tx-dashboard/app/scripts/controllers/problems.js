'use strict';

/**
 * @ngdoc function
 * @name txDashboardApp.controller:ProblemsCtrl
 * @description
 * # ProblemsCtrl
 * Controller of the txDashboardApp
 */
angular.module('txDashboardApp')
  .controller('ProblemsCtrl', function ($scope, $filter, ColorsProvider, PROBLEMS, $http) {

  $http({
    method: 'GET',
    url: PROBLEMS
  }).then(function(responseEditJson) {


    $scope.rightCols = [false, false, false, true, true, true];
    var color = ColorsProvider.get;

  var jsonBase = '';
  var json2Xml = '';
  $scope.problemsCheckboxXml = '';
  $scope.problemsCheckboxXslt = '';

    jsonBase = responseEditJson.data;
    json2Xml =  '<?xml version="1.0" encoding="UTF-8"?><root>';
    angular.forEach(jsonBase, function(obj) {
      json2Xml +=  '<record>';
      json2Xml += '<dt>' + obj.dt + '</dt>';
      json2Xml += '<ErrorGroupType>' + obj.ErrorGroupType + '</ErrorGroupType>';
      json2Xml += '<ErrorGroup>' + obj.ErrorGroup + '</ErrorGroup>';
      json2Xml += '<ErrorType>' + obj.ErrorType + '</ErrorType>';
      json2Xml += '<SeverityClass>' + obj.SeverityClass + '</SeverityClass>';
      json2Xml += '<TotalCount>' + obj.TotalCount + '</TotalCount>';
      json2Xml += '<ErrorCount>' + obj.ErrorCount + '</ErrorCount>';
      json2Xml +=  '</record>';
    });
    json2Xml +=  '</root>';


    $http({
      method: 'GET',
      url: 'xslt/problemsDetailsCheckboxXslt.xsl'
    }).then(function(responseProblemsDetailsCheckboxXslt) {
      $scope.problemsDetailsCheckboxXml = json2Xml;
      $scope.problemsDetailsCheckboxXslt = responseProblemsDetailsCheckboxXslt.data;
    }, function() {
    });


  $scope.data = null;/*
    $scope.data = [

      ['General', 'SYSTEM',       'Disk space', 3, 0, 1,],
      ['',        '',             'Unexpected shutdown', 3, 0, 1,],
      ['',        'TXM',          'Results do not match expected', 3, 0, 1,],
      ['',        'Namechecking', 'Service not started', 3, 0, 1,],
      ['Config',  'OPE_DEBIT',    'Processing failure', 3,41150,2,],
      ['',        '',             'Timeout', 2, 41150, 4,],
      ['',        'OPE_CREDIT',   'Processing failure', 3, 354252, 3,],
      ['',        '',             'Timeout',2,354252,7,],
      ['',        'STC_DEBIT',    'Processing failure', 3, 16002, 1,],
      ['',        '',             'Timeout', 2, 27545, 2,],

    ];
*/
    $http({
      method: 'GET',
      url: 'xslt/problemsSummaryListXslt.xsl'
    }).then(function(responseProblemsSummaryListXslt) {
      $scope.data = $scope.$eval($filter('xslt')(json2Xml, responseProblemsSummaryListXslt.data));
    }, function() {
    });



/*

    $scope.count = {
      name: 'root',
      children: [
        {
          name: 'SYSTEM',
          color: color('SYSTEM'),
          children: [
            { name: 'Disk space', color: color('Disk space'),  size: 1 },
            { name: 'Unexpected shutdown', color: color('Unexpected shutdown'),  size: 1 },
          ]
        },
        {
          name: 'TXM',
          color: color('TXM'),
          children: [
            { name: 'Results do not match expected', color: color('Results do not match expected'),  size: 1 },
          ]
        },
        {
          name: 'Namechecking',
          color: color('Namechecking'),
          children: [
            { name: 'Service not started', color: color('Service not started'),  size: 1 },
          ]
        },
        {
          name: 'OPE_DEBIT',
          color: color('OPE_DEBIT'),
          children: [
            { name: 'Processing failure', color: color('OPE_DEBIT Processing failure'),  size: 2 },
            { name: 'Timeout', color: color('OPE_DEBIT Timeout'),  size: 4 },
          ]
        },
        {
          name: 'OPE_CREDIT',
          color: color('OPE_CREDIT'),
          children: [
            { name: 'Processing failure', color: color('OPE_CREDIT Processing failure'),  size: 3 },
            { name: 'Timeout', color: color('OPE_CREDIT Timeout'),  size: 7 },
          ]
        },
        {
          name: 'STC_DEBIT',
          color: color('STC_DEBIT'),
          children: [
            { name: 'Processing failure', color: color('STC_DEBIT Processing failure'),  size: 1 },
            { name: 'Timeout',            color: color('STC_DEBIT Timeout'),  size: 2 },
          ]
        }
      ]
    };

*/

$scope.count = null;
    $http({
      method: 'GET',
      url: 'xslt/problemsSummaryPieChartData.xsl'
    }).then(function(responseProblemsSummaryListXslt) {
      $scope.count = $scope.$eval($filter('xslt')(json2Xml, responseProblemsSummaryListXslt.data));
    }, function() {
    });


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

    $scope.isGroupChecked = function(name){
      var val = true;
      keys
        .filter(function(k){ return k.indexOf(name) > -1; })
        .forEach(function(k){ val = val && $scope.isChecked(k); });
      return val;
    };

    $scope.toggleGroup = function(name){
      keys
        .filter(function(k){ return k.indexOf(name) > -1; })
        .forEach(function(k){ $scope.toggle(k); });
    };


/*
    var keys = [
      // General SYSTEM
      'General SYSTEM Disk space',
      'General SYSTEM Unexpected shutdown',
      'General SYSTEM Results do not match expected',
      'General SYSTEM Service not started',

      // Config OPE_DEBIT
      'Config OPE_DEBIT Prosessing failure',
      'Config OPE_DEBIT Timeout',

      // Config OPE_CREDIT
      'Config OPE_CREDIT Prosessing failure',
      'Config OPE_CREDIT Timeout',
    ];
*/
    var keys = [];
    angular.forEach(jsonBase, function(obj) {
      keys.push(obj.ErrorGroupType + ' ' + obj.ErrorGroup + ' ' + obj.ErrorType);
    });

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
  		//by anji: Don't make functions within a loop.
      var objMaker  = function(c) {
        c.push(Math.ceil(Math.random() * 10));
      };
      for (var i = initDaysCount; i > 0; i--) {
        var currDate = new Date();
        currDate.setDate(currDate.getDate() - i);
        dates.push($filter('date')(currDate, 'yyyy-MM-dd'));
        columns.forEach(objMaker);
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

  }, function() {
  });

  });
