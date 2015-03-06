#Bootstrap Carousel

This module provides an overview of how to implement the Bootstrap Carousel for an OrderCloud 2.0 site.

##Setup

###1. Add the carousel.html and carousel.js files to your 2.0 application. 
I would suggest placing the files like so
  -- lib/angular/plugins/
      -- carousel.js
  -- partials/controls/
      -- carousel.html
      
##2. Add the pathname to your index.html file
Inside the body tag of your index file (somewhere with all the other script tags) you need to add the paths to the javascript file you just added in step one.
In general it will look like this:
```html
<script src="lib/angular/plugins/carousel/carousel.js" data-group="source"></script>
```
Note: If you changed the location from the suggestion in step on you need to also change the path in the carousel.js file.
This path is found in the CarouselDirective function and it needs to look something like this
```javascript
templateUrl: 'your pathname here',
```
You the code available by default as a guide

##3. Load the module into the application
Add a dependency for 'carousel' to the Four51.app module in the **`js/app.js`** file.
To do this you should just add the string 'carousel' with the quotations to the large array.

##4. Placing the carousel where you want it in the application
Add the directive <custom-carousel></custom-carousel> wherever you would like a carousel. We recommend adding it inside the branding.html file.

##Admin Side Setup

##Create custom slides
Slides are created by creating a custom user field on the admin site that needs to be named 'carouselImage' followed by the number corresponding the the order you want that slide to appear.
For example: My first slide would be called 'carouselImage1'

The user field needs to be of type file (in the dropdown) and the checkbox for image should be selected.
The file uploaded should be the exact image you want to appear in the carousel. It is recommended that all images that are uploaded for the carousel have the same dimensions and resolution.
Also the carousel will resize itself based on the size of the container class the directive is placed in, so uploading an image that is too small sould cause the image to be stretched. 

##Adding links to slides
Your input for the Label field of the user field will determine the type of link on your applicaiton.
For an external link (clicking on the slider will cause the brower to open an new tap) include http in your url. Basically use the full url. An example would be if you wanted to link to your companies public site.

For an internal link (clicking on the slider will navigate to somewhere within the four51 application, remove the http://store.four51.com/YourStoreName/ from the URL.
For example linking to a product would be "product/productID" or to a catagory "catalog/catagoryID"
For no link write 'none' (no quotation marks) into the label field.

##Adding text to slides
Any text you write in the Upload Instructions box will be displayed on top of the slide
For no text again write 'none' (no quotation marks)

##Setting a custom interval for your carousel
The default interval for the slides to switch at is 5 seconds. To change this, under custom user fields again create a new user field called 'carouselInterval'.
This field should be a text field. Set the Default Value to the time (in seconds) you would like it to take before the carousel auto-rotates.
Setting this to zero will prevent the slider from auto-rotating.
