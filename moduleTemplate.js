//Add js file to lib/angular/plugins
//Add reference to file to index.html
//Add module as dependency to app.js

angular.module('module-name', []);

angular.module('module-name')

    .factory('ServiceName', ['User', function(User) {

    }])

    .controller('ModuleCtrl', ['$scope', 'ServiceName', function($scope, ServiceName) {
        $scope.moduleTest = "Hello World!";
    }])

    .run(['$templateCache', function($templateCache) {
        $templateCache.put('moduleView.html',
            '<div>{{moduleTest}}</div>'
        );
    }])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/parthname', { templateUrl: 'moduleView.html', controller: 'ModuleCtrl' })
    }])
;