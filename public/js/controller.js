var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";

     $scope.submit = function() {

     	console.log($scope.useremail+$scope.userepass);
       /* if ($scope.text) {
          $scope.list.push(this.text);
          $scope.text = '';
        }*/
      };
});