'use strict';

/**
 * @ngdoc directive
 * @name txDashboardApp.directive:txLineBarChart
 * @description
 * # txLineBarChart
 */
angular.module('txDashboardApp')
  .directive('txLineBarChart', function (RenderWatcher, $timeout) {
    return {
      templateUrl: 'views/directives/tx-line-bar-chart.html',
      restrict: 'E',
      scope: {
        data: '=',
        settings: '='
      },
      link: function postLink(scope, element) {
            $timeout(function() {
              //trying to stop variable $scope.data throwing null error.
        var chart;
        var width;

        function toggleSeries(name, enable) {
            if (enable) {
                chart.show([name]);
            } else {
                chart.hide([name]);
            }
        }

        scope.$watch('data', function(data) {
            if (!data.columns) {
                return;
            }

            var figureEl = element.find('figure')[0];

            RenderWatcher.waitRendering(figureEl).then(function(){
                var rect = figureEl.getBoundingClientRect();
                chart = c3.generate({
                    bindto: figureEl,
                    size: {
                        width: rect.width - 20,
                        height: 400
                    },
                    data: data,
                    axis: {
                        x: {
                            type: 'timeseries',
                            tick: { format: '%Y-%m-%d' }
                        },
                        y: {
                            label: 'amount'
                        },
                        y2: {
                            show: true,
                            label: 'count'
                        }
                    },
                    transition: {
                        duration: 0
                    }
                });
                for(var name in scope.settings.series) {
                    toggleSeries(name, scope.settings.series[name]);
                }
                chart.transform(scope.settings.type);
            });
        });

        scope.$watch('settings', function(settings) {
            if (!chart) {
                return;
            }

            for(var name in settings.series) {
                toggleSeries(name, settings.series[name]);
            }
            chart.transform(settings.type);
        }, true);

            }, 0);
      }
    };
  });
