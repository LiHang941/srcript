// ==UserScript==
// @name         96xxzfl.com宅福利自动加载下一页,放大,左右键快速滚动
// @description  96xxzfl.com宅福利自动加载下一页,放大,左右键快速滚动.更多功能欢迎提交issues
// @namespace    https://github.com/LiHang941/srcript/
// @version      0.63
// @description  try to take over the world!
// @author       lihang1329@gmail.com
// @include      *https://96vxx.net*
// @supportURL https://github.com/LiHang941/srcript
// @require https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    
    
    

    $(function(){
         if(!/https:\/\/96vxx.net\/.+\/\d+\.html(.*?)/.test(window.location.href)){
            return;
        }
        document.onclick= function(){};
        var ddpowerzoomer={
            dsetting: {defaultpower:2, powerrange:[2,2], magnifiersize:[500, 500]},
            mousewheelevt: (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel", //FF doesn't recognize mousewheel as of FF3.x
            $magnifier: {outer:null, inner:null, image:null},
            activeimage: null,

            movemagnifier:function(e, moveBol, zoomdir){
                var activeimage=ddpowerzoomer.activeimage //get image mouse is currently over
                var activeimginfo=activeimage.info
                var coords=activeimginfo.coords //get offset coordinates of image relative to upper left corner of page
                var $magnifier=ddpowerzoomer.$magnifier
                var magdimensions=activeimginfo.magdimensions //get dimensions of magnifier
                var power=activeimginfo.power.current
                var powerrange=activeimginfo.power.range
                var x=e.pageX-coords.left //get x coords of mouse within image (where top corner of image is 0)
                var y=e.pageY-coords.top
                if (moveBol==true){
                    if (e.pageX>=coords.left && e.pageX<=coords.right && e.pageY>=coords.top && e.pageY<=coords.bottom)  //if mouse is within currently within boundaries of active base image
                        $magnifier.outer.css({left:e.pageX-magdimensions[0]/2, top:e.pageY-magdimensions[1]/2})	//move magnifier so it follows the cursor
                    else{ //if mouse is outside base image
                        ddpowerzoomer.activeimage=null
                        $magnifier.outer.hide() //hide magnifier
                    }
                }
                else if (zoomdir){ //if zoom in
                    var od=activeimginfo.dimensions //get dimensions of image
                    var newpower=(zoomdir=="in")? Math.min(power+1, powerrange[1]) : Math.max(power-1, powerrange[0]) //get new power from zooming in or out
                    var nd=[od[0]*newpower, od[1]*newpower] //calculate dimensions of new enlarged image within magnifier
                    $magnifier.image.css({width:nd[0], height:nd[1]})
                    activeimginfo.power.current=newpower //set current power to new power after magnification
                }
                power=activeimginfo.power.current //get current power
                var newx=-x*power+magdimensions[0]/2 //calculate x coord to move enlarged image
                var newy=-y*power+magdimensions[1]/2
                $magnifier.inner.css({left:newx, top:newy}) //move image wrapper within magnifier so the correct image area is shown
            },

            setupimage:function($, imgref, options){
                var s=jQuery.extend({}, ddpowerzoomer.dsetting, options)
                var $imgref=$(imgref)
                imgref.info={ //create object to remember various info regarding image
                    power: {current:s.defaultpower, range:s.powerrange},
                    magdimensions: s.magnifiersize,
                    dimensions: [$imgref.width(), $imgref.height()],
                    coords: null
                }
                $imgref.unbind('mouseenter').mouseenter(function(e){ //mouseenter event over base image
                    var $magnifier=ddpowerzoomer.$magnifier
                    $magnifier.outer.css({width:s.magnifiersize[0], height:s.magnifiersize[1]}) //set magnifier's size
                    var offset=$imgref.offset() //get image offset from document
                    var power=imgref.info.power.current
                    $magnifier.inner.html('<img src="'+$imgref.attr('src')+'"/>') //get base image's src and create new image inside magnifier based on it
                    $magnifier.image=$magnifier.outer.find('img:first')
                        .css({width:imgref.info.dimensions[0]*power, height:imgref.info.dimensions[1]*power}) //set size of enlarged image
                    var coords={left:offset.left, top:offset.top, right:offset.left+imgref.info.dimensions[0], bottom:offset.top+imgref.info.dimensions[1]}
                    imgref.info.coords=coords //remember left, right, and bottom right coordinates of image relative to doc
                    $magnifier.outer.show()
                    ddpowerzoomer.activeimage=imgref
                })
            },


            init:function($){
                var $magnifier=$('<div style="position:absolute;width:100px;height:100px;display:none;overflow:hidden;border:1px solid black;" />')
                .append('<div style="position:relative;left:0;top:0;" />')
                .appendTo(document.body) //create magnifier container and add to doc
                ddpowerzoomer.$magnifier={outer:$magnifier, inner:$magnifier.find('div:eq(0)'), image:null} //reference and remember various parts of magnifier
                $magnifier=ddpowerzoomer.$magnifier
                $(document).unbind('mousemove.trackmagnifier').bind('mousemove.trackmagnifier', function(e){ //bind mousemove event to doc
                    if (ddpowerzoomer.activeimage){ //if mouse is currently over a magnifying image
                        ddpowerzoomer.movemagnifier(e, true) //move magnifier
                    }
                });

            }
        } //ddpowerzoomer

        jQuery.fn.addpowerzoom=function(options){
            var $=jQuery
            return this.each(function(){ //return jQuery obj
                if (this.tagName!="IMG")
                    return true //skip to next matched element
                var $imgref=$(this)
                if (this.offsetWidth>0 && this.offsetHeight>0) //if image has explicit CSS width/height defined
                    ddpowerzoomer.setupimage($, this, options)
                else if (this.complete){ //account for IE not firing image.onload
                    ddpowerzoomer.setupimage($, this, options)
                }
                else{
                    $imgref.bind('load', function(){
                        ddpowerzoomer.setupimage($, this, options)
                    })
                }
            })
        };

        ddpowerzoomer.init($);
        $(".pagination-multi li a").each(function(){
            if($(this).html()=="下一页"){
                next($(this).attr('href'));
            }
        });
        $(".article-content").find('img').addpowerzoom({magnifiersize:[500,500],powerrange:[3,3]});
        $(window).keydown(function(event){
            var y = window.screen.availHeight;
            if(event.keyCode === 37 ){
                y = $(window).scrollTop() - y;
            }else if(event.keyCode === 39){
                y = $(window).scrollTop() + y;
            } else {return;}
            $("html,body").scrollTop(y);
        });
        $(document).scroll(function(){
            var top=$(document).scrollTop();
            if(top > 100){
                $('.header').fadeOut(100);
            } else{
                $('.header').fadeIn(100);
            }
        });
        $(document).mousemove(function(e) {
            var top = e.originalEvent.y || e.originalEvent.layerY || 0;
            if(top > 100){
                $('.header').fadeOut(100);
            } else{
                $('.header').fadeIn(100);
            }
        });

    });

    function next(url){
       console.log(url);
        $.get(url,function(res){
            var nextReg = /<li class='next-page'><a href='(.+)'>(.+)<\/a><\/li>/g;
            var reg =/<img.+src="(.+)"\s+\/>\s*<\/p>/g;
            var match = reg.exec(res);
            while (match != null) {
                $(".article-content p").last().after('<p><img src="'+match[1]+'"></p>');
                $(".article-content").find('img').last().addpowerzoom({magnifiersize:[500,500],powerrange:[3,3]});
                //console.log(match[2]);
                match =  reg.exec(res);
            }

            match = nextReg.exec(res);
            if(match != null) {
                next(match[1]);
            }
        },"text");
    }
})();
