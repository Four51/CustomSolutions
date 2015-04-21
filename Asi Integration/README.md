#ASI SmartLink Product Search Integration

This module utilizes the SmartLink Developers API to integrate their products into your Storefront dynamically. 
Go to http://developers.asicentral.com/ to learn more about ASI's API.

##Setup
###1. Add asi.js to your project.
asi.js contains an AngularJS module with all the resources necessary to integrate. We recommend adding this file under the lib folder under the app directory. Add the following script tag to your index.html file inside the body tag:

```html
<script src="lib/asi.js" data-group="resources"></script>
```

####Contents:
- **constant**: 'url' is the api end point. "https://api.asicentral.com/v1"
- **constant**: 'client_id' is the assigned client id from ASI 
- **constant**: 'client_secret' is the assigned client secret from ASI
- **route**: '/asi/:categoryInteropID'. In order to direct the user to this module you must alter the url in the categoryView.html to use this route
- **factory**: 'api'. The functions to call the ASI API and return the results.
  - **search(key)**: API call to ASI product search resource. Parameter is the q parameter and search criteria. Tips on the operators available are located at http://developers.asicentral.com/Smartlink/UsingSearch
  - **criteria(category)**: Method to retrieve the product list assigned to the category that are the basis for the shells
  - **shells(productlist)**: API method to get the product shells that will be mapped to the ASI catalog 

If you are using a repository, add this file to the **`/lib`** directory.

If you are using file overrides, create a new file override and add your module as the content for that file.

**Be sure to reference this JS file in the `index.html` file**

###2. Load the module into the application.
Add a dependency for `OrderCloud-ASI` to the four51.app module in the **`js/app.js`** file.

###3. Edit navigation
In order to direct the user to the asi module when appropriate you must define a rule. In this example looking for the InteropID of the Category to equal 'asi' will be used. Edit the partials/categoryList file and change this

```js
<a ng-href="catalog/{{c.InteropID}}">
```

to

```js
<a ng-href="{{c.InteropID == 'asi' ? 'asi' : 'catalog'}}/{{c.InteropID}}">
```

###4. Edit authentication
This change is only necessary until it will be added to the base storefront application. This documentation will be updated at that time. Add the following line after **function appendAuth(config) {** in the js/interceptors.js file:

```js
if (config.headers['Authorization']) return config;
```

The asi module will add the appropriate headers for authentication. This change ensures that the Storefront authentication token does not replace the one necessary for ASI.

##Configuration
###1. Create a Category
This category will hold your product shell. In the example above the InteropID was set to 'asi' so it could be evaluated for the route url. This is not required, but it is a simple way to enable the module

###2. Create a Product
This product will act as the `shell` for the ASI integration. Assign it to the Category designated. 

###3. Add the Search Criteria
Create a Static Spec on the Product with the following properties:
- Spec Group Name: `ASI`
- Spec Name: `SearchKey`
- Spec Type: `Text`
- Value: your search criteria
The value will be the ASI product search key used in the API call.

###4. Map Variable Specs
Create a Variable Spec on the Product for each ASI field you wish to map for display.  The value for the Spec Name will be returned from the API.  Create the Spec Name using any of the available parameters:
- ID
- Name
- Description
- Number
- ImageUrl
- ConfigId
- Supplier.Id
- Supplier.Name
- Supplier.AsiNumber
- Supplier.Phone.Work
- Supplier.Phone.TollFree
- Supplier.Phone.$index
- Supplier.Rating.Rating
- Supplier.Rating.Transactions
- Price.Quantity
- Price.Price
- Price.Cost
- Price.DiscountCode
- Price.CurrencyCode
- IsNew
- IsConfirmed
- HasVirtualSample
