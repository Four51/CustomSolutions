
#Terms Modal for Four51 Storefront  

This module provides a modal pop-up for the "Terms &amp; Conditions" button in the general footer area.

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/TermsModal).

##Setup

####1. Add the termsModal.js file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/termsModal.js`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`lib/oc/termsModal.js`**
5. Place raw code from securityModal.js in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps:

1. In Code Editor, locate your index.html file; hit edit.
2. Add `<script src="lib/oc/termsModal.js" data-group="resources"></script>` in the section with “lib/oc” files. Save.

####2. Load the module into the application.

Add a dependency for `OrderCloud-TermsModal` to the Four51.app module in the **`js/app.js`** file by following these steps:

1. In Code Editor, locate your **`js/app.js`** file; hit edit.
2. Add **‘OrderCloud-TermsModal’** into the file. Save.

##Usage

####1. Place the directive into the application.

 1. In Code Editor, locate the **`partials/copyrightView.html`** file
 2. Replace: 
```html
 <span ng-if="!(user.Permissions.contains('HideTerms'))">
    <a class="btn btn-default btn-sm" href="conditions">
        {{'Conditions of Use' | xlat}}
    </a>
</span>
```

with:  
```html
   <termsmodal></termsmodal>
```
####2. Customize the modal window.

The color, text, style, and size can all be customized in the termsModal.js file using basic html and css. 
