angular.module('module-name', []);

angular.module('module-name')

    .factory('ServiceName', ServiceName)
    .controller('ModuleCtrl', ModuleCtrl)
    .directive('directivename', directivename)
    .run(run)
    .config(config)
;

    ServiceName.$inject = ['User'];
    function ServiceName(User) {
        var service = {
            method: method
        };
        return service;

        function method() {

        }
    }

    ModuleCtrl.$inject = ['$scope', 'ServiceName'];
    function ModuleCtrl($scope, ServiceName) {
        $scope.moduleTest = "Hello World!";

        ServiceName.method();
    }

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
