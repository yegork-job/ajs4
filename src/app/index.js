'use strict';

angular.module('personnel', ['ui.router', 'permission', 'ui.bootstrap'])
  .run(function (Permission, authServ) {
    Permission.defineRole('anonymous', function () {
      return !authServ.isUser();
    });
  });