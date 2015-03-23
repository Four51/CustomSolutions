angular.module('OrderCloud-CustomImageSelector', []);
angular.module('OrderCloud-CustomImageSelector')
    .directive('customimageselector', customImageSelectorDirective)
;

function customImageSelectorDirective() {
    return {
        scope: {
            customfield : '=',
            imagespecgroup: '='
        },
        restrict: 'E',
        transclude: true,
        template:
        '<style>.custom-image-selection .scroller{max-height:300px;overflow-y:scroll;overflow-x:hidden}.custom-image-selection figure{background-color:#FFF;cursor:pointer;padding:4px;border:1px solid #ddd;margin-bottom:10px;border-radius:4px;display:block;transition:all 200ms ease-in-out;-webkit-transition:all 200ms ease-in-out;-moz-transition:all 200ms ease-in-out;height:125px;overflow:hidden}.custom-image-selection figure.selected,.custom-image-selection figure:active,.custom-image-selection figure:focus,.custom-image-selection figure:hover{border-color:#5bc0de}.custom-image-selection figure>div{background-position:center center;background-size:contain;background-repeat:no-repeat;width:100%;height:100%}</style>'+
        '<div class="custom-image-selection view-form-icon"><div>'+
        '<label ng-class="{required: customfield.Required}">{{customfield.Label || customfield.Name | r}}</label>'+
        '<div class="row scroller">'+
        '<div class="col-xs-6 col-sm-4 col-lg-3" ng-repeat="option in customfield.Options">'+
        '<figure ng-class="{\'selected\':customfield.Value == option.Value}" ng-click="customfield.Value = option.Value">'+
        '<div style="background-image:url(\'{{imagespecgroup.Specs[option.Value].FileURL}}\');"></div>'+
        '</figure></div></div></div></div>'
    };
}