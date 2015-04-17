'use strict';

angular.module('personnel')
  .controller('employeeListCtrl', function ($scope, $state, localStorService, $modal) {
    $scope.key = 'employeelist';

    localStorService.getData($scope.key).then(
      function (empList) {
        $scope.employees = JSON.parse(empList);
        if ($scope.employees.length) {
          $scope.employee = _.clone($scope.employees[0]);
        } else {
          $scope.employee = {
            id: '',
            firstName: '',
            lastName: '',
            position: ''
          };
          $state.go('dashboard.employeeList.employeeForm', {
            title: 'Создание'
          });
        }
      },
      function (error) {
        $scope.employees = [];
        $scope.employee = {
          id: '',
          firstName: '',
          lastName: '',
          position: ''
        };
        $state.go('dashboard.employeeList.employeeForm', {
          title: 'Создание'
        });
        console.log(error);
      }
    );

    $scope.remove = function (employee) {

      //$state.go('dashboard.employeeList.confirm');
      $modal.open({
        templateUrl: 'app/dashboard/employeelist/confirmmodal/confirmmodal.html',
        controller: 'confirmModalCtrl',
        resolve: {
          getEmployee: function () {
            return employee;
          }
        }
      }).result.then(
        function () {
          $scope.employees = _.reject($scope.employees, {id: employee.id});
          localStorService.updateData($scope.key, JSON.stringify($scope.employees));
          if (employee.id === $scope.employee.id) {
            if ($scope.employees.length) {
              $scope.employee = _.clone($scope.employees[0]);
            } else {
              $scope.employee = {
                id: '',
                firstName: '',
                lastName: '',
                position: ''
              };
              $state.go('dashboard.employeeList.employeeForm', {
                title: 'Создание'
              });
            }
          }
        },
        function (error) {
          //console.log(error);
        }
      );
    };

    $scope.add = function () {
      $scope.employee = {
        id: '',
        firstName: '',
        lastName: '',
        position: ''
      };
      $state.go('dashboard.employeeList.employeeForm', {
          title: 'Создание'
        }
      );
    };

    $scope.edit = function (employee) {
      $scope.employee = _.clone(employee);
      $state.go('dashboard.employeeList.employeeForm', {
          title: 'Редактирование'
        }
      );
    };
  })

  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.employeeList', {
        templateUrl: 'app/dashboard/employeelist/employeelist.html',
        controller: 'employeeListCtrl'
      });
  })

  .run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      if (toState.name === 'dashboard.employeeList') {
        $state.go('dashboard.employeeList.employeeForm', {
          title: 'Редактирование'
        });
      }
    });
  })
;