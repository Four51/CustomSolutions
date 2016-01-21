#Fixed Footer for OrderCloud  

This module allows you to place a fixed footer area in your site. 

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/FixedFooter).

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

 In Code Editor, find this section in the index.html file:
```html
<section class="hidden-print">
    <copyright ng-if="!user.Permissions.contains('UnBrandedSite')" />
</section>
```
Add this new section right below it: 
```html
<section class="hidden-print">
	<fixedfooter />
</section>
```


####2. Comment out the existing `<orderbuttons>` directive.

Normally, the cart and checkout views have buttons fixed to the bottom.  With a fixed footer, we want to reposition and restyle these buttons within the module.

1. In Code Editor, locate your index.html file; hit edit.
2. Find `<script src="js/directives/orderbuttons.js" data-group="source"></script>` near the bottom of the page.
3. Either remove or comment out this script. 

Example of commenting out:
```html
replace: 
<script src="js/directives/orderbuttons.js" data-group="source"></script>

with:
<!--<script src="js/directives/orderbuttons.js" data-group="source"></script>-->
```
####3. Customize the Fixed Footer with CSS
The module CSS is located within the Fixed Footer module (fixedFooter.js).  Any CSS changes should be made inside the module.  With CSS you can add text to the footer, link the social media icons to your pages, or add new icons.  A directory of icons that work seamlessly with our app can be found [here](https://fortawesome.github.io/Font-Awesome/icons/). 
