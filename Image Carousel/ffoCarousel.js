four51.app
	.directive('ffoCarousel', function() {
		return {
			scope: {
				indicators: '=',
				timeout: '=',
				controls: '='
			},
			restrict: 'E',
			templateUrl: 'partials/controls/ffoCarousel.html',
			controller: 'ffoCarouselCtrl'
		}
	})
	.controller('ffoCarouselCtrl', ['$scope', 'User', function($scope, User){
		User.get(function(user) {
			$scope.Slides = [];
			angular.forEach(user.CustomFields, function(f) {
				if (f.Name.indexOf('carouselImage') > -1) {
					var s = {
						'imageUrl': f.File.Url,
						'linkUrl': f.Label == 'None' ? null : f.Label,
						'externalLink': f.Label.indexOf('http') > -1
					};
					$scope.Slides.push(s);
				}
			});
		})
	}])

;
