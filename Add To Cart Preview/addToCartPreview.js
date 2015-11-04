angular.module('OrderCloud-AddToCartPreview', []);

angular.module('OrderCloud-AddToCartPreview')
    .directive('addtocartpreview', addtocartpreview)
    .controller('AddToCartPreviewCtrl', AddToCartPreviewCtrl)
    .factory('AddToCartPreview', AddToCartPreview)
;

function addtocartpreview() {
    var directive = {
        restrict: 'E',
        scope: {
            lineitem: '=',
            errors: '=',
            user: '='
        },
        template: template,
        controller: 'AddToCartPreviewCtrl'
    };
    return directive;

    function template() {
        return [
            '<style>',
            '.cart-preview .panel {margin-top:10px;}',
            '.panel-lineitem {margin:3px; padding: 0 3px; overflow:hidden; border:0.5px solid #dddddd}',
            '.section-top {overflow:hidden}',
            '.section-top input {border:1px solid #dddddd; text-align:center; border-bottom: none; padding:0;}',
            '.section-top .form-control {border-radius: 0px; text-align: center; padding: 0}',
            '.section-top div:nth-of-type(1) {padding:0 0 0 15px;}',
            '.section-top div:nth-of-type(1) h6 {background-color:#f5f5f5; border:1px solid #dddddd; margin:0; padding:5px 0;}',
            '.section-top div:nth-of-type(2) {float:left;max-width:100%; text-align:center; line-height:4.2em;}',
            '.section-top div:nth-of-type(2) img {vertical-align:middle; max-height:5em; display:inline; max-width:100%; padding: 3px 0;}',
            '@media(max-width: 768px) { .section-top h4 {font-size:90%;} }',
            '.cart-preview h4 {margin: 8px 0 6px 0; font-weight:bold;}',
            '.cart-preview h5 {float:right; line-height: 2.8em; margin: 0; vertical-align:middle}',
            '.cart-preview h6 {margin:3px 0}',
            '.cart-preview .btn.btn-danger {position:absolute; right:0; top:0; border-radius: 0;}',
            '.section-bottom {overflow: hidden; padding: 0; text-align:center; max-width:100%; float: left; width:100%}',
            '.section-bottom div:nth-of-type(1) {overflow:hidden;}',
            '.section-bottom .pull-left .btn {float:left; margin: 5px; padding: 3px 12px; min-height: 20px; font-size:90%;}',
            '.sub-content {padding-right: 0.5em}',
            '.list-item {float:left; width: 100%; padding:0 px 5px}',
            '.cart-preview .alert-danger {margin:20px 0;} /*removed inline style*/',
            '.cart-preview .sub-content h5 {margin-right:5px;} /*removed inline style*/',
            '.btn-default {margin-bottom: 2px; padding: 2px 4px;}',
            '.has-error {background-color: #F2DEDE; color: #a94442}',
            '.panel div.alert {margin: 5px;}',
            '</style>',
            '<div class="cart-preview">',
            '<button class="btn btn-info btn-block btn-lg" type="button" ng-click="saveVariant(lineitem)" ng-disabled="errors.length > 0">',
            '<loadingindicator ng-show="addToOrderIndicator" />',
            '<i ng-show="addToOrderForm.$invalid" class="fa fa-warning"></i>',
            '<span>Add to List</span>',
            '</button>',
            '<div>',
            '<p ng-if="lineitem.Product.MinTotalQty"><span class="text-info">Minimum Total Order Quantity: </span>{{lineitem.Product.MinTotalQty}}</p>',
            '<p ng-if="lineitem.Product.MaxTotalQty"><span class="text-info">Maximum Total Order Quantity: </span>{{lineitem.Product.MaxTotalQty}}</p>',
            '<div class="row alert alert-danger fadeOut" ng-show="lineitem.entryError" ng-bind-html="lineitem.entryError"></div>',
            '</div>',
            '<div class="row">',
            '<div ng-show="list.length > 0">',
            '<loadingindicator ng-show="addListToCartIndicator" />',
            '<div class="panel panel-default">',
            '<div class="panel-heading">',
            '<h3 class="panel-title">Variant List</h3>',
            '<loadingindicator ng-show="addToOrderIndicator" />',
            '</div>',
            '<div ng-repeat="item in list">',
            '<div class="panel-lineitem">',
            '<button type="button" title="Remove Item" class="btn btn-danger" ng-click="removeItem(item)">',
            '<span class="fa fa-minus-circle fa-inverse"></span>',
            '</button>',
            '<div class="section-top row">',
            '<div class="col-xs-3 col-sm-2">',
            '<input id="451qa_input_qty" class="form-control" ng-class="{\'has-error\': item.hasError}"  type="text" ng-model="item.Quantity" ng-change="qtyChanged(item)" />',
            '<h6 class="text-center"">Total Qty</h6>',
            '</div>',
            '<div class="col-xs-3 col-sm-2">',
            '<img class="img-responsive" ng-src="{{item.Variant.LargeImageUrl || item.Variant.SmallImageUrl || item.Product.SmallImageUrl || item.Product.LargeImageUrl}}"/>',
            '</div>',
            '<div class="col-xs-4 col-sm-6">',
            '<h4>{{item.Variant.Description || item.Product.Name}}</h4>',
            '<h6>Item ID: {{item.Variant.ExternalID || item.Product.ExternalID}}</h6>',
            '<h6>Unit Price: {{item.UnitPrice | culturecurrency}}</h6>',
            '</div>',
            '</div>',
            '<div class="section-bottom">',
            '<div class="col-xs-6 pull-left">',
            '<button type="button" class="btn btn-default" ng-show="showSpecs(item)" ng-init="toggleSpecs = false" ng-click="toggleSpecs = !toggleSpecs">',
            '<span ng-show="toggleSpecs == false"><i class="fa fa-plus-circle"></i> {{(\'Show\' | r) + \' \' + (\'Specs\' | r) | xlat}}</span>',
            '<span ng-show="toggleSpecs == true"><i class="fa fa-minus-circle"></i> {{(\'Hide\' | r)  + \' \' +  (\'Specs\' | r) | xlat}}</span>',
            '</button>',
            '</div>',
            '<div class="col-xs-6 pull-right sub-content">',
            '<h5>Total: {{item.LineTotal | culturecurrency}}</h5>',
            '</div>',
            '</div>',
            '<div class="list-item">',
            '<ul ng-show="toggleSpecs == true" class="list-group">',
            '<li ng-repeat="spec in item.Specs | filter:{\'CanSetForLineItem\':true} " class="list-group-item spec-list">',
            '<p><span class="text-info">{{spec.Label || spec.Name}}: </span>',
            '<span ng-if="spec.ControlType == \'File\'"><a ng-href="{{spec.File.Url}}">{{spec.File.OriginalName + Extension}}</a></span>',
            '<span ng-if="spec.ControlType != \'File\'">{{spec.Value || (\'(unspecified)\' | xlat)}}</span></p>',
            '</li>',
            '</ul>',
            '</div>',
            '</div>',
            '<div class="row alert alert-danger" ng-show="item.qtyVariantError" ng-bind-html="item.qtyVariantError"></div>',
            '</div>',
            '</div>',
            '<div class="alert alert-danger" ng-show="qtyTotalError" ng-bind-html="qtyTotalError"></div>',
            '<button class="btn btn-success btn-lg btn-block" ng-disabled="invalidVariantQty" ng-click="addListToCart(list)">',
            '<i ng-show="addToOrderForm.$invalid" class="fa fa-warning"></i>',
            '<span>Add List to Cart </span>',
            '</button>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');
    }
}

