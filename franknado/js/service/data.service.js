(function() {
    'use strict';

    angular.module('franknado')
        .factory('dataService', dataService);

    dataService.$inject = ['$http'];

    var replay = {};
    var feature = {};

    function dataService($http) {
        var services = {
            getList: getList,
            getMaxMood: getMaxMood,
            getDetails: getDetails,
            postData: postData,
        };
        return services;



        function postData(attribute, object) {
            return $http({
                url: apiUrl + attribute + '/',
                method: 'POST',
                data: object,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        };

        function getList(attribute) {
            return $http({
                url: apiUrl + attribute,
                method: 'GET',

            });
        }

        function getMaxMood(attribute) {
            return $http({
                url: apiUrl + attribute,
                method: 'GET',

            });
        }

        function getDetails(attribute, id) {
            return $http({
                url: apiUrl + attribute + '/' + id,
                method: 'GET'
            });
        }



    }
})();
