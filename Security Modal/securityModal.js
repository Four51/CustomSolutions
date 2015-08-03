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

SecurityModalCtrl.$inject = ['$scope', '$modal', '$log'];
function SecurityModalCtrl($scope, $modal, $log) {

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            size: size, // this needs some figuring out
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
                'We understand that security remains a primary concern of online consumers. The VeriSign Secure Site Program allows individuals to learn more about web sites they visit' +
                ' before submitting any confidential information. Click <a href="//seal.verisign.com/splash?form_file=fdf/splash.fdf&dn=WWW.FOUR51.COM&lang=en" target="_blank">here</a> ' +
                'to view our authenticity and site status.',
                '</p>',
                '<p>',
                '<a onmousedown="return v_mDown();" tabindex="-1" href="//seal.verisign.com/splash?form_file=fdf/splash.fdf&dn=WWW.FOUR51.COM&lang=en" target="VRSN_Splash">',
                '<img oncontextmenu="return false;" ' +
                'alt="Click to Verify - This site has chosen a VeriSign SSL Certificate to improve Web site security" ' +
                'src="https://seal.verisign.com/getseal?at=0&&sealid=2&dn=WWW.FOUR51.COM&aff=VeriSignCACenter&lang=en" name="seal" border="true" />',
                '</a>',
                '<div style="display: none;"><img src="https://extended-validation-ssl.verisign.com/dot_clear.gif"></div>',
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

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };


    };

    var SecurityModalOpenCtrl = ['$scope', '$modalInstance', '$modal', function($scope, $modalInstance, $modal) {

        $scope.close = function () {
            $modalInstance.close();
        };

    }];

}