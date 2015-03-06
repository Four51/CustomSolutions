angular.module('carousel', ['ngAnimate']);
angular.module('carousel')
    .controller('customCarouselController', customCarouselController)
    .directive('customCarousel', CarouselDirective)
    .filter('intervalFilter', intervalFilter)
    .filter('carouselFilter', carouselFilter)
;

function customCarouselController($scope, $animate, $filter) {
    $animate.enabled(false);
    $scope.myInterval = ($filter('intervalFilter')($scope.user.CustomFields, 'interval') * 1000) || 5000;
    $scope.slides = [];
    $scope.slides = $scope.slides.concat($filter('carouselFilter')($scope.user.CustomFields, 'carouselImage'));
}
customCarouselController.$inject = ['$scope', '$animate', '$filter'];


function CarouselDirective() {
    return {
        restrict: 'E',
        templateUrl: 'partials/controls/carousel.html',
        controller: customCarouselController
    };
}

function intervalFilter() {
    return function (fields, name) {
        var result = null;
        angular.forEach(fields, function(field) {
            if(field.Name.toUpperCase().indexOf(name.toUpperCase()) > -1)
                result = field.DefaultValue;
        });
        return result;
    }
}

function carouselFilter() {
    return function (fields, name) {
        var result = [];
        angular.forEach(fields, function(field) {
            if(field.Name.toUpperCase().indexOf(name.toUpperCase()) > -1){
                var slide = {
                    text: field.UploadInstructions,
                    image: field.File.Url,
                    link: field.Label
                };
                if (slide.link.toUpperCase().indexOf("NONE") > -1)
                    slide.link = null;
                result.push(slide);
            }
        });
        return result;
    }
}



