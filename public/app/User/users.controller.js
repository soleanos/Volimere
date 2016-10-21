/**
 * Created by plarboul on 11/04/2016.
 */

(function () {
    'use strict';

    angular
        .module('Trombi')
        .controller('UsersController', usersController);
    usersController.$inject = ['$scope', '$location', '$http', '$rootScope', 'TrombiUsers', 'ngDialog'];

    function usersController($scope, $location ,$http, $rootScope, TrombiUsers, ngDialog) {

        var logins = localStorage.getItem("logins");
        TrombiUsers.getStoredUser()
            .success(function (data) {
                for(var i=0; i < data.length; i++){
                    if(logins.indexOf(data[i].login) != -1) {
                        if(data[i].rank == "Administrateur") $scope.typeUser = true;
                        else if(data[i].rank == "Collaborateur" ) $scope.typeUser = false;

                    }  else $location.path('login');
                }
            })
            .error(function (error) {
                console.log(error);
            });

//      !!!!!!!!!! DEBUG !!!!!!!!! => on peu voir que la page se charge 4 fois ( et ceci pour toutes les pages de l'appli, ps slmt user)'
        console.log("Chargement de la page");

//      Ouvrir la modale d'ajout de nouveau collab.
        $scope.openUpdateUserDialog = function (index) {
            $rootScope.updateDialog = ngDialog.open({ template : 'templateUpdateUserDialog' });
            $rootScope.indexGlobal = index;
        };
    }
})();


