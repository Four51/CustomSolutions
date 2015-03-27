#Back to Top for OrderCloud

This module provides the user with the ability to add a button to the bottom right of the page that will return them to the top of the page.

##Setup
###1. Add module file to your project.
Add the **`backToTop.js`** file to your project.

If you are using a repository, add this file to the **`/lib`** directory.

If you are using file overrides, create a new file override named **`lib/backToTop.js`** and add this file as the content for that file.

**Be sure to reference the JS file in the `index.html` file**

###2. Load the module into the application.
Add a dependency for `OrderCloud-BackToTop` to the Four51.app module in the **`js/app.js`** file.

##Usage
###1. Add the directive to the page

We recommend adding the directive to the index file so that the button is available on each page.

```html
    <back-to-top offsetbottom="30" offsetright="30" duration="200"></back-to-top>
```

On the directive these are what each of the attributes mean:
    offsetbottom: number of pixels the button will appear from the bottom
    offsetright: number of pixels the button will appear from the right
    duration: amount of time the directive will take in reach the top
