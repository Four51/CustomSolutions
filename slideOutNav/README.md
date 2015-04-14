#SlideOut Nav for OrderCloud

This module provides the user the ability to create a navigation item that will initiate a slide out panel.
A visual example is available at: https://jenras.four51ordercloud.com/HD/
Login: four51jen, PW: four51jen0! 

##Setup
#### 1. Add custom user fields using the naming convention 'SlideOutNav[#]' and assign the user fields to the Company

* You can add up to 12 images depending on image dimensions
* Keep all your images the same dimensions or at a minimum the same width
* If you plan to use 12 images, size images no larger than 250w x 50h

* If your image should link to a url, enter the URL address in the _Label_ field. Otherwise, enter _none_
* Enter the allowed extensions (gif,jpg,jpeg,pdf,png)
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
Below the ending `</header>` tag, add the `<slideoutnav />` directive. 

#### 4. Inject the module `OrderCloud-SlideOutNav` into js/app.js
