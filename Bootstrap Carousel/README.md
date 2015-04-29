#Bootstrap Carousel for OrderCloud

This module provides an overview of how to implement the Bootstrap Image Carousel on your OrderCloud 2.0 application.

To learn more about this feature and see examples, visit this page. //need link

##Setup

####1. Add the carousel.js file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/carousel.js`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`lib/oc/carousel.js`**
5. Place raw code from carousel.js in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the index.html file by following these steps:

1. In Code Editor, locate your index.html file; hit edit.
2. Add `<script src="lib/oc/carousel.js" data-group="resources"></script>` in the section with “lib/oc” files. Save

####2. Add the **`carousel.html`** file to your project

If you are using a repository, add this file to the **`partials/controls/`** directory

If you are using file overrides, create a new file override named **`partials/controls/carousel.html`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`partials/controls/carousel.html`**
5. Place raw code from carousel.html in the section below. Save.

Custom CSS for the carousel can be modified and added to this file.

####3. Load the module into the application

Add a dependency for `carousel` to the Four51.app module in the **`js/app.js`** file.
1. In Code Editor, locate your **`js/app.js`** file; hit edit.
2. Add **‘carousel’** into the file. Save.

####4. Placing the carousel in the application

Add the directive following directive wherever you would like the image carousel to appear. We recommend adding it inside the branding.html file: <custom-carousel></custom-carousel>

##Admin Setup

Adding images, links, and interval settings to your Carousel

Custom image slides are created by creating a custom user field on the Admin site. The field should be named 'carouselImage' followed by the number corresponding the the order you want that slide to appear. For example: the first slide to appear in the carousel would be called ‘carouselImage1’

**Important!** It is recommended that all images that are uploaded for the carousel have the same dimensions and resolution. The carousel will resize itself based on the size of the container class the directive is placed in, so uploading an image that is too small could cause the image to be stretched.

###Required Custom User Fields

<table>
    <tr>
        <th>Spec Name</th>
        <th>Spec Type</th>
        <th>Spec Label</th>
        <th>Upload Instructions</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>
         carouselImage1
        </td>
        <td>File (then select the image checkbox)</td>
        <td>
            <ul>
                <li>
                    If you do not wish to have your images link to other pages set the label to ’none’
                </li>
                <li>
                    External link: paste in full url including http
                </li>
                <li>
                    Internal link: remove the http://store.four51.com/YourStoreName/ from the OrderCloud URL you wish to link to. For example linking to a product would be "product/productID" or to a category "catalog/categoryID
                </li>
            </ul>
        </td>
        <td>
            <ul>
                <li>Any text included in the Upload Instructions box will be displayed on top of the slide.</li>
                <li>For no text write 'none'</li>
            </ul>
        </td>
        <td>Sets first slide in carousel</td>
    </tr>
</table>

</br>
###Optional Custom User Fields

<table>
    <tr>
        <th>Spec Name</th>
        <th>Spec Type</th>
        <th>Spec Label</th>
        <th>Upload Instructions</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>
            carouselImage2, carouselImage3, etc.
        </td>
    <td>File (then select the image checkbox)</td>
        <td>same as carouselImage1</td>
        <td>same as carouselImage1</td>
        <td>Sets subsequent slides in carousel</td>
    </tr>
    <tr>
        <td>
                    carouselInterval
        </td>
        <td>Text (enter number of seconds you would like as interval in 'value' field)</td>
        <td>'none'</td>
        <td>'none'</td>
        <td>
        Sets Interval for Slide rotation. Default is 5 seconds. Setting to 0 will prevent rotation.
        </td>
    </tr>
</table>
