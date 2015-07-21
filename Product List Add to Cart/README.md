#Product List Add to Cart for OrderCloud 

This module provides the user with the ability to add a product to their cart from the Product List page instead of the Product Detail page. 

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/ProductListAddtoCart).

##Setup
###1. Add module file to your project.
Add the **`productListAddToCart.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/productListAddToCart.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Click “New File Override”
 4. Name this file **`lib/oc/productListAddToCart.js`**
 5. Place raw code from **`productListAddToCart.js`**  in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps:

 1. In Code Editor, locate your index.html file, hit edit. 
 2. Add `<script src="lib/oc/productListAddToCart.js" data-group="resources"></script>` in the section with “lib/oc” files. Save

###2. Load the module into the application.
Add a dependency for `OrderCloud-ProductListAddToCart` to the Four51.app module in the **`js/app.js`** file by following these steps. 

 1. In Code Editor, locate your **`js/app.js`** file, hit edit. 
 2. Add **‘OrderCloud-ProductListAddToCart’** into the file. Save.

##Usage

###1. Add the Product List Add To Cart directive

Determine which Product List Template you are using, or choose a Product List Template.  The templates are found in the admin of your OrderCloud 2.0 site under the Product List tab.  Once you have selected your template number or determined what template your site uses follow the instructions below.

####For template # 1

In **`partials/controls/shortProductView.html`**, add the directive **`<productlistaddtocart></productlistaddtocart>`** below the Price Schedule **`<section>`** as shown below. 

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

####For template # 2, 3, 4, and 5 this solution is not available

####For template # 6 & 7

In **`partials/controls/shortProductViewInline.html`**, add the directive **`<productlistaddtocart></productlistaddtocart>`** after the last **`</div>`** tag as shown below. 

```html
<div>
                    <p ng-bind-html="trustedDescription(LineItem.Product)" ng-show="LineItem.Product.Description" />
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
                </div>
                <a class="btn btn-default btn-block" href="product/{{LineItem.Product.InteropID}}">{{('View' | r) + ' ' + ('Product' | r) | xlat}}</a>
            </div>
        </div>
    </div>
</div>
<productlistaddtocart></productlistaddtocart>
```

####For template # 8, 9, and 10

In **`partials/controls/shortProductViewMinimal.html`**, add the directive **`<productlistaddtocart></productlistaddtocart>`** after the last **`</div>`** tag as shown below. 

```html
<div>
                <p ng-bind-html=""trustedDescription(LineItem.Product)"" ng-show=""LineItem.Product.Description"" />
                <p ng-show=""LineItem.PriceSchedule.PriceBreaks[0]"" ng-if=""!(user.Permissions.contains('HidePricing'))"">
                    {{LineItem.PriceSchedule.PriceBreaks[0].Quantity}}
                    <span ng-show=""LineItem.Product.QuantityMultiplier > 1"">(x {{LineItem.Product.QuantityMultiplier}})</span>
                    {{'for' | xlat}} {{LineItem.PriceSchedule.PriceBreaks[0].Price | culturecurrency}}
                </p>
                <p ng-show=""LineItem.Product.UnitOfMeasure"">
                    {{'Unit of Measure' | r | xlat}}: {{LineItem.Product.UnitOfMeasure}}
                </p>

                <p ng-show=""LineItem.Product.DisplayInventory && inventoryDisplay(LineItem.Product, LineItem.Variant) != undefined"">
                    {{'Quantity Available' | r | xlat}}: {{inventoryDisplay(LineItem.Product, LineItem.Variant) }}
                </p>
            </div>
            <br/>
            <a class=""btn btn-default btn-block"" href=""product/{{LineItem.Product.InteropID}}"">{{('View' | r) + ' ' + ('Product' | r) | xlat}}</a>
 </div>
    </div>
</div>
<productlistaddtocart></productlistaddtocart>
```
