(function () {
    angular
        .module('Trombi')
        .factory('TrombiUtils', users);

    users.$inject = ['$resource','$rootScope'];

    function users($resource, $rootScope) {

        return {
            getChart : getChart,
            getPdf : getPdf
        };

        function getChart () {
            return $resource("/api/users/chart").get();
        }

        function getPdf () {
            return $resource("/api/users/pdf").get();
        }
    }
})();

