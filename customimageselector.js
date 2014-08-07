four51.app.directive('customimageselector', ['$451', function($451) {
    var obj = {
        scope: {
            customfield : '=',
            imagespecgroup: '='
        },
        restrict: 'E',
        transclude: true,
        template: '<style>.custom-image-selection .scroller{max-height:300px;overflow-y:scroll;overflow-x:hidden}.custom-image-selection figure{background-color:#FFF;cursor:pointer;padding:4px;border:1px solid #ddd;margin-bottom:10px;border-radius:4px;display:block;transition:all 200ms ease-in-out;-webkit-transition:all 200ms ease-in-out;-moz-transition:all 200ms ease-in-out;height:125px;overflow:hidden}.custom-image-selection figure.selected,.custom-image-selection figure:active,.custom-image-selection figure:focus,.custom-image-selection figure:hover{border-color:#5bc0de}.custom-image-selection figure>div{background-position:center center;background-size:contain;background-repeat:no-repeat;width:100%;height:100%}</style>'+
            '<div class="custom-image-selection view-form-icon"><div>'+
            '<label ng-class="{required: customfield.Required}">{{customfield.Label || customfield.Name | r}}</label>'+
            '<div class="row scroller">'+
            '<div class="col-xs-6 col-sm-4 col-lg-3" ng-repeat="option in customfield.Options">'+
            '<figure ng-class="{\'selected\':customfield.Value == option.Value}" ng-click="customfield.Value = option.Value">'+
            '<div style="background-image:url(\'{{imagespecgroup.Specs[option.Value].FileURL}}\');"></div>'+
            '</figure></div></div></div></div>'
    };
    return obj;
}]);

//USE IN A REPEAT:
//A is the name of the spec you are replacing.
//B is the name of the static spec group where your images are stored.
//IMPORTANT: A and B should be named the same.
//IMPORTANT: The spec names of B should reflect the drop down values for A.
//
//<div ng-repeat="s in LineItem.Specs">
//  <customimageselector
//      customfield="s"
//      imagespecgroup="LineItem.Product.StaticSpecGroups.B"
//      ng-if="s.ControlType == 'Selection' && s.Name == 'A'">
//  </customimageselector>
//
//NOTE: You will have to exclude this spec in the <customselectionfield> directive with an ng-if="s.Name != 'A'" or else it will show up twice.


//DIRECTLY REFERENCING SPECS IN A SPEC FORM:
//A is the name of the spec you are replacing.
//B is the name of the static spec group where your images are stored.
//IMPORTANT: A and B should be named the same.
//IMPORTANT: The spec names of B should reflect the drop down values for A.
//
//<div ng-repeat="s in LineItem.Specs">
//  <customimageselector
//      customfield="LineItem.Specs.A"
//      imagespecgroup="LineItem.Product.StaticSpecGroups.B || Product.StaticSpecGroups.B"
//      ng-if="s.ControlType == 'Selection'">
//  </customimageselector>