AddToCartPreviewCtrl.$inject = ['$scope', '$location', 'AddToCartPreview', '$timeout'];
function AddToCartPreviewCtrl($scope, $location, AddToCartPreview, $timeout) {

    //init
    $scope.list = [];
    $scope.$watch("lineitem.Product", function (newval) {
        if (!newval) return;
        AddToCartPreview.getMinMaxTotalQty($scope.lineitem);
    });
    $scope.$watch("lineitem.Variant.InteropID", function (newval) {
        if (!newval) return;
        $scope.lineitem.entryError = "";
    });

    $scope.$watch("lineitem.entryError", function (newval) {
        if (newval == "") return;
        $timeout(function () {
            $scope.lineitem.entryError = "";
        }, 5000)
    });



    //action functions
    $scope.saveVariant = function(lineitem) {
        $scope.hideErrors(lineitem);
        $scope.verifyNewEntry(lineitem, $scope.list);
        if (!lineitem.entryError) {
            AddToCartPreview.add(lineitem, $scope.list, function(list) {
                AddToCartPreview.adjustForPriceBreaks(list, function (list) {
                    $scope.list = list;
                })
            });
        }
    };

    $scope.removeItem = function(item) {
        $scope.hideErrors(item);
        AddToCartPreview.remove(item, $scope.list, function(list) {
            AddToCartPreview.adjustForPriceBreaks(list, function (list) {
                $scope.list = list;
            });
        });
    };

    $scope.addListToCartIndicator = false;
    $scope.addListToCart = function(list) {
        $scope.verifyTotalQty(list);
        if (!$scope.qtyTotalError) {
            $scope.addListToCartIndicator = true;
            $scope.$parent.showAddToCartErrors = false;
            $scope.$parent.lineItemErrors = [];
            AddToCartPreview.addListToCart(list, $scope.$parent.currentOrder, $scope.user, function () {
                    $scope.addListToCartIndicator = false;
                    $location.path('cart');
                },
                function (ex) {
                    $scope.addListToCartIndicator = false;
                    $scope.$parent.lineItemErrors.push(ex.Detail);
                    $scope.$parent.showAddToCartErrors = true;
                });
        }
    };

    $scope.qtyChanged = function(item) {
        $scope.hideErrors(item);
        $scope.invalidVariantQty = false;
        item.hasError = false;
        $scope.verifyVariantQty(item);
        item.LineTotal = item.UnitPrice * item.Quantity || 0;
        AddToCartPreview.update(item, $scope.list, function(list) {
            AddToCartPreview.adjustForPriceBreaks(list, function (list) {
                $scope.list = list;
            })
        });
        if (!$scope.invalidVariantQty == true) {
            $scope.verifyAllVariantQtys($scope.list);
        }
    };

    $scope.showSpecs = function(item) {
        return (Object.keys(item.Specs).length > 0);
    };

    //Controller Helper Functions
    $scope.verifyNewEntry = function(lineitem, list) {
        lineitem.entryError = "";
        AddToCartPreview.validateVariantQty(lineitem, function (message) {
            lineitem.entryError += message;
        });
        AddToCartPreview.checkIfInList(lineitem, list, function (message) {
            lineitem.entryError += message;
        });
    };

    $scope.verifyVariantQty = function (item) {  //Variant Validation
        item.qtyVariantError = "";
        item.hasError = false;
        AddToCartPreview.validateVariantQty(item, function(message) {
            item.qtyVariantError = message;

        });
        if (item.qtyVariantError != "") {
            $scope.invalidVariantQty = true;
            item.hasError = true;
        }
    };

    $scope.verifyAllVariantQtys = function (list) {
        angular.forEach(list, function(i) {
            if (i.Quantity == "") {
                $scope.invalidVariantQty = true;
            }
            if (i.hasError == true) {
                $scope.invalidVariantQty = true;
            }
        })
    };

    $scope.verifyTotalQty = function(list) { //Total Quantity Validation
        $scope.qtyTotalError = "";
        AddToCartPreview.validateTotalQty(list, function(message) {
            $scope.qtyTotalError = message;
        });
    };

    $scope.hideErrors = function(item) {
        $scope.qtyTotalError = "";
        item.qtyVariantError = "";
        item.entryError = "";
    };
}

