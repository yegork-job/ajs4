'use strict';

angular.module('personnel')
  .controller('employeeFormCtrl', function ($scope, idGenService, localStorService, $state, $stateParams) {
    $scope.title = $stateParams.title;

    $scope.save = function () {
      if ($scope.employee.id) {
        for (var emp = 0; emp < $scope.employees.length; emp++) {
          if ($scope.employees[emp].id === $scope.employee.id) {
            $scope.employees[emp] = _.clone($scope.employee);
          }
        }
      } else {
        $scope.employee.id = idGenService.getId();
        $scope.employees.push(_.clone($scope.employee));
      }

      localStorService.updateData($scope.key, JSON.stringify($scope.employees));
      $state.go('dashboard.employeeList');
    };
  })

  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.employeeList.employeeForm', {
        templateUrl: 'app/dashboard/employeelist/employeeform/employeeform.html',
        controller: 'employeeFormCtrl',
        params: {
          title: {}
        }
      });
  })
;