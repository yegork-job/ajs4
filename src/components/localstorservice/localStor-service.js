'use strict';

angular.module('personnel')
  .factory('localStorService', function ($window, $q) {
    return {
      getData: function (key) {
        return $q(function (resolve, reject) {
          var data = $window.localStorage.getItem(key);
          data ? resolve(data) : reject('No data');
        });
      },

      updateData: function (key, value) {
        return $q(function (resolve, reject) {
          if (key && value) {
            $window.localStorage.setItem(key, value);
          } else {
            reject('Missing key or value');
          }
        });
      }
    };
  });
