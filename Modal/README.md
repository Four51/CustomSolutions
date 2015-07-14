#Modal for OrderCloud
This is a module that sends a modal message to the user for information you may need to convey. 

##Setup
#####1. Add module file to your project.

Add the four51Modal.js file to your project.
If you are using a repository add this file to the /lib/oc directory.
If you are using file overrides, create a new file override named **`lib/oc/four51Modal.js'** and add this file as the content for that file. 
Be sure to reference the JS file in the index.html file.
```html
<script src="lib/oc/four51Modal.js" data-group="resources"></script>
```


#####2. Load the module into the application.
Add a dependencey for four51Modal to the Four51.app module in the js/app.js file. 

##Adding Content

####1.  Add an HTML file for the modal content. 
Add the **'modalContent.html'** file to your project.
If you are using a repository add this file to partials/
If you are usinge file overrides, create a new file override named **'partials/modalContent.html'**
####2. Add content to modalContent.html

In the modalContent.html file provided, there is a demo paragraph and a button. Edit this to your own discretion to add more functionality to the module, or leave as is with an 'OK' button. 

Now you created the modal and added the functionality that is required for it to appear. You now need to initiate this functionality in the place you see fit in the html.
Make access to the modal functionality

####3. Add your controller with 'ng-controller'

Initiate your controller by adding ng-controller="ModalCtrl" to the starting div of the element you wish to have a modal appear from. In this example, I added it to a button on the '/catalog' page.

 for more general information on ngController: https://docs.angularjs.org/api/ng/directive/ngController


####4. Add functionality with 'ng-click'

Add the functionality referenced by the controller (ModalCtrl) using ng-click="showModal()"
for more general information on ngClick: 
https://docs.angularjs.org/api/ng/directive/ngClick

You now have a modal that conditionally appears when an element is clicked. 
