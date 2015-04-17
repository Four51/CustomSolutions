#Product Zoom for OrderCloud 

This module provides the user the ability to create a hover zoom image on a product.

>**Note:** The current plugin code will only be officially "licensed" when using the domain "four51ordercloud.com". If using this on TEST/QA/STAGING, it will still work, but will show as an "unlicensed JetZoom Product". If a new domain needs to set up for this plugin, it can be done from Four51's Star Plugins Account.

##Setup
###1. Add module file to your project.
Add the **`productZoom.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/productZoom.js`** and add this file as the content for that file.

**Be sure to reference the JS file in the `index.html` file**

###2. Load the module into the application.
Add a dependency for `OrderCloud-ProductZoom` to the Four51.app module in the **`js/app.js`** file.

##Usage
###1. Create a Static Spec Group named "ProductZoom" with the following required specs:
fadeTm: 750

tintClr: black

tintOpcty: .025

##### Additional optional specs:

autoCircle: autoCircle 

iZoom: iZoom

###2. Create a new Product Detail Template within the admin interface

Once created, navigate to the OrderCloud 2.0 tab. Replace this section:

```html
    <img id="451_img_prod_lg" class="product-image-large img-responsive" ng-src="{{LineItem.Variant.PreviewUrl || LineItem.Variant.LargeImageUrl || LineItem.Product.LargeImageUrl}}" imageonload />
```

with the following:

```html
    <productzoom lineitem="LineItem"></productzoom>
```
Your newly created Product Detail Template can be assigned to any products requiring Product Zoom.

###3. Apply Product Detail Template to product(s)

Your newly created Product Detail Template can be assigned to any products requiring Product Zoom.

***
### Image Recommendations 

#####Thumbnail
* minimum of 300w x 300h, cropped to top, no white space (1)
* All images should retain the same aspect ratio and height (2)
* Minimum of 72dpi

* If a product has multiple sides, use the cover image only for the thumbnail.
* Additional detail can be provided via the large image

#####Large
* minimum of 500w x 500h, cropped to top, no white space (1)
* Minimum of 72dpi

#####Large - Front/back images 
* crop left/right not top/bottom (the page will get too long) 

#####Large - Multiple folds 
* crop left to right

#####Large - Product Zoom (replaces large image)
* minimum of 1000w, cropped to top, no white space
* Minimum of 72dpi

>**Notes**
* (1) white space can be added via css and shouldn't be added to the image for consistency. 
* (2) maintaining a consistent height and width for the thumbnail (i.e. category, product list views) is preferable to avoid additional css considerations. 

