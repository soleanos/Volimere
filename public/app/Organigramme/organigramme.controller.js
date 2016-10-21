(function () {
    'use strict';

    angular
        .module('Trombi')
        .controller('OrganigrammeController', OrganigrammeController);

    OrganigrammeController.$inject = ['$scope', '$location', '$http', '$rootScope','Upload', 'TrombiUsers'];

    function OrganigrammeController($scope, $location ,$http, $rootScope,upload, TrombiUsers) {

        var logins = localStorage.getItem("logins");
        TrombiUsers.getStoredUser()
            .success(function (data) {
                for(var i=0; i < data.length; i++){
                    if(logins.indexOf(data[i].login) == -1) {
                        $location.path('login');
                    }
                }
            })
            .error(function (error) {
                console.log(error);
            });

         $scope.UpdateOrga = function(file) {
            if($scope.file){
                upload.rename(file, "Organigramme.png");
                upload.upload({
                    url: '/api/organigramme/upload/',
                    data: {file: file}
                }).then(function (resp) {
                    console.log('Success ');
                    location.reload();
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                    alert("Une erreur s'est produite lors de l'upload de l'organigramme")
                }, function (evt) {
                    console.log('upload organigramme en cours ..');
                });
            }
        }
    }
})();
