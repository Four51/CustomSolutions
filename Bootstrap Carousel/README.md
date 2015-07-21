#Bootstrap Carousel for OrderCloud 

This module allows you to place rotating images in your site. 

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/BootstrapCarousel).

##Setup

####1. Add module file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/carousel.js`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`lib/oc/carousel.js`**
5. Place raw code from carousel.js in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the index.html file by following these steps:

1. In Code Editor, locate your index.html file; hit edit.
2. Add `<script src="lib/oc/carousel.js" data-group="resources"></script>` in the section with “lib/oc” files. Save.

####2. Load the module into the application

Add a dependency for `OrderCloud-Carousel` to the Four51.app module in the **`js/app.js`** file by following these steps:

1. In Code Editor, locate your **`js/app.js`** file; hit edit.
2. Add **‘OrderCloud-Carousel’** into the file. Save.

####3. Placing the carousel in the application

Add the directive  **`<customcarousel></customcarousel>`** wherever you would like the image carousel to appear. If you would like it at the top of your store homepage, add it inside the **`partials/branding.html`**  file like the example below.
```html
<section class="jumbotron" ng-class="{'active': isActive('catalog')}" ng-show="user.Company.LogoUrl">
    <customcarousel></customcarousel>
    <div class="container">
        <h2 class="thumbnail" ng-show="Four51User.isAuthenticated()">
            <a ng-click="refreshUser()" href="catalog">
	            <img ng-src="{{user.Company.LogoUrl}}" />
            </a>
            <span>{{user.Company.Name}}</span>
            <homemessage />
        </h2>
    </div>
</section>
```

> **Tip:** Remove **`<img ng-src="{{user.Company.LogoUrl}}" />`** and/or **`<span>{{user.Company.Name}}</span>`**  if you want to remove your logo or company name from the site, and just show the banner. 

##Usage

#### 1. Add custom user fields and assign the user fields to the Company or Group

 1. Go to the Company or Group that you would like to add the carousel too
 2. Go to User Fields
 3. Click New Custom User Field (or search if you need to update an existing field)
 4. Fill out the fields as followed:

####Required Custom User Fields
- **Field Name:** carouselImage1 (or subsequent number)
- **Label:** Insert the URL address if your image should link to a URL in a new tab.  Insert the relative URL (the string after your Application URL, ex. /store/product/tshirt) if your image should redirect within the site and not open any tabs. If you do not want the image to link to anything, enter _none_ in the field.
- **Type:** File
- **Required:** Do not check
- **Display to User:** Do not check
- **Allowed Extensions:** Enter _(gif, jpg, jpeg, pdf, png)_
- **Minimum and Maximum File Sizes:** These fields are optional
- **Upload Instructions:** Text included here will be displayed on top of the slide. If you do not want any text, enter _none_. 
- **Default file:** Upload your file
- **Image?:** Do not check this (images are easier to update without the image feature checked)

####Optional Custom User Field for setting interval length
- **Field Name:** carouselInterval  (this determines at what intervals your slides rotate)
- **Label:** Enter _none_ in the field.
- **Type:** Text
- **Required:** Do not check
- **Default Value:** Enter the number of seconds you would like the slides to rotate to (i.e. 1, 2, or 3)
- **Lines, Width, Max Length:** These fields are optional
- **Masked Input:** Leave Blank

>**Important!** Make sure your Custom User Fields are activated for the Company/Group you added them to.  You can check-mark each User Field and hit the Update button to activate them.  



#####Additional information:

  - Keep all your images the same dimensions otherwise the page will shift between image transitions.
  - The default interval length is 5 seconds.  If you enter 0 for interval length, it will prevent rotation. 
  - Recommended image size for creating a banner across your homepage is 1500px width.  Height can be variable, but we suggest between 300-500px. 
  - Custom CSS for the carousel can be added to your custom CSS file using the .carousel class.
