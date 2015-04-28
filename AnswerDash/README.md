
![enter image description here](https://tools.answerdash.com/admin/media/logos/logo-transparent.png)

AnswerDash is a software as a service used to provide Help Desk functionality on a website in the form of Question and Answers.  When a customer proposes a new question, your answer is captured and added to the Q&A library to help every future customer.

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/AnswerDash#example). 

>**Note:** AnswerDash is free to try, and contains a variety of subscription plans.  http://www.answerdash.com/pricing 

##Setup
###1. Step one goes here.
Step instructions go here.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/productZoom.js`** and add this file as the content by following these steps: 

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab

**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps: 

1. In Code Editor, locate your index.html file; hit edit. 
2. Add `<script src="lib/oc/productZoom.js" data-group="resources"></script>` in the section with “lib/oc” files. Save


###2. Step two goes here.

##Usage
###1. Step 1 goes here.

 1. Locate the product in your catalog or create a new product 
 2. Go to Static Specs

###2. Step two goes here.

 1. Navigate to ”Product Detail Template” on the left navigation in
    Order Cloud Admin. 
 2. Go to the OrderCloud 2.0 tab

```html
    <img id="451_img_prod_lg" class="product-image-large img-responsive" ng-src="{{LineItem.Variant.PreviewUrl || LineItem.Variant.LargeImageUrl || LineItem.Product.LargeImageUrl}}" imageonload />
```

with the following:

```html
    <productzoom lineitem="LineItem"></productzoom>
```


----------


##Additional Information

 * All ProductZoom products need to have an image loaded for both the Large image and the Thumbnail image. The Large image must be a larger size from the Thumbnail image since it enables the zoom. Please see the Image Recommendations below. 
