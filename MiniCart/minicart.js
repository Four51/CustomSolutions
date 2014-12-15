four51.app.directive('minicart', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/controls/minicart.html',
		controller: 'minicartCtrl'
	};
	return obj;
});

four51.app.controller('minicartCtrl', ['$scope', '$location', 'Order','User','BonusItem',
	function ($scope, $location, Order, User, BonusItem) {

		$scope.freeProductInfo = BonusItem.findfreeproduct($scope.currentOrder);

		$scope.removeItem = function(item, override) {
			if (override || confirm('Are you sure you wish to remove this item from your cart?') == true) {
				Order.deletelineitem($scope.currentOrder.ID, item.ID,
					function(order) {
						$scope.currentOrder = order;
						Order.clearshipping($scope.currentOrder);
						if (!order) {
							$scope.user.CurrentOrderID = null;
							User.save($scope.user, function(){
								$location.path('catalog');
							});
						}
						else {
							var freeProductResult = BonusItem.findfreeproduct(order);
							if (order.Subtotal < freeProductResult.Threshold && freeProductResult.Item) {
								$scope.removeItem(freeProductResult.Item, true);
							}
						}
						$scope.displayLoadingIndicator = false;
						$scope.actionMessage = 'Your Changes Have Been Saved';
					},
					function (ex) {
						$scope.errorMessage = ex.Message.replace(/\<<Approval Page>>/g, 'Approval Page');
						$scope.displayLoadingIndicator = false;
					}
				);
			}
		};
	}
]);
