#Large Address List Search for OrderCloud

This solution allows a user to search for a desired address from a large list, without obtaining all addresses before hand.  Because the API limits results to 100, a site that has more shipping/billing addresses than this will not see their entire list, henceforth, this solution can be used if a buyer site has more than 100 shipping and/or billing addresses.  

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/LargeAddressListSearch). 

**Important:** 
 - This solution is currently only setup for single address, not multiple address shipping
 - This solution cannot be easily combined with Same as Shipping Checkbox Solution.  If you want these two solutions together, please contact the Four51 support team.


##Setup
This module utilizes UI Bootstrap 0.10.0. We recommend replacing the application default script with the script provided here to avoid errors due to a UI Bootstrap bug. 

###1. Replace the UI Bootstrap module file in your project

Replace UI Boostrap script **`ui-bootstrap-tpls-0.10.0.min.js`** in your project. 

If you are using a repository, add this file to the **`/lib/angular_ui`** directory.

If you are using file overrides, create a new file override named **`lib/angular_ui/ui-bootstrap-tpls-0.10.0.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to "Code Editor" tab
 3. Hit "New File Override"
 4. Name this file **`lib/angular_ui/ui-bootstrap-tpls-0.10.0.js`**
 5. Place raw code in the section below. Save. 

**Important!** Be sure to replace the new/updated UI Bootstrap script in the **`index.html`** file by following these steps:

 1. In Code Editor, locate your `index.html` file, hit edit.
 2. Replace:

```<script src="lib/angular_ui/ui-bootstrap-tpls-0.10.0.min.js" data-group="resources"></script>```

with ...

```<script src="lib/angular_ui/ui-bootstrap-tpls-0.10.0.js" data-group="resources"></script>```

###2. Add Large Address Module file to your project

Add the **`largeAddressListSearch.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/largeAddressListSearch.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file `lib/oc/largeAddressListSearch.js`
 5. Place raw code in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps:

 1. In Code Editor, locate your `index.html` file, hit edit.
 2. Add **`<script src="lib/oc/largeAddressListSearch.js" data-group="resources"></script>`** in the section with “lib/oc” files. Save.

###3. Load the module into your application.
Add a dependency for  **`OrderCloud-LargeAddressListSearch`** to the Four51.app module in the **`js/app.js`** file by following these steps: 

 1. In Code Editor, locate your **`js/app.js`** file, hit edit.
 2. Add **'OrderCloud-LargeAddressListSearch'** into the file. Save

 

###4. Remove AddressList API calls in **`/js/directives/ordershipping.js`** and/or **`/js/directives/orderbilling.js`**.

> **Note:** These calls are removed in order to avoid excess API calls that do not need to occur.

If you are adding this solution to the shipping section, comment out or remove the following sections from **`/js/directives/ordershipping.js`** 

```javascript
    	AddressList.clear();
		AddressList.shipping(function(list) {
				$scope.shipaddresses = list;
                if (list.length == 1 && !$scope.currentOrder.ShipAddressID) {
                    $scope.currentOrder.ShipAddressID = list[0].ID;
                }
				if ($scope.isEditforApproval) {
					if (!AddressList.contains($scope.currentOrder.ShipAddress))
					$scope.shipaddresses.push($scope.currentOrder.ShipAddress);
				}
			});
``` 

and...
```javascript
    AddressList.shipping(function(list) {
        $scope.shipaddresses = list;
        if ($scope.isEditforApproval) {
            $scope.shipaddresses.push($scope.currentOrder.ShipAddress);
            $scope.shipaddresses.push($scope.currentOrder.BillAddress);
        }
    });
``` 

If you are adding this solution to the billing section, comment out or remove the following from **`/js/directives/orderbilling.js`** 

```javascript
	AddressList.clear();
	AddressList.billing(function(list) {
		$scope.billaddresses = list;
        if (list.length == 1 && !$scope.currentOrder.BillAddressID) {
           $scope.currentOrder.BillAddressID = list[0].ID;
        }
		if ($scope.isEditforApproval) {
			if (!AddressList.contains($scope.currentOrder.BillAddress))
				$scope.billaddresses.push($scope.currentOrder.BillAddress);
		}
	});
``` 

and...

```javascript
    AddressList.billing(function(list) {
        $scope.billaddresses = list;
        if ($scope.isEditforApproval) {
            $scope.billaddresses.push($scope.currentOrder.BillAddress);
        }
    });
``` 



###5. Steps for adding this solution to the Shipping Section
####Updating the **`/partials/controls/orderShipping.html`** file

a.) Comment out or remove the following from **`/partials/controls/orderShipping.html`** 

