angular.module('OrderCloud-FixedFooter', []);

angular.module('OrderCloud-FixedFooter')
    .directive('fixedfooter', fixedfooter)
    .directive('orderbuttons', orderbuttons)
    .controller('FixedFooterCtrl', FixedFooterCtrl)
;

function fixedfooter() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'FixedFooterCtrl'
    };
    return directive;

    function template() {
        return [
            '<style>',
            'body {margin-bottom:0;}',
            '.fixed-footer-bottom div {color: #FFF; margin:15px 0;}',
            '.fixed-footer-bottom .pull-left a {font-size:2em; margin-right:0.5em;}',
            '.copyright-view {margin:0; padding-bottom:150px !important;}',
            '@media (max-width:767px) { .copyright-view {height: 300px !important; margin-top:25px; padding-top:0;} }',
            '</style>',
            '<nav class="navbar navbar-default navbar-fixed-bottom">',
                '<div class="fixed-footer-bottom">',
                    '<div class="col-xs-12">',
                        '<div class="col-xs-6 pull-left text-left">',
                        '<a target="_blank" href=""><i class="fa fa-facebook"></i></a>',
                        '<a target="_blank" href=""><i class="fa fa-twitter"></i></a>',
                        '<a target="_blank" href=""><i class="fa fa-linkedin"></i></a>',
                        '<a target="_blank" href=""><i class="fa fa-pinterest"></i></a>',
                        '</div>',
                        '<div class="col-xs-6 pull-right text-right">',
                        '&copy; {{year}} {{user.Company.Name}}. All Rights Reserved.',
                        '</div>',
                    '</div>',
                '</div>',
            '</nav>'
        ].join('');
    }
}

function orderbuttons() {
    var directive = {
        restrict: 'E',
        template: template,
        link: function(scope, element, attrs) {
            attrs.$observe('continue', function(val) {
                scope.continue = val == 'true' ? true : false;
            });

            attrs.$observe('view', function(val) {
                if (val) {
                    var view;
                    switch (val) {
                        case 'cart':
                            view = 'cart'
                            break;
                        case 'checkout':
                            view = 'checkout';
                            break;
                        default:
                            break;
                    }
                    scope.view = 'partials/controls/' + (view == 'cart' ? 'cartButtons.html' : 'checkoutButtons.html');
                }
            });
        }
    };
    return directive;

    function template() {
        return [
            '<style>',
            'orderbuttons {width:100%; margin:0 auto;}',
            '.navbar-fixed-bottom {position:relative;}',
            'orderbuttons li {width:25%;float:left; padding-right:10px; }',
            'orderbuttons .btn {border-radius:0; width:100%; margin:0 5px;}',
            'orderbuttons btn:nth-of-type(4) {margin-right:0; }',
            '@media (max-width:767px) { orderbuttons li {width:100%;} }',
            '@media (max-width:767px) { orderbuttons .btn {border-radius:0;width:100%; margin:5px 0;} }',
            '</style>',
            '<ul ng-include="view"></ul>'
        ].join('');
    }
}

FixedFooterCtrl.$inject = ['$scope', '$location'];
function FixedFooterCtrl($scope, $location) {

    var d = new Date();
    $scope.year = d.getFullYear();

    /*below functions from NavCtrl.js in case navigation is used in the footer*/
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

    //extension of above isActive in path
    $scope.isInPath = function(path) {
        var cur_path = $location.path().replace('/', '');
        var result = false;

        if(cur_path.indexOf(path) > -1) {
            result = true;
        }
        else {
            result = false;
        }
        return result;
    };
}