/* Inject 'Lightbox' into js/controllers/productCtrl.js and add $scope.$watch and $scope.openLightboxModal fn */

/* Injection */
four51.app.controller('ProductCtrl', ['$scope', '$routeParams', '$route', '$location', '$451', 'Product', 'ProductDisplayService', 'Order', 'Variant', 'User', 'Lightbox',
    function ($scope, $routeParams, $route, $location, $451, Product, ProductDisplayService, Order, Variant, User, Lightbox) {
    	
/*functions*/
	$scope.$watch('LineItem.Specs.Color.Value', function(n,o){
		if ( n!= o) {
			ProductDisplayService.setProductViewScope($scope);
			Lightbox.setImages($scope.LineItem.images);
		}
	});
	
		$scope.openLightboxModal = function (index) {
	Lightbox.openModal($scope.LineItem.images, index);
	};
