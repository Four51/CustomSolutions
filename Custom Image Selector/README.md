#Custom Image Selector for OrderCloud

This module provides the user with the ability to add a custom image selector to a page.

##Setup
###1. Add module file to your project.
Add the **`customImageSelector.js`** file to your project.

If you are using a repository, add this file to the **`/lib`** directory.

If you are using file overrides, create a new file override named **`lib/customImageSelector.js`** and add this file as the content for that file.

**Be sure to reference the JS file in the `index.html` file**

###2. Load the module into the application.
Add a dependency for `OrderCloud-CustomImageSelector` to the Four51.app module in the **`js/app.js`** file.

##Usage

USE IN A REPEAT:
A is the name of the spec you are replacing.
B is the name of the static spec group where your images are stored.
IMPORTANT: A and B should be named the same.
IMPORTANT: The spec names of B should reflect the drop down values for A.

```html
<div ng-repeat="s in LineItem.Specs">
  <customimageselector
      customfield="s"
      imagespecgroup="LineItem.Product.StaticSpecGroups.B"
      ng-if="s.ControlType == 'Selection' && s.Name == 'A'">
  </customimageselector>
</div>
```

NOTE: You will have to exclude this spec in the <customselectionfield> directive with an ng-if="s.Name != 'A'" or else it will show up twice.


DIRECTLY REFERENCING SPECS IN A SPEC FORM:
A is the name of the spec you are replacing.
B is the name of the static spec group where your images are stored.
IMPORTANT: A and B should be named the same.
IMPORTANT: The spec names of B should reflect the drop down values for A.

```html
<div ng-repeat="s in LineItem.Specs">
  <customimageselector
      customfield="LineItem.Specs.A"
      imagespecgroup="LineItem.Product.StaticSpecGroups.B || Product.StaticSpecGroups.B"
      ng-if="s.ControlType == 'Selection'">
  </customimageselector>
</div>
```