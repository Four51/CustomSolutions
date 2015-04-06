##Setup
###1. Add module file to your project.
Add the **`ProductSearchInput.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/ProductSearchInput.js`** and add this file as the content for that file.

**Be sure to reference both of these JS files in the `index.html` file**

###2. Load the module into the application.
Add a dependency for `OrderCloud-ProductSearchInput` to the Four51.app module in the **`js/app.js`** file.

###3. Begin using the directives as you see fit!
`<productsearchinput></productsearchinput>` can be placed anywhere in the application and it generates a simple text input group for searching products.

`<productsearchinputnav></productsearchinputnav>` is meant to be used right before the shopping cart `ul` in the **`partials/controls/nav.html`** template.  This generates a search button to the right of the shopping cart nav item that the user can click on and the search input enters from the top of the screen. Place it right after the shopping cart `ul` to generate a search button to the left of the shopping cart. 

>Feel free to use these directives in tandem, but be careful to not duplicate functionality on the same view!  For instance, you could display the regular `<productsearchinput></productsearchinput>` directive on desktop views while giving users on mobile devices the `<productsearchinputnav></productsearchinputnav>` to conserve screen space.
