#Product Lightbox for OrderCloud 

This module provides the user the ability to create a gallery of lightbox images for static or variable products.

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/ProductLightbox).

##Setup
#### 1. Add module file to your project.

Add the **`productLightbox.js`** file to your project.

If you are using a repository, add this file to the  **`/lib/oc`** directory.

If you are using file overrides,  create a new file override named **`lib/oc/productLightbox.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file **`lib/oc/productLightbox.js`**
 5. Place raw code from **`productLightbox.js`**  in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps:

1. In Code Editor, locate your index.html file; hit edit. 
2. Add `<script src="lib/oc/productLightbox.js" data-group="resources"></script>` in the section with “lib/oc” files. Save.

#### 2. Load the module into the application.

Add a dependency for `OrderCloud-ProductLightbox` to the Four51.app module in the  **`js/app.js`** file by following these steps:

 1. In Code Editor, locate your **`js/app.js`** file; hit edit. 
 2.  Add **‘OrderCloud-ProductLightbox’** into the file. Save.


##Usage

#### 1. Create Static Specs for your images.

#### 1a. Static Product Usage

 1. Locate product in catalog or create a new product
 2. Go to Static Specs
 3. Create a Custom Static Spec Group named **LightboxImages** (name must match exactly) with the following specs:
<table><tr><th>Static Spec Group Name</th><th>Static Spec Name</th><th>Static Spec Type</th><th>Value</th></tr><tr><td>LightboxImages</td><td>1</td><td>File</td><td>Upload 1st preferred image</td></tr><tr><td>LightboxImages</td><td>2</td><td>File</td><td>Upload 2nd preferred image</td></tr></table>

 - Name each static spec a number to control the order of the lightbox image gallery thumbnails.
 - If image order is not important to you, name each static spec whatever you wish.

#### 1b. Variable Product Usage

 1. Locate product in catalog or create a new product
 2. Go to Variable Specs
 3. Create a Variable Spec.  Make sure Spec Type is "Selection". For this example, we will use "Color" for the Variable Spec
>**Optional:** If you want a specific value (color) to be the default image, select a default value in your variable spec selection options


 4. Go to Static Specs
 5. Create a Custom Static Spec Group named **LightboxImages** (name must match exactly)
 6. For variable products, each Static Spec Name must correspond with the Variable Selection Spec values.  If your variable is Color, Static Spec Name must match with each of the variable values (ex. if one value of your Color variable is "Yellow", Static Spec Name should be "Yellow")
 7. Create a Static Spec Name with images for all of your Variable Spec values.  All images need to be the same size

Examples of naming conventions:
<table><tr><th>Variable Spec (Selection Spec type)</th><th>Static Spec Group Name</th><th>Static Spec Name</th><th>Static Spec Type</th><th>Value</th></tr><tr><td>Color</td><td>LightboxImages</td><td>Yellow</td><td>File</td><td>Upload yellow image</td></tr><tr><td>Color</td><td>LightboxImages</td><td>Green</td><td>File</td><td>Upload green image</td></tr></table>

 - **Please note**, if your variable spec is something other than Color, you will need to update ***Color*** in the module (file: **`lib/oc/productLightbox.js`**) to reflect the correct variable name.  See the lines below to edit.

```if ($scope.LineItem.Specs && $scope.LineItem.Specs.Color) {```

 ```var varSpecName = "Color";```

  ```$scope.$watch('LineItem.Specs.Color.Value', function(n,o){  ```


###2. Create a new Product Detail Template within the admin interface.

1. Navigate to ”Product Detail Template” on the left navigation in
    Order Cloud Admin 
2. Go to the OrderCloud 2.0 tab
3. If a custom Product Detail Template is assigned to the product, modify that template
    with the ProductLightbox code (step 4. below), otherwise create a new
    Product Detail Template. You can name the new template whatever is
    appropriate for you.
4. On your new Product Detail Template, replace the entire `<div class="panel panel-default"></div>`  with the following:

```html
    <div class="panel panel-default" ng-controller="LightboxCtrl">
        <productlightbox></productlightbox>
    </div>
```

###3. Apply Product Detail Template to product(s).

Using Product Properties, assign your new/updated Product Detail Template to any products requiring the Product Lightbox feature