AddToCartPreview.$inject = ['User', 'Order', '$451'];
function AddToCartPreview(User, Order) {

    function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

    function randomString() {
        var chars = "0123456789abcdefghijklmnop";
        var string_length = 10;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    }

    var _getMinMaxTotalQty = function (lineitem) {
        if (lineitem.Product.StaticSpecGroups && lineitem.Product.StaticSpecGroups.listPreview) {
            lineitem.Product.MinMaxSet = true;
            lineitem.Product.MinTotalQty = (lineitem.Product.StaticSpecGroups.listPreview.Specs.MinQty) ? +(lineitem.Product.StaticSpecGroups.listPreview.Specs.MinQty.Value) : null;
            lineitem.Product.MaxTotalQty = (lineitem.Product.StaticSpecGroups.listPreview.Specs.MaxQty) ? +(lineitem.Product.StaticSpecGroups.listPreview.Specs.MaxQty.Value) : null;
        }
    };

    var _validateVariantQty = function (lineitem, success) {
        var errors = "";
        var qty = lineitem.Quantity; //entered variant order qty
        var totalVariantQty = parseInt(qty); //initialize totalVariantQty to compare inventory
        var minQty = lineitem.PriceSchedule.MinQuantity; //Min Qty for each entry (each variant)
        var maxQty = lineitem.PriceSchedule.MaxQuantity; //Max Qty for each entry (each variant)
        var maxTotalQty = lineitem.Product.MaxTotalQty; //Max Qty for total order (sum of all variants)
        var qtyAvailable = (lineitem.Variant) ? lineitem.Variant.QuantityAvailable : lineitem.Product.QuantityAvailable;
        if (!+qty) {
            errors += "<p>- Please Enter Valid Quantity</p>";
        }
        if (qty < minQty && minQty != 1 && qty != "") { //checks if qty meets price schedule min qty
            errors += "<p>- Quantity must be equal or greater than " + minQty + " for \"" + lineitem.Product.Name + "\"</p>";
        }
        if (qty > maxTotalQty && maxTotalQty || qty > maxQty && maxQty != null) { //checks if qty meets total order max (important) and price schedule max qty (redundant)
            errors += "<p>- Quantity must be equal or less than " + ((maxTotalQty > maxQty && maxQty != null) ? maxQty : maxTotalQty) + " for \"" + lineitem.Product.Name + "\"</p>";
        }
        if (totalVariantQty > qtyAvailable && qtyAvailable != false && lineitem.Product.AllowExceedInventory == false) { //checks if qty of each variant exceeds inventory and if it is allowed (important)
            errors += "<p>- Cannot exceed the Quantity Available of " + qtyAvailable + " for \"" + (lineitem.Variant.Description || lineitem.Product.Name) + "\"</p>";
        }
        if (totalVariantQty > maxQty && maxQty != null) { //checks if qty of each variant meets price schedule max qty (important)
            errors += "<p>- Total Quantity for this variant cannot exceed " + maxQty + " (Current Total Qty: " + (totalVariantQty - qty) + ")</p>";
        }
        _then(success, errors);
    };

    var _validateTotalQty = function (list, success) {
        var totalQty = 0;
        var qtySubmitError = "";
        var RestrictedQty = list[0].Product.RestrictedQuantity;
        var minQty = list[0].Product.MinTotalQty; //Min Qty for Total order (sum of all variants)
        var maxQty = list[0].Product.MaxTotalQty; //Max Qty for Total order (sum of all variants)
        angular.forEach(list, function (listobj) {
            totalQty += parseInt(listobj.Quantity);
        });
        qtySubmitError += !list[0].Variant ? "You cannot use this module with a completely static product" : "";
        qtySubmitError += (!RestrictedQty && minQty && totalQty < minQty) ? "- Total quantity must be equal or greater than " + minQty + " for this order (Current Quantity: " + totalQty + ")" : "";
        qtySubmitError += (!RestrictedQty && maxQty && totalQty > maxQty) ? qtySubmitError += "- Total quantity must be equal or less than " + maxQty + " for this order (Current Quantity: " + totalQty + ")" : "";

        _then(success, qtySubmitError);
    };

    var _adjustForPriceBreaks = function (list, success) {
        if (list[0] && !list[0].PriceSchedule.UseCumulativeQuantity) {
            angular.forEach(list, function (listobj) {
                priceBreak(listobj, listobj.Quantity)
            });
            _then(success, list);
        }
        else {
            var totalQty = 0;
            angular.forEach(list, function (listobj) {
                totalQty += parseInt(listobj.Quantity);
            });
            angular.forEach(list, function (listobj) {
                priceBreak(listobj, totalQty);
            });
            _then(success, list);
        }
    };

    var _checkIfInList = function (item, list, success) {
        var entryError = "";
        angular.forEach(list, function(i) {
            if (item.Variant.InteropID == i.Variant.InteropID) {
                entryError = "<p>-Cannot Enter Same Variant Twice (Change Quantity Below)</p>"
            }
        });
        _then(success, entryError);

    };

    function priceBreak(item, quantity) {
        if (!quantity) {
            quantity = item.Quantity;
        }
        var priceBreaks = item.PriceSchedule.PriceBreaks;
        for (var b = 0; b < item.PriceSchedule.PriceBreaks.length; b++) {
            if (b === item.PriceSchedule.PriceBreaks.length - 1 || quantity >= priceBreaks[b].Quantity && quantity < priceBreaks[b + 1].Quantity) {
                item.UnitPrice = item.Markup ? item.Markup + item.PriceSchedule.PriceBreaks[b].Price : item.PriceSchedule.PriceBreaks[b].Price;
                break
            }
        }
        item.LineTotal = item.UnitPrice * item.Quantity;
    }

    var _add = function (item, list, success) {
        if (item.Product.IsVBOSS) {
            item.UnitPrice = item.LineTotal / item.Quantity;
            angular.forEach(item.Specs, function(i){
                angular.forEach(i.Options, function (option) {
                    if (i.Value === option.Value) {
                        if (option.Markup > 0) {
                            item.Markup = option.Markup;
                        }
                        else {
                            item.Markup = false;
                        }
                    }
                });
            });

            item.LineTotal = item.UnitPrice * item.Quantity;
        }
        else {
            priceBreak(item);
        }
        var i = {};
        angular.copy(item, i);
        i.ItemID = randomString();
        list.push(i);
        _then(success, list)
    };

    var _remove = function (item, list, success) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].ItemID == item.ItemID) {
                list.splice(i, 1);
            }
        }
        _then(success, list);
    };

    var _update = function (item, list, success) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].ItemID == item.ItemID) {
                list[i] = item;
            }
        }
        _then(success, list);
    };

    var _addListToCart = function (list, order, user, success, error) {
        var tempOrder = angular.copy(order);

        if (!tempOrder) {
            tempOrder = {};
            tempOrder.LineItems = [];
        }

        angular.forEach(list, function (item) {
            tempOrder.LineItems.push(item);
        });

        Order.clearshipping(tempOrder).
            save(tempOrder,
            function (o) {
                user.CurrentOrderID = o.ID;
                User.save(user, function () {
                    _then(success, o);
                });
            },
            function (ex) {
                _then(error, ex.Detail);
            }
        );
    };
    return {
        add: _add,
        remove: _remove,
        update: _update,
        addListToCart: _addListToCart,
        getMinMaxTotalQty: _getMinMaxTotalQty,
        validateTotalQty: _validateTotalQty,
        validateVariantQty: _validateVariantQty,
        adjustForPriceBreaks: _adjustForPriceBreaks,
        checkIfInList: _checkIfInList
    }
}
