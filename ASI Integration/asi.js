angular.module('OrderCloud-ASI', []);

angular.module('OrderCloud-ASI')
    .constant('url', 'https://api.asicentral.com/v1/')
    .constant('client_id','500041912')
    .constant('client_secret', 'e2b84bb6d2512baffebe2577fdb01e5a')
    .run(Template)
    .config(Route)
    .factory('api', Api)
    .directive('asiproductview', ProductView)
    .controller('AsiController', AsiController)

;

function ProductView() {
    var obj = {
        restrict: "E",
        scope: {
            product: '=',
            user: '='
        },
        templateUrl:'partials/controls/asiProductView.html',
        controller: ProductViewController
    };

    ProductViewController.$inject = ['$scope', '$sce', 'Order', 'User'];
    function ProductViewController($scope, $sce, Order, User) {
        $scope.LineItem = {};
        $scope.LineItem.Quantity = Math.max($scope.product.StandardPriceSchedule.DefaultQuantity, 1);
        $scope.LineItem.Product = $scope.product;
        $scope.LineItem.PriceSchedule = $scope.product.StandardPriceSchedule;
        $scope.LineItem.Specs = {};
        angular.forEach($scope.LineItem.Product.Specs, function(item){
            if(item.CanSetForLineItem || item.DefinesVariant)
                $scope.LineItem.Specs[item.Name] = item;
        });

        $scope.trustedDescription = function(){
            if($scope.product) return $sce.trustAsHtml($scope.product.Description);
        };

        $scope.addToCart = addToCart;

        function addToCart(lineitem) {
            $scope.loadingIndicator = true;
            $scope.currentOrder = $scope.currentOrder || {};
            $scope.currentOrder.LineItems = $scope.currentOrder.LineItems || [];
            $scope.currentOrder.LineItems.push(lineitem);
            Order.clearshipping($scope.currentOrder).
                save($scope.currentOrder,
                function(o){
                    $scope.currentOrder = o;
                    $scope.user.CurrentOrderID = o.ID;
                    User.save($scope.user, function(){
                        $scope.loadingIndicator = false;
                    });
                },
                function(ex) {
                    $scope.loadingIndicator = false;
                }
            );
        }
    }

    return obj;
};

Api.$inject = ['$q', '$resource', '$451', 'url', 'client_id', 'client_secret'];

