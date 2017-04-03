(function() {
    'use strict';

    angular.module('franknado')

    .controller('StatisticController', ['$scope', '$location', 'dataService',
        function($scope, $location, dataService) {

            $scope.setNav('statistic');
            var self = this;

            var allSwings = [];

            var initialLoad = true;
            $scope.$watch('core.mainDataLoaded', function() {
                initialLoad && $scope.core.mainDataLoaded && initialize();
            });

            function initialize() {
                getMoodList('mood');
                initialLoad = false;
            }



            function getMoodList(attribute) {
                dataService.getList(attribute).then(function(data) {
                    var types = angular.copy(data.data);
                    var daily = angular.copy(data.data);
                    var moodSwings = angular.copy(data.data);
                    getMoodSwings(moodSwings);
                    //console.log(self.moodHistory);
                    // self.moodHistory.forEach(function(entry) {
                    //     $scope.labels.push(entry.date);
                    //     $scope.data.push(entry.rating);
                    // })

                    var dailyGroup = _.groupBy(daily, function(date) {
                        return moment(date.date).startOf('day').format('YY-MM-dd');
                    });
                    //console.log(dailyGroup);
                    _.each(dailyGroup, function(values, key) {
                        self.chartOverTimeLabels.push(key);
                        var total = 0;
                        _.each(values, function(value, key) {
                            total = total + value.rating
                        });

                        self.chartOverTimeData.push(total / values.length);
                    });

                    var group = _(types).groupBy('type');
                    _.each(group, function(value, key) {
                        if (key) {
                            var obj = $scope.core.allTypes.find(function(o) {
                                return o.pk == key;
                            })
                        }
                        if (obj) {
                            self.piLabels.push(obj.text);
                            self.pieData.push(value.length);
                        }
                    });
                })
            };
            self.piLabels = [];
            self.pieData = [];
            self.pieOptions = helper_pieOptions;



            self.chartOverTimeLabels = [];
            self.chartOverTimeSeries = ['Daily Mood'];
            self.chartOverTimeData = [];
            self.chartOverTimeOptions = helper_chartOverTimeOptions;


            function getMoodSwings(moods) {
                // console.log(moods)
                _.each(moods, function(value, key) {
                    var swing = {
                        mood: 0,
                        previousMood: 0,
                        difference: 0,
                        pk: 0,
                        reason: ''
                    }
                    swing.mood = value.rating;
                    if (moods[key - 1])
                        swing.previousMood = moods[key - 1].rating
                    swing.difference = swing.mood - swing.previousMood;
                    swing.pk = value.pk;
                    swing.reason = value.reason;

                    if(value.reason) {
                        allSwings.push(swing);

                    }
                });
                var sortedAllSwingsAsc = _.sortBy(allSwings, function(o) {
                    return -o.difference; })
                    console.log(sortedAllSwingsAsc);
                var sortedAllSwingsDesc = _.sortBy(allSwings, function(o) {
                    return o.difference; })
                    console.log(sortedAllSwingsDesc);

                self.top10 = sortedAllSwingsAsc.slice(0,10);
                self.flop10 = sortedAllSwingsDesc.slice(0,10);



            }

        } //Controller
    ])

})();
