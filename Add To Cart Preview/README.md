#Add to Cart Preview for OrderCloud   

This module provides the user the ability to generate a list of multiple line items for one product without leaving the product's spec form. Once all combinations have been created, the user is then able to add the list to their cart.

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/AddToCartPreview).

##Setup
###1. Add module file to your project.
Add the **`addToCartPreview.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/addToCartPreview.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file `lib/oc/addToCartPreview.js`
 5. Place raw code in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps:

 1. In Code Editor, locate your `index.html` file, hit edit. 
 2. Add **`<script src="lib/oc/addToCartPreview.js" data-group="resources"></script>`** in the section with “lib/oc” files.  Save.

###2. Load the module into the application.
Add a dependency for **`OrderCloud-AddToCartPreview`** to the Four51.app module in the **`js/app.js`** file by following these steps:

 1. In Code Editor, locate your **`js/app.js file`**, hit edit. 
 2. Add **‘OrderCloud-AddToCartPreview’** into the file.  Save

##Usage

###1. Set-up your product

 1. Locate product in catalog or create a new product
 2. Go to Variable Specs and create your Variable Specs with Spec Type Selection.
 3. Go to Variants and Generate Variants based on Selection Specs.

 >Note: Multiple Variable Specs may be applied to the product to create the Add to Cart Preview. Make sure to upload an image for each variable if you would like to show the image variations. 

###2. Create a new Product Detail Template within the admin interface

 1. Navigate to ”Product Detail Template” on the left Navigation in Order Cloud Admin.
 2. Go to the OrderCloud 2.0 tab
 3. If a custom Product Detail Template is assigned to the product, modify that template with the Add to Cart Preview code (step 4. below), otherwise create new Product Detail Template. You can name the new template whatever is appropriate for you.  
 4. On your new Product Detail Template replace this section: 

```html
    <button class="btn btn-success btn-block btn-lg" type="button" id="451_btn_orderadd" ng-click="addToOrder()">
        <loadingindicator ng-show="addToOrderIndicator" />
        <i ng-show="lineItemErrors.length > 0" class="fa fa-warning"></i>
        {{addToOrderText | r | xlat}}
        <span id="451qa_lineitem_total" class="badge" ng-if="!(user.Permissions.contains('HidePricing')) && (LineItem.LineTotal || variantLineItemsOrderTotal) > 0">
            {{(LineItem.LineTotal || variantLineItemsOrderTotal) | culturecurrency}}
        </span>
    </button>
```

with the following:

```html
    <addtocartpreview lineitem="LineItem" errors="lineItemErrors" user="user"></addtocartpreview>
```

###3. Apply Product Detail Template to product(s)

Using Product Properties, assign your new/updated Product Detail Template to any products requiring the Add to Cart Preview feature.
