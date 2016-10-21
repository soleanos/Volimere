/**
 * Created by plarboul on 12/04/2016.
 */

(function () {

    'use strict';

    angular
        .module('Trombi', [
            'ngRoute',
            'ngMessages',
            'ngResource',
            'ngDialog',
            'ngFileUpload',
            'ngMaterial',
            'ngMdIcons'
        ])
        .config(config)

    config.$inject = ['$routeProvider','$compileProvider'];

    function config($routeProvider,$compileProvider) {
        $routeProvider.otherwise({
            redirectTo: '/users'
        });
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https|ftp|mailto|sip):/);
    }

})();

