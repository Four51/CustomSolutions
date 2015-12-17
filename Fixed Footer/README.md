#Fixed Footer for OrderCloud  

This module allows you to place a fixed footer area in your site. 

To learn more about this feature and see examples, visit this [page]().

##Setup

####1. Add module file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/fixedFooter.js`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`lib/oc/fixedFooter.js`**
5. Place raw code from fixedFooter.js in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the index.html file by following these steps:

1. In Code Editor, locate your index.html file; hit edit.
2. Add `<script src="lib/oc/fixedFooter.js" data-group="resources"></script>` in the section with “lib/oc” files. Save.

####2. Load the module into the application.

Add a dependency for `OrderCloud-FixedFooter` to the Four51.app module in the **`js/app.js`** file by following these steps:

1. In Code Editor, locate your **`js/app.js`** file; hit edit.
2. Add **‘OrderCloud-FixedFooter’** into the file. Save.

##Usage

####1. Update the index.html file

Under this section:
find:
```html
<section class="hidden-print">
    <copyright ng-if="!user.Permissions.contains('UnBrandedSite')" />
</section>
```
add below: 
```html
<section class="hidden-print">
	<fixedfooter />
</section>
```

####2. Comment out the existing `<orderbuttons>` directive.

Normally, the cart and checkout views have buttons fixed to the bottom. 
With a fixed footer, we want to reposition and restyle these buttons within the module.

1. In Code Editor, locate your index.html file; hit edit.
2. Find `<script src="js/directives/orderbuttons.js" data-group="resources"></script>` at the bottom of the page and comment out. 

find:
```html
<script src="js/directives/orderbuttons.js" data-group="resources"></script>
```
```
replace: 
```html
<!--<script src="js/directives/orderbuttons.js" data-group="resources"></script>-->
```

####3. Optionally, add the date & time `moments.js` library.

In 1.0, a date & time can be provided in the footer. Optionally, include the `moments.js` library for date/time options. 

1. In Code Editor, locate your index.html file; hit edit.
2. Add `<script src="lib/moments.js" data-group="resources"></script>` in the section with “lib/” files. Save.

