four51.app.directive('favoriteproduct', ['FavoriteProductService', function(FavoriteProductService) {
    var obj = {
        restrict: 'E',
        scope: {
            lineitem: '='
        },
        template: '<style>favoriteproduct{cursor:pointer;position:absolute;z-index:1000;left:20px;top:15px;font-size:2em;}</style><i class="fa" ng-class="{\'fa-heart-o text-muted\':!isFavorite(), \'fa-heart text-danger\':isFavorite()}" ng-click="toggle()"></i>',
        link: function(scope) {
            scope.toggle = _toggle;
            scope.isFavorite = _is;

            FavoriteProductService.get();

            function _is() {
                return FavoriteProductService.contains(scope.lineitem.Product);
            }
            function _toggle() {
                FavoriteProductService.save(scope.lineitem.Product);
            }
        }
    };
    return obj;
}]);

four51.app.factory('FavoriteProductService', ['Error', 'User', function(Error, User) {
    var favorites = [];

    var service = {
        save: _save,
        get: _get,
        contains: _contains
    };
    return service;

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

    function _save(product) {
        User.get(success, error);

        function success(user) {
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
            User.save(user, function(user) {}, function(ex) {});
        }
        function error(ex) {
            error(ex);
        }
    }
}]);