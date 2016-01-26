angular.module('OrderCloud-HamburgerNavigation', []); 

angular.module('OrderCloud-HamburgerNavigation')
    .directive('hamburgernavigation', hamburgernavigation)
    .directive('hamburgernavcategorytree', hamburgernavcategorytree)
    .directive('hamburgernavnode', hamburgernavnode)
    .directive('categorytree', categorytree)
    .directive('node', node)
    .controller('HamburgerNavigationCtrl', HamburgerNavigationCtrl)
;

function hamburgernavigation() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'HamburgerNavigationCtrl'
    };
    return directive;

    function template() {
        return [
            '<style>',
            //color changes start
            '.navbar-hamburger .main-toggle i {color:#fff;}',
            'ul.burgers {margin:0; width:100%;}',
            //color changes end
            'accountnavigation {display:none !important;}',
            '.navbar-hamburger .main-toggle i {font-size:1.8em; left:10px; position:relative; top:10px;}',
            '.navbar.navbar-hamburger, .navbar.navbar-categories, .navbar.navbar-account, .navbar.navbar-all {min-height:40px; max-height:40px; padding-bottom:10px;}',
            'ul.burgers li {width:100%;}',
            'ul.burgers li a {padding: 0.5em 0.75em; width:100%; height:auto; line-height:auto;}',
            'ul.burgers li a:hover {text-decoration:none;}',
            'ul.burgers li a i {font-size:1.2em; min-width:25px;}',
            'ul.categories, ul.account, ul.subcategories {position:relative; top:0; z-index:1010;}',
            'ul.categories li, ul.account li, ul-subcategories li {width:100%;}',
            'ul.categories li a, ul.account li a, ul-subcategories li a {padding:0.5em 0.75em; width:100%;}',
            'ul.subcategories li ul li a {padding:0.5em 1.25em; width:100%;}',
            'ul.categories li a:hover, ul.account li a:hover, ul.subcategories li a:hover {text-decoration:none;}',
            'ul.categories li ul li a, ul.account li a, ul.subcategories li a {color:#fff; font-size:95%; text-indent:5px;}',
            'ul.burgers .badge {margin-left:3px;}',
            '</style>',
            '<header class="header navbar navbar-inner hidden-sm hidden-md hidden-lg">',
                '<nav class="navbar navbar-default navbar-hamburger" role="navigation">',
                    '<div>',
                    '<a class="main-toggle" ng-click="isCollapsed = !isCollapsed" ng-class="{\'active\': !isCollapsed, \'\': isCollapsed}">',
                    '<i class="fa fa-th-list" ng-show="isCollapsed"></i>',
                    '<i class="fa fa-th" ng-show="!isCollapsed"></i>',
                    '</a>',
                    '</div>',
                '</nav>',
                '<div class="container">',
                    '<div class="col-xs-12 col-collapse" collapse="isCollapsed">',
                        '<ul class="navbar-nav navbar-default burgers">',
                            //search
                            '<li ng-class="{\'active\': isActive([\'search\'])}">',
                                '<a ng-click="retarget(\'search\')">',
                                '<i class="fa fa-search"></i>',
                                '<span>{{\'Search\' | r | xlat}}</span>',
                                '</a>',
                            '</li>',
                            //home
                            '<li ng-class="{\'active\': isActive([\'catalog\'])}">',
                            '<a ng-click="retarget(\'catalog\')">',
                            '<i class="fa fa-home"></i>',
                            '<span>{{\'Home\' | r | xlat}}</span>',
                            '</a>',
                            '</li>',
                            //categories
                            '<li id="categories">',
                                '<nav class="navbar-default navbar-categories" role="navigation">',
                                    '<div>',
                                    '<a ng-click="isCollapsedCategory = !isCollapsedCategory" ng-class="{\'active\': !isCollapsedCategory, \'\': isCollapsedCategory}">',
                                    '<i class="fa fa-folder" ng-show="isCollapsedCategory"></i>',
                                    '<i class="fa fa-folder-open" ng-show="!isCollapsedCategory"></i>',
                                    '<span>{{\'Products\' | r | xlat}}</span>',
                                    '</a>',
                                    '</div>',
                                '</nav>',
                                '<div class="col-xs-12 col-collapse" collapse="isCollapsedCategory">',
                                    '<ul class="navbar-nav categories">',
                                        //subcategories
                                        '<li id="subcategories">',
                                        '<hamburgernavcategorytree tree=\'tree\' current=\'currentCategory\' />',
                                        '</li>',
                                    '</ul>',
                                '</div>',
                            '</li>',
                            //cart
                            '<li class="cart" ng-class="{\'active\': isActive([\'cart\', \'checkout\'])}">',
                            '<a class="cart" ng-click="retarget(\'cart\')">',
                            '<i class="fa fa-shopping-cart"></i>',
                            '<span>{{\'Cart\' | r | xlat}}</span>',
                            '<span ng-bind="cartCount" class="badge"></span>',
                            '</a>',
                            '</li>',
                            //account
                            '<li id="account">',
                                '<nav class="navbar-account" role="navigation" ng-show="user.Type == \'Customer\'">',
                                    '<div>',
                                        '<a ng-click="isCollapsedAccount = !isCollapsedAccount">',
                                            '<i class="fa fa-cog" ng-show="isCollapsedAccount"></i>',
                                            '<i class="fa fa-cogs" ng-show="!isCollapsedAccount"></i>',
                                            '<span>{{\'Account\' | r | xlat}}</span>',
                                        '</a>',
                                    '</div>',
                                '</nav>',
                                '<div class="col-xs-12 col-collapse" collapse="isCollapsedAccount">',
                                    '<ul class="navbar-nav account">',
                                        '<li ng-show="user.Type == \'Customer\' && user.Permissions.contains(\'ViewSelfAdmin\')">',
                                        '<a ng-click="retarget(\'admin\')">',
                                        '<i class="fa fa-user"></i>',
                                        '{{\'User Information\' | r | xlat}}',
                                        '</a>',
                                        '</li>',
                                        '<li ng-show="user.Type == \'Customer\' && (user.Permissions.contains(\'CreateShipToAddress\') || user.Permissions.contains(\'CreateBillToAddress\'))">',
                                        '<a ng-click="retarget(\'addresses\')">',
                                        '<i class="fa fa-book"></i>',
                                        '{{\'Addresses\' | r | xlat}}',
                                        '</a>',
                                        '</li>',
                                        '<li ng-show="user.Type == \'Customer\'">',
                                        '<a ng-click="retarget(\'order\')">',
                                        '<i class="fa fa-clipboard"></i>',
                                        '{{\'Orders\' | r | xlat}}',
                                        '</a>',
                                        '</li>',
                                        '<li ng-show="user.Type == \'Customer\'">',
                                        '<a ng-click="retarget(\'favoriteorders\')">',
                                        '<i class="fa fa-star"></i>',
                                        '{{\'Favorites\' | r | xlat}}',
                                        '</a>',
                                        '</li>',
                                        '<li ng-show="user.Type == \'Customer\' && user.Permissions.contains(\'AdvancedReporting\')">',
                                        '<a ng-click="retarget(\'reports\')">',
                                        '<i class="fa fa-bar-chart-o"></i>',
                                        '{{\'Reports\' | r | xlat}}',
                                        '</a>',
                                        '</li>',
                                        '<li ng-show="user.Type == \'Customer\' && user.Permissions.contains(\'ViewMessaging\')">',
                                        '<a ng-click="retarget(\'message\')">',
                                        '<i class="fa fa-comment"></i>',
                                        '{{\'Messages\' | r | xlat}}',
                                        '</a>',
                                        '</li>',
                                        '<li>',
                                        '<a href="#" neworder ng-show="user.Type == \'Customer\' && user.Permissions.contains(\'MultipleShoppingCart\') && currentOrder" ng-click="newOrderLoadingIndicator = true;startNewOrder()">',
                                        '<i class="fa fa-plus"></i>',
                                        '{{\'Start\' | r | xlat}} {{\'New\' | r | xlat}} {{\'Order\' | r | xlat}}',
                                        '</a>',
                                        '</li>',
                                    '</ul>',
                                '</div>',
                            '</li>',
                            //logout
                            '<li class="logout" ng-if="user.Type ==\'Customer\'">',
                            '<a href="#" class="451_btn_logout" ng-click="Logout()">',
                            '<i class="fa fa-sign-out"></i>',
                            '<span>{{\'Logout\' | r | xlat}}</span>',
                            '</a>',
                            '</li>',
                            //login
                            '<li ng-if="user.Type ==\'TempCustomer\'">',
                            '<a ng-click="retarget(\'admin\')">',
                            '<i class="fa fa-sign-in"></i>',
                            '<span>{{\'Login\' | r | xlat}}</span>',
                            '</a>',
                            '</li>',
                        '</ul>',
                    '</div>',
                '</div>',
            '</header>'
        ].join('');
    }
}

