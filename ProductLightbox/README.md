#Product Lightbox for OrderCloud

This module provides the user the ability to create a gallery of lightbox images for static or variable products.

A visual example is available at: https://jenras.four51ordercloud.com/albumArt/

Login: four51jen

PW: four51jen0! 

Navigate to the Four51 OrderCloud category. 

##Setup
#### 1. Add module file to your project.

Add the `productLightbox.js` file to your project.

If you are using a repository, add this file to the /lib/oc directory.

If you are using file overrides, create a new file override named `lib/oc/productLightbox.js` and add this file as the content for that file.

Be sure to reference the JS file in the `index.html` file.

#### 2. Load the module into the application.

Add a dependency for `OrderCloud-ProductLightbox` to the Four51.app module in the `js/app.js` file.

##Usage 
#### 1. Create Static Specs for your images.
* The static spec group _MUST_ be "LightboxImages".

#### 1a. Variable Product Usage
* For variable products, name each static spec to correspond with the variable spec value. For example, if your variable spec is Color, then each static spec image name should match each color value.
* If your variable spec is something other than Color, you will need to update line 25 of the module `var varSpecName` to reflect the correct variable name.

```var varSpecName = "Color";```

#### 1b. Static Product Usage
* For static products, name each static spec a number to control the order of the lightbox image gallery thumbnails. 
* If you don't care about the order, name them whatever you wish.

###2. Create a new Product Detail Template within the admin interface.

Once created, navigate to the OrderCloud 2.0 tab. Replace the entire `<div class="panel panel-default"></div>` (lines 7-33) with the following:

```html
    <div class="panel panel-default" ng-controller="LightboxCtrl">
        <productlightbox></productlightbox>
    </div>
```

###3. Apply Product Detail Template to product(s).

Your newly created Product Detail Template can be assigned to any products requiring the Product Lightbox.

