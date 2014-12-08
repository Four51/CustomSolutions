/***  
js/services/productDisplayService.js Rev: 12/8/14 
Add the below snippet within function productViewScope(scope){} 
and after the scope.setAddToOrderErrors = function(){}
***/
	
if (scope.LineItem.Product.StaticSpecGroups) {

	if (scope.LineItem.Product.StaticSpecGroups.GalleryImages) {

	scope.LineItem.images = [];
	var count = 1;

		angular.forEach (scope.LineItem.Product.StaticSpecGroups.GalleryImages.Specs, function(spec) {
			var image = {};
			image.url = spec.FileURL;
			image.thumbUrl = scope.LineItem.Product.StaticSpecGroups.GalleryThumbs.Specs[count].FileURL;
			image.Number = count;
			scope.LineItem.images.push(image);
			count++;
		});
	}
}

if (scope.LineItem.Specs && scope.LineItem.Product.StaticSpecGroups) {

	if (scope.LineItem.Specs.Color) {
		 
		scope.LineItem.images = [];
		var count = 1;
	
		var color = scope.LineItem.Specs.Color.Value;
		var colorLarge = color + 'Large';
		var colorSmall = color + 'Small';
		
		if (scope.LineItem.Product.StaticSpecGroups[colorLarge]) {

			angular.forEach (scope.LineItem.Product.StaticSpecGroups[colorLarge].Specs, function(spec) {
				var image = {};
				image.url = spec.FileURL;
				image.thumbUrl = scope.LineItem.Product.StaticSpecGroups[colorSmall].Specs[count].FileURL;
				image.Number = count;
				scope.LineItem.images.push(image);
				count++;
			});
		}
		
	scope.imageLoaded = true;
	}
}

//trigger the click for the first image (gives the large image)
scope.index = 0;
