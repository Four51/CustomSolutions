#Breadcrumbs for OrderCloud 

This solution produces a breadcrumb of categories and sub categories as users navigate through the category tree.

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/Breadcrumbs).

##Setup

###1. Add the module file to your project

Add the **`breadcrumbs.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/breadcrumbs.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file `lib/oc/breadcrumbs.js`
 5. Place raw code in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps:

 1. In Code Editor, locate your `index.html` file, hit edit.
 2. Add **`<script src="lib/oc/breadcrumbs.js" data-group="resources"></script>`** in the section with “lib/oc” files. Save.

###2. Load the module into your application.
Add a dependency for  **`OrderCloud-Breadcrumbs`** to the Four51.app module in the **`js/app.js`** file by following these steps: 

 1. In Code Editor, locate your **`js/app.js`** file, hit edit.
 2. Add **'OrderCloud-Breadcrumbs'** into the file. Save


##Usage
###1. Update the product.js file
Locate the  **`js/directives/product.js`** file and comment out the below section:


```html
 four51.app.directive('productnav', function() {
	var obj = {
		scope: {
			product: '=',
			variant: '=',
			editvariant: '='
		},
		restrict: 'E',
		templateUrl: 'partials/controls/productNav.html'
	};
	return obj;
});
```


###2. Add the 'breadcrumbs' directive

 1. In Code Editor, locate your `partials/categoryView.html` file, hit edit.
 2. Add the breadcrumbs directive in the `<nav id="451qa_nav_hdr" class="nav">` section.  Reference the code below for where to place the directive `<breadcrumbs></breadcrumbs>`.

```html
    <nav id="451qa_nav_hdr" class="nav">
        <ul>
            <li class="hidden-sm hidden-xs">
                <span ng-click="toggleNav()"><i class="fa fa-bars" ng-class="{ 'text-info': navStatus.visible }"></i></span>
            </li>
            <li>
                <span id="451_lbl_curcat" class="text-primary" ng-bind-html="currentCategory.Name || '  {{'Categories' | r | xlat}}'"></span>
            </li>
            <li>
                <breadcrumbs></breadcrumbs>
            </li>
            <li class="pull-right">
                <a href="search">
                    <span><i class="fa fa-search text-primary"></i></span>
                </a>
            </li>
        </ul>
    </nav>
```
