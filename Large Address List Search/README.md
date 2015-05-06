#Large Address List Search for OrderCloud

This is an overview of how to implement the Large Address List Search solution for an OrderCloud 2.0 site. 
This solution can be used if a buyer site has more than 100 shipping and/or billing addresses. 
Since the API limits results to 100, a site that has more shipping/billing addresses than this will not see their entire list. 
This solution allows the user to search for a desired address from the large list, without obtaining all addresses before hand.

##Setup
This module utilizes UI Bootstrap 0.10.0. We recommend replacing the application default script with the script provided here to avoid errors due to a UI Bootstrap bug. 

###1. Replace the UI Boostrap script **`ui-bootstrap-tpls-0.10.0.js`** in your project. 
If you are using a repository, add this file to the **`/lib/angular_ui`** directory.
If you are using file overrides, create a new file override named **`lib/angular_ui/ui-bootstrap-tpls-0.10.0.js`**.


###2. Replace the UI Boostrap script reference in the index.html file.
In **`index.html`** replace ...

```<script src="lib/angular_ui/ui-bootstrap-tpls-0.10.0.min.js" data-group="resources"></script>```

with 

```<script src="lib/angular_ui/ui-bootstrap-tpls-0.10.0.js" data-group="resources"></script>```

###3. Inject **`OrderCloud-LargeAddressListSearch`** into your application.
If you are using a repository for your project, add **`OrderCloud-LargeAddressListSearch`** to the array in **`js/app.js`**.

If you are using file overrides for your project, create a file override for **`/js/app.js`** and add **`OrderCloud-LargeAddressListSearch`** to the array in that file.
    
###4. Add **`largeAddressListSearch.js`** file to your project.

If you are using a repository for your project, add this file to the **`/lib/oc`** directory and also add that path to the **`index.html`** file.

If you are using file overrides for your project, create a new file override named **`/lib/oc/largeAddressListSearch.js`**, 
add this file as the content for that override, then add the file reference to the **`index.html`** file override.


###5. Remove AddressList API calls in **`/js/directives/ordershipping.js`** and/or **`/js/directives/orderbilling.js`**.
If you are adding this solution to the shipping section, comment out or remove the following sections from **`/js/directives/ordershipping.js`** ...

Lines 6-16
```javascript
    AddressList.clear();
    AddressList.shipping(function(list) {
        $scope.shipaddresses = list;
        if ($scope.isEditforApproval) {
            if (!AddressList.contains($scope.currentOrder.ShipAddress))
                $scope.shipaddresses.push($scope.currentOrder.ShipAddress);
        }
    });
``` 

Lines 28-33
```javascript
    AddressList.shipping(function(list) {
        $scope.shipaddresses = list;
        if ($scope.isEditforApproval) {
            $scope.shipaddresses.push($scope.currentOrder.ShipAddress);
        }
    });
``` 

If you are adding this solution to the billing section, comment out or remove the following from **`/js/directives/orderbilling.js`** ...

Lines 6-16
```javascript
    AddressList.clear();
    AddressList.billing(function(list) {
    $scope.billaddresses = list;
    if ($scope.isEditforApproval) {
        if (!AddressList.contains($scope.currentOrder.BillAddress))
            $scope.billaddresses.push($scope.currentOrder.BillAddress);
    }
    });
``` 

Lines 24-29
```javascript
    AddressList.billing(function(list) {
        $scope.billaddresses = list;
        if ($scope.isEditforApproval) {
            $scope.billaddresses.push($scope.currentOrder.BillAddress);
        }
    });
``` 

These calls are removed in order to avoid excess API calls that do not need to occur.

###6. Replace original address controls with new directives. 

If you are adding this solution to the shipping section, comment out or remove the following from **`/partials/controls/orderShipping.html`** ...

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

and replace it with:

```html
<largeshipaddresssearch></largeshipaddresssearch>
```

If you are adding this solution to the billing section, comment out or remove the following from **`/partials/controls/orderBilling.html`** ...

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

If you would like to change what displays within the typeahead dropdown when searching for addresses, adjust the "as" portion of the typeahead attribute on the directive's template HTML. 
For example, if you'd only like the Address Line 1 to display for shipping addresses, the typeahead attribute would read:

```html
    typeahead="address as (address.Street1) for address in shipaddresses"
```

###7. Accomodate for changes in display of New Address button.
Comment out ore remove the following from **`/partials/controls/paymentSelection.html`**.

Line 28-32
```html
<button class="btn btn-info pull-right" type="button"
        ng-hide="(billaddressform || (!addressform && (addresses | filter:{IsBilling:true}).length == 0) || !user.Permissions.contains('CreateBillToAddress'))"
        ng-click="billaddressform = true">
    {{('New' | r) + ' ' +  ('Address' | r) | xlat}}
</button>
```
