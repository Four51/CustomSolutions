four51.app.factory('Punchout', ['$resource', '$451', '$http', '$cookieStore', 'Error', function($resource, $451, $http, $cookieStore, Error) {
    function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

    var _punchoutSession = $cookieStore.get('punchoutSession.' + $451.apiName);

    var _getForm = function(success, error){
        var url = $451.api('punchoutin/returnform/' + _punchoutSession.PunchoutTemplateName) + '?PunchoutBuyerCookie=' + _punchoutSession.PunchoutBuyerCookie;

        $resource(url).get().$promise.then(function(form){
                success(form);
            },
            function(err){
                error(err);
            });
    }

    var _save = function(id, success, error){
        $resource($451.api('order/punchout/:id'), {'id': id}, { submitpunchout: { method: 'PUT'}}).submitpunchout().$promise.then(
            function() {
                _then(success);
            },
            function(ex) {
                error(Error.format(ex));
            }
        );
    };

    return {
        getForm: _getForm,
        punchoutSession: _punchoutSession,
        save: _save
    }
}]);