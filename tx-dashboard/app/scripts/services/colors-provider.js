'use strict';

/**
 * @ngdoc service
 * @name txDashboardApp.colorsProvider
 * @description
 * # colorsProvider
 * Factory in the txDashboardApp.
 */
angular.module('txDashboardApp')
  .factory('ColorsProvider', function () {
    // Service logic
    // ...

    var colors = {
      'TXFLT':       'hsl(30, 100%,  30%)',
      'OPE_CREDIT':  'hsl(30,  95%,  40%)',
      'OPE_CREDIT Processing failure': 'hsl(30,  95%,  50%)',
      'OPE_CREDIT Timeout':            'hsl(30,  90%,  60%)',
      'OPE_DEBIT':   'hsl(30,  90%,  50%)',
      'OPE_DEBIT Processing failure': 'hsl(30,  85%,  60%)',
      'OPE_DEBIT Timeout':            'hsl(30,  80%,  70%)',
      'SPTR_CREDIT': 'hsl(30,  85%,  60%)',
      'SPTR_DEBIT':  'hsl(30,  80%,  70%)',
      'STC_CREDIT':  'hsl(30,  75%,  80%)',
      'STC_DEBIT':   'hsl(30,  70%,  90%)',
      'STC_DEBIT Processing failure': 'hsl(30,  70%,  90%)',
      'STC_DEBIT Timeout':            'hsl(30,  65%,  95%)',

      'Batch':        'hsl(200, 100%, 30%)',
      'Batch_Alerts': 'hsl(200,  95%, 40%)',

      'Behavioral':        'hsl(140, 100%, 30%)',
      'Online BHV Alerts': 'hsl(140,  95%, 40%)',


      'SYSTEM':              'hsl(20, 100%, 30%)',
      'Disk space':          'hsl(20,  95%, 40%)',
      'Unexpected shutdown': 'hsl(20,  90%, 50%)',


      'TXM':                           'hsl(260, 100%, 30%)',
      'Results do not match expected': 'hsl(260,  95%, 40%)',

      'Namechecking':        'hsl(80,  100%, 30%)',
      'Service not started': 'hsl(80,   95%, 40%)',
    };

    // Public API here
    return {
      get: function(name) {
        return colors[name];
      }
    };
  });
