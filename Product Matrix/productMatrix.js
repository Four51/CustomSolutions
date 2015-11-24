angular.module('OrderCloud-ProductMatrix', []);

angular.module('OrderCloud-ProductMatrix')
    .directive('productmatrix', productmatrix)
    .controller('ProductMatrixCtrl', ProductMatrixCtrl)
    .factory('ProductMatrix', ProductMatrix)
    .filter('definesvariant', definesvariant)
    .filter('orderobjectby', orderobjectby)
;

function productmatrix() {
    return {
        restrict: 'E',
        template: template,
        controller: 'ProductMatrixCtrl'
    };

    function template() {
        return [
            '<style>.matrix-grid > div {padding: 0;}.matrix-grid > div > div {text-align: center;height: 50px;padding: 10px 5px;}.matrix-grid > div > div:nth-of-type(even) {background-color: #f5f5f5;}.matrix-grid > div:last-of-type > div {padding: 5px;}.matrix-grid > div:last-of-type > div input {text-align: center;}.qty-invalid{border-color: #d9534f;-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);color: #ccc;}</style>',
            '<div>',
            '<loadingindicator ng-show="matrixLoadingIndicator" />',
            '<div ng-repeat="group in comboVariants" ng-show="specCount == 2 && (group | filter:{Show: true}).length > 0">',
            '<h3>{{group.DisplayName}}</h3>',
            '<div class="row matrix-grid">',
            '<div class="col-xs-3"><div>{{spec2Name}}</div><div ng-repeat="item in group | orderobjectby:\'ListOrder\':false | filter:{Show: true}"><b>{{item.DisplayName[1]}}</b></div></div>',
            '<div class="col-xs-2" ng-show="product.DisplayInventory"><div>{{\'Quantity Available\' | r}}</div><div ng-repeat="item in group | orderobjectby:\'ListOrder\':false | filter:{Show: true}">{{item.QuantityAvailable}}</div></div>',
            '<div class="col-xs-1" ng-show="displayOnOrder"><div>{{\'On Order\' | r}}</div><div ng-repeat="item in group | orderobjectby:\'ListOrder\':false | filter:{Show: true}">{{item.OrderQuantity}}</div></div>',
            '<div class="col-xs-3"><div>{{\'Price\' | r}}</div><div ng-repeat="item in group | orderobjectby:\'ListOrder\':false | filter:{Show: true}">{{(product.StandardPriceSchedule.PriceBreaks[0].Price + item.Markup) | currency}}</div></div>',
            '<div ng-class="{\'col-xs-3\':(product.DisplayInventory && displayOnOrder),\'col-xs-5\':(!product.DisplayInventory && displayOnOrder),\'col-xs-4\':(product.DisplayInventory && !displayOnOrder),\'col-xs-6\':(!product.DisplayInventory && !displayOnOrder)}">',
            '<div>{{\'Quantity\' | r}}</div>',
            '<div ng-repeat="item in group | orderobjectby:\'ListOrder\':false | filter:{Show: true}">',
            '<div>',
            '<select id="451qa_input_qty" class="form-control" ng-change="qtyChanged()" ng-if="product.PriceSchedule.RestrictedQuantity" ng-model="item.Quantity" ng-options="pb.Quantity as getRestrictedQtyText(pb, product.QuantityMultiplier) for pb in product.PriceSchedule.PriceBreaks"><option value=""></option></select>',
            '<input id="451qa_input_qty" placeholder="0" autocomplete="off" class="form-control" ng-class="{\'qty-invalid\':item.QtyError}" ng-change="qtyChanged()" ng-if="!product.PriceSchedule.RestrictedQuantity" type="text" name="qtyInput" ng-model="item.Quantity"/>',
            '</div>',
            '</div>',
            '</div>',
            '</div>',
            '</div>',
            '<div ng-show="specCount == 1">',
            '<div class="row matrix-grid">',
            '<div class="col-xs-3"><div>{{spec1Name}}</div><div ng-repeat="group in comboVariants | orderobjectby:\'ListOrder\':false | filter:{Show: true}"><b>{{group.DisplayName}}</b></div></div>',
            '<div class="col-xs-2" ng-show="product.DisplayInventory"><div>{{\'Quantity Available\' | r}}</div><div ng-repeat="group in comboVariants | orderobjectby:\'ListOrder\':false | filter:{Show: true}">{{group.QuantityAvailable}}</div></div>',
            '<div class="col-xs-1" ng-show="displayOnOrder"><div>{{\'On Order\' | r}}</div><div ng-repeat="group in comboVariants | orderobjectby:\'ListOrder\':false | filter:{Show: true}">{{group.OrderQuantity}}</div></div>',
            '<div class="col-xs-3"><div>{{\'Price\' | r}}</div><div ng-repeat="group in comboVariants | orderobjectby:\'ListOrder\':false | filter:{Show: true}">{{(product.StandardPriceSchedule.PriceBreaks[0].Price + group.Markup) | currency}}</div></div>',
            '<div ng-class="{\'col-xs-3\':(product.DisplayInventory && displayOnOrder),\'col-xs-5\':(!product.DisplayInventory && displayOnOrder),\'col-xs-4\':(product.DisplayInventory && !displayOnOrder),\'col-xs-6\':(!product.DisplayInventory && !displayOnOrder)}">',
            '<div>{{\'Quantity\' | r}}</div>',
            '<div ng-repeat="group in comboVariants | orderobjectby:\'ListOrder\':false | filter:{Show: true}">',
            '<div>',
            '<select id="451qa_input_qty" class="form-control" ng-change="qtyChanged()" ng-if="product.PriceSchedule.RestrictedQuantity" ng-model="group[0].Quantity" ng-options="pb.Quantity as getRestrictedQtyText(pb, product.QuantityMultiplier) for pb in product.PriceSchedule.PriceBreaks"><option value=""></option></select>',
            '<input id="451qa_input_qty" placeholder="0" autocomplete="off" class="form-control" ng-class="{\'qty-invalid\':item.QtyError}" ng-change="qtyChanged()" ng-if="!product.PriceSchedule.RestrictedQuantity" type="text" name="qtyInput" ng-model="group[0].Quantity"/>',
            '</div>',
            '</div>',
            '</div>',
            '</div>',
            '</div>',
            '<div class="alert alert-danger" style="margin-top:20px;" ng-show="qtyError" ng-bind-html="qtyError"></div>',
            '<button class="btn btn-success btn-block btn-lg" type="button" id="451_btn_orderadd" ng-disabled="qtyError" ng-click="addVariantsToOrder()">',
            '<loadingindicator ng-show="addToOrderIndicator" /><i ng-show="qtyError" class="fa fa-warning"></i> {{addToOrderText | r}}</button>',
            '</div>'
        ].join('');
    }
}

