angular.module('OrderCloud-FavoriteProductService', []);
angular.module('OrderCloud-FavoriteProductService')
    .directive('favoriteproduct', favoriteProductDirective)
    .controller('favoriteproductCtrl', favoriteProductController)
    .factory('FavoriteProductService', favoriteProductFactory)
;

function favoriteProductDirective() {
    return {
        restrict: 'E',
        template: '<style>favoriteproduct{cursor:pointer;position:absolute;z-index:1000;left:20px;top:15px;font-size:2em;}</style><i class="fa" ng-class="{\'fa-heart-o text-muted\':!isFavorite, \'fa-heart text-danger\':isFavorite}" ng-click="toggle()"></i>',
        controller: 'favoriteproductCtrl'
    };
}

favoriteProductController.$inject = ['$scope', 'FavoriteProductService'];
function favoriteProductController($scope, FavoriteProductService) {
    $scope.$watch('LineItem.Product', init);

    function init(product) {
        if (!product) {
            FavoriteProductService.get();
            return;
        }
        $scope.isFavorite = FavoriteProductService.contains(product);
    }

    $scope.toggle = _toggle;

    function _toggle() {
        FavoriteProductService.save($scope.LineItem.Product, success);

        function success() {
            $scope.isFavorite = FavoriteProductService.contains($scope.LineItem.Product);
        }
    }
}

favoriteProductFactory.$inject = ['Error', 'User'];
function favoriteProductFactory(Error, User) {
    var service = {
        save: _save,
        get: _get,
        contains: _contains
    };
    return service;
    var favorites = [];

    function _get() {
        if (favorites.length > 0) return favorites;
        User.get(success, error);
        function success(user) {
            angular.forEach(user.CustomFields, function(field) {
                if (field.Name == 'FavoriteProducts') {
                    if (field.Value)
                        favorites = field.Value.split('||');
                    else
                        return null;
                    return favorites;
                }
            });
        }
        function error() {
            return null;
        }
    }

    function _contains(product) {
        return favorites.indexOf(product.InteropID) > -1;
    }

    function _save(product, success) {
        User.get(getSuccess, getError);

        function getSuccess(user) {
            if (favorites.indexOf(product.InteropID) > -1) { // removing
                favorites.splice(favorites.indexOf(product.InteropID), 1);
                angular.forEach(user.CustomFields, function (field) {
                    if (field.Name == 'FavoriteProducts') {
                        field.Value = favorites.join('||');
                    }
                });
            }
            else { // adding
                favorites.push(product.InteropID);
                angular.forEach(user.CustomFields, function (field) {
                    if (field.Name == 'FavoriteProducts') {
                        if (!field.Value) {
                            field.Value = favorites[0];
                        }
                        else {
                            field.Value = favorites.join('||');
                        }
                    }
                });
            }
            User.save(user, success);
        }
        function getError(ex) {
            error(ex);
        }
    }
}