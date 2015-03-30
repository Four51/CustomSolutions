angular.module('OrderCloud-SameAsShipping', []);
angular.module('OrderCloud-SameAsShipping')
    .directive('ordershipping', OrderShipping)
    .directive('orderbilling', OrderBilling)
    .directive('paymentselector', PaymentSelector)
    .controller('orderShippingCtrl', OrderShippingCtrl)
    .controller('orderBillingCtrl', OrderBillingCtrl)
    .controller('paymentSelectorCtrl', PaymentSelectorCtrl)
;

function OrderShipping(){
    return {
        restrict: 'AE',
        templateUrl: 'partials/controls/orderShipping.html',
        controller: 'orderShippingCtrl'
    };
}

function OrderBilling(){
    return {
        restrict: 'AE',
        template: templateBilling,
        controller: 'orderBillingCtrl'
    };
}

function PaymentSelector(){
    return {
        restrict: 'E',
        template: templatePaymentSelector,
        controller: 'PaymentSelectorCtrl'
    }
}

OrderShippingCtrl.$inject = ['$scope', '$rootScope', 'Order', 'Shipper', 'Address', 'AddressList'];
function OrderShippingCtrl($scope, $rootScope, Order, Shipper, Address, AddressList){
    AddressList.clear();
    AddressList.shipping(function(list) {
        $scope.shipaddresses = list;
        if (list.length == 1 && !$scope.currentOrder.ShipAddressID) {
            $scope.currentOrder.ShipAddressID = list[0].ID;
        }
        if ($scope.isEditforApproval) {
            if (!AddressList.contains($scope.currentOrder.ShipAddress))
                $scope.shipaddresses.push($scope.currentOrder.ShipAddress);
        }
    });
    $scope.shipaddress = { Country: 'US', IsShipping: true, IsBilling: false };
    $scope.$on('event:AddressCancel', function() {
        $scope.shipaddressform = false;
    });
    $scope.$on('event:AddressSaved', function(event, address) {
        if (address.IsShipping) {
            $scope.currentOrder.ShipAddressID = address.ID;
            if (!$scope.shipToMultipleAddresses)
                $scope.setShipAddressAtOrderLevel();
            $scope.shipaddressform = false;
        }

        AddressList.shipping(function(list) {
            $scope.shipaddresses = list;
            if ($scope.isEditforApproval) {
                $scope.shipaddresses.push($scope.currentOrder.ShipAddress);
                $scope.shipaddresses.push($scope.currentOrder.BillAddress);
            }
        });
        $scope.shipaddress = { Country: 'US', IsShipping: true, IsBilling: false };
    });

    var saveChanges = function(callback, error) {
        $scope.errorMessage = null;
        var auto = $scope.currentOrder.autoID;
        Order.save($scope.currentOrder,
            function(data) {
                $scope.currentOrder = data;
                $scope.displayLoadingIndicator = false;
                if (auto) {
                    $scope.currentOrder.autoID = true;
                    $scope.currentOrder.ExternalID = 'auto';
                }
                if (callback) callback($scope.currentOrder);
            },
            function(ex) {
                if (auto)
                    $scope.currentOrder.ExternalID = auto;
                $scope.errorMessage = ex.Message;
                $scope.shippingUpdatingIndicator = false;
                $scope.shippingFetchIndicator = false;
                if (error) error(ex);
            }
        );
    };

    Shipper.query($scope.currentOrder, function(list) {
        $scope.shippers = list;
        // sometimes the current shipper is not longer available. we need to clear the shipping information in that case
        var exists = false;
        angular.forEach(list, function(s) {
            if (!exists && $scope.currentOrder.LineItems[0].ShipperID == s.ID)
                exists = true;
        });
        if (!exists) {
            Order.clearshipping($scope.currentOrder);
        }
    });

    $scope.setMultipleShipAddress = function() {
        $scope.currentOrder.forceMultipleShip(true);
        angular.forEach($scope.currentOrder.LineItems, function(li, i) {
            if (i == 0) return;
            li.ShipAddressID = null;
            li.ShipFirstName = null;
            li.ShipLastName = null;
            li.ShipperID = null;
            li.ShipperName = null;
            li.ShipAccount = null;
        });
    }

    $scope.setSingleShipAddress = function() {
        $scope.currentOrder.forceMultipleShip(false);
        angular.forEach($scope.currentOrder.LineItems, function(li) {
            li.ShipAddressID = $scope.currentOrder.LineItems[0].ShipAddressID;
            li.ShipFirstName = $scope.currentOrder.LineItems[0].ShipFirstName;
            li.ShipLastName = $scope.currentOrder.LineItems[0].ShipLastName;
            li.ShipperID = $scope.currentOrder.LineItems[0].ShipperID;
            li.ShipAccount = $scope.currentOrder.LineItems[0].ShipAccount;
        });
    };

    $scope.$watch('currentOrder.ShipAddressID', function(newValue) {
        $scope.orderShipAddress = {};
        if ($scope.currentOrder) {
            $scope.currentOrder.ShipFirstName = null;
            $scope.currentOrder.ShipLastName = null;
            angular.forEach($scope.currentOrder.LineItems, function(item) {
                item.ShipFirstName = null;
                item.ShipLastName = null;
            });
        }

        if (newValue) {
            Address.get(newValue, function(add) {
                if ($scope.user.Permissions.contains('EditShipToName') && !add.IsCustEditable) {
                    angular.forEach($scope.currentOrder.LineItems, function(item) {
                        item.ShipFirstName = add.FirstName;
                        item.ShipLastName = add.LastName;
                    });
                }
                $scope.orderShipAddress = add;
            });
            if (!$scope.currentOrder.IsMultipleShip()) {
                $scope.setShipAddressAtOrderLevel();
            }
        }
    });

    $scope.setShipAddressAtLineItem = function(item) {
        item.ShipFirstName = null;
        item.ShipLastName = null;
        saveChanges(
            function(order) {
                Shipper.query(order,
                    function(list) {
                        $scope.shippers = list;
                    }
                );
            },
            function(ex) {
                item.ShipAddressID = null;
            }
        );
    };

    $scope.setShipAddressAtOrderLevel = function() {
        $scope.shippingFetchIndicator = true;
        $scope.currentOrder.ShipperName = null;
        $scope.currentOrder.Shipper = null;
        $scope.currentOrder.ShipperID = null;
        angular.forEach($scope.currentOrder.LineItems, function(li) {
            li.ShipAddressID = $scope.currentOrder.ShipAddressID;
            li.ShipFirstName = null;
            li.ShipLastName = null;
            li.ShipperName = null;
            li.Shipper = null;
            li.ShipperID = null;
        });

        // broadcast to orderbilling.js that ship address changed
        $rootScope.$broadcast('shipAddressChange');

        saveChanges(
            function(order) {
                Shipper.query(order, function(list) {
                        $scope.shippers = list;
                        $scope.shippingFetchIndicator = false;
                    }
                );
            },
            function(ex) {
                $scope.currentOrder.ShipAddressID = null;
                angular.forEach($scope.currentOrder.LineItems, function(li) {
                    li.ShipAddressID = null;
                });
            }
        );
    };
    $scope.updateShipper = function(li) {
        $scope.shippingUpdatingIndicator = true;
        $scope.shippingFetchIndicator = true;
        if (!li) { // at the order level
            angular.forEach($scope.shippers, function(s) {
                if (s.Name == $scope.currentOrder.LineItems[0].ShipperName)
                    $scope.currentOrder.Shipper = s;
            });

            angular.forEach($scope.currentOrder.LineItems, function(item) {
                item.ShipperName = $scope.currentOrder.Shipper ? $scope.currentOrder.Shipper.Name : null;
                item.ShipperID = $scope.currentOrder.Shipper ? $scope.currentOrder.Shipper.ID : null;
            });

            saveChanges(function() {
                $scope.shippingUpdatingIndicator = false;
                $scope.shippingFetchIndicator = false;
            });
        }
        else { // at the lineitem level for multiple shipping
            angular.forEach($scope.shippers, function(s) {
                if (s.Name == li.ShipperName)
                    li.Shipper = s;
            });
            li.ShipperName = li.Shipper.Name;
            li.ShipperID = li.Shipper.ID;
            saveChanges(function() {
                $scope.shippingUpdatingIndicator = false;
                $scope.shippingFetchIndicator = false;
            });
        }

        // broadcast to orderbilling.js that ship method changed
        $rootScope.$broadcast('shipAddressChange');
    };

    $scope.$on('event:AddressCancel', function(event) {
        $scope.addressform = false;
    });
}

