angular.module('OrderCloud-ProductZoom', []);  

angular.module('OrderCloud-ProductZoom')
    .directive('productzoom', productzoom)
;

function productzoom() {
    return {
        restrict: 'E',
        scope: {
            lineitem: "="
        },
        template:
            '<style>' +
            '.jetzoom-lens{ border:none;width:80%;height:80%;border-radius:20px;box-shadow:0 0 10px rgba(0,0,0,.4);cursor:none }' +
            '.jetzoom-blank{ background-color:rgba(0,0,0,.01);) }' +
            '.jetzoom-container img:not(.jetzoom){ display:inline-block;cursor:pointer }' +
            '.jetzoom{ margin:0 auto }' +
            '</style>'+
            '<div>'+
            '<img class="jetzoom img-responsive" imageonload/>'+
            '</div>',
        link: function($scope) {
            $scope.$watch('lineitem', function(lineitem){
                if(lineitem.Product) {
                    var options = {
                        tintColor: lineitem.Product.StaticSpecGroups.ProductZoom.Specs.tintClr.Value,
                        tintOpacity: lineitem.Product.StaticSpecGroups.ProductZoom.Specs.tintOpcty.Value,
                        fadeTime: lineitem.Product.StaticSpecGroups.ProductZoom.Specs.fadeTm.Value,
                        lensClass: "jetzoom-lens",
                        lensProportions: "",
                        lensAutoCircle: lineitem.Product.StaticSpecGroups.ProductZoom.Specs.autoCircle,
                        innerZoom: lineitem.Product.StaticSpecGroups.ProductZoom.Specs.iZoom
                    };
                    var jetZoomInstance = new JetZoom($('.jetzoom'), options);
                    if(lineitem.Variant){
                        if(lineitem.Specs.Variation){
                            var staticSpec = lineitem.Specs.Variation.Value;
                            var smallImageobj = lineitem['Product']['StaticSpecGroups']['Variation']['Specs'][staticSpec]['FileURL'];
                            jetZoomInstance.loadImage(smallImageobj, lineitem.Variant.PreviewUrl || lineitem.Variant.LargeImageUrl);
                        }
                    }
                    else{
                        jetZoomInstance.loadImage(lineitem.Product.SmallImageUrl, lineitem.Product.LargeImageUrl);
                    }
                };
            }, true);

            $scope.$watch('lineitem.Variant', function(variant){
                if(!variant) return;
                var options = {
                    tintColor: $scope.lineitem.Product.StaticSpecGroups.ProductZoom.Specs.tintClr.Value,
                    tintOpacity: $scope.lineitem.Product.StaticSpecGroups.ProductZoom.Specs.tintOpcty.Value,
                    fadeTime: $scope.lineitem.Product.StaticSpecGroups.ProductZoom.Specs.fadeTm.Value,
                    lensClass: "jetzoom-lens",
                    lensProportions: "",
                    lensAutoCircle: $scope.lineitem.Product.StaticSpecGroups.ProductZoom.Specs.autoCircle,
                    innerZoom: $scope.lineitem.Product.StaticSpecGroups.ProductZoom.Specs.iZoom
                };
                var imageURL = variant.PreviewUrl ? variant.PreviewUrl : variant.LargeImageUrl;
                var jetZoomInstance = new JetZoom($('.jetzoom'), options);
                jetZoomInstance.loadImage(imageURL, imageURL);
            }, true);

            // Plugin Code:
            /*
             Jet Zoom Application License (JZ01-APP).
             Version 1.1 rev 1406062037
             Please purchase an appropriate license to use this software.
             License Agreement: www.starplugins.com/license
             Copyright (c)2012-2014 Star Plugins - www.starplugins.com
             Downloaded on Aug 05, 2014 by account #2953
             License Key: 43c704c0c063be3b354a1b1ab8d07e2d
             Licensed website(s): four51ordercloud.com
             */
            (new window['\x46\x75\x6E\x63\x74\x69\x6F\x6E'](['e.fn.JetZoom.attr=\"data-jetzoom\";e.fn.JetZoom.defaults={image:\"\",zoomImage:\"\",tintColor:\"#fff\",tintOpacity:0.5,fadeTime:750,lensClass:\"jetzoom-lens\",lensProportions:\"width\",lensAutoCircle:!1,innerZoom:!1,galleryEvent:\"click\"};c.I();window.JetZoom=c})(jQuery);',
                'e(this).bind(f.options.galleryEvent,function(){var a=e(this).parent();a.is(\"a\")&&(b.zoomImage=a.attr(\"href\"));d=\"mouseover\"===b.galleryEvent?200:1;clearTimeout(f.u);f.u=setTimeout(function(){f.k(b.image,b.zoomImage)},d);return!1})}else e(this).data(\"JetZoom\",new c(e(this),a))})};',
                'if(e(this).hasClass(\"jetzoom-gallery\")){var b=c.v(e(this),e.fn.JetZoom.attr),f=e(b.useZoom).data(\"JetZoom\");f.options=e.extend({},f.options,b);var g=e(this).parent(),h=f.options.zoomImage;g.is(\"a\")&&(h=g.attr(\"href\"));f.d.push({href:h,title:e(this).attr(\"title\")});',
                '+$\'));if(5!=s.length){var d=f(\"0v~ga!$ye||hxprk{.bmn\\\"\");h=a(d)}else h=!1,c.L();this._=\"-^g{ub(u{`d\\\")vhyo}sotf-gjk\\\']zoy6?7:#1^zwpxd}#.(*.+c1a326db;k9>8l?m!pp+p%!r*}:_}i{%Ate#40*\\\':9;?,\"};c.K=function(a){e.fn.JetZoom.attr=a};c.setAttr=c.K;e.fn.JetZoom=function(a){return this.each(function(){var d;',
                'var a=new q(\"a\",f(\'(ao\\\"|ecj`g?~|wtb~ww4knrjpcnn>9\\\'`ndl0)%k{ec|3rtzd}\\\"lzn=}\\\"eoal``SUAJef|b`j~e:d}{rxo7vt|jvoo,kkvriido\\\"7l3n>bb}a>54;3 zrl7v`p#f86<j5k%`h`hdy)q?>?~~1y&!|E}]}~`*vse{}xbbj&l>}w}sa~:0xAyA3rznfvk/4/.547)\\\"/%nKsOoh8\\\'6%$y5uszzxNd+&+$,iRhV\\\'/ -9mn#)(+t6ptyeQy(`YaY.$)* #yiy{}~0#(fpbbjw;',
                'c.l=function(a,c){this.x=a;this.y=c};c.point=c.l;c.J=function(){e(function(){e(\".jetzoom\").JetZoom();e(\".jetzoom-gallery\").JetZoom()})};c.quickStart=c.J;c.version=\"1.1 rev 1406062037\";c.L=function(){r=!0};c.I=function(){c.browser={};c.browser.webkit=/webkit/.test(navigator.userAgent.toLowerCase());',
                'if(\"string\"==typeof c){var c=e.trim(c),g=c.indexOf(\"{\"),f=c.indexOf(\"}\");f!=c.length-1&&(f=c.indexOf(\"};\"));if(-1!=g&&-1!=f){c=c.substr(g,f-g+1);try{b=e.parseJSON(c)}catch(h){console.error(\"Invalid JSON in \"+d+\" attribute:\"+c)}}else b=(new q(\"return {\"+c+\"}\"))()}return b};',
                'isNaN(b)&&(b=0);this.h.css({left:a.x-this.q/2-b,top:a.y-this.i/2-b});b=a.x/this.g*this.D;c=a.y/this.f*this.C;b-=this.q/2;c-=this.i/2;b=Math.floor(-b);c=Math.floor(-c);this.h.css(\"backgroundPosition\",\"\"+(b+\"px \")+\"\"+(c+\"px\"))};c.v=function(a,d){var b=null,c=a.attr(d);',
                'this.a.trigger(\"click\",[a]);var d=this;setTimeout(function(){d.t()},1)};c.prototype.j=function(a,d){this.options.innerZoom&&(d=0);var b,c;a.y-=d;a.x-=0;a.x>this.g?a.x=this.g:0>a.x&&(a.x=0);a.y>this.f?a.y=this.f:0>a.y&&(a.y=0);b=parseInt(this.h.css(\"borderTopWidth\"),10);',
                '</s>\');d[f(\"#`wv)\")](e[f(\"4dtdd}SITR5\")](g));d[f(\")hz{icj[[\")](c)}};c.prototype.t=function(){var a=this;a.a.bind(\"mouseover\",function(d){if(null==a.b){a.p();var b=a.b.offset();a.j(new c.l(d.pageX-b.left,d.pageY-b.top),0)}})};c.prototype.B=function(a){this.a.unbind(\"mouseover\");',
                'd[f(\"!ug{p%\")](g);g=f(\'&}%xfybxdaa2+0rvfy{mm90?rzfu 9&46wp+&)nbz{|0)6$&g`;69jtmvbhnjp|$=*cxeobj2=0w}ff{y`8!>rpcj /&fikg{(1..hiv3>1`pnc5jrzxri=:#llj`$+*oeex hn}x~j6/4dywi6oxlvf#.!bjhs%zcqi/4-!!bk694qwwn6kxwxhu 9&gikl+&)|ljkyu1.7$g`;69~rl{es 9&4v(zegei.,$!\\\"187tv{r}ishp{-bmokw$=**n;',
                'a.options.lensAutoCircle&&a.h.css(\"border-radius\",b.width());a.q=b.width();a.i=b.height();b.fadeIn(a.options.fadeTime);a.b.bind(\"click\",function(b){a.B(b)});if(h||l){d=e(f(\"-1jff/.<p|`)I\"));var g;l&&(g=f(\"#Iaq&]gfg+$Y\\\\FQ];3<v?dlxhkphyvnr,`kh2\"));h&&(g=f(\"$Qkjnkldxii.Eue2I{z{7o|xhui{E\"));',
                'c.height(a.f);c.offset(a.a.offset());e(\"body\").append(c);c.append(d);c.append(b);a.options.innerZoom&&(b.width(3*a.a.width()),b.height(3*a.a.height()),b.css(\"border\",\"none\"));\"width\"==a.options.lensProportions&&b.height(b.width());\"height\"==a.options.lensProportions&&b.width(b.height());',
                'a.b=e(\"<div class = \'jetzoom-blank\' style=\'position:absolute;overflow:hidden;\'/>\");var c=a.b;d=e(\"<div style=\'background-color:\"+a.options.tintColor+\";width:100%;height:100%;\'/>\");d.css(\"opacity\",a.options.tintOpacity);d.fadeIn(a.options.fadeTime);c.width(a.g);',
                'c.prototype.p=function(){5==s.length&&!1==r&&(h=!0);var a=this;a.g=a.a.width();a.f=a.a.height();var d;a.h=e(\"<div class=\'\"+a.options.lensClass+\"\' style=\'background-repeat:no-repeat;display:none;position:absolute;top:0px;left:0px;\'/>\");var b=a.h;b.css(\"background-image\",\"url(\"+this.m+\")\");',
                'null==a.b?a.B(d):(a.b.remove(),a.b=null);break;case \"touchstart\":clearInterval(a.interval);a.interval=setTimeout(function(){a.p();a.j(e,a.i/2)},150);break;case \"touchmove\":null==a.b&&(clearInterval(a.interval),a.p()),a.j(e,a.i/2)}return!1})),a.a.trigger(\"jetzoom_ready\"))};',
                '0>d.x||d.x>a.g||0>d.y||d.y>a.f?(a.b.remove(),a.b=null):a.j(d,0)}}),a.t(),a.a.bind(\"touchmove touchend touchstart\",function(d){var b=a.a.offset(),e;if(\"touchend\"!=d.type){var g=d.originalEvent.touches[0];e=new c.l(g.pageX-b.left,g.pageY-b.top)}switch(d.type){case \"touchend\":clearInterval(a.interval);',
                'c.prototype.destroy=c.prototype.G;c.prototype.w=function(){var a=this;a.r&&a.o&&(this.A(),a.g=a.a.outerWidth(),a.f=a.a.outerHeight(),a.n||(a.n=!0,e(document).bind(\"mousemove.\"+this.id,function(d){if(null!=a.b){var b=a.b.offset();d=new c.l(d.pageX-Math.floor(b.left),d.pageY-Math.floor(b.top));',
                'b++);for(d=0;d<this.d.length;d++)a[d]=this.d[b],b++,b>=this.d.length&&(b=0);return a};c.prototype.getGalleryList=c.prototype.H;c.prototype.G=function(){e(document).unbind(\"mousemove.\"+this.id);this.a.unbind();null!=this.b&&(this.b.unbind(),this.b.remove());this.a.removeData(\"JetZoom\")};',
                'c.prototype.apiTest=c.prototype.F;c.prototype.H=function(a){var d=this.m.replace(/^\\/|\\/$/g,\"\");if(0==this.d.length)return{href:this.options.zoomImage,title:this.a.attr(\"title\")};if(void 0!=a)return this.d;a=[];for(var b=0;b<this.d.length&&this.d[b].href.replace(/^\\/|\\/$/g,\"\")!=d;',
                'n(c,this.m,function(){b.r=!0;b.D=c[0].width;b.C=c[0].height;b.w()});var g=e(new Image);n(g,a,function(){b.a.attr(\"src\",g.attr(\"src\"));b.o=!0;null!=b.c&&b.c.fadeOut(b.options.fadeTime,function(){e(this).remove()});b.w()})};c.prototype.loadImage=c.prototype.k;c.prototype.F=function(){alert(\"Jet Zoom API OK\")};',
                'b.e.offset({left:a,top:d})},1E3);this.m=\"\"!=d&&void 0!=d?d:a;this.o=this.r=!1;var c=e(new Image);b.n&&(b.c=e(new Image).css({position:\"absolute\"}),b.c.attr(\"src\",b.a.attr(\"src\")),b.c.width(b.a.width()),b.c.height(b.a.height()),b.c.offset(b.a.offset()),b.c.addClass(\"jetzoom-fade-\"+b.id),e(\"body\").append(b.c));',
                'this.A();b.s=setTimeout(function(){b.e=e(\"<div class =\'jetzoom-ajax-loader\' style=\'position:absolute;left:0px;top:0px\' />\");e(\"body\").append(b.e);var a=b.e.width(),d=b.e.height(),a=b.a.offset().left+b.a.width()/2-a/2,d=b.a.offset().top+b.a.height()/2-d/2;',
                'var q=window[f(\")Oeoyg`~&\")],h=!0,r=!1,s=f(\"#JWDVW]\"),l=f(\"(X\\\\XHDL]JT?\"),l=9>l.length?!0:!1;c.id=0;c.prototype.A=function(){clearTimeout(this.s);null!=this.e&&this.e.remove()};c.prototype.k=function(a,d){var b=this;e(\"body\").children(\".jetzoom-fade-\"+b.id).remove();',
                'e<a.length-1;e++)b=a[m](e),b^=c&31,c++,d+=String[p(\"\\x66\\x72\\x6F\\x6D\\x43\\x68\\x61\\x72\\x43\\x6F\\x64\\x65\")](b);a[m](e);return d}function p(a){return a;}var k=document.getElementsByTagName(\"script\");k[k.length-1].src.slice(0,k[k.length-1].src.lastIndexOf(\"/\"));',
                'this.a=a;this.C=this.D=this.g=this.f=0;this.h=null;this.i=this.q=0;this.b=null;this.m=\"\";this.o=this.r=this.n=!1;this.c=null;this.id=++c.id;this.d=[];this.interval=0;this.e=null;this.u=this.s=0;\"\"!=d.image?this.k(d.image,d.zoomImage):this.k(\"\"+a.attr(\"src\"),d.zoomImage)}function f(a){for(var d=\"\",b,m=p(\"\\x63\\x68\\x61\\x72\\x43\\x6F\\x64\\x65\\x41\\x74\"),c=a[m](0)-32,e=1;',
                'return!1});a.attr(\"src\",d);a[0].complete&&a.trigger(\"load\")}function c(a,d){d=e.extend({},e.fn.JetZoom.defaults,d);var b=c.v(a,e.fn.JetZoom.attr);d=e.extend({},d,b);b=e(this).parent();b.is(\"a\")&&(d.zoomImage=b.attr(\"href\"),b.removeAttr(\"href\"));this.options=d;',
                //'(function(e){function n(a,d,b){a.bind(\"error\",function(){console.log(\"error loading image src\")});c.browser.webkit&&a.attr(\"src\",\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==\");a.bind(\"load\",function(){a.unbind(\"load\");b(a);']['\x72\x65\x76\x65\x72\x73\x65']()['\x6A\x6F\x69\x6E']('')))();
                '(function(e){function n(a,d,b){a.bind(\"error\",function(){console.log(\"\")});c.browser.webkit&&a.attr(\"src\",\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==\");a.bind(\"load\",function(){a.unbind(\"load\");b(a);']['\x72\x65\x76\x65\x72\x73\x65']()['\x6A\x6F\x69\x6E']('')))();
        }
    };
}
