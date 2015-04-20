#SlideOut Nav for OrderCloud 

This module provides the user the ability to create a navigation item that will initiate a slide out panel.

A visual example is available at: https://jenras.four51ordercloud.com/HD/

##Setup
#### 1. Add module file to your project.

Add the **`slideOutNav.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/slideOutNav.js`** and add this file as the content for that file.

Be sure to reference the JS file in the **`index.html`** file

#### 2. Load the module into the application.

Add a dependency for `OrderCloud-SlideOutNav` to the Four51.app module in the **`js/app.js`** file.

##Usage
#### 1. Add custom user fields using the naming convention **`SlideOutNav[#]`** and assign the user fields to the Company or Group

* You can add up to 12 images depending on image dimensions
* Keep all your images the same dimensions or at a minimum the same width
* If you plan to use 12 images, size images no larger than 250w x 50h
* If your image should link to a url, enter the URL address in the _Label_ field. Otherwise, enter _none_ in the _Label_ field. 
* Enter the allowed extensions <sub>(gif,jpg,jpeg,pdf,png)</sub>
* Minimum and Maximum File Sizes are optional
* Enter an asterisk(*) in the Upload Instructions 
* Do not click the image button! (Images are easier to update without the image feature checked) 

#### 2. Update partials/controls/nav.html - add the navigation line 
Where you want the navigation item to appear, add the below line within the navigation ul and name it accordingly. 
```
<li ng-show="slideOutNavItems">
    <a ng-click="showSlideOutNav = !showSlideOutNav">SlideOut Nav</a>
</li>
```

#### 3. Update partials/controls/nav.html - add the directive
Below the ending `**</header>`** tag, add the `**<slideoutnav />`** directive. 

#### 4. CSS updates
The moduel CSS is located within the module directive. Any css changes should be made in the module. 

```
<style>
.slideout-nav { border:1px solid #d1d2d4; background-color:#d1d2d4; border-radius:1px; border-right:0; position:fixed; top:70px; right:-300px; width:300px; padding:10px 10px 20px 20px; z-index:1040; transition:all 300ms ease-in-out; -webkit-transition:all 300ms ease-in-out; }
.slideout-nav .header { height:40px; border-bottom:1px solid #ccc; color:#c21c22; font-size:24px; text-transform:uppercase; font-weight:bold; margin-bottom: 30px; }
.slideout-nav.showNav { right:0; transition:all 300ms ease-in-out; -webkit-transition:all 300ms ease-in-out; }
.slideout-nav .row { min-height:60px; }
.slideout-nav img { float:left; padding:0 20px; max-width:95%; height:auto; }
</style>
```
---
<sub><sup>Last Update: 4/20/15</sup></sub>
