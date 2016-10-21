
(function () {
    'use strict';

    angular
        .module('Trombi')
        .controller('headerAdminController', headerAdminController);

    headerAdminController.$inject = ['$scope', '$route', '$rootScope','ngDialog','$location', 'TrombiUsers', 'TrombiAuthentication'];

    function headerAdminController($scope, $route, $rootScope, ngDialog,$location, TrombiUsers, TrombiAuthentication) {
        $scope.typeUser = true;

//        var logins = localStorage.getItem("logins");
//        TrombiUsers.getStoredUser()
//            .success(function (data) {
//                for(var i=0; i < data.length; i++){
//                    if(logins.indexOf(data[i].login) != -1) {
//                        if(data[i].rank == "Administrateur") $scope.typeUser = true;
//                        else if(data[i].rank == "Collaborateur" ) $scope.typeUser = false;
//
//                    }  else $location.path('login');
//                }
//            })
//            .error(function (error) {
//                console.log(error);
//            });

        // Ouvrir la modale d'ajout de nouveau collab.
        $scope.openAddUserDialog = function (index) {
            $rootScope.addUserDialog = ngDialog.open({ template : 'templateAddUserDialog' });
        };

        $scope.iconSvg = 'app/images/header-add.svg';

        var vm = this;
        vm.users = {};
        $scope.filterSelected = "";
        $rootScope.linkToPdf = "http://127.0.0.1:3000/api/pdf/";

        //Les filtres de la liste déroulante
        $rootScope.filters = [
            {
                label :'Ordre Alphabétique',
                type : 0
            },
            {
                label : 'Par date d\'arrivée',
                type : 1
            },
            {
                label :'Personnes sans photos',
                type : 2
            }
        ];

        function updateUserList(typeFilter,filter1,filter2) {
            if(filter1 && !filter2){
                $rootScope.linkToPdf = "http://127.0.0.1:3000/api/pdf/3/"+$scope.searchCollab;
            }else if(filter2 ){
                $rootScope.linkToPdf = "http://127.0.0.1:3000/api/pdf/4/"+filter1+"/"+filter2;
            }

            TrombiUsers.getUsers(typeFilter,filter1,filter2).$promise.then(function(result) {
                $rootScope.users = result;
            });
        }

        $scope.$watch('filterSelected', function (){
            if($scope.filterSelected != "" ){
                $rootScope.linkToPdf = "http://127.0.0.1:3000/api/pdf/"+$scope.filterSelected.type;
                updateUserList($scope.filterSelected.type);
            }
        });

        $scope.$watch('searchCollab', function (){
            if($scope.searchCollab  && $scope.searchCollab.split(" ").length == 1 ){
//              Si on recherche seulement avec un nom ou un prénom
                updateUserList(3,$scope.searchCollab);
            }else if($scope.searchCollab && $scope.searchCollab.split(" ").length > 1){
//              Si on recherche avec un prénom + espace + nom
                var searchSplited =  $scope.searchCollab.split(" ");
                updateUserList(4,searchSplited[0],searchSplited[1]);
            }else{
//              Si on recherche avec rien, renvoie tous les collab par default
                updateUserList();
            }
        });

         // Switch to admin page
        $scope.openAdmin = function () {
            $location.path('/admin');
        };

        // Switch to chart page
        $scope.openChart = function () {

            $location.path('/organigramme');
        };

        // Switch to login page
        $scope.logout = function () {
            //TrombiAuthentication.logout();
            $location.path('/login');
        };

        // GeneratePDF
         $scope.generatePdf = function(){
            //window.location = $rootScope.linkToPdf;
            window.open($rootScope.linkToPdf, '_blank');
         };

        // Show tags bar
       /* $scope.showTags = function(){
            if($scope.showTag == true) $scope.showTag = false;
            else $scope.showTag = true;
        } */

        //changer la couleur du logo quand on appuie sur un bouton
        $scope.changeLogo = function() {
            if($scope.iconSvg == 'app/images/header-add.svg') $scope.iconSvg = 'app/images/header-add-black.svg';
            else $scope.iconSvg = 'app/images/header-add.svg';
        }
    }
})();





