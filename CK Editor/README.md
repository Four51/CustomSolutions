#CKEditor for OrderCloud 

This module provides an overview of how to implement CKEditor for an OrderCloud 2.0 site.

##Setup

###1. Add ckeditor folder to your project.
CKEditor provides code located within the ckeditor folder.
Add this to the lib directory of your project.

###2. Add ck.js as a dependency to your project.
In the app.js file add 'ck' to the array of dependencies

###3. Add the ck.js module to your project.
I usually add it under /lib/angular/plugins/
Add 'ck' as a dependency to the app.js file.
In the index:
```html
<script src="lib/angular/plugins/ck.js" data-group="resources"></script>
<script src="//cdn.ckeditor.com/4.4.7/basic/ckeditor.js" data-group="cdn"></script>
```

###4. Customizing the editor
One thing you might want to do is remove buttons fromt the editor. One example included is removing the Source button.
**`removeButtons: ['Source',...]`**

###5. Using the editor in html
Example:
```html
<textarea ck-editor ng-model="editorText" rows="10" cols="80"></textarea>
```
It doesn't matter what element it is put on, adding "ck-editor" will replace it. Always have the ng-model class on the element with the variable you want to bind the data to.
