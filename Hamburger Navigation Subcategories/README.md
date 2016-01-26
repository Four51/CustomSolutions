#Hamburger Navigation for OrderCloud

This is the new and improved Hamburger Navigation. This module provides the user the ability to collapse the top navigation icons into a hamburger icon when using a mobile view. This version of the module also auto-closes open categories once clicked upon. 

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/HamburgerNavigationSubcategories).

##Setup

####1. Add module file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/hamburgerNavigation.js`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`lib/oc/hamburgerNavigation.js`**
5. Place raw code from hamburgerNavigation.js in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps:

1. In Code Editor, locate your **`index.html`** file; hit edit.
2. Add `<script src="lib/oc/hamburgerNavigation.js" data-group="resources"></script>` in the section with “lib/oc” files. Save.

####2. Load the module into the application

Add a dependency for `OrderCloud-HamburgerNavigation` to the Four51.app module in the **`js/app.js`** file by following these steps:

1. In Code Editor, locate your **`js/app.js`** file; hit edit.
2. Add **‘OrderCloud-HamburgerNavigation’** into the file. Save.

##Usage

####1. Update the index.html file
In Code Editor, locate the **`index.html`** file.

Replace: 
```html
<section class="hidden-print">
	<navigation />
</section>
```
with: 
```html
<section class="hidden-print hidden-xs">
	<navigation />
</section>
        
<section class="hidden-print">
	<hamburgernavigation />
</section>
```

####2. Comment out the existing `<categorytree>` directive.
Now add an extra function to close the hamburger navigation when a subcategory is clicked upon. 

1. In Code Editor, locate your **`index.html`** file; hit edit.
2. Find `<script src="js/directives/tree.js" data-group="source"></script>` at the bottom of the page and comment out. 

Example of commenting out: 

```html
Replace:
<script src="js/directives/tree.js" data-group="source"></script>

with: 
<!--<script src="js/directives/tree.js" data-group="source"></script>-->
```


####3. Customize the Hamburger Navigation with CSS
The module CSS is located within the Hamburger Navigation module (hamburgerNavigation.js).  Any CSS changes should be made inside the module. 

>Note: If you have added custom items into your navigation, make sure you update those in the JS file so that the custom items will show in the Hamburger Navigation selection. 
