angular.module('OrderCloud-CategoryModal', []); 

angular.module('OrderCloud-CategoryModal')
    .directive('categorymodal', categorymodal)
    .controller('CategoryModalCtrl', CategoryModalCtrl)
;

function categorymodal() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'CategoryModalCtrl'
    };
    return directive;

    function template() {
        return [
            '<style>',
            //this style is conditional based on nav placement and site css
            //'categorymodal a, categorymodal a:hover, categorymodal a:focus {color:#fff; text-decoration:none;}',
            '</style>',
            // update the size of the modal window within the open()
            '<a ng-click="openCategory(500)">',
            // update fontawesome for the shopping bag icon
            '<i class="fa fa-shopping-bag"></i>',
            '<span class="hidden-xs">{{\'Categories\' | r | xlat}}</span>',
            '</a>'
        ].join('');
    }
}

CategoryModalCtrl.$inject = ['$scope', '$modal', '$log'];
function CategoryModalCtrl($scope, $modal, $log) {

    $scope.modaltree = $scope.tree;
    $scope.animationsEnabled = true;

    $scope.openCategory = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            size: size,
            template: categorymodalopen,
            controller: CategoryModalOpenCtrl,
            resolve: {
                modaltree: function () {
                    //pass a scope variable into the modal content. in this case we are providing the category tree
                    return $scope.tree;
                }
            }
        });

        function categorymodalopen() {
            return [
                '<style>',
                '.modal-dialog {width: 300px; top:180px;}',
                '@media(max-width:767px) { .modal-dialog { width:100%; margin:0 auto;} }',
                '.modal-header {border-bottom:1px solid #ccc; min-height:36px; padding:2px;}',
                '.modal-header h3 { margin-top:0;}',
                '.modal-header h5 { font-size:1.16em; font-weight:bold; padding:5px 10px; color:#FFFFFF; text-shadow:0 1px 0 #FFFFFF;}',
                '.modal-header a.close {margin:0; padding:0; position:absolute; top:8px; right:10px; font-size:1.5em; color:#FFFFFF;}',
                '.modal-body {width:100%; margin:0 auto; padding: 10px 0 20px 0;}',
                '.modal-body ul li { padding:5px 15px;}',
                //'.modal-body ul li:hover, .modal-body ul li ul li:hover {background:#A80309;}',
                '.modal-body ul li ul li {text-indent:10px; padding:5px 0 0 0}',
                '.modal-body a {color:#FFFFFF; }',
                '</style>',
                '<div class="modal-header navbar-default">',
                '<h5 class="modal-title text-primary">SELECT A CATEGORY</h5>',
                '<a class="pull-right close" ng-click="closeCategory()">',
                '<i class="fa fa-times"></i>',
                '</a>',
                '</div>',
                '<div class="modal-body navbar-default">',
                //modaltree
                '<ul>',
                '<li ng-repeat="category in modaltree">',
                '<a ng-click="retarget(\'catalog/{{category.InteropID}}\')" ng-bind-html="category.Name"></a>',
                '<ul ng-if="category.SubCategories.length > 0">',
                '<li ng-repeat="sub in category.SubCategories">',
                '<a ng-click="retarget(\'catalog/{{sub.InteropID}}\')" ng-bind-html="sub.Name"></a>',
                '</li>',
                '</ul>',
                '</li>',
                '</ul>',
                '</div>'
            ].join('');
        }

        modalInstance.result.then(function (currentCategory) {
            $scope.current = currentCategory;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    };

    var CategoryModalOpenCtrl = ['$scope', '$location', '$modalInstance', '$modal', 'modaltree', function($scope, $location, $modalInstance, $modal, modaltree) {

        $scope.modaltree = modaltree; // this is the item passed in from the CategoryModalCtrl resolve

        $scope.retarget = function(url) {
            $scope.target = url;
            $location.path($scope.target);
            $modalInstance.close();
        };

        $scope.closeCategory = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }];

}
