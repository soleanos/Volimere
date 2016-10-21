/**
 * Created by plarboul on 12/04/2016.
 */


(function () {
    angular
        .module('Trombi')
        .factory('TrombiAuthentication', trombiAuthentication);

    function trombiAuthentication($http) {
        return {
            connection: connection,
            logout: logout
            //storeUser: storeUser
        };

        function connection (user) {
            return $http.post("/api/login", user);
        }

        function logout () {
            return $http.post("/api/logout");
        }

        /*function storeUser (user) {
            return $http.post("/api/store", user);
        }*/
    }
})();


