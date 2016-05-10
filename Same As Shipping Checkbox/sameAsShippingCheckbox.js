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
            '<input name="sameAsShipping" type="checkbox" ng-model="copyShipAddress" ng-change="setBilling()" ng-disabled="!orderShipAddress.ID" />',
            '{{\'Same as Shipping Address\' | r | xlat}}</label>',
            '<button class="btn btn-info pull-right" type="button" ng-hide="(!user.Permissions.contains(\'CreateBillToAddress\'))" ng-click="billaddressform = true" ng-disabled="copyShipAddress">',
            '{{(\'New\' | r) + \' \' +  (\'Address\' | r) | xlat}}',
            '</button>',
            '</div>',
            '</div>'
        ].join('');
    }
}

SameAsShippingCheckboxCtrl.$inject = ['$scope', '$rootScope'];
function SameAsShippingCheckboxCtrl($scope, $rootScope) {
    $scope.copyShipAddress = false;

    $scope.setBilling = function() {
        if ($scope.copyShipAddress  ===  true) {
            if ($scope.currentOrder && ($scope.currentOrder.BillAddressID != $scope.currentOrder.ShipAddressID)) {
                $scope.currentOrder.BillAddressID = $scope.currentOrder.ShipAddressID;
                $scope.BillAddress = $scope.orderShipAddress;
                $scope.BillAddressID = $scope.currentOrder.BillAddressID;
                $scope.BillAddress.IsBilling = true;

                var addressChecker = [];
                angular.forEach($scope.billaddresses, function(address) {
                    addressChecker.push(address.ID);
                });

                if(addressChecker.indexOf($scope.orderShipAddress.ID) == -1){
                    $scope.billaddresses.push($scope.orderShipAddress);
                }
            }
        }
        else {
            $scope.currentOrder.BillAddressID  =  '';
            $scope.BillAddress  =  null;
            $scope.BillAddressID  =  '';
        }
    };

    $scope.$watch('currentOrder.ShipAddressID', function(newValue) {
        if (newValue || newValue === null) {
            //broadcast that the ship address changed
            $rootScope.$broadcast('shipChange');
        }
    });

    $scope.$on('shipChange',  function()  {
        if  ($scope.currentOrder && ($scope.currentOrder.BillAddressID != $scope.currentOrder.ShipAddressID) && ($scope.copyShipAddress  ===  true)) {
            $scope.copyShipAddress  =  false;
            $scope.currentOrder.BillAddressID  =  '';
            $scope.BillAddress  =  null;
            $scope.BillAddressID  =  '';
        }
    });

    $scope.$watch('currentOrder.BillAddressID',  function(newValue)  {
        if  ($scope.currentOrder  &&  (newValue  !=  $scope.currentOrder.ShipAddressID)  &&  ($scope.copyShipAddress  ===  true))  {
            $scope.copyShipAddress  =  false;
        }
    });
}