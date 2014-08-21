/*
- add js/directives/backToTop.js file override
- add js/directives/backToTop.js to index.html
*/

four51.app.directive("backToTop", ["$window", function ($window) {
    return {
        restrict: 'E',
        transclude: true,
        template: '<a href class="back-to-top"><style>' +
            '.back-to-top {' +
            ' position: fixed;' +
            ' opacity: 0;' +
            '}' +
            '.back-to-top.active {' +
            ' opacity: 1;' +
            '}' +
            '</style>' +
            '<div ng-transclude /></a',
        replace: true,
        link: function (scope, element, attrs) {
            var offset = parseInt(attrs.offset) || 220;
            var duration = parseInt(attrs.duration) || 100;
            var window = angular.element($window);
            window.scroll(function () {
                element.toggleClass("active", window.scrollTop() > offset);
            });

            element.click(function (event) {
                event.preventDefault();
                angular.element("html, body").animate({ scrollTop: 0 }, duration);
                return false;
            });
        }
    };
}]);

/*
- add to custom.css
*/

a.back-to-top {
    bottom: 2em;
    right: 0px;
    background-color: #000;
    font-size: 20px;
    padding: 1em;
    cursor: pointer;
    -moz-transition: all 200ms ease-in-out;
    -o-transition: all 200ms ease-in-out;
    -webkit-transition: all 200ms ease-in-out;
    transition: all 200ms ease-in-out;
}
a.back-to-top:hover {
     background-color: #fff;
 }
 
 /* html usage */
 
 <back-to-top duration="700" title="Back To Top" offset="600">
    <span class="fa fa-chevron-circle-up"></span>
</back-to-top>


 
