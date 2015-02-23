#Product Matrix for OrderCloud

This module provides a matrix type layout for ordering VBOSS static products. Products utilizing this module must have VBOSS variants using one or two variable selection specs. Additional variable specs can be assigned to the product, but only one or two may be applied to the VBOSS variants. Additional specs will be displayed above the matrix layout.

##Setup
###1. Add module file to your project.
Add the **`productMatrix.js`** file to your project.

If you are using a repository, add this file to the **`/lib`** directory.

If you are using file overrides, create a new file override named **`lib/productMatrix.js`** and add this file as the content for that file.

**Be sure to reference both of this JS file in the `index.html` file**

###2. Load the module into the application.
Add a dependency for `OrderCloud-ProductMatrix` to the Four51.app module in the **`js/app.js`** file.

##Usage
###1. Create a new Product Detail Template within the admin interface

Once created, navigate to the OrderCloud 2.0 tab. Replace the <addtoorderspecs ng-show="allowAddToOrder"></addtoorderspecs> line with the following:

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

###2. Apply Product Detail Template to product(s)

Your newly created Product Detail Template can be assigned to any products requiring the Product Matrix. Ensure all products it is assigned to have VBOSS variants created using one or two variable selection specs.

Optional Total Min and Total Max Static Specs can be created for the product. These will only be considered if the product does not have a min and/or max quantity set within the price schedule.
Custom Static Text Specs should be created under a spec group named "Matrix". For total min quantity, name the spec "MinQty". For total max quantity, name the spec "MaxQty".
If the price schedule has a min or max quantity assigned, a quantity greated than/less than that value will be required for each variant within the product. However, if those values are not assigned
and the custom static specs described above exist, the user must fill out a TOTAL quantity greater than or less than the MinQty or MaxQty.

