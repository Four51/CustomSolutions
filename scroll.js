/* 
- Using $anchorScroll for anchor links in Angular. 
- based on example plunker source: https://docs.angularjs.org/api/ng/service/$anchorScroll
- additional source for smoothScroll (working on implementation for back to top arrow): 
  http://jsfiddle.net/brettdewoody/y65G5/
=================================================================================
*/

/* 
- add to lib/angular/plugins/scroll.js 
- add lib/angular/plugins/scroll/js to index.html 
- inject into app.js 'anchorScroll'
*/

angular.module('anchorScroll', [])
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

<a id="[LinkID]"></a>
</div>
</section>

