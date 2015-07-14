// this is the four51Modal js file. make sure it's placed under lib/oc/four51Modal.js, is injected in the app.js file as 'four51Modal', and called in the index file .
(function () {
    'use strict';
    var app = angular.module('four51Modal', ['ngRoute', 'ui.bootstrap']);
    app.controller('ModalCtrl',['$scope', '$modal', function($scope,  $modal) {

        $scope.showModal = function() {

            $scope.opts = {
                backdrop: true,
                backdropClick: true,
                dialogFade: false,
                keyboard: true,
                templateUrl : 'partials/modalContent.html',
                controller : ModalInstanceCtrl,
                resolve: {}
            };


            $scope.opts.resolve.item = function() {
                return;
            };

            var modalInstance = $modal.open($scope.opts);

            modalInstance.result.then(function(){
                //on ok button press
            },function(){
                //on cancel button press
                //console.log("Modal Closed");
            });
        };
    }]);
    var ModalInstanceCtrl = ['$scope', '$modalInstance', '$modal', 'item', function($scope, $modalInstance, $modal, item) {

        $scope.item = item;

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }];

}());