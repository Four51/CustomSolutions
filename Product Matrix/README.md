#Product Matrix for OrderCloud  

This module provides a matrix type layout for ordering Variants Based on Selection Specs (VBOSS) static products. Products utilizing this module must have VBOSS variants using one or two variable selection specs. Additional variable specs can be assigned to the product, but only one or two may be applied to the VBOSS variants. Additional specs will be displayed above the matrix layout.

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/ProductMatrix).

##Setup
###1. Add module file to your project.
Add the **`productMatrix.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/productMatrix.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file lib/oc/productMatrix.js
 5. Place raw code from productMatrix.js in the section below. Save.

**Important!** Be sure to reference the new/updated file in the **`index.html` ** file by following these steps:

 1. In Code Editor, locate your **`index.html`** file, hit edit. 
 2. Add `<script src="lib/oc/productMatrix.js" data-group="resources"></script>` in the section with “lib/oc” files. Save


###2. Load the module into the application.
Add a dependency for `OrderCloud-ProductMatrix` to the Four51.app module in the **`js/app.js`** file by following these steps:

 1. In Code Editor, locate your **`js/app.js`** file, hit edit. 
 2. Add **‘OrderCloud-ProductMatrix’** into the file. Save.


##Usage
###1. Set-up your product

 1. Locate product in catalog or create a new product
 2. Go to Variable Specs and create your Variable Specs with Spec Type Selection. 
 3. Go to Variants and Generate Variants based on Selection Specs
 
>**Note:** Multiple Variable Specs may be applied to the product, but only one or two may be applied to the VBOSS variants to create the matrix

###2. Create a new Product Detail Template within the admin interface.

 1. Navigate to ”Product Detail Template” on the left navigation in Order Cloud Admin 
 2. Go to the OrderCloud 2.0 tab
 3. If a custom Product Detail Template is assigned to the product, modify that template
    with the ProductMatrix code (step 4. below), otherwise create a new
    Product Detail Template. You can name the new template whatever is
    appropriate for you.
 4. On your new Product Detail Template, replace the `<addtoorderspecs ng-show="allowAddToOrder"></addtoorderspecs>` and the entire `<div class="form-group"></div>` section below it (approximately 25 lines of code) with the following:

```html
    <div id="451_list_vspec">
        <div class="form-group" ng-repeat="s in LineItem.Specs | definesvariant | onproperty:[{Property: 'CanSetForLineItem', Value: true}]">
            <customfilefield customfield="s" ng-if="s.ControlType == 'File'"></customfilefield>
            <customtextfield customfield="s" ng-if="s.ControlType == 'Text'"></customtextfield>
            <customselectionfield change="specChanged" customfield="s" ng-if="s.ControlType == 'Selection'"></customselectionfield>
        </div>
    </div>
    <productmatrix></productmatrix>
```

###2. Apply Product Detail Template to product(s).

Using Product Properties, assign your new/updated Product Detail Template to any products requiring the Product Matrix that have 1-2 variable specs.

##Additional Information

A Total Min and Total Max functionality can be set on the product and it's variants using a Static Spec

 - If the price schedule for the product has a min or max quantity assigned, a quantity greater than/less than that value will be required for each variant within the product.
 - If Total Min and Total Max thresholds are desired on the product on a non-variant basis, then you will need to create a Custom Static Text Spec.

Use these specs to set-up your Static Spec table:
<table><tr><th>Static Spec Group Name</th><th>Static Spec Name</th><th>Static Spec Type</th><th>Value</th></tr><tr><td>Matrix</td><td>MinQty</td><td>Text</td><td># representing minimum quantity</td></tr><tr><td>Matrix</td><td>MaxQty</td><td>Text</td><td># representing maximum quantity</td></tr></table>
**Tip:** Make these specs non-visible to customer

Now the customer must fill out a TOTAL quantity across all variants greater than or less than the MinQty or Max Qty.