function hamburgernavcategorytree() {
    var directive = {
        restrict: 'E',
        replace: true,
        template: template,
        controller: 'HamburgerNavigationCtrl',
        scope: {
            tree: '=',
            current: '='
        }
    };
    return directive;

    function template() {
        return [
            '<ul class="subcategories">',
                '<hamburgernavnode class="nav" ng-repeat="node in tree" node="node" current="current"></hamburgernavnode>',
            '</ul>'
        ].join('');
    }
}

function hamburgernavnode() {
    var directive = {
        restrict: 'E',
        replace: true,
        template: template,
        controller: 'HamburgerNavigationCtrl',
        scope: {
            node: '=',
            current: '='
        }
    };
    return directive;

    function template() {
        return [
            '<li ng-class="{\'active\':  current.InteropID == node.InteropID}">',
                '<nav class="navbar-default navbar-{{node.InteropID}}" role="navigation">',
                    '<div ng-init="isCollapsedSubCategory = true">',
                        '<a ng-show="node.SubCategories" ng-click="isCollapsedSubCategory = !isCollapsedSubCategory">',
                            '<i class="fa fa-plus-square" ng-show="isCollapsedSubCategory"></i>',
                            '<i class="fa fa-minus-square" ng-show="!isCollapsedSubCategory"></i>',
                            '<span>{{node.Name}}</span>',
                        '</a>',
                        '<a ng-hide="node.SubCategories" ng-click="retarget(\'catalog/{{node.InteropID}}\')" ng-bind-html="node.Name"></a>',
                    '</div>',
                '</nav>',
                '<div class="col-xs-12 col-collapse" collapse="isCollapsedSubCategory">',
                    '<ul class="navbar-nav">',
                        '<categorytree tree=\'node.SubCategories\' current=\'current\'/>',
                    '</ul>',
                '</div>',
            '</li>'
        ].join('');
    }
}

