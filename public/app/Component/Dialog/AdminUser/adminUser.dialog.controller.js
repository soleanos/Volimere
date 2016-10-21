
(function () {
    'use strict';

    angular
        .module('Trombi')
        .controller('adminUserControllerDialog', adminUserControllerDialog);

    adminUserControllerDialog.$inject = ['$scope', '$route', '$rootScope','TrombiUsers', 'TrombiLDAP','Upload' , 'ngDialog'];

    function adminUserControllerDialog($scope, $route, $rootScope, TrombiUsers, TrombiLDAP, upload, data, ngDialog) {

        //Affichage de tous les utilisateurs
        TrombiUsers.getUsers().$promise.then(function(result) {
             $scope.usersAdmin = result;
        });

        //Récupération de l'utilisateur qui est en train d'être modifié
        $scope.ModifUserClient = function(){
            if($rootScope.updateAcess){
                $scope.unUser = $rootScope.userSelected;
                $scope.btnLabelMaj = " Mettre à jour "
                $scope.showDeleteAccess = true;
            }else{
                $scope.unUser = $rootScope.userSelected ;
                $scope.btnLabelMaj =  "Donner l'accès";
            }
        }

        //Update serveur de l'utilisateur qui a été modifié
        $scope.UpdateUtilisateur = function(unUser) {
            if(!$rootScope.updateAcess){unUser.hasAccount = true}
            TrombiUsers.updateUser(unUser);
            $rootScope.dialog.close();
            $route.reload();
        }

        $scope.deleteAcess = function(unUser) {
            unUser.hasAccount = false;
            TrombiUsers.updateUser(unUser);
            $rootScope.dialog.close();
            $route.reload();
        }
    }
})();