function Api($q, $resource, $451, url, client_id, client_secret) {
    var service = {
        search: _search,
        criteria: _criteria,
        shells: _shells,
        map: _map
    };
    return service;

    function _search(key) {
        var http = $resource(url + 'products/search.json', {'q': '@q'}, {
            get: {
                method: 'GET',
                headers: {
                    'Authorization': 'AsiMemberAuth client_id=' + client_id + '&client_secret=' + client_secret,
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            }
        }).get({q: key});
        return http.$promise;
    }

    function _criteria(category) {
        var category = $resource($451.api('Products')).get({CategoryInteropID: category, 'Page': 1, 'PageSize': 10}).$promise;
        return category;
    }

    function _shells(list) {
        var queue = [];
        angular.forEach(list, function(p) {
            queue.push((function() {
                var d = $q.defer();
                $resource($451.api('products/:interopID'), { interopID: '@ID' }).get({ interopID: p.InteropID }).$promise.then(function(p) {
                    if (p.StaticSpecGroups.ASI.Specs.SearchKey)
                        p.AsiSearchKey = p.StaticSpecGroups.ASI.Specs.SearchKey.Value;
                    d.resolve(p);
                });
                return d.promise;
            })());
        });
        return $q.all(queue);
    }

    function _map(list, shell) {
        var mashed = [];
        angular.forEach(list, function(item) {
            var product = angular.copy(shell);
            product.StandardPriceSchedule.PriceBreaks[0].Price = item.Price.Price;
            product.StandardPriceSchedule.PriceBreaks[0].Quantity = item.Price.Quantity;
            product.Description = item.Description;
            product.Name = item.Name;
            product.ExternalID = item.Id;
            product.SmallImageUrl = url + item.ImageUrl;
            angular.forEach(product.Specs, function(spec) {
                if (spec.Name.indexOf('.') > -1)
                    spec.Value = parseComplex(item, spec.Name);
                else
                    spec.Value = item[spec.Name];
            });
            mashed.push(product);
        });
        return mashed;

        function parseComplex(item, property) {
            var split = property.split('.');
            var value = item[split[0]];

            for(var i = 1; i <= split.length-1; i++) {
                value = value[split[i]];
            }
            return value;
        }
    }
}

AsiController.$inject = ['$scope', '$routeParams', 'api'];
function AsiController($scope, $routeParams, api) {
    $scope.settings = {
        currentPage: 1,
        pageSize: 5
    };

    if ($routeParams.categoryInteropID) {
        $scope.loadingIndicator = true;
        api.criteria($routeParams.categoryInteropID).then(success).catch(error);

        function success(shells) {
            api.shells(shells.List).then(successProducts).catch(error).finally(function() { $scope.loadingIndicator = false; });

            function successProducts(shells) {
                angular.forEach(shells, function (shell) {
                    api.search(shell.AsiSearchKey).then(searchSuccess);
                    function searchSuccess(products) {
                        $scope.products = api.map(products.Results, shell);
                        $scope.productCount = $scope.products.length;
                    }
                });
            }
        }

        function error(ex) {
            console.log(ex);
        }
    }
}


Template.$inject = ['$templateCache'];
function Template($templateCache) {
    var template = [
        '<loadingindicator ng-show="loadingIndicator" title="{{"Please wait while we fetch all categories" | r | xlat}}" />',
        '<div class="panel panel-default" ng-show="products">',
        '<div class="panel-heading">',
        '<h3 class="panel-title">',
        '{{\'ASI \' + \'Products\' | r | xlat}}',
        '</h3>',
        '</div>',
        '<div ng-show="productCount > settings.pageSize">',
        '<pagination page="settings.currentPage" max-size="10" rotate="false" boundary-links="true" total-items="productCount" items-per-page="settings.pageSize" direction-links="true" previous-text="{{\'Previous\' | xlat}}" next-text="{{\'Next\' | xlat}}" first-text="{{\'First\' | xlat}}" last-text="{{\'Last\' | xlat}}"></pagination>',
        '</div>',
        '<div class="panel-product-list">',
        '<nav class="nav">',
        '<ul>',
        '<li ng-repeat="product in products | paginate:(settings.currentPage-1) * settings.pageSize | limitTo:settings.pageSize | orderBy:sorter:direction">',
        '<div class="well">',
        '<asiproductview product="product" user="user" />',
        '</div></li></ul></nav></div>',
        '<div ng-show="productCount > settings.pageSize">',
        '<pagination page="settings.currentPage" max-size="10" rotate="false" boundary-links="true" total-items="productCount" items-per-page="settings.pageSize" direction-links="true" previous-text="{{\'Previous\' | xlat}}" next-text="{{\'Next\' | xlat}}" first-text="{{\'First\' | xlat}}" last-text="{{\'Last\' | xlat}}"></pagination>',
        '</div></div>'
    ].join('');

    var directive = [
        '<div class="row" ng-swipe-left="showSwipe = true">',
        '<div class="col-sm-4 text-center">',
        '<div class="thumbnail">',
        '<figure ng-show="LineItem.Variant.SmallImageUrl || LineItem.Product.SmallImageUrl" >',
        '<img ng-src="{{LineItem.Variant.SmallImageUrl || LineItem.Product.SmallImageUrl}}"/>',
        '</figure>',
        '<div class="empty" ng-hide="LineItem.Variant.SmallImageUrl || LineItem.Product.SmallImageUrl">',
        '<span class="fa empty"><i class="fa fa-camera"></i></span>',
        '</div>',
        '<div class="btn btn-default" ng-click="addToCart(LineItem)">',
        '{{\'Add To Cart\' | r | xlat}}',
        '</div></div></div>',
        '<div class="col-sm-8 text-left">',
        '<div class="panel-body">',
        '<h3>',
        '<span>{{LineItem.Product.Name}}</span>',
        '<small class="pull-right text-info">{{LineItem.Product.ExternalID}}</small>',
        '</h3>',
        '<p ng-bind-html="trustedDescription(LineItem.Product)" ng-show="LineItem.Product.Description" />',
        '<section class="hidden-xs hidden-sm panel-body">',
        '<p ng-show="LineItem.PriceSchedule.PriceBreaks[0]" ng-if="!(user.Permissions.contains(\'HidePricing\'))">',
        '<span>',
        '{{LineItem.PriceSchedule.PriceBreaks[0].Quantity}} {{\'for\' | xlat}}', '{{LineItem.PriceSchedule.PriceBreaks[0].Price | culturecurrency}}',
        '</span></p></section></div></div>',
        '<section class="hidden-lg hidden-md" ng-show="showSwipe" ng-swipe-right="showSwipe = false">',
        '<div class="shortproduct-info panel-body text-center">',
        '<p ng-show="LineItem.PriceSchedule.PriceBreaks[0]" ng-if="!(user.Permissions.contains(\'HidePricing\'))">',
        '<span>',
        '{{LineItem.PriceSchedule.PriceBreaks[0].Quantity}} {{\'for\' | xlat}}', '{{LineItem.PriceSchedule.PriceBreaks[0].Price | culturecurrency}}',
        '</span></p>',
        '<button class="btn btn-default" redirect="product/{{LineItem.Product.InteropID}}">',
        '{{(\'View\' | r) + \' \' + (\'Product\' | r) | xlat}}',
        '</button></div></section></div>',
    ].join('');

    $templateCache.put('partials/asiView.html', template);
    $templateCache.put('partials/controls/asiProductView.html', directive);
}

Route.$inject = ['$routeProvider'];
function Route($routeProvider) {
    $routeProvider.
        when('/asi/:categoryInteropID', { templateUrl: 'partials/asiView.html', controller: 'AsiController' });
}