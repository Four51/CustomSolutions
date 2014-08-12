/*
Replace current shipping/billing dropdowns with these directives as needed

 <largebillingaddresslist />
 <largeshippingaddresslist />

=================================================================================

 Replace the "AddressList.query" function in checkOutViewCtrl.js on line 7 with
 CustomAddressList.getall(function(list) {
    $scope.addresses = list;
 });

=================================================================================

Add the new service to the checkOutViewCtrl.js injection list

=================================================================================

Add this file to the override and to the index.html file

*/

four51.app.factory('CustomAddressList', ['$q', '$resource', '$451', function($q, $resource, $451) {
	function _then(fn, data, count) {
		if (angular.isFunction(fn))
			fn(data, count);
	}

	var _getall = function(success) {
		var all = [], queue = [], count = 0, total = 0, page = 1;

		$resource($451.api('address')).get({ page: page, pagesize: 100}).$promise.then(function(list) {
			total = list.Count;
			page += 1;
			count += count + list.List.length;
			all = all.concat(list.List);

			while (count < total) {
				queue.push((function() {
					var d = $q.defer();
					$resource($451.api('address')).get({ page: page, pagesize: 100}).$promise.then(function(list) {
						all = all.concat(list.List);
						d.resolve();
					});
					return d.promise;
				})());
				count += 100;
				page += 1;
			}
			$q.all(queue).then(function() {
				_then(success, all);
			});
		});
	};

	return {
		getall: _getall
	};
}]);

four51.app.directive('largeshippingaddresslist', function() {
	var obj = {
		restrict: 'E',
		template: '<style>.dropdown-menu { font-size: 11px; }</style>' +
					'<div ng-show="(addresses | filter:{IsShipping:true}).length > 0" style="margin: 35px 0 0;">' +
					'<label ng-class="{required: !currentOrder.IsMultipleShip()}" ng-show="currentOrder.ShipAddressID || !currentOrder.IsMultipleShip()">{{\'Shipping\' | r}} {{\'Address\' | r}}</label>' +
					'<input type="text" ng-model="currentOrder.ShipAddress" placeholder="{{orderShipAddress ? orderShipAddress.AddressName : \'Search for Shipping Address\' | r}}"' +
					'typeahead="address as (address.AddressName + \' \' + (address.FirstName || \'\') + \' \' + (address.LastName || \'\') + \' \' + (address.Street1 || \'\') + \' \' + (address.Street2 || \'\') + \' \' + (address.City || \'\') + \' \' + (address.State || \'\') + \' \' + (address.Zip || \'\')) for address in addresses | largeaddress:$viewValue | filter:{IsShipping:true}"' +
					'class="form-control"><i class="fa fa-map-marker"></i></div>',
		controller: ['$scope', function($scope) {
			$scope.$watch('currentOrder.ShipAddress', function(newValue) {
				if (!newValue || !newValue.ID) return;
				$scope.orderShipAddress = newValue;
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
		}]
	};
	return obj;
});

four51.app.directive('largebillingaddresslist', function() {
	var obj = {
		restrict: 'E',
		template: '<style>.dropdown-menu { font-size: 11px; }</style>' +
			'<div ng-show="(addresses | filter:{IsBilling:true}).length > 0" style="margin: 35px 0 0;">' +
			'<label ng-class="{required: !currentOrder.IsMultipleShip()}" ng-show="currentOrder.ShipAddressID || !currentOrder.IsMultipleShip()">{{\'Billing\' | r}} {{\'Address\' | r}}</label>' +
			'<input type="text" ng-model="currentOrder.BillAddress" placeholder="{{orderBillAddress ? orderBillAddress.AddressName : \'Search for Billing Address\' | r}}"' +
			'typeahead="address as (address.AddressName + \' \' + (address.FirstName || \'\') + \' \' + (address.LastName || \'\') + \' \' + (address.Street1 || \'\') + \' \' + (address.Street2 || \'\') + \' \' + (address.City || \'\') + \' \' + (address.State || \'\') + \' \' + (address.Zip || \'\')) for address in addresses | largeaddress:$viewValue | filter:{IsBilling:true}"' +
			'class="form-control"><i class="fa fa-map-marker"></i></div>',
		controller: ['$scope', function($scope) {
			$scope.$watch('currentOrder.BillAddress', function(newValue) {
				if (!newValue || !newValue.ID) return;
				$scope.orderBillAddress = newValue;
				if ($scope.user.Permissions.contains('EditBillToName') && !newValue.IsCustEditable) {
					$scope.currentOrder.BillFirstName = newValue.FirstName;
					$scope.currentOrder.BillLastName = newValue.LastName;
				}
				$scope.BillAddressID = newValue.ID;
				$scope.BillAddress = newValue;
			});
		}]
	};
	return obj;
});

four51.app.filter('largeaddress', function() {
	return function(input, query) {
		if (!input || input.length === 0) return;
		if (!query) return input;
		var results = [];
		angular.forEach(input, function(add) {
			for (var key in add) {
				if (add.hasOwnProperty(key)) {
					if (typeof add[key] === 'string' && add[key].toLowerCase().indexOf(query.toLowerCase()) > -1) {
						results.push(add);
						break;
					}
				}
			}
		});
		return results;
	}
});