function categorytree() {
    var directive = {
        restrict: 'E',
        replace: true,
        template: template,
        controller: 'HamburgerNavigationCtrl',
        scope: {
            tree: '=',
            current: '='
        }
    };
    return directive;

    function template() {
        return [
            '<ul>',
                '<node class="nav" ng-repeat="node in tree" node="node" current="current"></node>',
            '</ul>'
        ].join('');
    }
}

node.$inject = ['$compile'];
function node($compile) {
    var directive = {
        restrict: 'E',
        replace: true,
        template: template,
        controller: 'HamburgerNavigationCtrl',
        scope: {
            node: '=',
            current: '='
        },
        link: function(scope, element) {
            if (angular.isArray(scope.node.SubCategories)) {
                element.append("<categorytree tree='node.SubCategories' current='current'/>");
                $compile(element.contents())(scope);
            }
        }
    };
    return directive;

    function template() {
        return [
            '<li class="451_cat_item">',
                '<a ng-click="retarget(\'catalog/{{node.InteropID}}\')" ng-bind-html="node.Name"></a>',
            '</li>'
        ].join('');
    }
}

HamburgerNavigationCtrl.$inject = ['$location', '$scope', '$rootScope'];
function HamburgerNavigationCtrl($location, $scope, $rootScope) {

    $scope.isCollapsed = true;
    $scope.isCollapsedCategory = true;
    $scope.isCollapsedSubCategory = true;
    $scope.isCollapsedAccount = true;

    $scope.retarget = function(url) {
        $scope.target = url;
        $location.path($scope.target);
        $rootScope.$broadcast('clicked');
    };

    $scope.$on('clicked', function() {
        $scope.isCollapsedCategory = true;
        $scope.isCollapsedSubCategory = true;
        $scope.isCollapsed = true;
        $scope.isCollapsedAccount = true;
    });
}