#Same as Shipping Checkbox

##Setup

**`sameAsShipping.js`** contains a AngularJS module with a directives and controllers to run the same as shipping checkbox add-on.
We recommend adding this file under the lib folder under the app directory.
Add the following script tag to you index.html file inside the body tag:
```html
<script src="lib/sameAsShipping.js" data-group="resources"></script>
```

You also need to either delete or comment out the following lines from your index file:
```html
<script src="js/directives/ordershipping.js" data-group="source"></script>
<script src="js/directives/orderbilling.js" data-group="source"></script>
<script src="js/directives/paymentselection.js" data-group="source"></script>
```
And add the 'OrderCloud-SameAsShipping' module as a dependency in your **`app.js`** file

