#Security Modal for OrderCloud 

This module provides a modal popup for the "Concerned about Security" button in the checkout summary.

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/SecurityModal).

##Setup

####1. Add the securityModal.js file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/securityModal.js`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`lib/oc/securityModal.js`**
5. Place raw code from securityModal.js in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps:

1. In Code Editor, locate your index.html file; hit edit.
2. Add `<script src="lib/oc/securityModal.js" data-group="resources"></script>` in the section with “lib/oc” files. Save.

####2. Load the module into the application

Add a dependency for `OrderCloud-SecurityModal` to the Four51.app module in the **`js/app.js`** file by following these steps:

1. In Code Editor, locate your **`js/app.js`** file; hit edit.
2. Add **‘OrderCloud-SecurityModal’** into the file. Save.

##Usage

####1. Update the partials/controls/orderSummary.html file

Locate the **`partials/controls/orderSummary.html`** file.

Replace: 
```html
<button class="btn btn-default" redirect="/security">
    <span class="fa fa-info-circle"></span> {{'Concerned About Security?' | r | xlat}}
 </button>
```

with:  
```html
   <securitymodal></securitymodal>
```
