'use strict';

/**
 * @ngdoc overview
 * @name txDashboardApp
 * @description
 * # txDashboardApp
 *
 * Main module of the application.
 */
angular
  .module('txDashboardApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'ngXslt'
  ])
  .constant('PROBLEMS', 'data/Problems_details.json')
  //used by xslt
  .filter("sanitize", ['$sce', function($sce) {
	  return function(htmlCode){
	    return $sce.trustAsHtml(htmlCode);
	  };
	}])

  //used by xslt
  .directive('compileTemplate', function($compile, $parse){
	    return {
	        link: function(scope, element, attr){
	            var parsed = $parse(attr.ngBindHtml);
	            function getStringValue() { return (parsed(scope) || '').toString(); }
	            //Recompile if the template changes
	            scope.$watch(getStringValue, function() {
	                $compile(element, null, -9999)(scope);  //The -9999 makes it skip directives so that we do not recompile ourselves
	            });
	        }
			
	    };
	})
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',        controller: 'MainCtrl',         controllerAs: 'main'
      })
      .when('/entities', {
        templateUrl: 'views/entities.html',     controller: 'EntitiesCtrl',     controllerAs: 'entities'
      })
      .when('/errors', { 
        templateUrl: 'views/errors.html',       controller: 'ErrorsCtrl',       controllerAs: 'errors'
      })
      .when('/problems', { 
        templateUrl: 'views/problems.html',     controller: 'ProblemsCtrl',     controllerAs: 'problems'
      })
      .when('/state', { 
        templateUrl: 'views/state.html',        controller: 'StateCtrl',        controllerAs: 'state'
      })
      .when('/transactions', { 
        templateUrl: 'views/transactions.html', controller: 'TransactionsCtrl', controllerAs: 'transactions'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
