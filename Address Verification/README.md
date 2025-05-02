# Address Verification File Overrides for Storefront

This repo provides all the files to update the base Storefront 2.0 application to support the use of the Address Verification endpoint.  If you are updating an existing app, care must be taken to make sure that you do not undo your own customizations and you will need to do a code review to merge the punchout code into your custom code.

## Setup
#### 1. Add the service to your project.

If you are using a repository, add this file to the **`/js/services`** directory.

If you are using file overrides, create a new file override named **`js/services/addressService.js`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`js/services/addressService.js`**
5. Place raw code from addressService.js in the section below. Save.

### 2. Add the **`js/controllers/addressInputCtrl.js`** file to your project.

If you are using file overrides, create a new file override named **`js/controllers/addressInputCtrl.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file `js/controllers/addressInputCtrl.js`
 5. Place raw code from addressInputCtrl.js in the section below. Save.

### 3. Add the **`partials/controls/addressInput.html`** file to your project.

If you are using file overrides, create a new file override named **`partials/controls/addressInput.html`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file `partials/controls/addressInput.html`
 5. Place raw HTML from addressInput.html in the section below. Save.

### 4. Add the **`css/custom.css`** file to your project.

If you are using file overrides, create a new file override named **`css/custom.css`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file `css/custom.css`
 5. Place raw CSS from custom.css in the section below. Save.
