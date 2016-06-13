angular.module('OrderCloud-Coupon', []);

angular.module('OrderCloud-Coupon')
    .directive('coupon', coupon)
    .directive('couponbalance', couponbalance)
    .controller('CouponCtrl', CouponCtrl)
    .factory('Coupon', Coupon)
;

function coupon() {
    var directive =  {
        restrict: 'E',
        template: template,
        controller: CouponCtrl
    };
    return directive;

    function template() {
        return [
            '<div ng-show="user.Permissions.contains(\'ViewPromotions\')">',
            '<div ng-show="!currentOrder.Coupon">',
            '<div class="form-group view-form-icon">',
            '<div>',
            '<label ng-show="currentOrder.CouponCode">{{(\'Promotion\' | r) + \' \' + (\'Code\' | r) | xlat}}</label>',
            '<div class="input-group">',
            '<input class="form-control" type="text" ng-model="currentOrder.CouponCode" ' +
            'placeholder="{{(\'Promotion\' | r) + \' \' + (\'Code\' | r) | xlat}}" autocomplete="off"/>',
            '<span class="input-group-btn">',
            '<button type="button" class="btn btn-success" ng-click="applyCoupon()"><i class="fa fa-check"></i></button>',
            '</span>',
            '</div>',
            '<i class="fa fa-question-circle"></i>',
            '</div>',
            '</div>',
            '</div>',
            '<p ng-show="currentOrder.Coupon">',
            '<span class="text-info">{{currentOrder.Coupon.Label}}:</span>{{currentOrder.Coupon.OrderDiscount * -1 | culturecurrency}}<br/>',
            '</p>',
            '<div ng-show="currentOrder.Coupon">',
            '<button type="button"  class="btn btn-danger pull-right" ng-click="removeCoupon()">Remove {{\'Coupon\' | r | xlat}}</button>',
            '<p class="text-left" ng-show="currentOrder.Coupon.ExpirationDate">',
            '<small class="text-danger">{{\'Expires\' | r | xlat}}: {{currentOrder.Coupon.ExpirationDate | date:user.Culture.DateFormat.short}}</small>',
            '</p>',
            '</div>',
            '</div>'

        ].join('');
    }
}

function couponbalance() {
    var directive =  {
        restrict: 'E',
        template: template,
        controller: CouponCtrl
    };
    return directive;

    function template() {
        return [
            '<div class="col-xs-12 col-md-6">',
            '<h4>Enter your coupon code to check your current balance.</h4>',
            '</div>',
            '<div class="col-xs-12 col-md-6">',
            '<div class="form-group view-form-icon">',
            '<div>',
            '<label>{{(\'Coupon\' | r) + \' \' + (\'Code\' | r) | xlat}}</label>',
            '<div class="input-group">',
            '<input class="form-control" type="text" ng-model="currentOrder.CouponCode" ' +
            'placeholder="{{(\'Coupon\' | r) + \' \' + (\'Code\' | r) | xlat}}" autocomplete="off"/>',
            '<span class="input-group-btn">',
            '<button type="button" class="btn btn-success" ng-click="getCoupon()"><i class="fa fa-check"></i></button>',
            '</span>',
            '</div>',
            '<i class="fa fa-question-circle"></i>',
            '</div>',
            '</div>',
            '<div ng-show="coupon && coupon.DiscountAmount">',
            '<p>Your coupon code <strong>{{coupon.Label}}</strong> has a current balance of',
            '<strong>{{coupon.DiscountAmount | culturecurrency}}</strong>.</p>',
            '</div>',
            '</div>'
        ].join('');
    }
}

CouponCtrl.$inject = ['$scope','Order', 'Coupon'];
function CouponCtrl($scope, Order, Coupon) {

    var save = function(callback) {
        Order.save($scope.currentOrder,
            function(data) {
                $scope.currentOrder = data;
                if (callback) callback($scope.currentOrder);
            }
        );
    };

    //adding the getCoupon function so we can get the balance without applying the coupon code
    $scope.getCoupon = function() {
        $scope.couponError = null;
        Coupon.get($scope.currentOrder.CouponCode,
            function(coupon) {
                $scope.coupon = coupon;
                $scope.currentOrder.Coupon = null;
            },
            function(ex) {
                $scope.couponError = ex.Message;
                $scope.couponLoadingIndicator = false;
            }
        );
    };

    $scope.applyCoupon = function() {
        $scope.couponLoadingIndicator = true;
        $scope.couponError = null;
        Coupon.apply($scope.currentOrder.CouponCode,
            function(coupon) {
                $scope.currentOrder.Coupon = coupon;
                save(function() {
                    $scope.couponLoadingIndicator = false;
                });
            },
            function(ex) {
                $scope.couponError = ex.Message;
                $scope.couponLoadingIndicator = false;
            }
        );
    };

    $scope.removeCoupon = function() {
        $scope.couponError = null;
        $scope.couponRemoveIndicator = true;
        Coupon.remove(function() {
            save(function() {
                $scope.couponRemoveIndicator = false;
            });
        });
    };

}

Coupon.$inject = ['$resource', '$451', 'Error'];
function Coupon ($resource, $451, Error){

    function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

    //adding the get to display the coupon balance without applying the coupon code
    var _get = function(code, success, error) {
        return $resource($451.api('coupon')).save({ 'CouponCode': code}).$promise.then(
            function(c) {
                _then(success, c);
                _delete(c);
            },
            function(ex) {
                error(Error.format(ex));
            }
        );
    };

    var _save = function(code, success, error) {
        return $resource($451.api('coupon')).save({ 'CouponCode': code}).$promise.then(
            function(c) {
                _then(success, c);
            },
            function(ex) {
                error(Error.format(ex));
            }
        );
    };

    var _delete = function(success) {
        return $resource($451.api('coupon')).delete().$promise.then(function() {
            _then(success);
        });
    };

    return {
        get: _get,
        apply: _save,
        remove: _delete
    };
}