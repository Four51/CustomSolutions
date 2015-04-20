angular.module('module-name', []);

angular.module('module-name')
    .directive('directivename', directivename)
    .controller('ModuleCtrl', ModuleCtrl)
    .factory('ServiceName', ServiceName)
    .run(run)
    .config(config)
;

function directivename() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: ModuleCtrl
    };
    return directive;

    function template() {
        return [
            '<div>',
                '<input type="text" ng-model="moduleTest" />',
            '</div>'
        ].join('');
    }
}

ModuleCtrl.$inject = ['$scope', 'ServiceName'];
function ModuleCtrl($scope, ServiceName) {
    $scope.moduleTest = "Hello World!";

    ServiceName.method();
}

ServiceName.$inject = ['User'];
function ServiceName(User) {
    var service = {
        method: method
    };
    return service;

    function method() {

    }
}

run.$inject = ['$templateCache'];
function run($templateCache) {
    $templateCache.put('moduleView.html',
        '<div>{{moduleTest}}</div>'
    );
}

config.$inject = ['$routeProvider'];
function config($routeProvider) {
    $routeProvider.
        when('/pathname', { templateUrl: 'moduleView.html', controller: 'ModuleCtrl' })
}
