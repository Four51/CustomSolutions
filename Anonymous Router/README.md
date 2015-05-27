#Anonymous Router for OrderCloud

This module provides the ability to redirect an anonymous user to the user admin page in order to profile themselves at any step within their catalog workflow.

>**Note:** This module is provided in the base application 18.9.0 CT Release and 1.3.0 SPA Release.  Your site may already have the code installed for Anonymous Router.

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/AnonymousRouter).

##Setup
###1. Add module file to your project.
Add the **`anonRouter.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/anonRouter.js`** and add this file as the content by following these steps:

 1. Edit your 2.0 site
 2. Go to “Code Editor” tab
 3. Hit “New File Override”
 4. Name this file **`lib/oc/anonRouter.js`**
 5. Place raw code from `anonRouter.js` in the section below. Save.

**Important!** Be sure to reference the new/updated JS file in the **`index.html`** file by following these steps:

 1. In Code Editor, locate your index.html file; hit edit.
 2. Add `<script src="lib/oc/anonRouter.js" data-group="resources"></script>`  in the section with “lib/oc” files. Save.

###2. Load the module into the application.
Add a dependency for `OrderCloud-AnonRouter` to the Four51.app module in the **`js/app.js`** file by following these steps:

 1. In Code Editor, locate your **`js/app.js`** file; hit edit.
 2. Add **‘OrderCloud-AnonRouter’** into the file. Save.

##Usage
###1. Configure your before and after constants within the **`OrderCloud-AnonRouter`** module

There are two constants defined within the module: **`before`** and **`after`**. These constants serve to tell the module when to redirect the anonymous user to the user admin page and where they should be directed after creating a user profile.

For the **`before`** constant, enter the route string for when to redirect the user to the user admin page. For example, if you'd like the user to create a profile when attempting to checkout, enter 'checkout'.

For the **`after`** constant, enter the route string for where to redirect the user once they have created a profile.

>**Note:** If you attempt to send the user to 'checkout' and they do not have an order open, the user will be directed to the 'catalog' route.

###2. Update UserEdit Controller

First, add the script below to the very top of the **`js/controllers/userEditCtrl.js`** file if it is not there already.   The OrderCloud Storefront application will have this by default, but it is possible a file override has been created, or a custom repository was created before this update was made.

```javascript
    var _AnonRouter;
    try {
        _AnonRouter = $injector.get('AnonRouter');
    }
    catch(ex){}
```


Next, within the success functions of the User.save and User.login add:

```javascript
    if (_AnonRouter) _AnonRouter.route();
```

For example: 

```javascript
    User.save($scope.user,
        function (u) {
            $scope.securityWarning = false;
            $scope.displayLoadingIndicator = false;
            $scope.actionMessage = 'Your changes have been saved';
            $scope.user.TempUsername = u.Username;
            if (_AnonRouter) _AnonRouter.route();
        },
        function (ex) {
            $scope.displayLoadingIndicator = false;
            if (ex.Code.is('PasswordSecurity'))
                $scope.securityWarning = true;
            else {
                $scope.actionMessage = $sce.trustAsHtml(ex.Message);
            }
        }
    );
```
###3. Create your Template User

 1. On the admin page of your buyer site, got to Users > New User.
 2. Fill out the required fields for your template user. 
	 - Name can be something simple such as *Template User*
	 - Email should be a generic company email
	 - Username must be unique, such as *TemplateUserCompanyName*
	 - Make sure to check the Active and Terms & Conditions checkbox
 3. Set up all of the properties you would like associated with your template user (addresses, cost centers, categories, varients, permissions, user groups, order fields, and user fields). 
 
 > **Important!** Under permissions > Miscellaneous, make sure to check **View Self Admin** for the template user. 

###4. Assign your Template User to your Application

 1. Edit your 2.0 site
 2. Under Properties > Guest Checkout User click "load users..."
 3. Select the Template User that your just created and Save. 

___
##Additional Information

If you use the file override method for changes, and you override the index.html file, it is important that you update the following code to make this solution work. 

On the index.html file, remove these lines of code:

```
<base href="/YourPathNameHere/"/>
<script>var four51IsAnonUser = false;</script>
```

>**Note:** The first line is the relative path to the store.  The second line controls the anonymous user. 


and replace with these lines of code:

```
<!--baseTagToken-->
<!--headscriptToken-->
```
