'use strict';

angular.module('personnel')
  .factory('idGenService', function () {

    var genId = function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        /*jshint bitwise: false */
        var r = Math.random()*16|0;
        var v = c === 'x' ? r : (r&0x3|0x8);
        /*jshint bitwise: true */
        return v.toString(16);
      });
    };

    return {
      getId: genId
    };

  });
