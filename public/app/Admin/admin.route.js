/**
 * Created by plarboul on 12/04/2016.
 */


(function () {
    angular
        .module('Trombi')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.
        when('/admin', {
            templateUrl: 'app/Admin/admin.html',
            controller: 'AdministrationController'
        });
    }
})();