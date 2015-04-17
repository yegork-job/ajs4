'use strict';

angular.module('personnel')
  .controller('dashboardCtrl', function ($scope, $state, authServ) {
    $scope.username = authServ.getUser();

    $scope.exit = function () {
      authServ.logout();
      $state.go('login');
    };

    $state.go('dashboard.employeeList');
  })

  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'dashboardCtrl',
        data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'login'
          }
        }
      });
  })
;