```html
<div ng-show="shipaddresses" ng-class="{'view-form-select': !currentOrder.ShipAddressID, '': currentOrder.ShipAddressID }">
    <label ng-class="{required: !currentOrder.IsMultipleShip()}" ng-show="currentOrder.ShipAddressID || !currentOrder.IsMultipleShip()">{{('Shipping' | r) + ' ' + ('Address' | r) | xlat}}</label>
        <select class="form-control" name="shippingAddress"
                ng-change="setShipAddressAtOrderLevel()"
                ng-options="address.ID as address.AddressName for address in shipaddresses"
                ng-model="currentOrder.ShipAddressID"
                ng-required="!currentOrder.IsMultipleShip()">
            <option value=""></option>
        </select>
        <i class="fa fa-map-marker"></i>
</div>
```

and replace it with ...

```html
<largeshipaddresssearch></largeshipaddresssearch>
``` 

b.) Comment out or remove the following from **`/partials/controls/orderShipping.html`**

```html
<div ng-show="shipaddressform || (shipaddresses.length == 0 && user.Permissions.contains('CreateShipToAddress'))">
```

and replace it with ...

```html
<div ng-hide="shipaddressform == false || (user.Permissions.contains('CreateShipToAddress'))" ng-show="shipaddressform == true">
```


c.) Also comment out or remove the following from **`/partials/controls/orderShipping.html`** ...

```html
<div ng-hide="shipaddressform || (shipaddresses.length == 0 && user.Permissions.contains('CreateShipToAddress'))">
```

and replace it with ...

```html
<div ng-show="shipaddressform == false || (user.Permissions.contains('CreateShipToAddress'))" ng-hide="shipaddressform == true">
```

###6. Steps for adding this solution to the Billing Section
####Updating the **`/partials/controls/orderBilling.html`** file

a.) Comment out or remove the following from **`/partials/controls/orderBilling.html`** ...

```html
<div class="view-form-icon" ng-show="billaddresses.length > 0">
    <div ng-class="{'view-form-select': !currentOrder.BillAddressID, '': currentOrder.BillAddressID }">
        <label class="required">{{('Billing' | r) + ' ' + ('Address' | r) | xlat}}</label>
        <select class="form-control" ng-show="billaddresses" name="billingAddress"
                ng-options="address.ID as address.AddressName for address in billaddresses | filter:{IsBilling:true}" ng-model="currentOrder.BillAddressID" required>
            <option value=""></option>
        </select>
        <i class="fa fa-map-marker"></i>
    </div>
</div>
```

and replace it with ...

```html
<largebilladdresssearch></largebilladdresssearch>
```

b.) Comment out or remove the following from **`/partials/controls/orderBilling.html`** 

```html
<div ng-show="billaddressform || (billaddresses.length == 0 && user.Permissions.contains('CreateBillToAddress'))">
```

and replace it with ...

```html
<div ng-hide="billaddressform == false || (user.Permissions.contains('CreateBillToAddress'))" ng-show="billaddressform == true">
```

c.) Also comment out or remove the following from **`/partials/controls/orderBilling.html`** 

```html
<div ng-hide="billaddressform || (billaddresses.length == 0 && user.Permissions.contains('CreateBillToAddress'))">
```

and replace it with ...

```html
<div ng-show="billaddressform == false || (user.Permissions.contains('CreateBillToAddress'))" ng-hide="billaddressform == true">
```

>**Note:** Follow both steps 5. and 6. if you are applying this solution to both the Shipping and Billing address


###7. Additional updates for field validation

If you are adding this solution to the shipping section, comment out or remove the following from **`/partials/checkOutView.html`** ...

```html
<li ng-if="cart_shipping.shippingAddress.$invalid">{{'Please choose a ' + ('Shipping' | rl) + ' ' + ('Address' | rl) | xlat}}</li>
```

and replace it with ...

```html
<li ng-if="!currentOrder.ShipAddressID">{{'Please enter a ' + ('Shipping' | rl) + ' ' + ('Address' | rl) | xlat}}</li>
```

If you are adding this solution to the billing section, comment out or remove the following from **`/partials/checkOutView.html`** ...

```html
<li ng-if="cart_billing.billingAddress.$invalid">{{'Please choose a ' + ('Billing' | rl) + ' ' + ('Address' | rl) | xlat}}</li>
```

and replace it with ...

```html
<li ng-if="!BillAddressID">{{'Please enter a ' + ('Billing' | rl) + ' ' + ('Address' | rl) | xlat}}</li>
```

##Usage

If you would like to change what displays within the typeahead dropdown when searching for addresses, adjust the "as" portion of the typeahead attribute on the directive's template HTML (found in the **`largeAddressListSearch.js`** module file). 

>For example, if you'd only like the Address Line 1 to display for shipping addresses, the typeahead attribute would read:

```html
    typeahead="address as (address.Street1) for address in shipaddresses"
```
