angular.module('OrderCloud-SlideOutNav', []);

angular.module('OrderCloud-SlideOutNav')
    .directive('slideoutnav', slideoutnav)
    .controller('SlideOutNavCtrl', SlideOutNavCtrl)
;

function slideoutnav() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'SlideOutNavCtrl'
    };
    return directive;

    function template() {
        return [
            '<style>',
                '.slideout-nav {border:1px solid #d1d2d4; border-radius:1px; border-right:0; position:fixed; top:70px; right:-300px; width:300px; background-color:#d1d2d4;' +
                'padding:10px 10px 20px 20px; z-index:1040; transition:all 300ms ease-in-out; -webkit-transition:all 300ms ease-in-out;}',
            '.slideout-nav.showNav {right:0; transition:all 300ms ease-in-out; -webkit-transition:all 300ms ease-in-out;}',
            '.slideout-nav .row {min-height:60px;}',
            '.slideout-nav .header {height:40px; border-bottom:1px solid #ccc; color:#c21c22; font-size:24px; text-transform:uppercase; font-weight:bold; margin-bottom: 30px;}',
            '.slideout-nav img {float:left; padding:0 10px; height:auto;}',
            '</style>',
            '<div class="slideout-nav text-left" ng-class="{\'showNav\':showSlideOutNav}">',
            '<div class="header">',
            '<span class="pull-left"><h5>SlideOut Nav</h5></span>',
            '<a class="pull-right" ng-click="showSlideOutNav = false"><i class="fa fa-angle-double-right"></i></a>',
            '</div>',
            '<div class="row" ng-repeat="item in slideOutNavItems">',
            '<span ng-if="item.linkUrl == \'none\'">',
            '<img ng-src="{{item.imageUrl}}" />',
            '</span>',
            '<span ng-if="item.linkUrl != \'none\' && item.externalLink == false">',
            '<a href="{{item.linkUrl}}">',
            '<img ng-src="{{item.imageUrl}}" />',
            '</a>',
            '</span>',
            '<span ng-if="item.externalLink == true">',
            '<a target="_blank" href="{{item.linkUrl}}">',
            '<img ng-src="{{item.imageUrl}}" />',
            '</a>',
            '</span>',
            '</div>',
            '</div>'
        ].join('');
    }
}

SlideOutNavCtrl.$inject = ['$scope','User'];
function SlideOutNavCtrl($scope, User) {
    User.get(function(user) {
        $scope.slideOutNavItems = [];
        angular.forEach(user.CustomFields, function(f) {
            if (f.Name.indexOf('SlideOutNav') > -1) {
                var l = {
                    'imageUrl': f.File.Url,
                    'linkUrl': f.Label,
                    'externalLink': f.Label.indexOf('http') > -1
                };
                $scope.slideOutNavItems.push(l);
            }
        });
    })
}
