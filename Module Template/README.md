#AngularJS Module Template for OrderCloud

This template can be used to create additional modules for OrderCloud. It includes an example service (factory), controller, directive, $templateCache, and config.

##Setup
###1. Add module file to your project.
Add your file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override and add your module as the content for that file.

**Be sure to reference this JS file in the `index.html` file**

###2. Load the module into the application.
Add a dependency for `module-name` to the Four51.app module in the **`js/app.js`** file.
