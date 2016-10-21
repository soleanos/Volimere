(function () {
    angular
        .module('Trombi')
        .factory('TrombiUsers', users);
    
    users.$inject = ['$resource','$rootScope','$http'];

    function users($resource, $rootScope, $http) {

        return {
            getUsers : getUsers,
            updateUser : updateUser,
            createUser : createUser,
            removeUser : removeUser,
            getUser : getUser,
            getUserByLogin : getUserByLogin,
            getStoredUser: getStoredUser
        };
        
        function getUsers (filterType,filter1,filter2) {
            if(filter1 && !filter2){
                return $resource("/api/users/"+filterType+"/"+filter1).query();
            }else if(filter2){
                return $resource("/api/users/"+filterType+"/"+filter1+"/"+filter2).query();
            }else{
                return $resource("/api/users/"+filterType).query();
            }
        }

        function getUser (matricule) {
            return $http.get("/api/user/"+matricule);
        }

        function getUserByLogin (login, password) {
            return $http.get("/api/login/"+login+"/"+password);
        }

        function getStoredUser(){
            return $http.get("/api/store");
    }

        function updateUser(user) {
            $resource('/api/user/update').save(user);
        }

        function createUser(user) {
            $resource('/api/user/create').save(user);
        }

        function removeUser(user) {
            $resource('/api/user/remove').remove(user);
        }
    }
})();