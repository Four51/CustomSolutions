four51.app.controller('ProductCtrl', ['$scope', '$routeParams', '$route', '$location', '$451', 'Product', 'ProductDisplayService', 'Order', 'Variant', 'User', 'Lightbox',
function ($scope, $routeParams, $route, $location, $451, Product, ProductDisplayService, Order, Variant, User, Lightbox) {
    $scope.selected = 1;
    $scope.LineItem = {};
	$scope.addToOrderText = "Add To Cart";
	$scope.loadingIndicator = true;
	$scope.loadingImage = true;
	$scope.searchTerm = null;
	$scope.settings = {
		currentPage: 1,
		pageSize: 10
	};

	$scope.calcVariantLineItems = function(i){
		$scope.variantLineItemsOrderTotal = 0;
		angular.forEach($scope.variantLineItems, function(item){
			$scope.variantLineItemsOrderTotal += item.LineTotal || 0;
		})
	};
	function setDefaultQty(lineitem) {
		$scope.LineItem.Quantity = lineitem.Product.StandardPriceSchedule.DefaultQuantity > 0 ? lineitem.Product.StandardPriceSchedule.DefaultQuantity : null;
	}
	function init(searchTerm) {
		ProductDisplayService.getProductAndVariant($routeParams.productInteropID, $routeParams.variantInteropID, function (data) {
			$scope.LineItem.Product = data.product;
			$scope.LineItem.Variant = data.variant;
			setDefaultQty($scope.LineItem);
			ProductDisplayService.setNewLineItemScope($scope);
			ProductDisplayService.setProductViewScope($scope);
			$scope.$broadcast('ProductGetComplete');
			$scope.loadingIndicator = false;
			$scope.setAddToOrderErrors();
			makeImages();
		}, $scope.settings.currentPage, $scope.settings.pageSize, searchTerm);
	}
	$scope.$watch('settings.currentPage', function(n, o) {
		if (n != o || (n == 1 && o == 1))
			init($scope.searchTerm);
	});

	$scope.searchVariants = function(searchTerm) {
		$scope.searchTerm = searchTerm;
		$scope.settings.currentPage == 1 ?
			init(searchTerm) :
			$scope.settings.currentPage = 1;
	};

	$scope.deleteVariant = function(v, redirect) {
		if (!v.IsMpowerVariant) return;
		// doing this because at times the variant is a large amount of data and not necessary to send all that.
		var d = {
			"ProductInteropID": $scope.LineItem.Product.InteropID,
			"InteropID": v.InteropID
		};
		Variant.delete(d,
			function() {
				redirect ? $location.path('/product/' + $scope.LineItem.Product.InteropID) : $route.reload();
			},
			function(ex) {
				$scope.lineItemErrors.push(ex.Message);
				$scope.showAddToCartErrors = true;
			}
		);
	}

	$scope.addToOrder = function(){
		if($scope.lineItemErrors && $scope.lineItemErrors.length){
			$scope.showAddToCartErrors = true;
			return;
		}
		if(!$scope.currentOrder){
			$scope.currentOrder = {};
			$scope.currentOrder.LineItems = [];
		}
		if($scope.allowAddFromVariantList){
			angular.forEach($scope.variantLineItems, function(item){
				if(item.Quantity > 0){
					$scope.currentOrder.LineItems.push(item);
				}
			});
		}else{
			$scope.currentOrder.LineItems.push($scope.LineItem);
		}
		$scope.addToOrderIndicator = true;
		Order.save($scope.currentOrder,
			function(o){
				$scope.user.CurrentOrderID = o.ID;
				User.save($scope.user, function(){
					$scope.addToOrderIndicator = true;
					$location.path('/cart');
				});
			},
			function(ex) {
				$scope.addToOrderIndicator = false;
				$scope.addToOrderError = ex.Message;
				$route.reload();
			}
		);
	}

	$scope.$on('event:imageLoaded', function(event, result) {
		$scope.loadingImage = false;
		$scope.$apply();
	});
		
	
	//bootstrap Lightbox
	function makeImages() {
		$scope.images = [];	
		var count = 1;
		angular.forEach ($scope.LineItem.Product.StaticSpecGroups.GalleryImages.Specs, function(spec) {
			var image = {};
			image.url = spec.FileURL;
			image.thumbUrl = $scope.LineItem.Product.StaticSpecGroups.GalleryThumbs.Specs[count].FileURL;
			//image.caption = 
			$scope.images.push(image);
			count++;
		});
	};


	$scope.openLightboxModal = function (index) {
	Lightbox.openModal($scope.images, index);
	};
	//
	

}]);
