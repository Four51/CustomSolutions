four51.app.controller('ProductSearchInputCtrl', ['$scope','$location', function($scope,$location) {
    $scope.displayProductSearch = false;
    $scope.executeSearch = function() {
        var searchTerm = $scope.productSearchTerm;
        $scope.productSearchTerm = null;
        $scope.displayProductSearch = false;
        $location.path('search/' + searchTerm);
    };
}]);

//Use anywhere OTHER THAN the top navigation
//Displays as a normal input-group form element.
four51.app.directive('productsearchinput', function() {
    var obj = {
        restrict: 'E',
        template:'<form name="productSearchInput" ng-submit="executeSearch()">' +
            '<div class="view-form-icon">' +
            '<div class="input-group" style="margin:0 0 10px;">' +
            '<input type="text" class="form-control" placeholder="{{\'Search\' | r}} {{\'Products\' | r}}" ng-model="productSearchTerm"/>' +
            '<i class="fa fa-search"></i>' +
            '<span class="input-group-btn">' +
            '<button type="submit" class="btn btn-default" ng-disabled="productSearchTerm == null || productSearchTerm == \'\'">{{\'Search\' | r}}</button>' +
            '</span></div></div></form>',
        controller: 'ProductSearchInputCtrl'
    };
    return obj;
});

//Specifically for the top navigation; place right before the Shopping Cart <ul> in partials/controls/nav.html
four51.app.directive('productsearchinputnav', function() {
    var obj = {
        restrict: 'E',
        template: '<style>.navbar .container .navbar-nav.pull-right li a i.fa-search,.navbar .container-view .navbar-nav.pull-right li a i.fa-search{border-radius:0;border:none;text-align:center;padding:0 10px;margin-top:0}.product-search-display{position:fixed;top:-100%;left:0;right:0;height:60px;background-color:#50acdb;padding:10px 5px;opacity:0;z-index:1030;transition:all 300ms;-moz-transition:all 300ms;-webkit-transition:all 300ms}.product-search-display.active{top:0;opacity:1;transition:all 300ms;-moz-transition:all 300ms;-webkit-transition:all 300ms}.product-search-display .fa-angle-double-up{cursor:pointer;margin-top:5px}</style>' +
            '<div class="product-search-display" ng-class="{\'active\':displayProductSearch}">' +
            '<div class="row">' +
            '<div class="col-xs-10 col-md-11">' +
            '<form name="productSearchInput" ng-submit="executeSearch()">' +
            '<div class="view-form-icon">' +
            '<div class="input-group" style="margin:0 0 10px;">' +
            '<input type="text" class="form-control" placeholder="{{\'Search\' | r}} {{\'Products\' | r}}" ng-model="productSearchTerm"/>' +
            '<i class="fa fa-search"></i>' +
            '<span class="input-group-btn">' +
            '<button type="submit" class="btn btn-default" ng-disabled="productSearchTerm == null || productSearchTerm == \'\'">{{\'Search\' | r}}</button>' +
            '</span></div></div></form></div>' +
            '<div class="col-xs-2 col-md-1 text-center">' +
            '<i class="fa fa-angle-double-up fa-2x" ng-click="displayProductSearch = false"></i>' +
            '</div></div></div>' +
            '<ul class="nav navbar-nav pull-right">' +
            '<li class="search-toggle">' +
            '<a href ng-click="displayProductSearch = true;">' +
            '<i class="fa fa-search"></i></a></li></ul>',
        controller: 'ProductSearchInputCtrl'
    };
    return obj;
});