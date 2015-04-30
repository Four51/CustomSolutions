angular.module('OrderCloud-Carousel', ['ngAnimate']);

angular.module('OrderCloud-Carousel')
    .directive('customcarousel', customcarousel)
    .controller('customCarouselCtrl', customCarouselCtrl)
    .filter('intervalFilter', intervalFilter)
    .filter('carouselFilter', carouselFilter)
;

function customcarousel() {
    var directive =  {
        restrict: 'E',
        template: template,
        controller: customCarouselCtrl
    };
    return directive;

    function template() {
        return [
            '<style>',
            '.carousel-inner a[ng-href=""]:hover{cursor: default}',
            '.carousel-control.left {background-image: none;}',
            '.carousel-control.right {background-image: none;}',
            '</style>',
            '<carousel interval="myInterval">',
            '<slide ng-repeat="slide in slides" active="slide.active">',
            '<a style="max-width: 100%; height: auto;" ng-href="{{slide.link}}" target="{{slide.link.indexOf(\'http\') > -1 ? \'_blank\' : \'_self\'}}">',
            '<img ng-src="{{slide.image}}">',
            '</a>',
            '<div class="carousel-caption">',
            '<h4 ng-show="slide.text.toUpperCase() != \'NONE\'">{{slide.text}}</h4>',
            '</div>',
            '</slide>',
            '</carousel>'
        ].join('');
    }
}

function customCarouselCtrl($scope, $animate, $filter) {
    $animate.enabled(false);
    $scope.slides = [];
    $scope.$watch('user.CustomFields', function(newVal){
        if (!newVal) return;
        $scope.myInterval = ($filter('intervalFilter')($scope.user.CustomFields, 'interval') * 1000) || 5000;
        $scope.slides = $scope.slides.concat($filter('carouselFilter')($scope.user.CustomFields, 'carouselImage'));
    });
}
customCarouselCtrl.$inject = ['$scope', '$animate', '$filter'];


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


