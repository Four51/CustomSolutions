#Product Zoom for OrderCloud

This module provides the user the ability to create a hover zoom image on a product.

##Setup
###1. Add module file to your project.
Add the **`productZoom.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/productZoom.js`** and add this file as the content for that file.

**Be sure to reference the JS file in the `index.html` file**

###2. Load the module into the application.
Add a dependency for `OrderCloud-ProductZoom` to the Four51.app module in the **`js/app.js`** file.

##Usage
###1. Create a new Product Detail Template within the admin interface

Once created, navigate to the OrderCloud 2.0 tab. Replace this section:

```html
    <img id="451_img_prod_lg" class="product-image-large img-responsive" ng-src="{{LineItem.Variant.PreviewUrl || LineItem.Variant.LargeImageUrl || LineItem.Product.LargeImageUrl}}" imageonload />
```

with the following:

```html
    <productzoom lineitem="LineItem"></productzoom>
```

###2. Apply Product Detail Template to product(s)

Your newly created Product Detail Template can be assigned to any products requiring Product Zoom.
