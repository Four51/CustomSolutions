angular.module('OrderCloud-AnchorScroll', []);
angular.module('OrderCloud-AnchorScroll')
    .controller('ScrollController', ScrollController)
;

ScrollController.$inject = ['$scope', '$location', '$anchorScroll'];
function ScrollController($scope, $location, $anchorScroll) {
    // add scope for each link based on LinkID
    $scope.goto[LinkID] = function() {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('[LinkID]');

        // call $anchorScroll()
        $anchorScroll();
    };
}