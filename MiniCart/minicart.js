angular.module('minicart', []);

angular.module('minicart')
    .directive('minicart', minicartDirective)
    .controller('minicartCtrl', minicartController)
;

function minicartDirective() {
    return {
        restrict: 'E',
        templateUrl: 'partials/controls/minicart.html',
        controller: 'minicartCtrl'
    };
}

minicartController.$inject = ['$scope', '$location', 'Order', 'User'];
function minicartController($scope, $location, Order, User) {
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
}