#Featured Items for OrderCloud 

This module allows you to place a featured items area in your site. 

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/FeaturedItems).

##Setup

####1. Add module file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/featuredItems.js`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`lib/oc/featureditems.js`**
5. Place raw code from featureditems.js in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the index.html file by following these steps:

1. In Code Editor, locate your index.html file; hit edit.
2. Add `<script src="lib/oc/featureditems.js" data-group="resources"></script>` in the section with “lib/oc” files. Save.

####2. Load the module into the application

Add a dependency for `OrderCloud-FeaturedItems` to the Four51.app module in the **`js/app.js`** file by following these steps:

1. In Code Editor, locate your **`js/app.js`** file; hit edit.
2. Add **‘OrderCloud-FeaturedItems’** into the file. Save.

####3. Placing the featurd items in the application

Add the directive  **`<featureditems></featureditems>`** wherever you would like the featured items to appear. If you would like it at the top of your store homepage, 
add it inside the **`partials/categoryView.html`**  file like the example below.
```html
<div ng-class="{'col-md-9': navStatus.visible, 'col-md-12': !navStatus.visible }">
	<featureditems></featureditems>
	<categorylistview></categorylistview>
	<loadingindicator ng-show="productLoadingIndicator" title="{{'Please wait while we fetch all products' | r | xlat}}"/>
	<productlistview></productlistview>
</div>
```

> **Tip:** 

##Usage

#### 1. Add custom user fields and assign the user fields to the Company or Group

 1. Go to the Company or Group that you would like to add the featured items too
 2. Go to User Fields
 3. Click New Custom User Field (or search if you need to update an existing field)
 4. Fill out the fields as followed:

####Required Custom User Fields
- **Field Name:** featureditem1 (or subsequent number)
- **Label:** Insert the URL address if your image should link to a URL in a new tab.  Insert the relative URL (the string after your Application URL, ex. /store/product/tshirt) if your image should redirect within the site and not open any tabs. If you do not want the image to link to anything, enter _none_ in the field.
- **Type:** File
- **Required:** Do not check
- **Display to User:** Do not check
- **Allowed Extensions:** Enter _(gif, jpg, jpeg, pdf, png)_
- **Minimum and Maximum File Sizes:** These fields are optional
- **Default file:** Upload your file
- **Image?:** Do not check this (images are easier to update without the image feature checked)


>**Important!** Make sure your Custom User Fields are activated for the Company/Group you added them to.  You can check-mark each User Field and hit the Update button to activate them.  


#####Additional information:

  - Keep all your images the same dimensions otherwise the page will shift between image transitions.
  - Custom CSS for the featured items can be added to your custom CSS file using the .featured-items class.