OrderBillingCtrl.$inject = ['$scope', '$rootScope', 'Order', 'Shipper', 'Address', 'AddressList'];
function OrderBillingCtrl($scope, $rootScope, Order, Shipper, Address, AddressList){
    AddressList.clear();
    AddressList.billing(function(list) {
        $scope.billaddresses = list;
        if (list.length == 1 && !$scope.currentOrder.BillAddressID) {
            $scope.currentOrder.BillAddressID = list[0].ID;
        }
        if ($scope.isEditforApproval) {
            if (!AddressList.contains($scope.currentOrder.BillAddress))
                $scope.billaddresses.push($scope.currentOrder.BillAddress);
        }
        $scope.currentOrder.copyShipAddress = false;
        //add this line here to default billing address to shipping address
        //$scope.currentOrder.BillAddressID = $scope.orderShipAddress.ID;
    });
    $scope.billaddress = { Country: 'US', IsShipping: false, IsBilling: true };

    $scope.$on('event:AddressSaved', function(event, address) {
        if (address.IsBilling) {
            $scope.currentOrder.BillAddressID = address.ID;
            $scope.billaddressform = false;
        }

        AddressList.billing(function(list) {
            $scope.billaddresses = list;
            if ($scope.isEditforApproval) {
                $scope.billaddresses.push($scope.currentOrder.BillAddress);
            }
        });
        $scope.billaddress = { Country: 'US', IsShipping: false, IsBilling: true };
    });

    $scope.$watch('currentOrder.BillAddressID', function(newValue) {
        if (newValue) {
            Address.get(newValue, function(add) {
                if ($scope.user.Permissions.contains('EditBillToName') && !add.IsCustEditable) {
                    $scope.currentOrder.BillFirstName = add.FirstName;
                    $scope.currentOrder.BillLastName = add.LastName;
                }
                $scope.BillAddress = add;
            });
        }
    });

    $scope.$on('event:AddressCancel', function(event) {
        $scope.billaddressform = false;
    });

    //custom
    $scope.resetBilling = function() {

        if ($scope.currentOrder.copyShipAddress == true) {
            $scope.currentOrder.BillAddressID = $scope.orderShipAddress.ID;
            $scope.shipaddress.IsBilling = true;
        }
        if ($scope.currentOrder.copyShipAddress == false) {
            $scope.currentOrder.BillAddressID = '';
            $scope.shipaddress.IsBilling = false;
        }
    }

    $scope.$on('shipAddressChange', function() {
        $scope.currentOrder.BillAddressID = '';
        $scope.shipaddress.IsBilling = false;
        $scope.currentOrder.copyShipAddress = false;
    });
}

