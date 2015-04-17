'use strict';

angular.module('personnel')
  .factory('authServ', function ($window, $q) {
    return {
      login: function (username, password) {
        return $q(function (resolve, reject) {
            if (password.split('').reverse().join('') === username) {
              $window.localStorage.setItem('username', username);
              resolve();
            } else {
              reject('Bad password or username');
            }
        });
      },

      isUser: function () {
        return !!$window.localStorage.getItem('username');
      },

      logout: function () {
        $window.localStorage.setItem('username', '');
      },

      getUser: function () {
        return $window.localStorage.getItem('username');
      }
    };
  });