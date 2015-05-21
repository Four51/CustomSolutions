#Category Collapse for Order Cloud
This module provides the user the ability to provide a collapsed category tree view. 

##Setup

###1. Add module file to your project.
Add the **`categoryCollapse.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/categoryCollapse.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file `lib/oc/categoryCollapse.js`
 5. Place raw code in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps:

 1. In Code Editor, locate your `index.html` file, hit edit. 
 2. Add **`<script src="lib/oc/categoryCollapse.js" data-group="resources"></script>`** in the section with “lib/oc” files.  Save.

###2. Load the module into the application.
Add a dependency for **`OrderCloud-CategoryCollapse`** to the Four51.app module in the **`js/app.js`** file by following these steps:

 1. In Code Editor, locate your **`js/app.js`** file, hit edit. 
 2. Add **‘OrderCloud-CategoryCollapse’** into the file.  Save

##Usage

###1. Update the **`partials/categoryView.html`** file. 

1. Replace: 

```html
    <categorytree tree='tree' current='currentCategory' />
```

with the following:

```html
    <categorycollapse tree='tree' current='currentCategory'></categorycollapse>
```