PaymentSelectorCtrl.$inject = ['$scope', '$rootScope', 'SavedCreditCard', 'SpendingAccount', 'Order'];
function PaymentSelectorCtrl($scope, $rootScope, SavedCreditCard, SpendingAccount, Order){
    $scope.paymentSelection = {};
    $scope.isSplitBilling = false;

    SpendingAccount.query(function(data) {
        $scope.SpendingAccounts = data;
        if ($scope.currentOrder && $scope.currentOrder.BudgetAccountID)
            budgetAccountCalculation($scope.currentOrder.BudgetAccountID);
    });

    $scope.$watch('currentOrder.PaymentMethod', function(event) {
        if (event == 'BudgetAccount' && $scope.SpendingAccounts) {
            if ($scope.SpendingAccounts.length == 1)
                $scope.currentOrder.BudgetAccountID = $scope.SpendingAccounts[0].ID;
            else {
                var count = 0, account;
                angular.forEach($scope.SpendingAccounts, function(s) {
                    if (s.AccountType.PurchaseCredit) {
                        count += 1;
                        account = s;
                    }
                });
                if (count == 1 && account)
                    $scope.currentOrder.BudgetAccountID = account.ID;
            }
        }
        else {
            if (!$scope.isSplitBilling && $scope.currentOrder) {
                $scope.currentOrder.currentBudgetAccount = null;
                $scope.currentOrder.BudgetAccountID = null;
            }
        }
        $scope.cart_billing.$setValidity('paymentMethod', validatePaymentMethod(event));
    });

    var budgetAccountCalculation = function(value) {
        if (value && $scope.SpendingAccounts) {
            angular.forEach($scope.SpendingAccounts, function(a) {
                if (a.ID == value) {
                    $scope.currentBudgetAccount = a;
                }
            });
        }
        var valid = validatePaymentMethod('BudgetAccount');
        $scope.remainingOrderTotal = Order.calculatediscount($scope.currentOrder, $scope.currentBudgetAccount);
        $scope.cart_billing.$setValidity('paymentMethod', valid);
    };

    $scope.$watch('currentOrder.Total', function(total) {
        if ($scope.currentOrder && $scope.currentOrder.BudgetAccountID)
            budgetAccountCalculation($scope.currentOrder.BudgetAccountID);
    });

    $scope.$watch('currentOrder.BudgetAccountID', function(value) {
        $scope.currentBudgetAccount = null;
        if (!value) return;
        budgetAccountCalculation(value);
    });

    function validatePaymentMethod(method) {
        $scope.isSplitBilling = false;
        var validateAccount = function() {
            var paymentMethod = $scope.currentOrder.PaymentMethod;
            var account = null;
            angular.forEach($scope.SpendingAccounts, function(a) {
                if ($scope.currentOrder && a.ID == $scope.currentOrder.BudgetAccountID)
                    account = a;
            });
            if (account) {
                $scope.isSplitBilling = false;
                if (account.AccountType.MaxPercentageOfOrderTotal != 100) {
                    $scope.isSplitBilling = true;
                    return (paymentMethod == 'BudgetAccount') ? false : true;
                }

                if (account.Balance < $scope.currentOrder.Total) {
                    $scope.isSplitBilling = !account.AccountType.AllowExceed;
                    return (paymentMethod == 'BudgetAccount' ) ? account.AccountType.AllowExceed : true;
                }
                else
                    return true;
            }
            return (paymentMethod != 'BudgetAccount');
        }

        var valid = false;
        switch (method) {
            case 'Undetermined':
                valid = $scope.user.Permissions.contains('SubmitForApproval');
                valid = valid ? validateAccount() : valid;
                break;
            case 'PurchaseOrder':
                valid = $scope.user.Permissions.contains('PayByPO');
                valid = valid ? validateAccount() : valid;
                break;
            case 'BudgetAccount':
                valid = $scope.user.Permissions.contains('PayByBudgetAccount');
                valid = valid ? validateAccount() : valid;
                break;
            case 'CreditCard':
                valid = $scope.user.Permissions.contains('PayByCreditCard');
                valid = valid ? validateAccount() : valid;
                break;
            default:
                return false;
        }
        return valid;
    }

    var getCardByID = function(id) {
        var selectedCard = null;
        angular.forEach($scope.paymentSelection.SavedCards, function(card) {
            if (card.ID == id)
                selectedCard = card;
        });
        return selectedCard;
    };

    $scope.setPaymentMethod = function(type) {
        $scope.currentOrder.PaymentMethod = type;
        $rootScope.$broadcast('event:paymentMethodChange', type);
    };

    $scope.setBudgetAccount = function(count) {
        $scope.setPaymentMethod('BudgetAccount');
        if ($scope.currentOrder.BudgetAccountID || count > 1) return;
        angular.forEach($scope.SpendingAccounts, function(a) {
            if (a.AccountType.PurchaseCredit) {
                $scope.currentOrder.BudgetAccountID = a.ID;
                $scope.selectedBudgetAccount = a;
            }
        });
    };

    $rootScope.$on('event:SpendingAccountUpdate', function(event, accounts) {
        if (!$scope.currentOrder) return;
        if ($scope.currentOrder.PaymentMethod == 'BudgetAccount') {
            angular.forEach(accounts, function(a) {
                if ($scope.selectedBudgetAccount) return;
                if ($scope.currentOrder.BudgetAccountID == null && a.AccountType.PurchaseCredit) {
                    $scope.currentOrder.BudgetAccountID = a.ID;
                    $scope.selectedBudgetAccount = a;
                }
                else if (a.AccountType.PurchaseCredit && a.ID == $scope.currentOrder.BudgetAccountID) {
                    $scope.selectedBudgetAccount = a;
                }
            });
        }
    });

    $scope.deleteSavedCard = function(id) {
        if (confirm('Are you sure you wish to delete this saved credit card? This cannot be undone') == true) {
            var card = getCardByID(id);
            SavedCreditCard.delete(card, function() {
                SavedCreditCard.query(function(cards) {
                    $scope.currentOrder.CreditCardID = null;
                    $scope.paymentSelection.SavedCards = cards;
                });
            });
        }
    };
    $scope.showDelete = function(id) {
        if (id == null) return false;
        var card = getCardByID(id);
        return card.IsCustEditable;
    };

    SavedCreditCard.query(function(cards) {
        $scope.paymentSelection.SavedCards = cards;
    });
}

