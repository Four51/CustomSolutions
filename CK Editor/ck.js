angular.module('OrderCloud-CK Editor', []);
angular.module('OrderCloud-CK Editor')
    .directive('ckEditor', ckEditorDirective)
;

function ckEditorDirective(){
    return {
        restrict: 'AE',
        require: '?ngModel',
        link: function(scope, elm, attr, ngModel) {
            /* Replace whatever element this directive is on with a ck-editor */
            var ck = CKEDITOR.replace(elm[0], {
                removeButtons: 'Source'
                /* remove or add any custom buttons as needed here */
            });

            /* Take no additional action if there is no ngModel value on the element */
            if(!ngModel) return;

            /* Directive detects that text has been pasted in from the clipboard */
            ck.on('pasteState', function() {
                scope.$apply(function() {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            /* When the text is changed the ng-model value is updated */
            ngModel.$render = function() {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
}