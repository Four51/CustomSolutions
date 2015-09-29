#Content Modal for OrderCloud  

This module provides a modal popup content of your choice in any location on your site. 

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/ContentModal).

##Setup

####1. Add module file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/contentModal.js`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`lib/oc/contentModal.js`**
5. Place raw code from contentModal.js in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps:

1. In Code Editor, locate your index.html file; hit edit.
2. Add `<script src="lib/oc/contentModal.js" data-group="resources"></script>` in the section with “lib/oc” files. Save.

####2. Load the module into the application

Add a dependency for `OrderCloud-ContentModal` to the Four51.app module in the **`js/app.js`** file by following these steps:

1. In Code Editor, locate your **`js/app.js`** file; hit edit.
2. Add **‘OrderCloud-ContentModal’** into the file. Save.

##Usage

####1. Place the directive anywhere in the application

Place the directive below anywhere in the application where you would like the Content Modal to appear. 
```html
<li>
	<contentmodal></contentmodal>
</li>
```

To place the modal window in the top nav of your site, like in our demonstration on Volition, follow the steps below:

 - Locate the **`partials/controls/nav.html`** file. 
 - Place the directive  **`<contentmodal></contentmodal>`** after the last nav item (pulled left), and before your shopping cart (pulled right). Your code should look something like this:

 
```html
...
			<li ng-if="AppConst.debug">
				<a href="#" ng-click="Clear()">
					<i class="fa fa-archive"></i>
					<span class="text-nav">Clear Cache</span>
				</a>
			</li>
        </ul>
	</li>
	<li>
            <contentmodal></contentmodal>
	</li>
</ul>
<ul class="nav navbar-nav pull-right">
	<li class="cart" ng-class="{'active': isActive(['cart', 'checkout'])}">
	    <a id="451qa_cart_link" ng-show="(cartCount && cartCount > 0) && user.CurrentOrderID" class="cart" href="cart">
	        <span ng-bind="cartCount" class="badge"></span>
	        <i class="fa fa-shopping-cart"></i>
            <i class="fa fa-caret-down"></i>
	    </a>
	</li>
</ul>
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

####2. Customize the content of your modal window.

All of the content of your modal window can be customized in the contentModal.js file. Currently, you will find Lorem Ipsum text, "Open Modal" label in the top navigation bar with an info icon, and buttons for Cancel and Close to exit out of the window. This can all be customized to your needs using basic html. 
