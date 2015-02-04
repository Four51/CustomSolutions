angular.module('OrderCloud-LargeAddressListSearch', []);

angular.module('OrderCloud-LargeAddressListSearch')

    .factory('LargeAddress', largeaddress)
    .directive('largeaddressshipping', largeaddresssearchshipping)
    .directive('largeaddressbilling', largeaddresssearchbilling)
    .controller('LargeShipAddressCtrl', largeaddressshippingctrl)
    .controller('LargeBillAddressCtrl', largeaddressbillingctrl);

    largeaddress.$inject = ['$resource', '$451'];

    function largeaddress($resource, $451) {
        var service = {
            queryShipping: _queryShipping,
            queryBilling: _queryBilling
        };
        return service;

        function _queryShipping(searchTerm, success) {
            $resource($451.api('address/shipping')).get({ editable: false, key: searchTerm, page: 1, pagesize: 100}).$promise.then(function (list) {
                success(list.List, list.Count);
            });
        }

        function _queryBilling(searchTerm, success) {
            $resource($451.api('address/billing')).get({ editable: false, key: searchTerm, page: 1, pagesize: 100}).$promise.then(function (list) {
                success(list.List, list.Count);
            });
        }
    }

    function largeaddresssearchshipping() {
        var obj = {
            restrict: 'E',
            controller: 'LargeShipAddressCtrl',
            template:   '<div class="row">' +
                            '<div class="col-md-6">' +
                                '<div class="view-form-icon">' +
                                    '<div class="form-group">' +
                                        '<label>{{("Shipping" | r) + " " + ("Address" | r) | xlat}}</label>' +
                                        '<input class="form-control" type="text" ng-model="ShipAddress" ng-change="searchShipAddresses(ShipAddress)" typeahead="address as (address.AddressName + \' \' + (address.FirstName || \'\') + \' \' + (address.LastName || \'\') + \' \' + (address.Street1 || \'\') + \' \' + (address.Street2 || \'\') + \' \' + (address.City || \'\') + \' \' + (address.State || \'\') + \' \' + (address.Zip || \'\')) for address in shipaddresses" typeahead-min-length="3" />' +
                                        '<i class="fa fa-map-marker"></i>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
        };
        return obj;
    }

    largeaddressshippingctrl.$inject = ['$scope', 'LargeAddress', 'Address'];

    function largeaddressshippingctrl($scope, LargeAddress, Address) {
        $scope.$watch('ShipAddress', function(newValue) {
            if (!newValue || !newValue.ID) return;
            if (newValue.ID == oldValue.ID) return;
            $scope.orderShipAddress = newValue;
            $scope.currentOrder.ShipAddress = newValue;
            if ($scope.currentOrder) {
                $scope.currentOrder.ShipAddressID = newValue.ID;
                $scope.currentOrder.ShipFirstName = null;
                $scope.currentOrder.ShipLastName = null;
                angular.forEach($scope.currentOrder.LineItems, function(item) {
                    item.ShipFirstName = null;
                    item.ShipLastName = null;
                });
            }

            if (newValue) {
                if ($scope.user.Permissions.contains('EditShipToName') && !newValue.IsCustEditable) {
                    angular.forEach($scope.currentOrder.LineItems, function(item) {
                        item.ShipFirstName = newValue.FirstName;
                        item.ShipLastName = newValue.LastName;
                    });
                }
            }
            $scope.setShipAddressAtOrderLevel();
        });

        $scope.searchShipAddresses = function(searchTerm) {
            if (searchTerm && searchTerm.length > 2) {
                $scope.shipaddresses = [' '];
                LargeAddress.queryShipping(searchTerm, function(list, count) {
                    $scope.shipaddresses = list;
                });
            }
        };

        if ($scope.currentOrder.ShipAddressID) {
            Address.get($scope.currentOrder.ShipAddressID, function(add) {
                $scope.ShipAddress = add;
            });
        }
    }

    function largeaddresssearchbilling() {
        var obj = {
            restrict: 'E',
            controller: 'LargeBillAddressCtrl',
            template:   '<div class="row">' +
                            '<div class="col-md-6">' +
                                '<div class="view-form-icon">' +
                                    '<div class="form-group">' +
                                        '<label>{{("Billing" | r) + " " + ("Address" | r) | xlat}}</label>' +
                                        '<input class="form-control" type="text" ng-model="BillAddress" ng-change="searchBillAddresses(BillAddress)" typeahead="address as (address.AddressName + \' \' + (address.FirstName || \'\') + \' \' + (address.LastName || \'\') + \' \' + (address.Street1 || \'\') + \' \' + (address.Street2 || \'\') + \' \' + (address.City || \'\') + \' \' + (address.State || \'\') + \' \' + (address.Zip || \'\')) for address in billaddresses" typeahead-min-length="3" />' +
                                        '<i class="fa fa-map-marker"></i>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
        };
        return obj;
    }

    largeaddressbillingctrl.$inject = ['$scope', 'LargeAddress'];

    function largeaddressbillingctrl($scope, LargeAddress) {
        $scope.$watch('BillAddress', function(newValue) {
            if (!newValue || !newValue.ID) return;
            $scope.orderBillAddress = newValue;
            $scope.currentOrder.BillAddress = newValue;
            if ($scope.user.Permissions.contains('EditBillToName') && !newValue.IsCustEditable) {
                $scope.currentOrder.BillFirstName = newValue.FirstName;
                $scope.currentOrder.BillLastName = newValue.LastName;
            }
            $scope.BillAddressID = newValue.ID;
            $scope.BillAddress = newValue;
        });

        $scope.searchBillAddresses = function(searchTerm) {
            if (searchTerm && searchTerm.length > 2) {
                $scope.billaddresses = [' '];
                LargeAddress.queryBilling(searchTerm, function(list, count) {
                    $scope.billaddresses = list;
                });
            }
        };

        if ($scope.currentOrder.BillAddressID) {
            Address.get($scope.currentOrder.BillAddressID, function(add) {
                $scope.BillAddress = add;
            });
        }
    }
