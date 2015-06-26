angular.module('OrderCloud-SubcategoryHover', []);

angular.module('OrderCloud-SubcategoryHover')
    .directive('categorylistsubcategoryhover', categorylistsubcategoryhover)
    .controller('SubcategoryHoverCtrl', SubcategoryHoverCtrl)
;

function categorylistsubcategoryhover() {
    var directive = {
        restrict: 'E',
        controller: 'SubcategoryHoverCtrl',
        templateUrl: 'partials/CategoryListViews/categoryListSubcategoryHover.html',
    };
    return directive;
}

SubcategoryHoverCtrl.$inject = ['$routeParams', '$sce', '$scope', 'Category'];
function SubcategoryHoverCtrl($routeParams, $sce, $scope, Category) {

    $scope.trusted = function(d){
        if(d) return $sce.trustAsHtml(d);
    }

    if ($routeParams.categoryInteropID) {
        $scope.categoryLoadingIndicator = true;
        Category.get($routeParams.categoryInteropID, function(cat) {
            $scope.currentCategory = cat;
            $scope.categoryLoadingIndicator = false;
        });
    }

    /*
    //leave this in here in case we ever decide to make this a dynamic solution
    $scope.categoryCount = $scope.currentCategory.SubCategories.length;
    if ($scope.categoryCount > 5) {
        $scope.rows = $scope.categoryCount / 5;
    }*/

    $scope.showAngle = function(cat) {
        if (cat.InteropID == c.InteropID) {
            $scope.showAngle = true;
        }
        $scope.cat = cat;

    }

    $scope.hideAngle = function() {
        $scope.hideAngle = false;
    }

    $scope.showSubcategories = function(cat, row) {
        $scope.showSubs = true;
        $scope.cat = cat;
        $scope.row = row;

    }

    $scope.hideSubcategories = function() {
        $scope.showSubs = false;
    }
}