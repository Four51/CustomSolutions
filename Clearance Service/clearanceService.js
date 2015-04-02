angular.module('OrderCloud-ClearanceService', []);
angular.module('OrderCloud-ClearanceService')
    .directive('clearanceproduct', ClearanceProductDirective)
    .controller('ClearanceProductCtrl', ClearanceProductCtrl)
    .factory('ClearanceService', ClearanceProductFactory)
;

function ClearanceProductDirective(){
    return {
        restrict: 'AE',
        template: '<style>.clearance-badge{position:absolute;margin-left:-0.75em;margin-top:-0.75em;padding:0.75em;border-bottom-right-radius:4px;background-color:rgba(0,0,0,0.7);color:#fff;}</style><div class="clearance-badge" ng-show="isClearance">On Sale!</div>',
        controller: 'ClearanceProductCtrl'
    };
}

ClearanceProductCtrl.$inject = ['$scope', 'ClearanceService'];
function ClearanceProductCtrl($scope, ClearanceService){
    $scope.$watch('LineItem.Product', init);

    function init(product) {
        if (!product) return;
        ClearanceService.get().then(function() {
            $scope.isClearance = ClearanceService.contains(product);
        });
    }
}

ClearanceProductFactory.$inject = ['$q', '$resource', '$451'];
function ClearanceProductFactory($q, $resource, $451){
    var clearanceProducts = [];
    return {
        get: _get,
        contains: _contains
    };

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

        return $resource($451.api('Products')).get(criteria).$promise.then(success);

        function success(products) {
            angular.forEach(products.List, function(p) {
                clearanceProducts.push(p.InteropID);
            });
        }
    }

    function _contains(product){
        return clearanceProducts.indexOf(product.InteropID) > -1;
    }
}