function templateBilling(){
    return [
        '<style>',
        '    .btn-info.disabled, .btn-info[disabled], fieldset[disabled] .btn-info, .btn-info.disabled:hover, .btn-info[disabled]:hover, fieldset[disabled] .btn-info:hover, .btn-                  info.disabled:focus, .btn-info[disabled]:focus, fieldset[disabled] .btn-info:focus, .btn-info.disabled:active, .btn-info[disabled]:active, fieldset[disabled] .btn-info:active,        .btn-info.disabled.active, .btn-info.active[disabled], fieldset[disabled] .btn-info.active {',
        '        background-color: #0c2a3a;',
        '        border-color: #081b24;',
        '    }',
        '</style>',
        '<div class="panel panel-default panel-order">',
        '    <div class="panel-heading" ng-class="{\'no\': cart_billing.$invalid, \'yes\': !cart_billing.$invalid, \'open\': checkOutSection == \'billing\' }">',
        '        <h3 ng-click="checkOutSection = \'billing\'" class="panel-title">',
        '            <i class="pull-left" ng-class="{\'fa fa-warning\': cart_billing.$invalid, \'fa fa-check-circle\': !cart_billing.$invalid }"></i>',
        '            {{\'Billing\' | r | xlat}}',
        '            <i class="pull-right" ng-class="{\'fa fa-caret-up\': currentOrder.checkOutSection == \'billing\', \'fa fa-caret-down\': currentOrder.checkOutSection != \'billing\' }"></i>',
        '        </h3>',
        '    </div>',
        '    <div class="panel-body collapse" collapse="checkOutSection != \'billing\'">',
        '        <div>',
        '            <billingmessage />',
        '        </div>',
        '        <!--custom: add checkbox-->',
        '        <div class="row" ng-hide="billaddressform">',
        '            <div class="checkbox">',
        '                <label>',
        '                    <input name="sameAsShipping" type="checkbox" ng-model="currentOrder.copyShipAddress" ng-change="resetBilling()"',
        '                           ng-disabled="!currentOrder.ShipAddressID" />',
        '                    {{\'Same as Shipping Address\' | r | xlat}}',
        '                </label>',
        '            </div>',
        '        </div>',
        '        <!--custom: add checkbox-->',
        '        <!--<div ng-show="billaddressform || (billaddresses.length == 0 && user.Permissions.contains(\'CreateBillToAddress\'))">-->',
        '        <div ng-show="billaddressform || (!currentOrder.BillAddressID && billaddresses.length == 0 && user.Permissions.contains(\'CreateBillToAddress\'))">',
        '            <addressinput address=\'billaddress\' user=\'user\'></addressinput>',
        '        </div>',
        '        <!--<div ng-hide="billaddressform || (billaddresses.length == 0 && user.Permissions.contains(\'CreateBillToAddress\'))">-->',
        '        <div ng-hide="billaddressform || (!currentOrder.BillAddressID && billaddresses.length == 0 && user.Permissions.contains(\'CreateBillToAddress\'))">',
        '            <form name="cart_billing" novalidate="">',
        '                <div>',
        '                    <paymentselector></paymentselector>',
        '                    <div class="view-form-icon" ng-hide="currentOrder.copyShipAddress" ng-show="billaddresses.length > 0">',
        '                        <div ng-class="{\'view-form-select\': !currentOrder.BillAddressID, \'\': currentOrder.BillAddressID }">',
        '                            <label class="required">{{(\'Billing\' | r) + \' \' + (\'Address\' | r) | xlat}}</label>',
        '                            <select class="form-control" ng-show="billaddresses" name="billingAddress"',
        '                                    ng-options="address.ID as address.AddressName for address in billaddresses | filter:{IsBilling:true}"',
        '                                    ng-model="currentOrder.BillAddressID" required>',
        '                                <option value=""></option>',
        '                            </select>',
        '                            <i class="fa fa-map-marker"></i>',
        '                        </div>',
        '                    </div>',
        '                    <!--<div class="order-location" ng-show="BillAddress">-->',
        '                    <div class="order-location" ng-show="currentOrder.BillAddressID">',
        '                        <p><strong><small>{{(\'Billing\' | r) + \' \' + (\'Location\' | r) | xlat}}</small></strong></p>',
        '                        <!--<p ng-show="BillAddress.AddressName"><small>{{BillAddress.AddressName}}</small></p>-->',
        '                        <p ng-show="BillAddress.CompanyName"><small>{{BillAddress.CompanyName}}</small></p>',
        '                        <p ng-show="(BillAddress.FirstName || BillAddress.LastName) && (!user.Permissions.contains(\'EditBillToName\') && BillAddress.IsCustEditable)">',
        '                            <small>{{BillAddress.FirstName + \' \' + BillAddress.LastName}}</small>',
        '                        </p>',
        '                        <div class="row" ng-show="user.Permissions.contains(\'EditBillToName\') && !BillAddress.IsCustEditable">',
        '                            <div class="col-sm-2">',
        '                                <input class="form-control" ng-required="user.Permissions.contains(\'EditBillToName\') && !BillAddress.IsCustEditable" type="text" ng-model="currentOrder.BillFirstName" placeholder="{{(\'First\' | r) + \' \' + (\'Name\' | r) | xlat}}" autocomplete="off" />',
        '                            </div>',
        '                            <div class="col-sm-2">',
        '                                <input class="form-control" ng-required="user.Permissions.contains(\'EditBillToName\') && !BillAddress.IsCustEditable" type="text" ng-model="currentOrder.BillLastName" placeholder="{{(\'Last\' | r) + \' \' + (\'Name\' | r) | xlat}}"  />',
        '                            </div>',
        '                        </div>',
        '                        <p ng-show="BillAddress.Street1"><small>{{BillAddress.Street1}}</small></p>',
        '                        <p ng-show="BillAddress.Street2"><small>{{BillAddress.Street2}}</small></p>',
        '                        <p ng-show="BillAddress.City || BillAddress.State || BillAddress.Zip"><small>{{BillAddress.City}}<span ng-if="ShipAddress.City && ShipAddress.State">, </span> {{BillAddress.State}} {{BillAddress.Zip}}</small></p>',
        '                        <p ng-show="BillAddress.Phone"><small>{{BillAddress.Phone}}</small></p>',
        '                    </div>',
        '                </div>',
        '            </form>',
        '        </div>',
        '    </div>',
        '</div>'
    ].join('');
}

