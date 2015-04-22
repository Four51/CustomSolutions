#Mandrill for OrderCloud

This module provides an overview of how to implement Mandrill's Transactional Email Service for an OrderCloud 2.0 site.

###Requirements
#####1. A Mandrill account. Sign up at: https://www.mandrill.com/
The buyer requesting the solution will need to create their own account.
For internal testing and demo purposes, use the below credentials. 

Login: jrasmussen@four51.com, PW: four51demo

###Setup
#####1. Add mandrill.js file to your project.
Mandrill provides a JS wrapper file, which is located within this directory as **`mandrill.js`**. 

If you are using a repository for your project, add this file to the **`/lib/oc`** directory and also to the **`index.html`** file.

If you are using file overrides for your project, create a new file override named **`lib/ocmandrill.js`**, add this file as the content for that file, then add the reference to the **`index.html`** file override.

#####2. Add mandrillTemplate.js module to your project.
**`mandrillTemplate.js`** contains an AngularJS module with an Email service, which will be used within your controller(s) in order to send a transactional email using Mandrill. 

Similar to the **`mandrill.js`** file, add this file to your project as well as to the **`index.html`** file.

#####3. Load the module into the application.
Add a dependency for `OrderCloud-Mandrill` to the Four51.app module in the **`js/app.js`** file.

#####4. Customize your Email service.
Replace mandrillAPIKey, template_name, template_content, subject, from_email, from_name, 'to' objects, and Reply-To with your data, obtained from both Mandrill and your particular solution requirements.

**`template_name`** matches up to your Mandrill template's slug value, which can be found when editing your Mandrill Outbound Template

**`template_content`** is an array of objects that serve as custom parameters to use within your Mandrill template<br/>
The 'name' property matches up to **`mc:edit="customobjectname"`** in your Mandrill template. The value you pass in 'content' will be used as the text of that HTML element.<br/> 
Example: 
```html
<div mc:edit="customMCparameter1"></div>
```

If you have complicated HTML to display within your template, it's easiest to build up that HTML within this service and pass it as the content of a custom parameter.
Example:

```javascript
 var imageHTML = "<a href='" + variant.ProductionURL + "' target='_blank'><img src='" + variant.PreviewUrl + "'></a>";
 var template_content = [
     {
     "name": 'imagehtml',
     "content": imageHTML
     }
 }
```    
This string can be used within the Mandrill template like so: 
```html
<div mc:edit="imagehtml"></div>
```

The **`subject`**, **`from_email`**, etc. properties of the message object can be hardcoded (if they will always be the same), or can be passed dynamically to your service by adding an additional parameter to your **`_send`** method
For example, you could pass a **`LineItem`** object and obtain the subject, email addresses, etc. from the LineItem's specs

The **`mess.to`** property is an array of recipient objects. If you want to send the email to one recipient, only include one object in the array.

This example is called from a controller and does not have a "success" function. If you wanted to do so in order to display some message to the user that the email was successful, add a
success parameter in which you pass your success function. Within that function, you can adjust $scope variables accordingly depending on the Mandrill result.

#####5. Create the form with the requested information to initiate the email transaction. 
