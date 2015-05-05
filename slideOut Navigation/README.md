#SlideOut Nav for OrderCloud 

This module provides the user the ability to create a navigation item that will initiate a slide out panel.

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/slideOutNavigation).

##Setup
#### 1. Add module file to your project.

Add the **`slideOutNav.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/slideOutNav.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Click “New File Override”
 4. Name this file “lib/oc/slideOutNav.js
 5. Place raw code from slideOutNav.js  in the section below. Save.


**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps:

 1. In Code Editor, locate your **`index.html`** file, hit edit. 
 2. Add `<script src="lib/oc/slideOutNav.js" data-group="resources"></script>` in the section with “lib/oc” files. Save


#### 2. Load the module into the application.

Add a dependency for **`OrderCloud-SlideOutNav`** to the Four51.app module in the **`js/app.js`** file by following these steps:

 1. In Code Editor, locate your **`js/app.js`** file, hit edit. 
 2. Add **‘OrderCloud-SlideOutNav’** into the file. Save.


##Usage
#### 1. Add custom user fields and assign the user fields to the Company or Group

 1. Go to the Company or Group that you would like to add the slideOut Nav too
 2. Go to User Fields
 3. Click New Custom User Field (or search if you need to update an existing field)
 4. Fill out the fields as followed:

- **Field Name:** SlideOutNav[#]
- **Label:** Insert the URL address if your image should link to a URL in a new tab.  Insert the relative URL (the string after your Application URL, ex. /store/product/tshirt) if your image should redirect within the site and not open any tabs. If you do not want the image to link to anything, enter _none_ in the field.
- **Type:** File
- **Required:** Do not check
- **Display to User:** Do not check
- **Allowed Extensions:** Enter _(gif, jpg, jpeg, pdf, png)_
- **Minimum and Maximum File Sizes:** These fields are optional
- **Upload Instructions:** Enter and asterisk(*)
- **Default file:** Upload your file
- **Image?:** Do not check this (images are easier to update without the image feature checked)

>**Note:** Make sure your Custom User Fields are activated for the Company/Group you added them to.  You can check-mark each User Field and hit the Update button to activate them.  

#####Image information:

 - You can add up to 12 images depending on image dimensions
 - Keep all your images the same dimensions or at a minimum the same width
 - If you plan to use 12 images, size images no larger than 250w x 50h

#### 2. Update partials/controls/nav.html - add the navigation line 

With this step you are placing the slideOut Navigation link into the top navigation bar.  Place the code below within the navigation ul where you want the navigation text to appear.  Also use the **`<span>`** tag to name it accordingly.

```
    <li>
        <a ng-click="showSlideOutNav = !showSlideOutNav">
            <i class="fa fa-folder-open-o"></i>
            <span class="hidden-xs">Slide Out Nav</span>
        </a>
    </li>
```

#### 3. Update partials/controls/nav.html - add the directive
Below the ending **`</header>`** tag, add  **`<slideoutnav></slideoutnav>`** . 

#### 4. CSS updates
The module CSS is located within the slideOut Nav module. Any css changes should be made in the module. You can edit slideOut Nav styling with the CSS below. 

```
<style>
.slideout-nav {border:1px solid #d1d2d4; background-color:#d1d2d4; border-radius:1px; border-right:0; position:fixed; top:70px; right:-300px; width:300px; padding:10px 10px 20px 20px; z-index:1040; transition:all 300ms ease-in-out; -webkit-transition:all 300ms ease-in-out;}
.slideout-nav .header {height:40px; border-bottom:1px solid #ccc; color:#c21c22; font-size:24px; text-transform:uppercase; font-weight:bold; margin-bottom: 30px;}
.slideout-nav.showNav {right:0; transition:all 300ms ease-in-out; -webkit-transition:all 300ms ease-in-out;}
.slideout-nav .row {min-height:60px;}
.slideout-nav img {float:left; padding:0 10px; height:auto;}
</style>
```


Additionaly, to change the header text on your slideOut navigation bar, edit the h5 element of this line: **`'<span class="pull-left"><h5>Slideout Nav</h5></span>'`** in the slideOut Nav module.
