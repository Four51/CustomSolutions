#Product Search Input

This module creates a search icon or search bar in the top navigation of a site so that the ability to search is always available, regardless of what page the shopper is on. 

To learn more about this feature and see examples, visit this [page.](https://volition.four51ordercloud.com/store/product/ProductSearchInput)

##Setup
###1. Add module file to your project. 
Add the **`ProductSearchInput.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/ProductSearchInput.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Click “New File Override”
 4. Name this file “lib/oc/ProductSearchInput.js
 5. Place raw code from ProductSearchInput.js  in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the **`index.html`**  file by following these steps:

 1. In Code Editor, locate your index.html file, hit edit. 
 2. Add `<script src="lib/oc/ProductSearchInput.js" data-group="resources"></script>` in the section with “lib/oc” files. Save


###2. Load the module into the application.
Add a dependency for `OrderCloud-ProductSearchInput` to the Four51.app module in the **`js/app.js`** file by following these steps:

 1. In Code Editor, locate your **`js/app.js`** file, hit edit. 
 2. Add **‘OrderCloud-ProductSearchInput’** into the file. Save.


###3. Begin using the directives as you see fit!

Locate the **`partials/controls/nav.html`** file in your in your 2.0 Code Editor.  There are two different directives that you can add to your site to create different search functions. You can choose whether you want to use one function or both functions. 

 1.) Place **`<productsearchinputnav></productsearchinputnav>`** in the `partials/controls/nav.html` file.

 - This directive creates a search icon in the top navigation which opens a search input from the top of the screen over the nav.
 - Placing this directive right before the shopping cart ul creates a search button/icon that is to the right of the shopping cart nav item.  Placing it after the shopping cart ul creates a search button/icon to the left of the shopping cart.

2.) Place**`<productsearchinput></productsearchinput>`**  anywhere in the application. 

 - This directive will add both the search icon and blank text search box in the location you assign the code to.


>**Note:** Feel free to use these directives in tandem, but be careful to not duplicate functionality on the same view.  For instance, you could display the regular `<productsearchinput></productsearchinput>` 
directive on desktop views while giving users on mobile devices the `<productsearchinputnav></productsearchinputnav>` to conserve screen space.
