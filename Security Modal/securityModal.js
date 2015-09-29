angular.module('OrderCloud-SecurityModal', []); 

angular.module('OrderCloud-SecurityModal')
    .directive('securitymodal', securitymodal)
    .controller('SecurityModalCtrl', SecurityModalCtrl)
;

function securitymodal() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'SecurityModalCtrl'
    };
    return directive;

    function template() {
        return [
            '<a class="btn btn-default" ng-click="open(500)">',
            '<span class="fa fa-info-circle"></span> {{\'Concerned About Security?\' | r | xlat}}',
            '</a>'
        ].join('');
    }
}

SecurityModalCtrl.$inject = ['$scope', '$modal'];
function SecurityModalCtrl($scope, $modal) {

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            size: size,
            template: securitymodalopen,
            controller: SecurityModalOpenCtrl
        });

        function securitymodalopen() {
            return [
                '<style>',
                '.modal-header {background-color:#f5f5f5;border-bottom: 1px solid #ccc; min-height: 36px; padding: 2px;}',
                '.modal-header a {margin:0;padding:0;position:absolute;top:8px;right:10px;font-size:1.5em;color:#000;}',
                '.modal-wrapper {width:100%; margin:0 auto; padding:20px;}',
                '</style>',
                '<div class="modal-header" class="col-xs-12 row pull-right">',
                '<a class="pull-right close" ng-click="close()">',
                '<i class="fa fa-times"></i>',
                '</a>',
                '</div>',
                '<div class="modal-body">',
                '<div class="modal-wrapper">',
                '<h3>This is a secure Internet commerce site.</h3>',
                '<h4>Site Security</h4>',
                '<p>',
                'We understand that security remains a primary concern of online consumers.',
                'Rest assured that this sites GeoTrust&reg; True BusinessID SSL certificate lets you know that this site is trustworthy and certified from a globally trusted certificate authority.',
                '</p>',
                '<h4>Secure Transactions</h4>',
                '<p>',
                'When a bankcard is used over the Internet, consumers want assurance that their account information is safe. That is why Visa instituted the Cardholder Information Security ' +
                'Program (CISP). Visa maintains CISP as the managing program for data security compliance endorsing the PCI Data Security Standard. The Payment Card Industry (PCI) ' +
                '<a href="//www.pcisecuritystandards.org/security_standards/pci_dss.shtml" target="_blank">Data Security Standard</a> offers a single' +
                'approach to safeguarding sensitive data for all card brands. Four51 is independently certified as a Level 2 Payment Card Industry (PCI) compliant service provider.' +
                '</p>',
                '<h4>Privacy</h4>',
                '<p>',
                'To protect our customers from unwanted personal intrusion, we will not rent or sell your personal customer information to any mail listing agency or telemarketing company.',
                '</p>',
                '</div>'
            ].join('');
        }

    };

    var SecurityModalOpenCtrl = ['$scope', '$modalInstance', '$modal', function($scope, $modalInstance) {

        $scope.close = function () {
            $modalInstance.close();
        };

    }];

}