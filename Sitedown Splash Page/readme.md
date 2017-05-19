# Sitedown Splash Page 

This module allows you to put up a splash page to place immediate announcements such as "Site is down for maintenance" when someone is routed to your site.

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/SitedownSplashPage).

## Setup

#### 1. Add module file to your project.

If you are using a repository, create a new .html file in your directory. 

If you are using file overrides, create a new file override named **`sitedownSplashPage.html`** and add this file as the content by following these steps:

1. Edit your 2.0 site
2. Go to “Code Editor” tab
3. Hit “New File Override”
4. Name this file **`sitedownSplashPage.html`**
5. Place raw code from sitedownSplashPage.html in the section below. Save.


## Usage

#### 1. Update and save the index.html file

 In Code Editor, place the code below immediately after the first **`<head>`** tag.  
```html
<!-- enable this script for site down message, disable for site active, script begin -->
    <script type="text/javascript">
        { window.location.replace("sitedownSplashPage.html"); }
    </script> 
<!-- site down script end -->
```


>**Important!** Having this code in your index.html file will automatically route your site to the splash page you have create.  To remove the splash page and re-route back to the site, simply remove or comment out the code. 

#### 2. Customize the Splash Page with CSS
The CSS styles are located within the sitedownSplashPage.html file.  You can make any changes to the CSS in this file, or link out to a newly created CSS file.  With CSS you can add text, logos, change colors, or add videos like you see set in the background of the example.  Additionally, a directory of icons that work seamlessly with our app can be found [here](https://fortawesome.github.io/Font-Awesome/icons/). 
