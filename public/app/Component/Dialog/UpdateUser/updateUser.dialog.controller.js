(function () {
    'use strict';

    angular
        .module('Trombi')
        .controller('updateUserControllerDialog', updateUserControllerDialog);

    updateUserControllerDialog.$inject = ['$scope', '$route', '$rootScope','Upload','TrombiUsers', 'TrombiAuthentication'];

    function updateUserControllerDialog($scope, $route, $rootScope,upload,TrombiUsers, TrombiAuthentication) {

//        var logins = localStorage.getItem("logins");
//        TrombiUsers.getStoredUser()
//            .success(function (data) {
//                for(var i=0; i < data.length; i++){
//                    if(logins.indexOf(data[i].login) != -1) {
//                        if(data[i].rank == "Administrateur") $scope.typeUser = true;
//                        else if(data[i].rank == "Collaborateur" ) $scope.typeUser = false;
//                        else $location.path('login');
//                    }
//                }
//            })
//            .error(function (error) {
//                console.log(error);
//            });

        $scope.typeUser = true;

        $scope.tags = [];

        $scope.initUpdateUserDialog = function(){
            $scope.userSelected = $rootScope.users[$rootScope.indexGlobal];
            $scope.userSelected.fullLinkPicture = 'http://127.0.0.1:3000/api/user/'+$scope.userSelected.matricule+'/picture';
            $scope.tags = $scope.userSelected.tags;
        };

        $scope.RemoveUser = function(unUser) {
            var r = confirm("Etes- vous sur de vouloire supprimer "+unUser.firstName+ " "+ unUser.lastName+ " ? ");
            if (r == true) {
                TrombiUsers.removeUser(unUser);
                $route.reload();
                $rootScope.updateDialog.close();
            } else {
                console.log("Action annulée")
            }
        };

        // Actualiser la photo quand on clique sur parcourir et que l'on valide
        $scope.refreshPicture = function() {
            $scope.hideDefaultPicture = true;
            $scope.showUpdatedPicture = true;
        };

        //Update serveur de l'utilisateur qui a été modifié
        $scope.UpdateUtilisateur = function(unUser,file) {
            unUser.tags = $scope.tags;
            TrombiUsers.updateUser(unUser);
            if($scope.file){
                upload.rename(file, unUser.matricule+".jpg");
                upload.upload({
                    url: '/api/picture/upload/',
                    data: {file: file}
                }).then(function (resp) {
                    console.log('Success ');
                    location.reload();
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    console.log('upload image en cours ..');
                });
            }
            $route.reload();
            $rootScope.updateDialog.close();
        };
    }
})();