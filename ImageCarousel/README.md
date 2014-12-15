#Image Carousel for OrderCloud

These are the pieces necessary to create a simple, responsive image slider on an OrderCloud 2.0 site.

##Setup
###1. Create your custom user fields.
In order for the directive to find the right images to pull in, you must create at least 1 custom user field with the following conventions:

* **Name**: ex. 'carouselImage[n]' where [n] is some iterator that differentiates the user fields from themselves (image number)
* **Label**: the label field is where you can put in an URL to an external site (must include http or https) or internal link (catalog/CategotyInteropID)

The user field should be a **File** type.

By default, the image slider is set up to work with images 1168px wide and 523px tall.  If you want a different size image slider, you will need to adjust the CSS in the carousel template accordingly.

###2. Bring in the three relevant files.
Place the `angular-carousel.js` file within the lib/angular/plugins directory.
The `ffoCarousel.html` (the carousel template) goes in the partials/controls directory.
Lastly, the `ffoCarousel.js` file goes in the js/directives directory.

**Be sure to reference both of the JS files in the `index.html`**

###3. Load the module into the application.
Add a dependency for `angular-carousel` to the Four51.app module.

```javascript
'use strict';

var four51 = {};
four51.app = angular.module('451order', ['ngResource', 'ngRoute', 'ngAnimate', 'ngSanitize', 'ngCookies', 'ngTouch', 'ui.validate', 'ui.mask', 'headroom', 'ui.bootstrap', 'angulartics', 'angulartics.google.analytics', 'ngAutocomplete', 'angular-carousel']);
```

###4. Place the slider directive
By adding `<ffo-carousel></ffo-carousel>` anywhere* in the application the image slider will render.

	* It should be noted that the carousel works best when it is the full width of the application on a "contained" layout.

You will have to also include the settings (as attributes) you would like for the 3 configurable pieces:
* **timeout**: how long each slide (in seconds) should last
* **indicators**: true/false value for if you would like indicators
* **controls**: true/false value for if you would like prev/next controls

```html
<ffo-carousel indicators="true" timeout="1" controls="false"></ffo-carousel>
```