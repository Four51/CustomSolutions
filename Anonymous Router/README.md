#Anonymous Router for OrderCloud

This module provides the ability to redirect an anonymous user to the user admin page in order to profile themselves at any step within their catalog workflow.

>**Note:** This module is provided in the base application 18.9.0 CT Release and 1.3.0 SPA Release.

###Setup
#####1. Add module file to your project.
Add the **`anonRouter.js`** file to your project.

If you are using a repository, add this file to the **`/lib/oc`** directory.

If you are using file overrides, create a new file override named **`lib/oc/anonRouter.js`** and add this file as the content for that file.

**Be sure to reference both of this JS file in the `index.html` file**

#####2. Load the module into the application.
Add a dependency for `OrderCloud-AnonRouter` to the Four51.app module in the **`js/app.js`** file.

###Usage
#####1. Configure your before and after constants within the **`OrderCloud-AnonRouter`** module

There are two constants defined within the module: **`before`** and **`after`**. These constants serve to tell the module when to redirect the anonymous user to the user admin page and where they should be directed after creating a user profile.

For the **`before`** constant, enter the route string for when to redirect the user to the user admin page. For example, if you'd like the user to create a profile when attempting to checkout, enter 'checkout'.

For the **`after`** constant, enter the route string for where to redirect the user once they have created a profile.
**Note: If you attempt to send the user to 'checkout' and they do not have an order open, the user will be directed to the 'catalog' route.

#####2. Update UserEdit Controller

Add the following to the **`js/controllers/userEditController.js`** file if it is not there already. **The OrderCloud Storefront application will have this by default, but it is possible a file override has been created, or a custom repository was created before this update was made.

At the very top of the file:

```javascript
    var _AnonRouter;
    try {
        _AnonRouter = $injector.get('AnonRouter');
    }
    catch(ex){}
```

Within the success functions of the User.save and User.login:

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
