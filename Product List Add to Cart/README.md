#Product List View Add to Cart for OrderCloud

This is an overview of how to implement the Product List View Add to Cart for an OrderCloud 2.0 site. 
This solution is applied and works for static products only. 

##Setup

###1. Inject **`OrderCloud-ProductListAddToCart`** into your application.
If you are using a repository for your project, add **`OrderCloud-ProductListAddToCart`** to the array in **`js/app.js`**.

If you are using file overrides for your project, create a file override for **`js/app.js`** and add **`OrderCloud-ProductListAddToCart`** to the array in that file.
    
###2. Add **`productListAddToCart.js`** file to your project.

If you are using a repository for your project, add this file to the **`/lib/oc`** directory and also add that path to the **`index.html`** file.

If you are using file overrides for your project, create a new file override named **`lib/oc/productListAddToCart.js`**, 
add this file as the content for that override, then add the file reference to the **`index.html`** file override.


###3. In **`partials/controls/shortProductView.html`**, add the directive below the Price Schedule **`<section>`** as shown below. 

```html
<section class="hidden-xs hidden-sm panel-body">
    <p ng-show="LineItem.PriceSchedule.PriceBreaks[0]" ng-if="!(user.Permissions.contains('HidePricing'))">
        {{LineItem.PriceSchedule.PriceBreaks[0].Quantity}}
        <span ng-show="LineItem.Product.QuantityMultiplier > 1">(x {{LineItem.Product.QuantityMultiplier}})</span>
        {{'for' | xlat}} {{LineItem.PriceSchedule.PriceBreaks[0].Price | culturecurrency}}
    </p>
    <p ng-show="LineItem.Product.UnitOfMeasure">
        {{'Unit of Measure' | r | xlat}}: {{LineItem.Product.UnitOfMeasure}}
    </p>

    <p ng-show="LineItem.Product.DisplayInventory && inventoryDisplay(LineItem.Product, LineItem.Variant) != undefined">
        {{'Quantity Available' | r | xlat}}: {{inventoryDisplay(LineItem.Product, LineItem.Variant) }}
    </p>
</section>
<productlistaddtocart></productlistaddtocart>
```
