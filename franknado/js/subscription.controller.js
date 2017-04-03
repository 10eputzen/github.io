(function() {
    'use strict';

    angular.module('franknado')

    .controller('SubscriptionController', ['$scope', '$location', 'dataService', 'toaster', 'ngDialog',
        function($scope, $location, dataService, toaster, ngDialog) {

            $scope.setNav('subscribe');
            // Save reference
            var self = this;
            self.email = '';
            var mail = {
                address: ''
            }

            var initialLoad = true;
            $scope.$watch('core.mainDataLoaded', function() {
                initialLoad && $scope.core.mainDataLoaded && initialize();
            });


            function initialize() {
                initialLoad = false;
            }





            self.saveToDatabase = function() {
                //toaster.pop('error', "","BLAH")
                if (!$scope.myform.$valid)
                    return;

                // if (!checkValidity()) {
                //     return;
                // }

                else {
                    mail.address = self.email
                    postData(mail);
                    // console.log(mail);
                }


            }

            function postData(mail) {
                dataService.postData("mail", mail).then(function(data) {

                    if (data) {
                        console.log(data.data)
                        resetFormData();
                        toaster.pop('success', "", "Subscription successful.")
                    }

                }, function(data) {
                    if (data) {
                        if (data.status === 400 && data.data && data.data.address.length > 0)
                            toaster.pop('error', "", data.data.address[0])
                        else
                            toaster.pop('error', "", "Error During Subscription")



                    }
                    // Handle error here
                })
            }


            function resetFormData() {
                self.email = '';
            }






        } //Controller
    ])
})();
