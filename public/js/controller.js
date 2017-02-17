var app = angular.module('myApp', []);
app.controller('myCtrl',  ['$scope', '$http', function ($scope, $http) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.singupform = false;
    $scope.singIn = false;

    $scope.userSingUpData = {

    	email : "",
    	userName:"",
    	userPass : ""
        
    }

     $scope.loginData = {

    	loginEmail : "",
    	loginPass : ""
        
    }


     $scope.resetpassword = {

        resetEmail : "",
               
    }






     $scope.login = function() {
    
        $http({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data:$scope.loginData,
        headers: {'Content-Type': 'application/json'}
         }).success(function (data, status, headers, config) {
        // handle success things
       }).error(function (data, status, headers, config) {
        // handle error things
       });

      };



    $scope.register = function(){

          //console.log($scope.userSingUpData);

        $http({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data:$scope.userSingUpData,
        headers: {'Content-Type': 'application/json'}
         }).success(function (data, status, headers, config) {
        // handle success things
       }).error(function (data, status, headers, config) {
        // handle error things
       });

    }


  
     $scope.resetPassword = function(){

          //console.log($scope.userSingUpData);

        $http({
        method: 'POST',
        url: 'http://localhost:3000/resetpassword',
        data:$scope.resetpassword,
        headers: {'Content-Type': 'application/json'}
         }).success(function (data, status, headers, config) {
        // handle success things
       }).error(function (data, status, headers, config) {
        // handle error things
       });

    }






}]);