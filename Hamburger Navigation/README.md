#Hamburger Navigation for OrderCloud

This module utilizes OrderCloud's Reporting services in order to obtain order history data to be used for additional solutions.

##Setup
###1. Add module file to your project.
Add the **`hamburgerNavigation.js`** file to your project.

If you are using a repository, add this file to the **`/lib`** directory.

If you are using file overrides, create a new file override named **`lib/oc/hamburgerNavigation.js`** and add this file as the content for that file.

**Be sure to reference both of these JS files in the `index.html` file**

###2. Load the module into the application.
Add a dependency for `OrderCloud-HamburgerNavigation` to the Four51.app module in the **`js/app.js`** file.

##Usage
###1. Inject `OrderCloud-HamburgerNavigation` into your controller

###2. In the index.html file, update the the following section with the hidden-xs class : 

```html
    <section class="hidden-print hidden-xs">
        <navigation />
    </section>
```

###2. In the index.html file, add the the following under the <navigation> section: 

```html
    <section class="hidden-print">
        <hamburgernavigation />
    </section>
```