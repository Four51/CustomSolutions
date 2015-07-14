
#Same as Shipping Checkbox for OrderCloud 

This solution creates a checkbox on the billing section of the checkout flow that allows a user to check indicating the billing address is the same as the shipping address that was previously selected. 

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/SameAsShippingCheckbox).  

**Important:** This solution cannot be easily combined with Large Address List Search Solution.  If you want these two solutions together, please contact the Four51 support team.

##Setup

###1. Add the Same as Shipping Checkbox module file to your project

Add the **`sameAsShippingCheckbox.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/sameAsShippingCheckbox.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file `lib/oc/sameAsShippingCheckbox.js`
 5. Place raw code in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps:

 1. In Code Editor, locate your `index.html` file, hit edit.
 2. Add **`<script src="lib/oc/sameAsShippingCheckbox.js" data-group="resources"></script>`** in the section with “lib/oc” files. Save.

###2. Load the module into your application.
Add a dependency for  **`OrderCloud-SameAsShippingCheckbox`** to the Four51.app module in the **`js/app.js`** file by following these steps: 

 1. In Code Editor, locate your **`js/app.js`** file, hit edit.
 2. Add **'OrderCloud-SameAsShippingCheckbox'** into the file. Save

###3. Add the Same As Shipping Checkbox directive

 1. Locate the   **`partials/controls/orderBilling.html`** file
 2. Add **`<sameasshipaddresscheckbox></sameasshipaddresscheckbox>`** after the   **`<billingmessage />`** div tag.

The code should look like this:

```html
<div>
  <billingmessage />
</div>
<sameasshipaddresscheckbox></sameasshipaddresscheckbox>
```


###4. Accommodate for changes in display of the New Address button.
Comment out or remove the following from **`partials/controls/paymentSelection.html`**

```html
<button class="btn btn-info pull-right" type="button"
        ng-hide="(billaddressform || (!addressform && (addresses | filter:{IsBilling:true}).length == 0) || !user.Permissions.contains('CreateBillToAddress'))"
        ng-click="billaddressform = true">
    {{('New' | r) + ' ' +  ('Address' | r) | xlat}}
</button>
```
