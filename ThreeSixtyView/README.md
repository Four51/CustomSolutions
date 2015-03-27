#360 View for OrderCloud

This module provides the user the ability to create a 360 degree view on a product.

##Setup
###1. Add module file to your project.
Add the **`threesixtyview.js`** file to your project.

If you are using a repository, add this file to the **`/lib`** directory.

If you are using file overrides, create a new file override named **`lib/threesixtyview.js`** and add this file as the content for that file.

**Be sure to reference the JS file in the `index.html` file**

###2. Load the module into the application.
Add a dependency for `OrderCloud-ThreeSixtyField to the Four51.app module in the **`js/app.js`** file.

##Usage
###1. First you will need to add all of your images to the product
Do this under Static Specs
Create a group called threesixty and add your images as custom file fields under that group.

###2. Create a new Product Detail Template within the admin interface

Once created, navigate to the OrderCloud 2.0 tab. Replace this section:

```html
    <img id="451_img_prod_lg" class="product-image-large img-responsive" ng-src="{{LineItem.Variant.PreviewUrl || LineItem.Variant.LargeImageUrl || LineItem.Product.LargeImageUrl}}" imageonload />
```

with the following:

```html
    <threesixtyfield p="LineItem.Product"></threesixtyfield>
```

###3. Apply Product Detail Template to product(s)

Your newly created Product Detail Template can be assigned to any products requiring Product Zoom.