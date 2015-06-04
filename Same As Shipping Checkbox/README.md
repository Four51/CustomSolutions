#Same as Shipping Checkbox for OrderCloud

This is an overview of how to implement the Same as Shipping Checkbox solution for an OrderCloud 2.0 site. 


##Setup

###1. Inject **`OrderCloud-SameAsShippingCheckbox`** into your application.
If you are using a repository for your project, add **`OrderCloud-SameAsShippingCheckbox`** to the array in **`js/app.js`**.

If you are using file overrides for your project, create a file override for **`/js/app.js`** and add **`OrderCloud-SameAsShippingCheckbox`** to the array in that file.
    
###2. Add **`sameAsShippingCheckbox.js`** file to your project.

If you are using a repository for your project, add this file to the **`/lib/oc`** directory and also add that path to the **`index.html`** file.

If you are using file overrides for your project, create a new file override named **`/lib/oc/sameAsShippingCheckbox.js`**, 
add this file as the content for that override, then add the file reference to the **`index.html`** file override.


###3. In **`/partials/controls/orderBilling.html`**, add the directive below the **`<billingmessage />`** div. 

```html
<div>
  <billingmessage />
</div>
<sameasshipaddresscheckbox></sameasshipaddresscheckbox>
```

###4. Accomodate for changes in display of New Address button.
Comment out ore remove the following from **`/partials/controls/paymentSelection.html`**.

```html
<button class="btn btn-info pull-right" type="button"
        ng-hide="(billaddressform || (!addressform && (addresses | filter:{IsBilling:true}).length == 0) || !user.Permissions.contains('CreateBillToAddress'))"
        ng-click="billaddressform = true">
    {{('New' | r) + ' ' +  ('Address' | r) | xlat}}
</button>
```
