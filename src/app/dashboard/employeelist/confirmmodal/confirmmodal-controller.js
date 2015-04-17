'use strict';

angular.module('personnel')
  .controller('confirmModalCtrl', function ($scope, $modalInstance, getEmployee) {
    $scope.employee = getEmployee;

    $scope.ok = function () {
      $modalInstance.close(true);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('canceled');
    };


  })

  //.config(function ($stateProvider) {
  //  $stateProvider
  //    .state('dashboard.employeeList.confirm', {
  //      onEnter: function () {
  //        $modal.open({
  //          templateUrl: 'app/dashboard/employeelist/confirmmodal/confirmmodal.html',
  //          controller: 'confirmModalCtrl'
  //        });
  //      }
  //    });
  //})
;