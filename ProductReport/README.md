#Product Based Reporting Service for OrderCloud

This module utilizes OrderCloud's Reporting services in order to obtain order history data to be used for additional solutions.

##Setup
###1. Add module file to your project.
Add the **`productReport.js`** file to your project.

If you are using a repository, add this file to the **`/lib`** directory.

If you are using file overrides, create a new file override named **`lib/productReport.js`** and add this file as the content for that file.

**Be sure to reference both of these JS files in the `index.html`**

###2. Load the module into the application.
Add a dependency for `OrderCloud-ProductReport` to the Four51.app module.

##Usage
###1. Inject `ProductReport` into your controller

###2. Call to ProductReport.getOrderQuantity with your product's ExternalID in order to obtain user's order history count for that product

```javascript
    ProductReport.getOrderQuantity($scope.LineItem.Product.ExternalID, function(count) {
        $scope.LineItem.Product.OrderHistoryCount = count;
    });
```