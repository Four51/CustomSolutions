#Product Zoom for OrderCloud 

This module provides the user the ability to create a hover zoom image on a product. 

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/ProductZoom#example). 

>**Note:** The current plugin code will only be officially "licensed" when using the domain "four51ordercloud.com".  If your site uses a custom domain, please contact your Account Manager so they can set-up the domain with Four51's Star Plugins Account.

##Setup
###1. Add module file to your project.
Add the **`productZoom.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/productZoom.js`** and add this file as the content by following these steps: 

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file **`lib/oc/productZoom.js`**
 5. Place raw code from **`productZoom.js`**  in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps: 

1. In Code Editor, locate your index.html file; hit edit. 
2. Add `<script src="lib/oc/productZoom.js" data-group="resources"></script>` in the section with “lib/oc” files. Save


###2. Load the module into the application.
Add a dependency for `OrderCloud-ProductZoom` to the Four51.app module in the **`js/app.js`** file by following these steps. 

 1. In Code Editor, locate your **`js/app.js`** file; hit edit. 
 2.  Add **‘OrderCloud-ProductZoom’** into the file. Save.

##Usage
###1. Create a Static Spec Group for the products with Product Zoom

 1. Locate the product in your catalog or create a new product 
 2. Go to Static Specs
 3. Create a Custom Static spec
 4. Create a Static Spec Group named **"ProductZoom"** with the following specs:

Tip: make these specs non-visible to the customer

<table>
  <tr>
    <th>Required or Optional</th>
    <th>Spec Name</th>
    <th>Spec Type</th>
    <th>Value</th>
    <th>Action</th>
  </tr>
  <tr>
    <td>Required</td>
    <td>fadeTm</td>
    <td>Text</td>
    <td>750</td>
    <td>Duration of fade effect (milliseconds)</td>
  </tr>
  <tr>
    <td>Required</td>
    <td>tintClr</td>
    <td>Text</td>
    <td>"black" or a hex color code for another color (example: #000000)</td>
    <td>Color of non-zoomed area</td>
  </tr>
  <tr>
    <td>Required</td>
    <td>tintOpcty</td>
    <td>Text</td>
    <td>.025 or a higher number for darker opacity</td>
    <td>Opacity of color on non-zoomed area</td>
  </tr>
  <tr>
    <td>Optional</td>
    <td>autoCircle</td>
    <td>Text</td>
    <td>autoCircle</td>
    <td>Turns lens into a circle</td>
  </tr>
  <tr>
    <td>Optional</td>
    <td>iZoom</td>
    <td>Text</td>
    <td>iZoom</td>
    <td>Activates inter-zoom mode</td>
  </tr>
</table>

###2. Create a new Product Detail Template within the admin interface

 1. Navigate to ”Product Detail Template” on the left navigation in
    Order Cloud Admin. 
 2. Go to the OrderCloud 2.0 tab
 3. If a custom Product Detail Template is assigned to the product, modify that template
    with the ProductZoom code (step 4. below), otherwise create new
    Product Detail Template. You can name the new template whatever is
    appropriate for you.
 4. On your new Product Detail Template, replace this section:

```html
    <img id="451_img_prod_lg" class="product-image-large img-responsive" ng-src="{{LineItem.Variant.PreviewUrl || LineItem.Variant.LargeImageUrl || LineItem.Product.LargeImageUrl}}" imageonload />
```

with the following:

```html
    <productzoom lineitem="LineItem"></productzoom>
```

###3. Apply Product Detail Template to product(s)

Using Product Properties, assign your new/updated Product Detail Template to any products requiring the Product Zoom feature


----------


##Additional Information

 * All ProductZoom products need to have an image loaded for both the Large image and the Thumbnail image. The Large image must be a larger size from the Thumbnail image since it enables the zoom. Please see the Image Recommendations below. 
 * If you would like other style customizations, you can do this with CSS.  The default values are listed below. 
```css
 .jetzoom-lens {
	 1. border: none;
	 2. width: 80%;
	 3. height: 80%;
	 4. border-radius: 20px;
	 5. box-shadow: 0 0 10px rgba(0,0,0,.4);
	 6. cursor: none;
}
```

#### Image Recommendations
#####Thumbnail
* minimum of 300w x 300h, cropped to top, no white space (1)
* All images should retain the same aspect ratio and height (2)
* Minimum of 72dpi
* If a product has multiple sides, use the cover image only for the thumbnail

#####Large Image for Product Zoom
* Minimum of 1000w, cropped to top, no white space
* Minimum of 72dpi

>**Notes**
* (1) white space can be added via css and shouldn't be added to the image for consistency. 
* (2) maintaining a consistent height and width for the thumbnail (i.e. category, product list views) is preferable to avoid additional css considerations. 
