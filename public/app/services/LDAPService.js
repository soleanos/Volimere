/**
 * Created by plarboul on 26/04/2016.
 */


(function () {
    angular
        .module('Trombi')
        .factory('TrombiLDAP', trombiLDAP);

    trombiLDAP.$inject = ['$resource','$rootScope'];

    function trombiLDAP($resource, $rootScope){
        return {
            searchLDAP : searchLDAP, 
            searchLDAPV2 : searchLDAPV2
        };

        function searchLDAP(user) {
            return $resource('/api/search/'+user).query();
        }
        
        function searchLDAPV2(user) {
            return $resource(" http://frpar-nte-exoteam:9006/Staffing4Devs/api/employees?query="+user.lastName+"&cost=0'").query();
        }
    }
})();

