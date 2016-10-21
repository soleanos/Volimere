/**
          * Created by plarboul on 11/04/2016.
          */

         (function () {
             'use strict';

             angular
                 .module('Trombi')
                 .controller('AdministrationController', administrationController);

             administrationController.$inject = ['$scope', '$location', '$http', '$rootScope', 'TrombiUsers','ngDialog']

             function administrationController($scope, $location ,$http, $rootScope, TrombiUsers, ngDialog) {

                 /*var logins = localStorage.getItem("logins");
                 TrombiUsers.getStoredUser()
                     .success(function (data) {
                         for(var i=0; i < data.length; i++){
                             if(logins.indexOf(data[i].login) != -1) {
                                 if(data[i].rank == "Administrateur") $scope.typeUser = true;
                                 else if(data[i].rank == "Collaborateur" ) $scope.typeUser = false;

                             } else $location.path('login');
                         }
                     })
                     .error(function (error) {
                         console.log(error);
                     });*/

                 //Affichage de tous les utilisateurs
             	TrombiUsers.getUsers().$promise.then(function(result) {
                    $rootScope.usersAdmin = result;
                 });

        //fenêtre pop-pup (La variable indexGlobal est envoyée sur admin.controller.modal.js)
        $scope.clickToOpen = function (user,type) {
            if(type == 0){
                $rootScope.updateAcess = true;
            }else{
                $rootScope.updateAcess = false;
            }

            $rootScope.dialog = ngDialog.open({ template: 'adminUserDialog' });
            $rootScope.userSelected = user;
        };

     }

})();
