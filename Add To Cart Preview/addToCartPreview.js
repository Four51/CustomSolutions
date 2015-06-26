angular.module('OrderCloud-AddToCartPreview', []);

angular.module('OrderCloud-AddToCartPreview')
    .directive('addtocartpreview', addtocartpreview)
    .controller('AddToCartPreviewCtrl', AddToCartPreviewCtrl)
    .factory('AddToCartPreview', AddToCartPreview)
;

function addtocartpreview() {
    var directive = {
        restrict: 'E',
        scope: {
            lineitem: '=',
            errors: '=',
            user: '='
        },
        template: template,
        controller: 'AddToCartPreviewCtrl'
    };
    return directive;

    function template() {
        return [
            '<button class="btn btn-info btn-block btn-lg" type="button" ng-click="saveVariant(lineitem)"  ng-disabled="errors.length > 0">',
            '<loadingindicator ng-show="addToOrderIndicator" />',
            '<i ng-show="addToOrderForm.$invalid" class="fa fa-warning"></i>',
            '<span>Add to List</span>',
            '</button>',
            '<div class="row">',
            '<div ng-show="list.length > 0">',
            '<loadingindicator ng-show="addListToCartIndicator" />',
            '<div class="panel panel-default">',
            '<div class="panel-heading">',
            '<h3 class="panel-title"><span style="padding-left:95px;">Variant List</span>',
            '<loadingindicator ng-show="addToOrderIndicator" />',
            '<button class="btn btn-success pull-right" style="padding:5px; margin:-10px" type="button" ng-click="addListToCart(list)">',
            '<i ng-show="addToOrderForm.$invalid" class="fa fa-warning"></i>',
            '<span>Add List to Cart</span>',
            '</button>',
            '</h3>',
            '</div>',
            '<div class="panel-lineitem" ng-repeat="item in list">',
            '<button type="button" title="Remove Item" class="btn btn-danger" ng-click="removeItem(item)">',
            '<span class="fa fa-minus-circle fa-inverse"></span>',
            '</button>',
            '<div class="col-sm-3">',
            '<div class="row">',
            '<div class="col-xs-6 col-sm-12 col-md-6 ">',
            '<div class="view-form-icon">',
            '<quantityfield required="true" lineitem="item" class="quantity"/>',
            '</div>',
            '<p class="quantity-total text-center">',
            '<small>{{\'Total Quantity\' | r | xlat}} <span ng-show="item.Quantity * item.Product.QuantityMultiplier">{{item.Quantity * item.Product.QuantityMultiplier}}</span></small>',
            '</p>',
            '</div>',
            '<div class="col-xs-6 col-sm-12 col-md-6 thumbnail" ng-show="item.Variant.LargeImageUrl || item.Product.SmallImageUrl">',
            '<figure>',
            '<img ng-src="{{item.Variant.LargeImageUrl || item.Product.SmallImageUrl}}" />',
            '</figure>',
            '</div>',
            '</div>',
            '</div>',
            '<div class="col-sm-9">',
            '<div class="row">',
            '<div class="col-md-6">',
            '<span>',
            '<h3 class="text-primary"><i class="fa fa-edit"></i>{{item.ProductIDText}}</h3>',
            '<p>{{item.Product.Name}}</p>',
            '</span>',
            '</div>',
            '<div class="col-md-6">',
            '<div class="row">',
            '<div class="col-xs-6">',
            '<div ng-if="!(user.Permissions.contains(\'HidePricing\'))">',
            '<small>{{\'Total\' | r | xlat}}</small>',
            '<h2 class="text-success">{{item.LineTotal | culturecurrency}}</h2>',
            '</div>',
            '</div>',
            '<div class="col-xs-6" ng-if="!(user.Permissions.contains(\'HidePricing\'))">',
            '<p><small>{{\'Unit Price\' | r | xlat}}</small><br/>{{item.UnitPrice | culturecurrency}}</p>',
            '</div>',
            '</div>',
            '</div>',
            '</div>',
            '<div class="row">',
            '<div class="col-xs-12">',
            '<button type="button" class="btn btn-default" ng-show="item.Specs" ng-init="toggleSpecs = false" ng-click="toggleSpecs = !toggleSpecs">',
            '<span ng-show="toggleSpecs == false"><i class="fa fa-plus-circle"></i> {{(\'Show\' | r) + \' \' + (\'Specification\' | r) | xlat}}</span>',
            '<span ng-show="toggleSpecs == true"><i class="fa fa-minus-circle"></i> {{(\'Hide\' | r)  + \' \' +  (\'Specification\' | r) | xlat}}</span>',
            '</button>',
            '<ul ng-show="toggleSpecs == true" class="list-group">',
            '<li ng-repeat="spec in item.Specs | filter:{\'CanSetForLineItem\':true} " class="list-group-item">',
            '<span class="text-info">{{spec.Label || spec.Name}}: </span>',
            '<span ng-if="spec.ControlType == \'File\'"><a ng-href="{{spec.File.Url}}">{{spec.File.OriginalName + Extension}}</a></span></span>',
            '<span ng-if="spec.ControlType != \'File\'">{{spec.Value || (\'(unspecified)\' | xlat)}}</span>',
            '</li>',
            '</ul>',
            '</div>',
            '</div>',
            '</div>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');
    }
}

AddToCartPreviewCtrl.$inject = ['$scope', '$location', 'AddToCartPreview'];
function AddToCartPreviewCtrl($scope, $location, AddToCartPreview) {
    $scope.list = [];

    $scope.saveVariant = function(lineitem) {
        AddToCartPreview.add(lineitem, $scope.list, function(list) {
            $scope.list = list;
        });
    };

    $scope.removeItem = function(lineitem) {
        AddToCartPreview.remove(lineitem, $scope.list, function(list) {
            $scope.list = list;
        });
    };

    $scope.addListToCartIndicator = false;
    $scope.addListToCart = function(list) {
        $scope.addListToCartIndicator = true;
        $scope.$parent.showAddToCartErrors = false;
        $scope.$parent.lineItemErrors = [];
        AddToCartPreview.addListToCart(list, $scope.$parent.currentOrder, $scope.user, function() {
                $scope.addListToCartIndicator = false;
                $location.path('cart');
            },
            function(ex) {
                $scope.addListToCartIndicator = false;
                $scope.$parent.lineItemErrors.push(ex.Detail);
                $scope.$parent.showAddToCartErrors = true;
            });
    };
}

AddToCartPreview.$inject = ['User', 'Order'];
function AddToCartPreview(User, Order) {

    function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

    function randomString() {
        var chars = "0123456789abcdefghijklmnop";
        var string_length = 10;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        return randomstring;
    }

    var _add = function(item, list, success) {
        var i = angular.copy(item);
        i.ItemID = randomString();
        list.push(i);
        _then(success, list);
    }

    var _remove = function(item, list, success) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].ItemID == item.ItemID) {
                list.splice(i, 1);
            }
        }
        _then(success, list);
    }

    var _addListToCart = function(list, order, user, success, error) {
        var tempOrder = angular.copy(order);

        if (!tempOrder) {
            tempOrder = {};
            tempOrder.LineItems = [];
        }

        angular.forEach(list, function(item) {
            tempOrder.LineItems.push(item);
        });

        Order.clearshipping(tempOrder).
            save(tempOrder,
            function(o){
                user.CurrentOrderID = o.ID;
                User.save(user, function(){
                    _then(success, o);
                });
            },
            function(ex) {
                _then(error, ex.Detail);
            }
        );
    }
    return {
        add: _add,
        remove: _remove,
        addListToCart: _addListToCart
    }
}
