#Decrementing Coupon Balance Checker for OrderCloud

This module provides the user the ability to check the balance on a decrementing coupon type.

To learn more about this feature and see examples, visit this [page]().

##Setup
#### 1. Add module file to your project.

Add the **`coupon.js`** file to your project.

If you are using a repository, add this file to the  **`/lib/oc`** directory.

If you are using file overrides,  create a new file override named **`lib/oc/coupon.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file **`lib/oc/coupon.js`**
 5. Place raw code from **`coupon.js`**  in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps:

1. In Code Editor, locate your index.html file; hit edit. 
2. Add `<script src="lib/oc/coupon.js" data-group="resources"></script>` in the section with “lib/oc” files. Save.

####2. Comment out the existing `couponService.js` file.

1. In Code Editor, locate your **`index.html`** file; hit edit.
2. Find `<script src="js/services/couponService.js" data-group="source"></script>` at the bottom of the page and comment out. 

Example of commenting out: 

```html
Replace:
<script src="js/services/couponService.js" data-group="source"></script>

with: 
<!--<script src="js/services/couponService.js" data-group="source"></script>-->
```

#### 3. Load the module into the application.

Add a dependency for `OrderCloud-Coupon` to the Four51.app module in the  **`js/app.js`** file by following these steps:

 1. In Code Editor, locate your **`js/app.js`** file; hit edit. 
 2.  Add **‘OrderCloud-Coupon’** into the file. Save.


##Usage

#### 1. 

