(function () {
    'use strict';

    angular
        .module('Trombi')
        .controller('addUserControllerDialog', addUserControllerDialog);

    addUserControllerDialog.$inject = ['$scope', '$route', '$rootScope','TrombiUsers', 'TrombiLDAP','Upload' , 'ngDialog'];

    function addUserControllerDialog($scope, $route, $rootScope, TrombiUsers, TrombiLDAP, upload, data, ngDialog) {

        $scope.refreshPicture = function() {
            $scope.hideDefaultPicture = true;
            $scope.showUpdatedPicture = true;
        };

        // MODALE AJOUT NOUVEL UTILISATEUR

        $scope.addNewUser = function(newUser,file){

//            !!!!!!!!!!!!!!!!!!!!!!!! BUG LA DATE EST INSEREE EN STRING DANS MONGO DONC ON NE PEU PAS LA TRIER !!!!!!!!!!!!!!!!

            var oldDate = newUser.startDate.toString();
            var newDate = oldDate.slice(0, 4) + '-' + oldDate.slice(4,6)+'-'+oldDate.slice(6,8);
            var dateToFormat = new Date(newDate);
            var dateToRegister = dateToFormat.toISOString();

            if(newUser){
                var pictureValue = "Default.png";

                if (file){
                    pictureValue = newUser.globalId+".jpg";
                    upload.rename(file, newUser.globalId+".jpg");
                    upload.upload({
                        url: '/api/picture/upload/',
                        data: {file: file}
                        }).then(function (resp) {
                            console.log('Success ');
                        }, function (resp) {
                            console.log('Error status: ' + resp.status);
                        }, function (evt) {
                            console.log('upload image en cours ..');
                    });
                }

                var user =  {
                    firstname :newUser.forename,
                    lastname : newUser.lastName,
                    picture : pictureValue,
                    matricule : newUser.globalId,
                    mail : newUser.mail,
                    login : newUser.uid,
                    password : newUser.uid,
                    startdate : dateToRegister
                };

                TrombiUsers.getUser(user.matricule).success(function (data) {
                    console.log(data);
                    if(data == null){
                        TrombiUsers.createUser(user);
                        $route.reload();
                        $rootScope.addUserDialog.close();
                    }else{
                        alert("Ce collaborateur est déja sur le trombi")
                    }
                }).error(function (error) {
                    console.log(error);
                });

            }else{
                alert("Aucun utilisateur n'a été trouvé / soumis ")
            }
        };

        $scope.usersFromLDAP = [];
        $scope.searchStr = "" ;

        $scope.$watch('searchStr', function (){

            if($scope.searchStr != "" ){

                $scope.usersFromLDAP = [];
                var lastName = $scope.searchStr;
                console.log("Recherche ldap en cours pour ..  "+lastName);

                if (lastName != null && lastName.length > 3) {
                    TrombiLDAP.searchLDAP(lastName).$promise.then(function(result) {
                        console.log($scope.usersFromLDAP);
                        $scope.usersFromLDAP = result;
                    });
                }
            }
        });
    }
})();