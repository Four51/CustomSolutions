angular.module('OrderCloud-Minicart', []);

angular.module('OrderCloud-Minicart')
    .directive('minicart', minicartDirective)
    .controller('minicartCtrl', minicartController)
;

function minicartDirective() {
    return {
        restrict: 'E',
        transclude: true,
        template: template,
        controller: 'minicartCtrl'
    };
}

minicartController.$inject = ['$scope', '$location', 'Order', 'OrderConfig', 'User'];
function minicartController($scope, $location, Order, OrderConfig, User) {
    $scope.removeItem = function(item, override) {
        if (override || confirm('Are you sure you wish to remove this item from your cart?') == true) {
            Order.deletelineitem($scope.currentOrder.ID, item.ID,
                function(order) {
                    $scope.currentOrder = order;
                    Order.clearshipping($scope.currentOrder);
                    if (!order) {
                        $scope.user.CurrentOrderID = null;
                        User.save($scope.user, function(){
                            $location.path('catalog');
                        });
                    }
                    $scope.displayLoadingIndicator = false;
                    $scope.actionMessage = 'Your Changes Have Been Saved';
                },
                function (ex) {
                    $scope.errorMessage = ex.Message.replace(/\<<Approval Page>>/g, 'Approval Page');
                    $scope.displayLoadingIndicator = false;
                }
            );
        }
    };

    $scope.cartCheckOut = function() {
        $scope.displayLoadingIndicator = true;
        if (!$scope.isEditforApproval)
            OrderConfig.address($scope.currentOrder, $scope.user);
        Order.save($scope.currentOrder,
            function(data) {
                $scope.currentOrder = data;
                $location.path($scope.isEditforApproval ? 'checkout/' + $routeParams.id : 'checkout');
                $scope.displayLoadingIndicator = false;
            },
            function(ex) {
                $scope.errorMessage = ex.Message;
                $scope.displayLoadingIndicator = false;
            }
        );
    };

    $scope.$on('event:orderUpdate', function(event, order){
        $scope.currentOrder = order ? (order.Status === 'Unsubmitted') ? order : null : null;
    })
}

function template(){
    return [
        '<div ng-show="currentOrder && cartCount">',
        '    <div class="minicart">',
        '        <i class="fa fa-shopping-cart fa-2x"></i> SHOPPING CART <span class="label label-default">{{cartCount + \' ITEM(S)\'}}</span> - {{currentOrder.Total | currency }} <i class="fa fa-caret-down text-muted"></i>',
        '        <div class="minicart-detail">',
        '            <i class="fa fa-caret-up fa-2x"></i>',
        '            <ul>',
        '                <li ng-repeat="lineitem in currentOrder.LineItems" ng-hide="lineitem.Kit">',
        '                    <div class="row" ng-class="{\'top-item\':$index == 0}">',
        '                        <div class="col-xs-3">',
        '                            <a ng-href="{{\'cart/\' + lineitem.Product.InteropID + \'/\' + $index}}">',
        '                                <figure>',
        '                                    <img ng-src="{{lineitem.Product.SmallImageUrl}}" />',
        '                                </figure>',
        '                            </a>',
        '                        </div>',
        '                        <div class="col-xs-9">',
        '                            <div class="row lineitem-row">',
        '                                <div class="col-xs-5">',
        '                                    <a ng-href="{{\'cart/\' + lineitem.Product.InteropID + \'/\' + $index}}">',
        '                                        <p class="text-muted">{{lineitem.Product.Name}}</p>',
        '                                    </a>',
        '                                </div>',
        '                                <div class="col-xs-2">',
        '                                    <p class="text-muted">{{\'X\' + lineitem.Quantity}}</p>',
        '                                </div>',
        '                                <div class="col-xs-3">',
        '                                    <p class="text-muted">{{lineitem.LineTotal | currency}}</p>',
        '                                </div>',
        '                                <div class="col-xs-2 text-right">',
        '                                    <i class="fa fa-times text-muted" ng-click="removeItem(lineitem)"></i>',
        '                                </div>',
        '                            </div>',
        '                        </div>',
        '                    </div>',
        '                </li>',
        '            </ul>',
        '            <div class="row">',
        '                <div class="col-xs-8 text-right text-muted">Subtotal:</div>',
        '                <div class="col-xs-4 text-right text-muted">{{currentOrder.Subtotal | currency}}</div>',
        '            </div>',
        '            <div class="row" ng-show="currentOrder.Coupon">',
        '                <div class="col-xs-8 text-right">{{currentOrder.Coupon.Label}}:</div>',
        '                <div class="col-xs-4 text-right">{{currentOrder.Coupon.OrderDiscount * -1 | culturecurrency}}</div>',
        '            </div>',
        '            <div class="row" ng-if="!(user.Permissions.contains(\'HidePricing\')) && currentOrder.TaxCost">',
        '                <div class="col-xs-8 text-right">{{\'Tax\' | r | xlat}}:</div>',
        '                <div class="col-xs-4 text-right">{{currentOrder.TaxCost | culturecurrency}}</div>',
        '            </div>',
        '            <div class="row">',
        '                <div class="col-xs-8 text-right text-muted">Total:</div>',
        '                <div class="col-xs-4 text-right text-muted">{{currentOrder.Total | currency}}</div>',
        '            </div>',
        '',
        '            <div class="row">',
        '                <div class="col-xs-6">',
        '                    <a class="btn btn-default btn-block" href="cart">View Cart</a>',
        '                </div>',
        '                <div class="col-xs-6">',
        '                    <a class="btn btn-default btn-block" ng-click="cartCheckOut()">Checkout</a>',
        '                </div>',
        '            </div>',
        '        </div>',
        '    </div>',
        '    <div style="clear:both;"></div>',
        '</div>'
    ].join('');
}