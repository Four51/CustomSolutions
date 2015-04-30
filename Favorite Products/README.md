#Favorite Products for OrderCloud  
#####_(In Development)_

This module provides the user the ability to display a list of favorite products on their website. The directive displays a heart icon that when clicked on turns red. This will add the product ID(s) to a custom user field which can then be referenced to display Favorite Products. 

###Setup
#####1. Add module file to your project.
Add the **`favoriteProducts.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/favoriteProducts.js`** and add this file as the content for that file.

**Be sure to reference the JS file in the `index.html` file**

#####2. Load the module into the application.
Add a dependency for `OrderCloud-FavoriteProducts` to the Four51.app module in the **`js/app.js`** file.

###Usage
#####1. Create a custom user field named `FavoriteProducts` and assign it to a company, group, or user.

#####2. Add the directive to the product detail template ~~and/or `partials/controls/shortProductView.html`~~.

```html
    <favoriteproduct></favoriteproduct>
```
