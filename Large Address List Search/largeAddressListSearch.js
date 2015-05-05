angular.module('OrderCloud-LargeAddressListSearch', []);

angular.module('OrderCloud-LargeAddressListSearch')
    .directive('largeshipaddresssearch', largeshipaddresssearch)
    .controller('LargeShipAddressSearchCtrl', LargeShipAddressSearchCtrl)
    .directive('largebilladdresssearch', largebilladdresssearch)
    .controller('LargeBillAddressSearchCtrl', LargeBillAddressSearchCtrl)
    .factory('LargeAddressList', LargeAddressList)
;

function largeshipaddresssearch() {
    var directive = {
        restrict: 'E',
        controller: 'LargeShipAddressSearchCtrl',
        template: template
    };
    return directive;

    function template() {
        return [
            '<div class="row">',
            '<div class="col-xs-12">',
            '<div class="view-form-icon">',
            '<div class="form-group">',
            '<label class="required">{{("Shipping" | r) + " " + ("Address" | r) | xlat}}</label>',
                '<input class="form-control" type="text" ng-model="ShipAddress" ng-change="searchShipAddresses(ShipAddress)" typeahead-min-length="3" required' +
                ' typeahead="address as (address.AddressName + \' \' + (address.FirstName || \'\') + \' \' + (address.LastName || \'\') + \' \' + (address.Street1 || \'\') + \' \' + (address.Street2 || \'\') + \' \' + (address.City || \'\') + \' \' + (address.State || \'\') + \' \' + (address.Zip || \'\')) for address in shipaddresses" | filter:$viewValue | limitTo:10 />',
            '<i class="fa fa-map-marker"></i>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');
    }
}

LargeShipAddressSearchCtrl.$inject = ['$scope', 'LargeAddressList', 'Address'];
function LargeShipAddressSearchCtrl($scope, LargeAddressList, Address) {
    $scope.shipaddresses = [' ']; //this sets shipaddresses to something while we wait for the search so we don't have to modify existing ng-show/hide(s) for address form / ship method

    $scope.$watch('ShipAddress', function(newValue) {
        if (!newValue || !newValue.ID) {
            $scope.orderShipAddress = {};
            $scope.shippers = [];
        }
        else {
            $scope.orderShipAddress = newValue;
            $scope.currentOrder.ShipAddress = newValue;
            if ($scope.currentOrder) {
                $scope.currentOrder.ShipAddressID = newValue.ID;
                $scope.currentOrder.ShipFirstName = null;
                $scope.currentOrder.ShipLastName = null;
                angular.forEach($scope.currentOrder.LineItems, function (item) {
                    item.ShipFirstName = null;
                    item.ShipLastName = null;
                });
            }
            if (newValue) {
                if ($scope.user.Permissions.contains('EditShipToName') && !add.IsCustEditable) {
                    angular.forEach($scope.currentOrder.LineItems, function(item) {
                        item.ShipFirstName = add.FirstName;
                        item.ShipLastName = add.LastName;
                    });
                }
                $scope.setShipAddressAtOrderLevel();
            }
        }
        //account for New Address
        $scope.$on('event:AddressSaved', function(event, address) {
            if (address.IsShipping) {
                $scope.ShipAddress = address;
            }
        });

    });

    $scope.searchShipAddresses = function(searchTerm) {
        if (searchTerm && searchTerm.length > 2) {
            $scope.shipaddresses = [' ']; //this sets shipaddresses to something while we wait for the search so we don't have to modify existing ng-show/hide(s) for address form / ship method
            LargeAddressList.queryShipping(searchTerm, function(list, count) {
                $scope.shipaddresses = list;
                $scope.shipAddressCount = count; // we will use count to add a filter for the user
            });
        }
    };
}

function largebilladdresssearch() {
    var directive = {
        restrict: 'E',
        controller: 'LargeBillAddressSearchCtrl',
        template: template
    };
    return directive;

    function template () {
        return [
                '<div class="row">' +
                '<div class="col-xs-12">' +
                '<div class="view-form-icon">' +
                '<div class="form-group">' +
                '<label class="required">{{("Billing" | r) + " " + ("Address" | r) | xlat}}</label>' +
                '<input class="form-control" type="text" ng-model="selectedBillAddress" ng-change="searchBillAddresses(selectedBillAddress)" typeahead-min-length="3" required ' +
                'typeahead="address as (address.AddressName + \' \' + (address.FirstName || \'\') + \' \' + (address.LastName || \'\') + \' \' + (address.Street1 || \'\') + \' \' + (address.Street2 || \'\') + \' \' + (address.City || \'\') + \' \' + (address.State || \'\') + \' \' + (address.Zip || \'\')) for address in billaddresses" | filter:$viewValue | limitTo:10 />' +
                '<i class="fa fa-map-marker"></i>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
        ].join('');
    }
}

LargeBillAddressSearchCtrl.$inject = ['$scope', 'LargeAddressList', 'Address'];
function LargeBillAddressSearchCtrl($scope, LargeAddressList, Address) {
    $scope.$watch('selectedBillAddress', function(newValue) {
        if (!newValue || !newValue.ID) {
            $scope.BillAddress = [];
            $scope.BillAddressID = null;
        }
        else {
            $scope.orderBillAddress = newValue;
            $scope.currentOrder.BillAddress = newValue;
            if ($scope.user.Permissions.contains('EditBillToName') && !newValue.IsCustEditable) {
                $scope.currentOrder.BillFirstName = newValue.FirstName;
                $scope.currentOrder.BillLastName = newValue.LastName;
            }
            $scope.BillAddressID = newValue.ID;
            $scope.BillAddress = newValue;
        }
        //account for New Address
        $scope.$on('event:AddressSaved', function(event, address) {
            if (address.IsBilling) {
                $scope.selectedBillAddress = address;
            }
        });
    });

    $scope.searchBillAddresses = function(searchTerm) {
        if (searchTerm && searchTerm.length > 2) {
            $scope.billaddresses = [' '];
            LargeAddressList.queryBilling(searchTerm, function(list, count) {
                $scope.billaddresses = list;
                $scope.billAddressCount = count; // we will use count to add a filter for the user
            });
        }
    };

    if ($scope.currentOrder.BillAddressID) {
        Address.get($scope.currentOrder.BillAddressID, function(add) {
            $scope.BillAddress = add;
        });
    }
}

LargeAddressList.$inject = ['$resource', '$451'];
function LargeAddressList($resource, $451) {
    var service = {
        queryShipping: _queryShipping,
        queryBilling: _queryBilling
    };
    return service;

    function _queryShipping(searchTerm, success) {
        $resource($451.api('address/shipping')).get({ key: searchTerm, page: 1, pagesize: 100}).$promise.then(function (list) {
            success(list.List, list.Count);
        });
    }

    function _queryBilling(searchTerm, success) {
        $resource($451.api('address/billing')).get({ key: searchTerm, page: 1, pagesize: 100}).$promise.then(function (list) {
            success(list.List, list.Count);
        });
    }
}