function templatePaymentSelector(){
    return [
        '<div>',
        '    <span class="btn-group">',
        '        <button class="btn btn-default" type="button"',
        '                ng-show="user.Permissions.contains(\'PayByPO\')"',
        '                ng-click="currentOrder.PaymentMethod = \'PurchaseOrder\'">',
        '            <i ng-class="{\'fa fa-check\': currentOrder.PaymentMethod == \'PurchaseOrder\' }"></i>',
        '            {{\'Purchase Order\' | r | xlat}}',
        '        </button>',
        '        <button class="btn btn-default" type="button"',
        '                ng-show="user.Permissions.contains(\'SubmitForApproval\') && currentOrder.Approvals"',
        '                ng-disabled="isSplitBilling"',
        '                ng-click="currentOrder.PaymentMethod = \'Undetermined\'">',
        '            <i ng-class="{\'fa fa-check\': currentOrder.PaymentMethod == \'Undetermined\' }"></i>',
        '            {{\'Approval Order\' | r | xlat}}',
        '        </button>',
        '        <button class="btn btn-default" type="button"',
        '                ng-if="user.Permissions.contains(\'PayByBudgetAccount\') && (SpendingAccounts|filter:{ForPurchase:true}).length > 0"',
        '                ng-click="setBudgetAccount((SpendingAccounts|filter:{AccountType.PurchaseCredit:true}).length)">',
        '            <i ng-class="{\'fa fa-check\': currentOrder.PaymentMethod == \'BudgetAccount\' || currentOrder.BudgetAccountID }"></i>',
        '            {{\'Spending Account\' | r | xlat}}',
        '        </button>',
        '        <button class="btn btn-default" type="button"',
        '                ng-if="user.AvailableCreditCards.length > 0 && user.Permissions.contains(\'PayByCreditCard\')"',
        '                ng-click="currentOrder.PaymentMethod = \'CreditCard\'">',
        '            <i ng-class="{\'fa fa-check\': currentOrder.PaymentMethod == \'CreditCard\' }"></i>',
        '            {{\'Credit Card\' | r | xlat}}',
        '        </button>',
        '        <button class="btn btn-info pull-right" type="button"',
        '                ng-hide="(billaddressform || (!addressform && (addresses | filter:{IsBilling:true}).length == 0) || !user.Permissions.contains(\'CreateBillToAddress\'))"',
        '                ng-click="billaddressform = true" ng-disabled="currentOrder.copyShipAddress">>',
        '            {{(\'New\' | r) + \' \' +  (\'Address\' | r) | xlat}}',
        '        </button>',
        '    </span>',
        '    <div class="view-form-icon" ng-if="user.Permissions.contains(\'PayByBudgetAccount\')" ng-show="currentOrder.PaymentMethod == \'BudgetAccount\'">',
        '        <div ng-show="(SpendingAccounts|filter:{ForPurchase:true}).length == 1" class="alert alert-success">',
        '            {{(selectedBudgetAccount.Label) + \' - \' + (\'Balance\' | xlat) + \': \' + (selectedBudgetAccount.Balance | culturecurrency)}}',
        '        </div>',
        '        <div class="row view-form-icon" ng-show="(SpendingAccounts|filter:{ForPurchase:true}).length > 1">',
        '            <div class="col-sm-6" ng-class="{\'view-form-select\': !currentOrder.BudgetAccountID, \'\': currentOrder.BudgetAccountID }">',
        '                <label ng-show="currentOrder.BudgetAccountID">{{\'Spending Account\' | r}}</label>',
        '                <select class="form-control" placeholder="{{\'Spending Account\' | r | xlat}}"',
        '                        ng-options="account.ID as (account.Label + \' - \' + (\'Balance\' | xlat) + \': \' + (account.Balance | culturecurrency)) for account in SpendingAccounts | filter:{ForPurchase:true}"',
        '                        ng-model="currentOrder.BudgetAccountID"',
        '                        ng-required="currentOrder.PaymentMethod == \'BudgetAccount\'">',
        '                </select>',
        '                <i class="fa fa-dollar"></i>',
        '            </div>',
        '        </div>',
        '        <hr/>',
        '    </div>',
        '    <div ng-if="user.Permissions.contains(\'PayByCreditCard\')" ng-show="currentOrder.PaymentMethod == \'CreditCard\'">',
        '        <div class="row view-form-icon" ng-if="paymentSelection.SavedCards">',
        '            <div class="col-sm-4" ng-class="{\'view-form-select-saved\': !currentOrder.CreditCardID, \'\': currentOrder.CreditCardID }">',
        '                <label>{{(\'Saved\' | r) + \' \' +  (\'Card\' | r) | xlat}}</label>',
        '                <select class="form-control" ng-model="currentOrder.CreditCardID" ng-options="card.ID as card.Name for card in paymentSelection.SavedCards">',
        '                    <option value="" />',
        '                </select>',
        '                <i class="fa fa-credit-card"></i>',
        '                <button ng-show="showDelete(currentOrder.CreditCardID)" title="Delete" class="btn btn-danger cart-view-btn-remove" ng-click="deleteSavedCard(currentOrder.CreditCardID)">',
        '                    <span class="fa fa-minus-circle fa-inverse"></span>',
        '                </button>',
        '            </div>',
        '        </div>',
        '        <creditcard ng-if="user.Permissions.contains(\'PayByCreditCard\')" ng-show="currentOrder.PaymentMethod == \'CreditCard\' && !currentOrder.CreditCardID"></creditcard>',
        '    </div>',
        '    <div class="alert alert-warning" ng-show="cart-billing.$error.paymentMethod && currentOrder.PaymentMethod == \'BudgetAccount\' && currentOrder.BudgetAccountID">',
        '        {{\'The account, \' + (currentBudgetAccount.Label) + \', is not sufficient for the order total.\' | xlat}}',
        '    </div>',
        '    <div class="alert alert-warning text-center" ng-show="isSplitBilling">',
        '        <div class="row">',
        '            <p class="col-sm-6 text-left alert alert-info" ng-show="currentOrder.PaymentMethod == \'BudgetAccount\'">',
        '                <span>{{\'The account, \' + (currentBudgetAccount.Label) + \', is not sufficient for the order total.\' | xlat}}</span>',
        '                <strong>{{\'Please select an additional payment type to cover the remaining\' | r | xlat}}</strong>',
        '            <span ng-show="!user.Permissions.contains(\'HidePricing\')">',
        '                <strong>{{remainingOrderTotal | currency}}</strong>',
        '            </span>',
        '            <span ng-show="user.Permissions.contains(\'HidePricing\')">',
        '                {{\'balance\' | xlat}}',
        '            </span>',
        '                {{\'or remove this spending account from your payment options.\' | r | xlat}}',
        '            </p>',
        '            <p class="col-sm-6 text-left alert alert-success" ng-show="currentOrder.PaymentMethod != \'BudgetAccount\'">',
        '                <span>{{(\'The account, \' | xlat) + (currentBudgetAccount.Label) + (\', is not sufficient for the order total.\' | xlat)}}</span>',
        '                <span>{{\'This additional payment will cover the remaining\' | r | xlat}}</span>',
        '            <span ng-show="!user.Permissions.contains(\'HidePricing\')">',
        '                <strong>{{remainingOrderTotal | currency}}</strong>',
        '            </span>',
        '            <span ng-show="user.Permissions.contains(\'HidePricing\')">',
        '                {{\'balance or remove this spending account from your payment options.\' | r | xlat}}',
        '            </span>',
        '            </p>',
        '            <p class="col-sm-6">',
        '                <button type="button" class="btn btn-danger" ng-click="currentOrder.BudgetAccountID = null; isSplitBilling = null; currentOrder.PaymentMethod = (currentOrder.PaymentMethod == \'BudgetAccount\') ? null : currentOrder.PaymentMethod;">{{\'Remove\' | xlat}} {{currentBudgetAccount.Label}} {{\' as payment\' | r | xlat}}</button>',
        '            </p>',
        '        </div>',
        '',
        '    </div>',
        '</div>'
    ].join('');
}