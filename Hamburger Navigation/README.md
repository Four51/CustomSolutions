

#Hamburger Navigation for OrderCloud 

This module provides the user the ability to collapse the top navigation icons into a hamburger icon when using a mobile view. 

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/HamburgerNavigation).

##Setup

####1. Add module file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/hamburgerNavigation.js`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`lib/oc/hamburgerNavigation.js`**
5. Place raw code from hamburgerNavigation.js in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the index.html file by following these steps:

1. In Code Editor, locate your index.html file; hit edit.
2. Add `<script src="lib/oc/hamburgerNavigation.js" data-group="resources"></script>` in the section with “lib/oc” files. Save.

####2. Load the module into the application

Add a dependency for `OrderCloud-HamburgerNavigation` to the Four51.app module in the **`js/app.js`** file by following these steps:

1. In Code Editor, locate your **`js/app.js`** file; hit edit.
2. Add **‘OrderCloud-HamburgerNavigation’** into the file. Save.

##Usage

####1. Update the index.html file

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

>Note: If you have added custom items into your navigation, make sure you update those in the JS file so that the custom items will show in the Hamburger Navigation selection. 
