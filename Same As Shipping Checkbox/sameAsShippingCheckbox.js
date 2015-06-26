angular.module('OrderCloud-SameAsShippingCheckbox', []);

angular.module('OrderCloud-SameAsShippingCheckbox')
    .directive('sameasshipaddresscheckbox', sameasshipaddresscheckbox)
    .controller('SameAsShippingCheckboxCtrl', SameAsShippingCheckboxCtrl)
;

function sameasshipaddresscheckbox() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'SameAsShippingCheckboxCtrl'
    };
    return directive;

    function template() {
        return [
            '<div ng-hide="billaddressform">',
            '<div class="checkbox">',
            '<input name="sameAsShipping" type="checkbox" ng-model="copyShipAddress" ng-change="resetBilling()" ng-disabled="!orderShipAddress.ID" />{{\'Same as Shipping Address\' | r | xlat}}</label>',
            '<button class="btn btn-info pull-right" type="button" ng-hide="(!user.Permissions.contains(\'CreateBillToAddress\'))" ng-click="billaddressform = true" ng-disabled="copyShipAddress">{{(\'New\' | r) + \' \' +  (\'Address\' | r) | xlat}}',
            '</button>',
            '</div>',
            '</div>'
        ].join('');
    }
}

SameAsShippingCheckboxCtrl.$inject = ['$scope', '$rootScope'];
function SameAsShippingCheckboxCtrl($scope, $rootScope) {
    $scope.copyShipAddress = false;

    $scope.resetBilling = function() {
        if ($scope.copyShipAddress == true) {
            $scope.BillAddress = $scope.orderShipAddress;
            $scope.BillAddressID = $scope.currentOrder.ShipAddressID;
            $scope.currentOrder.BillAddressID = $scope.currentOrder.ShipAddressID;
            $scope.BillAddress.IsBilling = true;
            $scope.billaddresses.push($scope.BillAddress);
        }
        if ($scope.copyShipAddress == false) {
            $scope.BillAddress = '';
            $scope.BillAddressID = '';
            $scope.currentOrder.BillAddressID = '';
        }
    };

    $scope.$watch('currentOrder.ShipAddressID', function(newValue) {
        if (newValue || newValue == null) {
            // broadcast that the ship address changed
            $rootScope.$broadcast('shipChange');
        }
    });

    $scope.$watch('currentOrder.BillAddressID', function(newValue) {
        if (newValue != $scope.currentOrder.ShipAddressID) {
            $scope.copyShipAddress = false;
        }
    });

    $scope.$on('shipChange', function() {
        $scope.copyShipAddress = false;
        $scope.BillAddress = null;
        $scope.BillAddressID = '';
        $scope.currentOrder.BillAddressID = '';
    });
}