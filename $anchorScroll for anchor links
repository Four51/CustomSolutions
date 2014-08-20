/* 
- Using $anchorScroll for anchor links in Angular. 
=================================================================================
*/

/* 
- add to lib/angular/plugins/scroll.js 
- add lib/angular/plugins/scroll/js to index.html 
*/

angular.module('anchorScrollExample', [])
  .controller('ScrollController', ['$scope', '$location', '$anchorScroll',
    function ($scope, $location, $anchorScroll) {
	
	  // add scope for each link based on LinkID
	  $scope.goto[LinkID] = function() {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('[LinkID]');

        // call $anchorScroll()
        $anchorScroll();
      };
      
    }]);

/*
=================================================================================
- Add links to html partial file
*/

<section>
<div id="scrollArea" ng-controller="ScrollController">
<a ng-click="goto[LinkID]()"></a> 
</div>

<a id="[LinkID]"></a>
</section>

