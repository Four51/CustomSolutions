#Image Carousel for OrderCloud

These are the pieces necessary to create a simple, responsive image slider on an OrderCloud 2.0 site.

##Setup
###1. Create your custom user fields.
In order for the directive to find the right images to pull in, you must create at least 1 custom user field with the following conventions:

* **Name**: ex. 'carouselImage[n]' where [n] is some iterator that differentiates the user fields from themselves (image number)
* **Label**: the label field is where you can put in an URL to an external site (must include http or https) or internal link (catalog/CategotyInteropID). **If you do not want a link, enter "None" here.**

The user field should be a **File** type.

###2. Bring in the three relevant files.
* **`angular-carousel.js`** into the lib/angular/plugins directory.
* **`ffoCarousel.js`** into the js/directives directory.

**Be sure to reference both of these JS files in the `index.html`**

**You have a choice between two templates**

* **`ffoCarousel.html`** - this template is for clients who want to explicitly control the carousel's size on each viewport. By default, the image carousel is set up to work with images `1168px wide and 523px tall`.  If you want to work with different image sizes/aspect ratios, you will need to adjust the CSS in the template accordingly.
* **`ffoCarouselFull.html`** - this template is for clients who want their images to drive the carousel size.  Typically for full-width carousels; however, it can be used at any size. The reason for this second template is to allow for a workaround associated with a bug in [angular-carousel](https://github.com/revolunet/angular-carousel/issues/224). **You must rename this file to `ffoCarousel.html` when you bring it into your project**

Whichever template you choose, it should reside in the partials/controls directory **AND BE NAMED `ffoCarousel.html`**.

###3. Load the module into the application.
Add a dependency for `angular-carousel` to the Four51.app module.

```javascript
'use strict';

var four51 = {};
four51.app = angular.module('451order', ['ngResource', 'ngRoute', 'ngAnimate', 'ngSanitize', 'ngCookies', 'ngTouch', 'ui.validate', 'ui.mask', 'headroom', 'ui.bootstrap', 'angulartics', 'angulartics.google.analytics', 'ngAutocomplete', 'angular-carousel']);
```

###4. Place the slider directive
By adding `<ffo-carousel></ffo-carousel>` anywhere in the application the carousel will render.

You will have to also include the settings (as attributes) you would like for the 3 configurable pieces:
* **timeout**: how long each slide (in seconds) should last
* **indicators**: true/false value for if you would like indicators
* **controls**: true/false value for if you would like prev/next controls

```html
<ffo-carousel indicators="true" timeout="1" controls="false"></ffo-carousel>
```
