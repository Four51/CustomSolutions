#Category Modal for OrderCloud 

This module provides the user the ability to provide a Category modal popup in the navigation.

To learn more about this feature and see examples, visit this [page]().

##Setup

####1. Add module file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/categoryModal.js`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`lib/oc/categoryModal.js`**
5. Place raw code from categoryModal.js in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the index.html file by following these steps:

1. In Code Editor, locate your index.html file; hit edit.
2. Add `<script src="lib/oc/categoryModal.js" data-group="resources"></script>` in the section with “lib/oc” files. Save.

####2. Load the module into the application

Add a dependency for `OrderCloud-CategoryModal` to the Four51.app module in the **`js/app.js`** file by following these steps:

1. In Code Editor, locate your **`js/app.js`** file; hit edit.
2. Add **‘OrderCloud-CategoryCollapse’** into the file. Save.

##Usage

####1. Update the partials/controls/nav.html file

Add: ` <li><categorymodal></categorymodal></li>`
