#Back to Top for OrderCloud

This module provides the user with the ability to add a dynamically appearing arrow button to the bottom right of the page that will return them to the top of the page.

###Setup
#####1. Add module file to your project.
Add the **`backToTop.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/backToTop.js`** and add this file as the content for that file.

**Be sure to reference the JS file in the `index.html` file**

#####2. Load the module into the application.
Add a dependency for `OrderCloud-BackToTop` to the Four51.app module in the **`js/app.js`** file.

###Usage
#####1. Add the directive to the index.html file

>**Note:** We recommend adding the directive to the index file underneath the last ending `</section>` tag so that the button is available on each page.

```html
    <backtotop offsetbottom="30" offsetright="30" duration="200"></backtotop>
```

On the directive these are what each of the attributes mean:

* offsetbottom: number of pixels the button will appear from the bottom
* offsetright: number of pixels the button will appear from the right
* duration: amount of time the directive will take in reach the top

---
<sub><sup>Last Update: 4/17/15</sup></sub>
