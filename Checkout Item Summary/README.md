#Checkout Item Summary for OrderCloud 

This module provides the user the ability to add a collapsible item list to the Checkout Summary. 
To learn more about this feature and see examples, visit this [page](https://jenRas.Four51OrderCloud.com/checkoutItemSummary).

##Setup

####1. Add module file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/checkoutItemSummary.js`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`lib/oc/checkoutItemSummary.js`**
5. Place raw code from checkoutItemSummary.js in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the index.html file by following these steps:

1. In Code Editor, locate your index.html file; hit edit.
2. Add `<script src="lib/oc/checkoutItemSummary.js" data-group="resources"></script>` in the section with “lib/oc” files. Save.

####2. Load the module into the application

Add a dependency for `OrderCloud-CheckoutItemSummary` to the Four51.app module in the **`js/app.js`** file by following these steps:

1. In Code Editor, locate your **`js/app.js`** file; hit edit.
2. Add **‘OrderCloud-CheckoutItemSummary’** into the file. Save.

##Usage

####1. Update the partials/controls/orderSummary.html file

Replace: 
```
<p>
    <span class="text-info">{{'Items' | r | xlat}}</span>
    <span class="pull-right">{{currentOrder.LineItems.length}}</span>
</p>
```

with: `<checkoutitemsummary></checkoutitemsummary>` 