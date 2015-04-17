#MiniCart Directive

##Setup

###1. Add minicart.js module to your project.
**`minicart.js`** contains as AngularJS module with a directive and controller to run the minicart add-on.
We recommend adding this file under the lib folder under the app directory.
Add the following script tag to you index.html file inside the body tag:
```html
<script src="lib/minicart.js" data-group="resources"></script>
```
And add the 'minicart' module as a dependency in your **`app.js`** file

###2. Add the minicart.html to your project
The minicart.html file needs to be placed under 'partials/controls/' otherwise you will need to adjust the path written in the minicart.js module.

###3. Add the minicart.css OR minicart.less to your project
#### For LESS:
Place the minicart.less file under css/less/customizations/
In the customizations.less file (in the same directory) add the line:
**`@import "minicart";`**
#### For CSS:
Place the minicart.css file under css/
In the index file add the following under the title tag
```html
<link rel="stylesheet" href="css/minicart.css" data-group="source">
```

###4. Adding the directive to your project
The `<minicart></minicart>` directive can be used anywhere in the app.
One example we recommend is in the nav html file like so, with an overwrite to the default cart icon:
```html
<ul class="pull-right hidden-xs hidden-sm">
      <minicart></minicart>
  </ul>
  <ul style="margin-bottom: 0;" class="visible-sm visible-xs nav navbar-nav pull-right">
      <li class="cart" ng-class="{'active': isActive(['cart', 'checkout'])}">
          <a id="451qa_cart_link" ng-show="cartCount && user.CurrentOrderID" class="cart" href="cart">
              <span ng-bind="cartCount" class="badge"></span>
              <i class="fa fa-shopping-cart"></i>
              <i class="fa fa-caret-down"></i>
          </a>
      </li>
  </ul>
```
This will allow for resizing on mobile screens

It is expected that this directive will be customized.  It will likely not be perfect for your solution as is.
