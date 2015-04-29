angular.module('OrderCloud-BackToTop', []);
angular.module('OrderCloud-BackToTop')
    .directive('backtotop', backtotop)
;

function backtotop() {
    return {
        restrict: 'E',
        scope: {
            offsetbottom: '@',
            offsetright: '@',
            duration: '@',
            hovertext: '@'
        },
        template: template,
        link: function (scope) {
            $(document).ready(function () {
                var duration = scope.duration || 800;
                var offsetRight = scope.offsetright || 40;
                var offsetBottom = scope.offsetbottom || 40;

                scope.myStyles = {
                    position: "fixed",
                    display: "none",
                    bottom: offsetBottom + "px",
                    right: offsetRight + "px"
                }

                //Check to see if the window is top if not then display button
                $(window).scroll(function () {
                    if ($(this).scrollTop() > 100) {
                        $('.scrollToTop').fadeIn();
                    } else {
                        $('.scrollToTop').fadeOut();
                    }
                });

                //Click event to scroll to top
                $('.scrollToTop').click(function () {
                    $('html, body').animate({scrollTop: 0}, duration);
                    return false;
                });

            });
        }
    };

    function template() {
        return [
            '<style> .scrollToTop {display:none; text-decoration: none;} </style>',
            '<a href="#" title="{{hovertext}}" ng-style="myStyles" class="scrollToTop"><i class="fa fa-arrow-circle-up fa-3x text-info"></i></a>'
        ].join('');
    }
}
