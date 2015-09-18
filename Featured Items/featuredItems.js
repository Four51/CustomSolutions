angular.module('OrderCloud-FeaturedItems', []);

angular.module('OrderCloud-FeaturedItems')
    .directive('featureditems', featureditems)
    .controller('FeaturedItemsCtrl', FeaturedItemsCtrl)
    .filter('intervalFilter', intervalFilter)
    .filter('featuredItemFilter', featuredItemFilter)
;

function featureditems() {
    var directive =  {
        restrict: 'E',
        template: template,
        controller: FeaturedItemsCtrl
    };
    return directive;

    function template() {
        return [
            '<style>',
            '.featured-items { display:none; }',
            '.featured-items.active { display:block; }',
            '.featured-items li { width:25%; float:left; }',
            '</style>',
            '<ul class="featured-items" ng-class="{\'active\': isActive(\'catalog\')}">',
            '<li ng-repeat="featureditem in featureditems">',
            '<a href="catalog/{{featureditem.link}}"><img src="{{featureditem.image}}" /></a>',
            '</li>',
            '</ul>'
        ].join('');
    }
}

FeaturedItemsCtrl.$inject = ['$scope', '$filter', '$location'];
function FeaturedItemsCtrl($scope, $filter, $location) {

    $scope.featureditems = [];
    $scope.$watch('user.CustomFields', function(newVal){
        if (!newVal) return;
        $scope.featureditems = []; //reset the slide counter
        //$scope.myInterval = ($filter('intervalFilter')($scope.user.CustomFields, 'interval') * 1000) || 5000;
        $scope.featureditems = $scope.featureditems.concat($filter('featuredItemFilter')($scope.user.CustomFields, 'featureditem'));
    });

    // from NavCtrl.js
    $scope.isActive = function(path) {
        var cur_path = $location.path().replace('/', '');
        var result = false;

        if (path instanceof Array) {
            angular.forEach(path, function(p) {
                if (p == cur_path && !result)
                    result = true;
            });
        }
        else {
            if (cur_path == path)
                result = true;
        }
        return result;
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

function featuredItemFilter() {
    return function (fields, name) {
        var result = [];
        angular.forEach(fields, function(field) {
            if(field.Name.toUpperCase().indexOf(name.toUpperCase()) > -1){
                var featureditem = {
                    //text: field.UploadInstructions,
                    image: field.File.Url,
                    link: field.Label
                };
                if (featureditem.link.toUpperCase().indexOf("NONE") > -1) {
                    featureditem.link = null;
                }
                result.push(featureditem);
            }
        });
        return result;
    }
}

