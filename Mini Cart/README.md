#MiniCart for OrderCloud 

This module contains a mini cart add-on which provides a small version of a user's shopping cart to appear upon mouse-over of the cart icon in the nav. 

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/MiniCart)
##Setup

####1. Add MiniCart module file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/minicart.js`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`lib/oc/minicart.js`**
5. Place raw code from minicart.js in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the index.html file by following these steps:

1. In Code Editor, locate your index.html file; hit edit.
2. Add `<script src="lib/oc/minicart.js" data-group="resources"></script>` in the section with “lib/oc” files. Save.

####2. Load the module into the application

Add a dependency for `OrderCloud-Minicart` to the Four51.app module in the **`js/app.js`** file by following these steps:

1. In Code Editor, locate your **`js/app.js`** file; hit edit.
2. Add **‘OrderCloud-Minicart’** into the file. Save.


##Usage


####1. Add the minicart directive to your site

The `<minicart></minicart>` directive can be used anywhere in the app.  One location we recommend is in the **`partials/controls/nav.html`**  file with an overwrite to the default cart icon.  This will place the mini cart in  your top navigation bar where the default cart icon is. 

To place it in this location, locate the `partials/controls/nav.html` file.

Replace:
```html

<ul class="nav navbar-nav pull-right">
	<li class="cart" ng-class="{'active': isActive(['cart', 'checkout'])}">
		<a id="451qa_cart_link" ng-show="(cartCount && cartCount > 0) && user.CurrentOrderID" class="cart" href="cart">
			<span ng-bind="cartCount" class="badge"></span>
			<i class="fa fa-shopping-cart"></i>
			<i class="fa fa-caret-down"></i>
		</a>
	</li>
</ul>
```

with

```html
<ul class="pull-right">
	<minicart></minicart>
</ul>
```

####2. Customize the Mini Cart with CSS

The module CSS is located within the Mini Cart module (minicart.js file).  Any css changes should be made inside the module. 
