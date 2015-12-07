angular.module('OrderCloud-FixedFooter', []);

angular.module('OrderCloud-FixedFooter')
    .directive('fixedfooter', fixedfooter)
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
            '<footer class="fixed-footer-bottom-wrapper" ng-class="{\'active\': isInPath(\'catalog\') || isInPath(\'product\') || isInPath(\'admin\') || isInPath(\'search\') || isInPath(\'order\') || isInPath(\'address\') || isInPath(\'addresses\') || isInPath(\'contactus\') }">',
            '<div class="fixed-footer-bottom">',
            '<div class="col-xs-12 text-center">',
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,' +
            'when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            //alternatively show date/time using moments.js
            '{{now}}',
            '</div>',
            '</div>',
            '</footer>'
        ].join('');
    }
}

FixedFooterCtrl.$inject = ['$scope', '$location'];
function FixedFooterCtrl($scope, $location) {

    var d = new Date();
    $scope.year = d.getFullYear();

    $scope.now = moment().format('dddd, MMMM D, YYYY h:mm a');

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

    // extension of above isActive in path
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