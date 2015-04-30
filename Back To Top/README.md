#Back to Top for OrderCloud

This module provides the user with the ability to add a dynamically appearing arrow button to the bottom right of the page that will return them to the top of the page when clicked.

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/BackToTop).

##Setup
###1. Add module file to your project.
Add the **`backToTop.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/backToTop.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Click “New File Override”
 4. Name this file **`lib/oc/backToTop.js`**
 5. Place raw code from **`backToTop.js`**  in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps:

 1. In Code Editor, locate your index.html file, hit edit. 
 2. Add `<script src="lib/oc/backToTop.js" data-group="resources"></script>` in the section with “lib/oc” files. Save

###2. Load the module into the application.
Add a dependency for `OrderCloud-BackToTop` to the Four51.app module in the **`js/app.js`** file by following these steps. 

 1. In Code Editor, locate your **`js/app.js`** file, hit edit. 
 2. Add **‘OrderCloud-BackToTop’** into the file. Save.


##Usage
###1. Add the directive to the index.html file

Place this tag in the **`index.html`** file: 
```html
    <backtotop offsetbottom="30" offsetright="30" duration="200"></backtotop>
```
>**Note:** We recommend adding the directive to the index file underneath the last ending `</section>` tag so that the button is available on each page.

Below is a list of what the directive attributes mean in case you would like to customize formatting. 

 - offsetbottom: number of pixels the button will appear from the bottom
 - offsetright: number of pixels the button will appear from the right
 - duration: amount of time the directive will take to reach the top
