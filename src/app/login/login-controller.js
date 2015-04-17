'use strict';

angular.module('personnel')
  .controller('loginCtrl', function ($scope, $q, $state, authServ) {
    $scope.username = '';
    $scope.password = '';

    $scope.login = function () {
      authServ.login($scope.username, $scope.password).then(
        function () {
          $state.go('dashboard');
        },
        function (error) {
          alert(error);
        }
      );
    };
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'loginCtrl',
        data: {
          permissions: {
            only: ['anonymous'],
            redirectTo: 'dashboard'
          }
        }
      });

    $urlRouterProvider.otherwise(function ($injector) {
      $injector.invoke(function ($state) {
        $state.go('login');
      });
    });
  })
;
