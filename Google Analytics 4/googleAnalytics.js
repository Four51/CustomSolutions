four51.app.factory('GoogleAnalytics', function(){
    var service = {
        analyticsLogin: _loginAnalytics,
        ecommerce: _ecommerce
    };

    function gtag(){dataLayer.push(arguments);}

    function _loginAnalytics(UserCode) {
        if(window.dataLayer == undefined){
            (function(uc){
                var script_tag = document.createElement('script');
                script_tag.src='https://www.googletagmanager.com/gtag/js?id=' + uc;
                document.head.appendChild(script_tag);
                window.dataLayer = window.dataLayer || [];
                gtag('js', new Date());
                gtag('config', uc);
            })(UserCode);
        }
    }

    function _ecommerce(data, user) {
        var data = getTransactionData(data, user);
        gtag("event", "purchase", data);
    }

    function getTransactionData(data, user) {
        var companyName = user.Company.Name.toString();
        var lineItems = mapLineItems(data.LineItems, companyName);
        var transaction = {
            'transaction_id': data.ExternalID.toString(),       // Transaction ID.
            'value': data.Total.toString(),                     // Grand Total.
            'tax': data.TaxCost.toString(),                     // Tax.
            'shipping': data.ShippingCost.toString(),           // Shipping.
            'currency': user.Culture.CurrencyCode.toString(),   // Currency.
            'items': lineItems                                  // Line Items.
        };
        return transaction;
    }

    function mapLineItems(LineItems, companyName) {
        var items = []
        angular.forEach(LineItems, function (item){
            items.push(getItemData(item, companyName))
        });
        return items;
    }

    function getItemData(item, companyName) {
        var product = {
            'item_id': item.Product.ID,                        // Product ID.
            'item_name': item.Product.Name.toString(),         // Product name.
            'affiliation': companyName,                        // Affiliation or store name.
            'price': item.UnitPrice,                           // Unit Price.
            'quantity': item.Quantity,                         // Quantity.
        };
        return product;
    }

    return service;
});
