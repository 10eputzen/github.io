(function() {
    'use strict';

    angular.module('franknado')

    .controller('MainController', ['$scope', '$location', 'dataService', 'toaster', 'ngDialog',
        function($scope, $location, dataService, toaster, ngDialog) {

            $scope.setNav('home');
            // Save reference
            var self = this;

            self.ngDialog = ngDialog;
            $scope.formRating = 2;
            self.moodHistory = [];
            self.dynamic = 0;
            self.type = 'success';
            self.mailCheckbox = true;

            self.selectedType = {}
            self.newReason = '';
            var mood = {
                rating: '',
                reason: '',
                type: 7

            };



            var initialLoad = true;
            $scope.$watch('core.mainDataLoaded', function() {
                initialLoad && $scope.core.mainDataLoaded && initialize();
            });


            function initialize() {
                // getMoodList('mood');
                getMaxMood('mood/max_mood');
                self.allTypes = $scope.core.allTypes;
                self.selectedType = self.allTypes[4];
                initialLoad = false;
            }


            function getMaxMood(attribute) {
                dataService.getMaxMood(attribute).then(function(data) {
                    self.MaxMood = data.data;
                    console.log(self.MaxMood);
                    var reasonPk = self.MaxMood.reason
                    self.dynamic = self.MaxMood.rating;
                    setType(self.dynamic);
                    $scope.formRating = self.dynamic / 20;
                })
            };





            function setType(value) {
                var type;
                if (value <= 20) {
                    type = 'success';
                    self.moodText = 'F1: Fussball!'
                } else if (value <= 40) {
                    type = 'info';
                    self.moodText = 'F2: Kundenzufriedenheit = Wahrnehmung / Erwartung!'
                } else if (value <= 60) {
                    type = 'info';
                    self.moodText = 'F3: Hast du Zeit hier rum zu oxidieren?'
                } else if (value <= 80) {
                    type = 'warning';
                    self.moodText = 'F4: Das ist einfach nur scheisse programmiert!'
                } else {
                    type = 'danger';
                    self.moodText = 'F5: Obacht ... Gleich wird durch die Tüte geatmet !!!'
                    openDialog();
                }
                self.type = type;
                self.showWarning = true;
            }





            self.saveToDatabase = function() {
                //toaster.pop('error', "","BLAH")
                if (!$scope.myform.$valid)
                    return;

                else {
                    mood.rating = $scope.formRating * 20;
                    mood.reason = self.newReason;
                    mood.type = self.selectedType.pk
                    postData(mood);
                    console.log(mood);
                }


            }

            function postData(mood) {
                dataService.postData("mood", mood).then(function(data) {
                    if (data) {
                        console.log(data.data)
                        self.mailCheckbox && sendMail();
                        resetFormData();
                        toaster.pop('success', "", "Mood saved.")    
                    }
                })
            }

            function sendMail() {
                dataService.getList("send_mail").then(function(data) {
                    if (data) {
                        console.log(data.data)
                    }
                })
            }

            function resetFormData() {
                self.moodHistory = [];
                self.selectedType = self.allTypes[4];
                self.newReason = '';
                self.mailCheckbox = true;

                getMaxMood('mood/max_mood');
            }


            function openDialog() {
                self.ngDialog.open({
                    template: 'templates/dialog.html',
                    controller: 'DialogController',
                });
            };




        } //Controller
    ])

    .controller('DialogController', ['$scope', '$window', '$rootScope',
        function($scope, $window, $rootScope) {

            var length = youtubeUrls.length;

            self.getUrl = function(id) {
                var id = getRandomInt(0, length - 1);
                var vid = youtubeUrls[id];
                var res = '//www.youtube.com/embed/' + vid + '?rel=0'
                return res;
            }

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            self.url = self.getUrl()



        } //Controller
    ]);
})();
