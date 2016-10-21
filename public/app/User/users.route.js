/**
 * Created by plarboul on 11/04/2016.
 */


(function () {
    angular
        .module('Trombi')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.
        when('/users', {
            templateUrl: 'app/User/users.html',
            controller: 'UsersController',
            controllerAs : 'UsersCtrl'
        });
    }
})();

