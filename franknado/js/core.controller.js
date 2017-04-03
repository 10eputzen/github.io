(function() {
    'use strict';

    angular.module('franknado').controller('CoreController', ['$scope', '$location', 'dataService',
        function($scope, $location, dataService) {
            // Debug
            window.coreScope = $scope;
            window.coreController = this;

            // Save reference
            var self = this;

            self.mainDataLoaded = false;

            $scope.allTypes = [];

            initialize();
            function initialize() {
                getTypes('type/');
            }


            $scope.setNav = function(status) {
                self.navHome = '';
                self.navStatistic = '';
                self.navSub = '';
                switch (status) {
                    case 'home':
                        self.navHome = 'active';
                        break;
                    case 'statistic':
                        self.navStatistic = 'active';
                        break;
                    case 'subscribe':
                        self.navSub = 'active';
                        break;
                }
            }

            function getTypes(attribute) {
                dataService.getList(attribute).then(function(data) {
                    self.allTypes = data.data;
                    self.mainDataLoaded = true;
                })
            };


        }
    ]);
})();
