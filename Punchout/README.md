# Punchout File Overrides for Storefront

This repo provides all the files to update the base Storefront 2.0 application to support a punchout in Chrome, Firefox and Edge.  The file overrides provided do not solve the issue of running a 2.0 application in a frame in Internet Explorer or Safari, as typically done with an Ariba Punchout, .  If you are updating an existing app, care must be taken to make sure that you do not undo your own customizations and you will need to do a code review to merge the punchout code into your custom code.

## Setup
#### 1. Add the service to your project.

If you are using a repository, add this file to the **`/js/services`** directory.

If you are using file overrides, create a new file override named **`js/services/punchoutService.js`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`js/services/punchoutService.js`**
5. Place raw code from punchoutService.js in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the index.html file by following these steps:

1. In Code Editor, locate your index.html file; hit edit.
2. Add `<script src="js/services/punchoutService.js" data-group="source"></script>` in the section with “js/services” files. Save.

### 2. Add the **`js/controllers/Four51Ctrl.js`** file to your project.

If you are using file overrides, create a new file override named **`js/controllers/Four51Ctrl.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file `js/controllers/Four51Ctrl.js`
 5. Place raw code in the section below. Save.

### 3. Add the **`js/controllers/cartCtrl.js`** file to your project.

If you are using file overrides, create a new file override named **`js/controllers/cartCtrl.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file `js/controllers/cartCtrl.js`
 5. Place raw code in the section below. Save.

### 4. Add the **`partials/cartView.html`** file to your project.

If you are using file overrides, create a new file override named **`partials/cartView.html`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file `partials/cartView.html`
 5. Place raw code in the section below. Save.

### 5. Add the **`partials/controls/nav.html`** file to your project.

If you are using file overrides, create a new file override named **`partials/controls/nav.html`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file `partials/controls/nav.html`
 5. Place raw code in the section below. Save.
