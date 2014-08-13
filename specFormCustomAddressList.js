/* 
- Modification of largeAddressCustomization.js (which utilizes a type ahead input field on billing and shipping address
fields attached to an order for buyers with 100+ addresses) updated for spec forms.
- Searches both billing and shipping addresses.
- Should be used for prepopulation of product variant spec form address fields based on user address book addresses. 
- The selection on the customaddresslist directive will populate the variable spec address fields (on "blur"-aka 
click out of field) for optional editing and saving.
- A prepopulated address book address that is modified will not update the address in the user address book. 
*/



/* add to specFormCtrl.js and modify Variant Spec names to match Variable Specs */

CustomAddressList.getall(function(list) {
    $scope.addresses = list;
});
	
	
$scope.populateAddress = function(address) {
    $scope.Variant.Specs.City.Value = address.City;
    $scope.Variant.Specs.State.Value = address.State;
    $scope.Variant.Specs.Zip.Value = address.Zip;
	
    if ($scope.Variant.Specs.Address2) {
        $scope.Variant.Specs.Address.Value = address.Street1;
        $scope.Variant.Specs.Address2.Value = address.Street2;
    }
    else if (address.Street2) {
	$scope.Variant.Specs.Address.Value = address.Street1 + ' ' + address.Street2;
    }
    else {
	$scope.Variant.Specs.Address.Value = address.Street1;
    }
}


/* 
- Add to js/services/specFormCustomAddressList.js 
- Inject 'SpecFormCustomAddressList' service into specFormCtrl.js
- Add to index.html 
- Add <largeaddresslist></largeaddresslist> directive to spec form and include class="view-form-icon" on div
*/

four51.app.factory('SpecFormCustomAddressList', ['$q', '$resource', '$451', function($q, $resource, $451) {
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

four51.app.directive('largeaddresslist', function() {
	var obj = {
		restrict: 'E',
		template: '<style>.dropdown-menu { font-size: 11px; }</style>' +
					'<div ng-show="(addresses).length > 0" style="margin: 35px 0 0;">' +
					'<label>{{\'Address\' | r}}</label>' +
					'<input type="text" ng-model="selectedAddress" ng-blur="populateAddress(selectedAddress)" placeholder="{{\'Search for Address\' | r}}"' +
					'typeahead="address as (address.AddressName + \' \' + (address.FirstName || \'\') + \' \' + (address.LastName || \'\') + \' \' + (address.Street1 || \'\') + \' \' + (address.Street2 || \'\') + \' \' + (address.City || \'\') + \' \' + (address.State || \'\') + \' \' + (address.Zip || \'\')) for address in addresses | largeaddress:$viewValue"' +
					'class="form-control"><i class="fa fa-map-marker"></i></div>',
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
