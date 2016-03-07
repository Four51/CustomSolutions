#Category Modal for OrderCloud

This module provides the user the ability to add a Category link in the top navigation, which opens a modal window listing the categories once clicked upon.

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/CategoryModal).

##Setup

####1. Add module file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/categoryModal.js`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`lib/oc/categoryModal.js`**
5. Place raw code from categoryModal.js in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the index.html file by following these steps:

1. In Code Editor, locate your index.html file; hit edit.
2. Add `<script src="lib/oc/categoryModal.js" data-group="resources"></script>` in the section with “lib/oc” files. Save.

####2. Load the module into the application

Add a dependency for `OrderCloud-CategoryModal` to the Four51.app module in the **`js/app.js`** file by following these steps:

1. In Code Editor, locate your **`js/app.js`** file; hit edit.
2. Add **‘OrderCloud-CategoryModal’** into the file. Save.

##Usage

####1. Place the directive in the application

 1. In Code Editor, locate the **partials/controls/nav.html** file.
 2. Place the below code where you would like the "Category" link to appear in the top nav.  

```html
<li>
<categorymodal></categorymodal>
</li>
```

For your reference, we have placed it directly after this section (after the home link):

```html
<li class="products" ng-class="{'active': isInPath('catalog') || isInPath('product') || isInPath('cart/default') || isInPath('search')}">
	<a id="451qa_home_link" ng-show="Four51User.isAuthenticated()" href="catalog">
		<i class="fa fa-home"></i>
		<span class="hidden-xs">{{'Products' | rc | xlat}}</span>
	</a>
</li>
```

####2. Customize the modal window.

The color, text style, and size can all be customized in the categoryModal.js file. You can also add a coordinating icon in the navigation using the icon selection found in the  [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/) library.  This can all be customized to your needs using basic html and css. 

> **Note:** to use the newer version of Font Awesome icons, paste the link below into your index.html file in the **`<head>`** section after the css.
> ```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
``` 
