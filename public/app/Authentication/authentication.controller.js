/**
 * Created by plarboul on 11/04/2016.
 */

(function () {
    'use strict';

    angular
        .module('Trombi')
        .controller('AuthenticationController', authenticationController);

    authenticationController.$inject = ['$scope', '$location', '$http', '$rootScope', 'TrombiAuthentication', 'TrombiUsers'];

    function authenticationController($scope, $location ,$http, $rootScope, TrombiAuthentication) {

        $scope.user = {};

        $scope.connect = connect;

        function connect() {
            TrombiAuthentication.connection($scope.user)
                .success(function (data) {

                    if(localStorage.getItem("logins") == null){
                        var logins = [];
                        logins.push($scope.user.login);
                        localStorage.setItem("logins", logins);
                    } else {
                        var logins2 = [];
                        logins2.push(localStorage.getItem("logins"));
                        logins2.push($scope.user.login);
                        localStorage.setItem("logins", logins2);
                    }
                    localStorage.setItem("login", $scope.user.login);
                    console.log("SUCCESS CONNECTION ");
                    $location.path('users');
                })
                .error(function (error) {
                    console.log(error);
                    console.log("ERROR CONNECTION ");
                });
        }

        function logout() {
            TrombiAuthentication.logout()
                .success(function (data) {
                    console.log("LOGGED OUT");

                    $location.path("/login");
                })
                .error(function (error) {
                    console.log(error);
                })
        }
    }
})();