ProductMatrixCtrl.$inject = ['$scope', '$routeParams', '$location', 'ProductDisplayService', 'Order', 'User', 'ProductMatrix'];
function ProductMatrixCtrl($scope, $routeParams, $location, ProductDisplayService, Order, User, ProductMatrix) {

    $scope.addToOrderText = "Add To Cart";
    $scope.searchTerm = null;
    $scope.currentOrder = $scope.$parent.$parent.currentOrder;

    $scope.lineItemIndex = $routeParams.lineItemIndex;

    function init(searchTerm) {
        ProductDisplayService.getProductAndVariant($routeParams.productInteropID, $routeParams.variantInteropID, function (data) {
            $scope.product = data.product;
            ProductMatrix.getMinMaxTotalQty($scope.product);
            if ($scope.product.IsVBOSS) {
                var lineItemEdit = null;
                if ($scope.lineItemIndex) {
                    lineItemEdit = $scope.currentOrder.LineItems[$scope.lineItemIndex];
                }
                ProductMatrix.build($scope.product, $scope.currentOrder, lineItemEdit, function(matrix, specCount, spec1Name, spec2Name) {
                    $scope.specCount = specCount;
                    $scope.spec1Name = spec1Name;
                    $scope.spec2Name = spec2Name;
                    $scope.comboVariants = matrix;
                });
            }
        }, 1, 100, searchTerm);
    }
    init($scope.searchTerm);

    $scope.qtyChanged = function() {
        $scope.qtyError = "";
        ProductMatrix.validateQuantity($scope.comboVariants, $scope.product, function(message) {
            $scope.qtyError = message;
        });
        $scope.backOrderErrors = "";
        ProductMatrix.backOrderValidate($scope.comboVariants, $scope.product, function(data) {
            $scope.backOrderErrors = data;
        });
    };

    function saveOrder() {
        Order.clearshipping($scope.currentOrder).save($scope.currentOrder,
            function(o){
                $scope.$parent.$parent.user.CurrentOrderID = o.ID;
                User.save($scope.$parent.$parent.user, function(){
                    $scope.addToOrderIndicator = true;
                    $location.path('/cart');
                });
            },
            function(ex) {
                $scope.addToOrderIndicator = false;
                $scope.addToOrderError = ex.Message;
                //$route.reload();
            }
        );
    }

    $scope.addVariantsToOrder = function(){

        $scope.qtyError = "";
        ProductMatrix.validateQuantity($scope.comboVariants, $scope.product, function (message) {
            $scope.qtyError = message; //this shows all of the messages for each vboss variant
        });

        if ($scope.qtyError) {
            //do nothing - error messaging is shown via validateQuantity
        }

        else {

            if (!$scope.currentOrder) {
                $scope.currentOrder = {};
                $scope.currentOrder.LineItems = [];
            }

            if (!$scope.lineItemIndex) {
                ProductMatrix.addToOrder($scope.comboVariants, $scope.product, function (lineItems) {
                    $scope.addToOrderIndicator = true;
                    angular.forEach(lineItems, function (li) {
                        $scope.currentOrder.LineItems.push(li);
                    });
                    saveOrder($scope.currentOrder);
                });
            }
            else {
                $scope.addToOrderIndicator = true;
                if ($scope.specCount == 1) {
                    angular.forEach($scope.comboVariants, function (variant) {
                        if (variant[0].Quantity) {
                            $scope.currentOrder.LineItems[$scope.lineItemIndex].Quantity = variant[0].Quantity;
                        }
                    });
                    saveOrder($scope.currentOrder);
                }
                else {
                    angular.forEach($scope.comboVariants, function (group) {
                        angular.forEach(group, function (variant) {
                            if (variant.Quantity) {
                                $scope.currentOrder.LineItems[$scope.lineItemIndex].Quantity = variant.Quantity;
                            }
                        });
                    });
                    saveOrder($scope.currentOrder);
                }
            }
        }
    };
}

