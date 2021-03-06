angular.module('OrderCloud-TermsModal', []); 

angular.module('OrderCloud-TermsModal')
    .directive('termsmodal', termsmodal)
    .controller('TermsModalCtrl', TermsModalCtrl)
;

function termsmodal() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'TermsModalCtrl'
    };
    return directive;

    function template() {
        return [
            '<span ng-if="!(user.Permissions.contains(\'HideTerms\'))">',
            '<a class="btn btn-default btn-sm" ng-click="openTerms(500)">',
            '{{\'Conditions of Use\' | xlat}}',
            '</a>',
            '</span>'
        ].join('');
    }
}

TermsModalCtrl.$inject = ['$scope', '$modal'];
function TermsModalCtrl($scope, $modal) {

    $scope.animationsEnabled = true;

    $scope.openTerms = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            size: size,
            template: termsmodalopen,
            controller: TermsModalOpenCtrl
        });

        function termsmodalopen() {
            return [
                '<style>',
                '.modal-header {background-color:#f5f5f5;border-bottom: 1px solid #ccc; min-height: 36px; padding: 2px;}',
                '.modal-header a {margin:0;padding:0;position:absolute;top:8px;right:10px;font-size:1.5em;color:#000;}',
                '.modal-wrapper {width:100%; margin:0 auto; padding:0 20px 20px 20px;}',
                '.modal-wrapper h3 {margin-bottom:10px;}',
                '.modal-wrapper li span {text-decoration:underline;}',
                '</style>',
                '<div class="modal-header">',
                '<a class="pull-right close" ng-click="closeTerms()">',
                '<i class="fa fa-times"></i>',
                '</a>',
                '</div>',
                '<div class="modal-body">',
                '<div class="modal-wrapper">',
                '<h3 class="text-primary">Terms &amp; Conditions</h3>',
                '<p><strong>THIS AGREEMENT</strong> is entered into between the following parties:</p>',
                '<p>The E-commerce Services Provider (&quot;Provider&quot;) and the Web Site User.</p>',
                '<p>WHEREAS, Web Site User is an end-user and desires to participate in Provider\'s internet-based platform for improving the operation and efficiency of materials ' +
                'distribution (&quot;Project&quot;);</p>',
                '<p>WHEREAS, Web Site User is a customer of a client of the Provider, which client is a participant in the Project (&quot;Client&quot;);</p>',
                '<p>WHEREAS, Provider has an agreement with Client to provide the e-commerce services required to implement the Project for the benefit of Web Site User;</p>',
                '<p>WHEREAS, Web Site User will be interacting with Provider during the development and operation of the Project; and</p>',
                '<p>WHEREAS, the parties desire to enter into this Agreement in order to protect the interests of all parties during the development and operation of the Project.</p>',
                '<br />',
                '<p><strong>NOW THEREFORE</strong>, in consideration of the mutual promises, covenants and conditions contained herein, it is agreed by and between the parties as follows:</p>',
                '<ol>',
                '<li><span>Definitions.</span><br />',
                '<p><strong><em>&quot;Web Site User Content&quot;</em></strong> means all data, databases, documentation, software and information which is owned by Web Site User ' +
                'at the inception of this Agreement and which is included in or necessary for use in or with the Project.</p>',
                '<p><strong><em>&quot;Web Site User Computer Hardware and Software&quot;</em></strong> means the computer software and hardware specified by Provider and which is ' +
                'to be used by Web Site User in connection with the Project.</p>',
                '<p><strong><em>&quot;Provider Work Product&quot;</em></strong> means any and all ideas, information, materials, works of authorship, software code and/or inventions ' +
                'in Provider\'s possession as of the date hereof, or which are conceived, written or created by Provider or jointly by Client, the Web Site User and Provider during the ' +
                'term of this Agreement, whether or not covered by copyright, patent, trademark, trade secret or other proprietary rights.</p>',
                '<p><strong><em>&quot;Project&quot;</em></strong> means an internet-based platform for improving the operation and efficiency of materials distribution managed and ' +
                'operated by Provider.</p>',
                '<p><strong><em>&quot;Web Site&quot;</em></strong> means the web site hosted by Provider or its designee which contains the equipment and software required to perform ' +
                'the services for the benefit of the Client and the Web Site User.</p>',
                '</li>',
                '<li><span>Ownership of Provider Work Product/Web Site User Content.</span><br />',
                '<p>Provider shall retain all right, title and interest in and to the Provider Work Product; and Web Site User shall retain all right, title and interest in and to the ' +
                'Web Site User Content.</p>',
                '</li>',
                '<li><span>Web Site User Computer Hardware and Software.</span><br />',
                '<p>Web Site User shall be responsible to provide, operate and maintain, at their own expense, all of the Web Site User Computer Hardware and Software. Web Site User ' +
                'shall also be responsible for security of the same. Upon request, Provider shall assist Web Site User in its efforts to detect or identify breaches of network security, ' +
                'but shall not be liable in any manner to the Web Site User for the failure or inability to detect or identify security breaches. </p>',
                '</li>',
                '<li><span>Disclaimers and warranties.</span><br />',
                '<p>',
                '(a) PROVIDER SHALL NOT BE LIABLE TO WEB SITE USER OR TO ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF THIS AGREEMENT, ' +
                'INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOST PROFITS, LOST SAVINGS, OR LOST DATA, OR FOR ANY DAMAGE RELATED TO THE USE OF OR INABILITY TO USE THE TECHNOLOGIES INCORPORATED ' +
                'INTO THE PROJECT EVEN IF Provider HAS BEEN ADVISED OF THE POSSIBILITY OF ANY SUCH DAMAGES.',
                '(b) OTHER THAN SET FORTH EXPRESSLY IN THIS AGREEMENT, Provider MAKES NO WARRANTIES OF ANY KIND TO WEB SITE USER AND ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, ARE HEREBY ' +
                'DISCLAIMED, INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE AND THOSE ARISING BY STATUTE OR OTHERWISE IN LAW OR ' +
                'FROM A COURSE OF DEALING OR USAGE IN THE TRADE.',
                '</p>',
                '</li>',
                '<li><span>Force Majeure.</span><br />',
                '<p>Provider shall not be in default under this Agreement by reason of any failure in its performance if such failure to perform is otherwise due to causes beyond the ' +
                'reasonable control of Provider, which may include, without limitation, the illness, disability or resignation of Provider\'s personnel or contractors, to the extent ' +
                'that such default could not be resolved by Provider with reasonable efforts.</p>',
                '</li>',
                '<li><span>Warranties by Web Site User.</span><br />',
                '<p> Web Site User warrants to Provider that (a) the Web Site User Content will not be unlawful, (b) the Web Site User Content will not contain viruses, Trojan horses, ' +
                'worms, time bombs, or any other disabling devices or code, (c) Web Site User owns or holds the right or licenses necessary to provide Web Site User Content, and third ' +
                'party software and documentation necessary to utilize Web Site User Content, and that neither the Web Site User Content nor the use of third party software shall ' +
                'infringe upon any copyright, patent right, trademark, right, publicity right, trade secret or other right of a third party. </p>',
                '</li>',
                '<li><span>Confidentiality.</span><br />',
                '<p>During the term of this Agreement, Web Site User and Provider may disclose to one another certain information including but not limited to technical or business ' +
                'knowledge, knowhow, discoveries, inventions, flow charts, algorithms, processes, software programs, hardware schematics, drawings, data bases, specifications, ' +
                'trade secrets, customer lists, or other customer information, all of which shall be considered &quot;Confidential Information&quot; under this Agreement. Web Site User and ' +
                'Provider agree to take reasonable steps to prevent the disclosure and availability of Confidential Information of the other party to third parties. They will also ' +
                'take reasonable steps to insure that their respective employees, agents and consultants do not disclose or make available to third parties Confidential Information ' +
                'of the other party. The confidentiality obligation of the parties shall survive any termination or expiration of this Agreement and shall continue for a period of ' +
                'three years thereafter. Confidential Information shall not include any information that (i) is or becomes available to the public through no fault of a recipient ' +
                'party, (ii) is lawfully received by a recipient party from a third party that is not subject to disclosure restrictions, or (iii) is independently developed by a ' +
                'recipient party without using Confidential Information. </p>',
                '</li>',
                '<li><span>Indemnity.</span><br />',
                '<p> Web Site User shall indemnify and hold harmless Provider and its employees, agents and consultants from any and all loss or liability for any and all claims, causes ' +
                'of action, suits, proceedings, losses, damages, demands, fees, expenses, fines, penalties and costs (including with limitation reasonable attorneys\' fees and expenses) ' +
                'arising from claims, actions or proceedings brought against Provider by any third party relating to the Project or the services rendered hereunder, except to the extent ' +
                'such loss is the fault of Provider.</p>',
                '</li>',
                '<li><span>Acceptable Use Policy.</span><br />',
                '<p>Web Site User shall limit its use of the Provider Web Site to the commercial purposes for which it is intended. In particular, Web Site User shall not upload, post or ' +
                'transmit to or distribute or otherwise publish through the Provider Web Site any materials which (a) restrict or inhibit any other user from using the Web Site, (b) are ' +
                'unlawful, threatening, abusive, libelous, defamatory, obscene, profane or indecent, (c) constitute or encourage conduct that would constitute a criminal offense, give ' +
                'rise to a civil liability or otherwise violate law, (d) violate, plagiarize or infringe the rights of third parties whether of a proprietary nature or otherwise, or ' +
                '(e) contain a virus or other harmful component.</p>',
                '</li>',
                '<ol>',
                '</div>'
            ].join('');
        }

    };

    var TermsModalOpenCtrl = ['$scope', '$modalInstance', '$modal', function($scope, $modalInstance) {

        $scope.closeTerms = function () {
            $modalInstance.close();
        };

    }];

}
