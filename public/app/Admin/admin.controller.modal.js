
(function () {
    'use strict';

    angular
        .module('Trombi')
        .controller('AdministrationControllerModal', administrationControllerModal);

    administrationControllerModal.$inject = ['$scope', '$route' ,'$rootScope','TrombiUsers']


    function administrationControllerModal($scope, $route, $rootScope, TrombiUsers) {

        //Affichage de tous les utilisateurs
        TrombiUsers.getUsers().$promise.then(function(result) {
             $scope.usersAdmin = result;
        });

        $scope.searchCollab = "";

        //Récupération de l'utilisateur qui est en train d'être modifié
        $scope.ModifUserClient = function(){
          $scope.indexLocal = $rootScope.indexGlobal;
          $scope.unUser = $scope.usersAdmin[$scope.indexLocal]
        }

        //Update serveur de l'utilisateur qui a été modifié
        $scope.UpdateUtilisateur = function(unUser) {
           TrombiUsers.updateUser(unUser);
            $rootScope.dialog.close();
            $route.reload();
        }

    }

})();





