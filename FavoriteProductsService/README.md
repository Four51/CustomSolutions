#Favorite Products Service for OrderCloud

This module provides the user the ability to display a list of favorite products on their website.

##Setup
###1. Add module file to your project.
Add the **`favoriteProductsService.js`** file to your project.

If you are using a repository, add this file to the **`/lib`** directory.

If you are using file overrides, create a new file override named **`lib/favoriteProductsService.js`** and add this file as the content for that file.

**Be sure to reference the JS file in the `index.html` file**

###2. Load the module into the application.
Add a dependency for `OrderCloud-FavoriteProductService` to the Four51.app module in the **`js/app.js`** file.

##Usage
###1. Add the directive to the page

```html
    <favoriteproduct></favoriteproduct>
```
