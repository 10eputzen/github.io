(function() {
    'use strict';
    angular.module('franknado', [
            'ngRoute',
            'rzModule',
            'chart.js',
            'ui.bootstrap',
            'toaster',
            'ngDialog',
            'angularMoment',
        ])
        // .value('serviceUrl', 'http://localhost:8000/')
        //.value('serviceUrl', 'http://192.168.178.31:8000/')
        // .value('serviceUrl', 'http://10eputzen.ddns.net:8000/')
        .config(['$routeProvider', '$httpProvider', '$sceDelegateProvider','$locationProvider',
            function($routeProvider, $httpProvider, $sceDelegateProvider,$locationProvider) {
                $sceDelegateProvider.resourceUrlWhitelist([
                    'self',
                    'localhost',
                    '*://www.youtube.com/**'
                ]);
                // Define routes
                $routeProvider.when('/', { templateUrl: 'templates/home.html', controller: 'MainController', controllerAs: 'main' });
                $routeProvider.when('/statistic', { templateUrl: 'templates/statistic.html', controller: 'StatisticController', controllerAs: 'statistic' });
                $routeProvider.when('/subscribe', { templateUrl: 'templates/subscribe.html', controller: 'SubscriptionController', controllerAs: 'subscribe' });
               // Default route
                 $routeProvider.otherwise({ redirectTo: '/' });
                 $locationProvider.hashPrefix('');
            }

        ]);
})();
