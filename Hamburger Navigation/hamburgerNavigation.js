angular.module('OrderCloud-HamburgerNavigation', []);

angular.module('OrderCloud-HamburgerNavigation')
    .directive('hamburgernavigation', hamburgernavigation)
    //.controller('HamburgerNavigationCtrl', HamburgerNavigationCtrl)
;

function hamburgernavigation() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'NavCtrl'
    };
    return directive;

    function template() {
        return [
            '<style>',
            '.navbar.navbar-hamburger { min-height:40px; max-height:40px; background-color: #50acdb; padding-bottom:10px; }',
            '.navbar-hamburger .col-collapse { background-color:#fff; color:#fff; }',
            '.navbar-hamburger i { font-size: 1.8em; left: 10px; position: relative; top: 10px; }',
            '.navbar-hamburger a, ul.burgers li a { color:#ffffff; text-decoration:none; }',
            '.navbar-hamburger a:hover { color:#fff; text-decoration:none; }',
            'ul.burgers { background-color: #50acdb; }',
            'ul.burgers li a { background-color: #50acdb;  padding: 0.5em 0.75em; width: 100%; }',
            'ul.burgers li a:hover { color:#ffffff; text-decoration:none; background-color:#359fd5;}',
            'ul.burgers li.login a, ul.burgers li.logout a, ul.burgers li.cart a { margin-bottom:1px; }',
            'ul.burgers li.login a:hover, ul.burgers li.logout a:hover, ul.burgers li.cart a:hover { border-bottom:1px solid #359fd5; margin-bottom:0; }',
            'ul.burgers li.cart a i { margin-right:5px; }',
            '</style>',
            '<header class="header navbar navbar-inner hidden-sm hidden-md hidden-lg">',
            '<nav class="navbar navbar-hamburger" role="navigation">',
            '<div ng-init="isCollapsed = true">',
            '<a ng-click="isCollapsed = !isCollapsed" ng-class="{\'active\': !isCollapsed, \'\': isCollapsed}">',
            '<span><i class="fa fa-th-list"></i></span>',
            '</a>',
            '</div>',
            '</nav>',
            '<div class="col-xs-12 col-collapse" collapse="isCollapsed">',
            '<ul class="burgers">',
            '<li ng-class="{\'active\': isActive([\'contact\'])}">',
            '<a href="contact">',
            '<span>{{\'Contact Us\' | r | xlat}}</span>',
            '</a>',
            '</li>',
            '<li class="report" ng-if="user.Type == \'Customer\' && user.Permissions.contains(\'AdvancedReporting\')" ng-class="{\'active\': isActive(\'reports\')}">',
            '<a href="reports">',
            '<span>{{\'Reports\' | r | xlat}}</span>',
            '</a>',
            '</li>',
            '<li ng-if="user.Type == \'Customer\' && user.Permissions.contains(\'ViewSelfAdmin\')" ng-class="{\'active\': isActive([\'admin\', \'addresses\', \'address\', \'messages\', \'message\', \'favoriteorders\'])}">',
            '<a href="admin">',
            '<span>{{\'My Account\' | r | xlat}}</span>',
            '</a>',
            '</li>',
            '<li class="cart" ng-class="{\'active\': isActive([\'cart\', \'checkout\'])}">',
            '<a ng-show="cartCount && user.CurrentOrderID" class="cart" href="cart">',
            '<i class="fa fa-shopping-cart"></i>',
            '<span>{{\'View Cart\' | r | xlat}}</span>',
            '</a>',
            '</li>',
            '<li class="login" ng-if="user.Type !=\'Customer\'" ng-class="{\'active\': isActive(\'admin\')}">',
            '<a href="admin" class="451_btn_logout">',
            '<span>{{\'Login\' | r | xlat}}</span>',
            '</a>',
            '</li>',
            '<li class="logout" ng-if="user.Type ==\'Customer\'">',
            '<a href="#" class="451_btn_logout" ng-click="Logout()">',
            '<span>{{\'Logout\' | r | xlat}}</span>',
            '</a>',
            '</li>',
            '</ul>',
            '</div>',
            '</header>'
        ].join('');
    }
}