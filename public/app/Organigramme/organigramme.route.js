(function () {
    angular
        .module('Trombi')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.
        when('/organigramme', {
            templateUrl: 'app/Organigramme/organigramme.html',
            controller: 'OrganigrammeController',
            controllerAs : 'OrgController'
        });
    }
})();