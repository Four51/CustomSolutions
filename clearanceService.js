//THIS IS A TEMPORARY SOLUTION

//In order to get this working without making repeated API calls, you have to add the ClearanceService to the Four51Ctrl and call a ClearanceService.get() on the User init function.
//The <clearanceproduct></clearanceproduct> directive should be used just above the <figure> tag on both the ShortProductView.html and any relevant PDTs.

four51.app.directive('clearanceproduct', ['ClearanceService', function(ClearanceService) {
    var obj = {
        restrict: 'AE',
        template: '<style>.clearance-badge{position:absolute;margin-left:-0.75em;margin-top:-0.75em;padding:0.75em;border-bottom-right-radius:4px;background-color:rgba(0,0,0,0.7);color:#fff;}</style><div class="clearance-badge" ng-show="isClearance">On Sale!</div>',
        controller: ['$scope', function($scope) {

            $scope.$watch('LineItem.Product', init);

            function init(product) {
                if (!product) return;
                ClearanceService.get().then(function() {
                    $scope.isClearance = ClearanceService.contains(product);
                });
            }
        }]
    };
    return obj;
}]);

four51.app.factory('ClearanceService', ['$q', '$resource', '$451', function($q, $resource, $451) {
    var clearanceProducts = [];

    var service = {
        get: _get,
        contains: _contains
    };
    return service;

    function _get() {
        if (clearanceProducts.length > 0) {
            var defer = $q.defer();
            defer.resolve();
            return defer.promise;
        }
        var criteria = {
            'CategoryInteropID': 'CLEARANCECAT',
            'Page': 1,
            'PageSize': 100
        };

        var http = $resource($451.api('Products')).get(criteria).$promise.then(success);
        return http;

        function success(products) {
            angular.forEach(products.List, function(p) {
                clearanceProducts.push(p.InteropID);
            });
        }
    }

    function _contains(product){
        return clearanceProducts.indexOf(product.InteropID) > -1;
    }
}]);