ProductMatrix.$inject = ['$451', 'Variant'];
function ProductMatrix($451, Variant) {
    function _then(fn, data, count, s1, s2) {
        if (angular.isFunction(fn))
            fn(data, count, s1, s2);
    }

    var _getMinMaxTotalQty = function (product) {
        if (product.StaticSpecGroups && product.StaticSpecGroups.Matrix) {
            product.MinTotalQty = (product.StaticSpecGroups.Matrix.Specs.MinQty && product.StandardPriceSchedule.MinQuantity == 1) ? +(product.StaticSpecGroups.Matrix.Specs.MinQty.Value) : null;
            product.MaxTotalQty = (product.StaticSpecGroups.Matrix.Specs.MaxQty && !product.StandardPriceSchedule.MaxQuantity) ? +(product.StaticSpecGroups.Matrix.Specs.MaxQty.Value) : null;
        }

        return product;
    }

    var _build = function(product, order, lineItemEdit, success) {
        var specCombos = {};
        var defineVariantSpecs = {};
        var defineVariantSpecCount = 0;
        var spec1Name = "";
        var spec2Name = "";
        angular.forEach(product.Specs, function(spec) {
            if (spec.DefinesVariant) {
                defineVariantSpecCount++;
                defineVariantSpecs[spec.Name] = spec;
            }
        });
        if (defineVariantSpecCount == 1) {
            angular.forEach(defineVariantSpecs, function(spec) {
                spec1Name = spec.Name;
                angular.forEach(spec.Options, function(option) {
                    specCombos[option.Value] = [];
                    var combo = [option.ID];
                    combo.Markup = option.Markup;
                    combo.Specs = {};
                    combo.Specs[spec.Name] = spec;
                    specCombos[option.Value].push(combo);
                });
            });
        }
        else if (defineVariantSpecCount == 2) {
            angular.forEach(defineVariantSpecs, function(spec) {
                if (spec.DefinesVariant && !spec1Name) {
                    spec1Name = spec.Name;
                    angular.forEach(product.Specs, function(s) {
                        if (s.DefinesVariant && (s.ID != spec.ID)) {
                            spec2Name = s.Name;
                            angular.forEach(spec.Options, function(option) {
                                specCombos[option.Value] = [];
                                angular.forEach(s.Options, function(o) {
                                    var combo = [option.ID, o.ID];
                                    combo.Markup = option.Markup + o.Markup;
                                    combo.Specs = {};
                                    combo.Specs[spec.Name] = spec;
                                    combo.Specs[s.Name] = s;
                                    specCombos[option.Value].push(combo);
                                });
                            });
                        }
                    });
                }
            });
        }

        var comboVariants = {};
        var comboCount = 0;
        var variantCount = 0;
        for (var option in specCombos) {
            comboVariants[option] = [];
            angular.forEach(specCombos[option], function(combo) {
                combo.ListOrder = comboCount;
                comboCount++;
                getVariantData(product, combo, option);
            });
        }

        function countVariantInOrder(variant) {
            var count = 0;
            angular.forEach(order.LineItems, function(item) {
                if (item.Variant && item.Variant.ExternalID == variant.ExternalID) {
                    count = count + item.Quantity;
                }
            });
            return count;
        }

        function getVariantData(p, params, group) {
            Variant.get({'ProductInteropID': p.InteropID, 'SpecOptionIDs': params}, function(variant){
                variant.DisplayName = [];
                variant.Markup = params.Markup;
                variant.tempSpecs = {};
                variant.ListOrder = params.ListOrder;
                variant.Show = lineItemEdit ? (variant.ExternalID == lineItemEdit.Variant.ExternalID) : true;
                if (variant.Show && lineItemEdit) variant.Quantity = lineItemEdit.Quantity;
                angular.forEach(product.Specs, function(spec) {
                    angular.forEach(spec.Options, function(option) {
                        if (option.ID == params[0]) {
                            variant.tempSpecs[spec.Name] = {};
                            variant.tempSpecs[spec.Name].Value = option.Value;
                            variant.DisplayName[0] = option.Value;
                        }
                        if (option.ID == params[1]) {
                            variant.tempSpecs[spec.Name] = {};
                            variant.tempSpecs[spec.Name].Value = option.Value;
                            variant.DisplayName[1] = option.Value;
                        }
                    });
                });
                variant.OrderQuantity = order ? countVariantInOrder(variant) : 0;
                comboVariants[group].DisplayName = group;
                variantCount++;
                if (defineVariantSpecCount == 1) {
                    comboVariants[group].QuantityAvailable = variant.QuantityAvailable;
                    comboVariants[group].Markup = variant.Markup;
                    comboVariants[group].OrderQuantity = variant.OrderQuantity;
                    comboVariants[group].ListOrder = variant.ListOrder;
                    comboVariants[group].Show = variant.Show;
                }
                comboVariants[group].push(variant);
                if (variantCount == comboCount) {
                    if (defineVariantSpecCount == 1) {
                        //
                    }
                    else if (defineVariantSpecCount == 2) {
                        //
                    }
                    _then(success, comboVariants, defineVariantSpecCount, spec1Name, spec2Name);
                }
            }, function(ex){
                //count variant even if it is not active
                variantCount++;
            });
        }
    }

    var _validateQty = function(matrix, product, success) {
        var qtyError = "";
        var priceSchedule = product.StandardPriceSchedule;
        var totalQty = 0;


        angular.forEach(matrix, function (group) {
            angular.forEach(group, function (variant) {
                var qty = variant.Quantity;
                variant.QtyError = false;

                if (variant.Quantity) {
                    if (!$451.isPositiveInteger(qty)) {
                        qtyError += "<p>Please select a valid quantity for " + variant.DisplayName[0] + " " + (variant.DisplayName[1] ? variant.DisplayName[1] : "") + "</p>";
                    }
                    else {
                        totalQty += +(variant.Quantity);
                    }
                }
                if (priceSchedule.MinQuantity > qty && qty != 0) {
                    qtyError += "<p>Quantity must be equal or greater than " + priceSchedule.MinQuantity + " for " + variant.DisplayName[0] + " " + (variant.DisplayName[1] ? variant.DisplayName[1] : "") + "</p>";
                    variant.QtyError = true;
                }
                if (priceSchedule.MaxQuantity && priceSchedule.MaxQuantity < qty) {
                    qtyError += "<p>Quantity must be equal or less than " + priceSchedule.MaxQuantity + " for " + variant.DisplayName[0] + " " + (variant.DisplayName[1] ? variant.DisplayName[1] : "") + "</p>";
                    variant.QtyError = true;
                }
                var qtyAvail = variant.QuantityAvailable;
                if (qtyAvail < qty && product.AllowExceedInventory == false) {
                    qtyError = "<p>Quantity cannot exceed the Quantity Available of " + qtyAvail + " for " + variant.DisplayName[0] + " " + (variant.DisplayName[1] ? variant.DisplayName[1] : "") + "</p>";
                    variant.QtyError = true;
                }
            });
        });

        //show an error if no qty has been entered and therefore qtyChanged() has not been hit
        if (!totalQty) {
            qtyError += "<p>Please select a valid quantity.</p>";
        }

        if (!product.RestrictedQuantity && product.MinTotalQty && totalQty < product.MinTotalQty) {
            qtyError += "Total quantity must be equal or greater than " + product.MinTotalQty + " for " + (product.Name ? product.Name : product.ExternalID);
        }

        if (!product.RestrictedQuantity && product.MaxTotalQty && totalQty > product.MaxTotalQty) {
            qtyError += "Total quantity must be equal or less than " + product.MaxTotalQty + " for " + (product.Name ? product.Name : product.ExternalID);
        }


        _then(success, qtyError);

    }

    var _addToOrder = function(matrix, product, success) {
        var lineItems = [];
        angular.forEach(matrix, function(group) {
            angular.forEach(group, function(item) {
                if (item.Quantity > 0) {
                    var liSpecs = {};
                    for (var spec in product.Specs) {
                        liSpecs[spec] = angular.copy(product.Specs[spec]);
                        liSpecs[spec].Value = item.tempSpecs[spec] ? item.tempSpecs[spec].Value : null;
                    }
                    var li = {
                        "PriceSchedule":product.StandardPriceSchedule,
                        "Product":product,
                        "Quantity":item.Quantity,
                        "Specs":liSpecs,
                        "Variant":item,
                        "qtyError":null
                    }
                    lineItems.push(li);
                }
            });
        });
        _then(success, lineItems);
    }

    var _backOrderValidate = function(matrix, product, success) {
        var backOrderMessage = [];
        angular.forEach(matrix, function(group) {
            angular.forEach(group, function(variant) {
                var qty = variant.Quantity;
                if (qty > variant.QuantityAvailable) {
                    var name = variant.DisplayName[0] + (variant.DisplayName[1] ? variant.DisplayName[1] : "");
                    backOrderMessage.push(name);
                }
            });
        });

        _then(success, backOrderMessage);
    }

    return {
        build: _build,
        validateQuantity: _validateQty,
        addToOrder: _addToOrder,
        getMinMaxTotalQty: _getMinMaxTotalQty,
        backOrderValidate: _backOrderValidate
    }
}

function definesvariant() {
    return function(value) {
        var output = [];
        angular.forEach(value, function(s) {
            if (s.DefinesVariant == false || s.ControlType == 'Text')
                output.push(s);
        });
        return output;
    }
}

function orderobjectby() {
    return function(items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function(item) {
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });
        if(reverse) filtered.reverse();
        return filtered;
    };
}