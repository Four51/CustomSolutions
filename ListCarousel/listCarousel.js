//Directive:  listcarousel
//
//Functionality:
//Allows for images to be displayed in a carousel format. This works well for displaying category or product list items (and is currently configured to do so).
//
//Display:
//You can choose different rendering modes to display content in a variety of ways.
//Currently, there are 3 modes:
//  - render3dCarousel and render2dCarousel: a circular effect carousel
//  - render3dFlow and render2dFlow: a 'cover flow' style renderer
//  - render2dBasic: basic slide-style rendering with no fancy transformations
//The 3d modes will be used on browsers that support CSS3 3d transforms, otherwise the 2d modes will be used.
//The two rendering mode properties are renderer3d and renderer2d.
//By setting renderer3d: null, this will force use of the 2d renderer on all browsers.
//There are also other options that can be set to modify the plugin.
//
//Setup:
//Add this file as a directive file override, and the other two files in the "ListCarousel" folder as overrides in the following path: lib/angular/plugins/
//Add the following in place of the <categorylistview></categorylistview> tag: <listcarousel></listcarousel>
//
//Edit:
//The current plugin code will only be officially "licensed" when using the domain "four51ordercloud.com". If using this on TEST/QA/STAGING, it will still work, but will show as an "unlicensed Product".
//If a new domain needs to set up for this plugin, it can be done from Four51's Star Plugins Account.

four51.app.directive('listcarousel', function(){
    var obj = {
        restrict: 'E',
        template: '<style>.kc-wrap{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;-ms-touch-action:none;overflow:hidden;position:relative;background-position:center;width:100%;padding-bottom:35%}.kc-horizon{visibility:hidden}.kc-item{position:absolute;width:188px;height:250px;-webkit-tap-highlight-color:transparent;visibility:hidden}.kc-shadow-bottom{position:absolute!important;top:100%!important;width:100%!important;height:10%!important;background-image:url(images/shadow-bottom.png);left:0!important}.kc-shadow-left,.kc-shadow-right{position:absolute!important;top:0!important;width:10%!important;height:100%!important;left:-10%!important;background-image:url(images/shadow-left.png)}.kc-shadow-right{left:100%!important;background-image:url(images/shadow-right.png)}.kc-reflection{position:absolute;left:0;top:0;width:100%;height:0}.kc-nav-wrap{display:inline-block;position:absolute;z-index:1000}.kc-nav-button,.kc-nav-button-active{width:16px;height:16px;background-color:#888;float:left;margin-right:10px;cursor:pointer;border-radius:16px;border:1px solid rgba(0,0,0,.5)}.kc-nav-button.active{background-color:#fff}.kc-nav-button.last{margin-right:0}#wrapper{padding:10px}.kc-item img{position:relative;pointer-events:none;width:100%}</style>'+
            '<div id="carousel" class="kc-wrap">'+
            '<div class="kc-item" ng-repeat="c in tree">'+
            '<a ng-href="catalog/{{c.InteropID}}" ><img ng-src="{{c.Image.URL}}"></a>'+
            '</div>'+
            '</div>',
        link: function($scope) {
            $scope.$watch('tree', function() {
                $('#carousel').KillerCarousel({
                    // Default natural width of carousel.
                    width: 800,
                    // Item spacing in 3d (has CSS3 3d) mode.
                    spacing3d: 120,
                    // Item spacing in 2d (no CSS3 3d) mode.
                    spacing2d: 120,
                    showShadow: false,
                    showReflection: false,
                    // Looping mode.
                    infiniteLoop: false,
                    // Scale at 75% of parent element.
                    autoScale: 75,
                    useMouseWheel: false,
                    showNavigation: false,
                    horizon: 'top:35%',
                    itemAlign: 'middle',
                    frontItemIndex: 4,
                    renderer3d: null,
                    renderer2d: 'render2dBasic'
                });
            });
        }
    };
    return obj;
});