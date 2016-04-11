angular.module('OrderCloud-CheckoutItemSummary', []);

angular.module('OrderCloud-CheckoutItemSummary')
    .directive('checkoutitemsummary', checkoutitemsummary)
;

function checkoutitemsummary() {
    var directive =  {
        restrict: 'E',
        template: template
    };
    return directive;

    function template() {
        return [
            '<style>',
            '.item-summary .text-info {margin:5px 0 10px 0;}',
            '.item-summary .text-info span {margin:0 5px 0 0;}',
            '.item-summary hr.top { min-height:10px; border-bottom:1px solid #ccc; margin:0 auto;}',
            '.item-summary .table-responsive {width:100%;margin:10px 0;}',
            '.item-summary .table-responsive,',
            '.item-summary .table-responsive tbody,.item-summary .table-responsive td {border:0;}',
            '.item-summary hr.bottom { min-height:10px; border-top:1px solid #ccc; margin:0 auto;}',
            '</style>',
            '<div class="item-summary" ng-init="isCollapsedItems = true">',
            '<a class="text-info" ng-click="isCollapsedItems = !isCollapsedItems">',
            '<span>{{\'Items\' | r | xlat}}</span>',
            '<i class="fa fa-caret-down" ng-show="isCollapsedItems"></i>',
            '<i class="fa fa-caret-up" ng-show="!isCollapsedItems"></i>',
            '</a>&nbsp;',
            '<span class="pull-right">{{currentOrder.LineItems.length}}</span>',
            '<br />',
            '<div class="col-collapse" collapse="isCollapsedItems">',
            '<hr class="top" />',
            '<table class="table-responsive">',
            '<tr>',
            '<th class="pull-left">Name</th>',
            '<th class="pull-right text-right">Quantity</th>',
            '</tr>',
            '<tr ng-repeat="item in currentOrder.LineItems">',
            '<td class="pull-left text-info">{{item.Product.Name}}</td>',
            '<td class="pull-right text-right">{{item.Quantity}}</td>',
            '</tr>',
            '</table>',
            '<hr class="bottom" />',
            '</div>',
            '</div>'
        ].join('');
    }
}