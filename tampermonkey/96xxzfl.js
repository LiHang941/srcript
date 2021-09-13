// ==UserScript==
// @name        宅福利去除广告自动加载下一页图片
// @description  宅福利去除广告自动加载下一页图片.更多功能欢迎提交issues
// @namespace    https://github.com/LiHang941/srcript/
// @version      0.67
// @author       lihang1329@gmail.com
// @include      https://v.96mxx.com*
// @supportURL https://github.com/LiHang941/srcript
// @require https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    $(function(){
        document.onclick= function(){};
         if(!/https:\/\/v.96mxx.com\/.+\/\d+\.html(.*?)/.test(window.location.href)){
            return;
        }

        $(".pagination-multi li a").each(function(){
            if($(this).html()=="下一页"){
                next($(this).attr('href'));
            }
        });

        $(window).keydown(function(event){
            var y = window.screen.availHeight;
            if(event.keyCode === 37 ){
                y = $(window).scrollTop() - y;
            }else if(event.keyCode === 39){
                y = $(window).scrollTop() + y;
            } else {return;}
            $("html,body").scrollTop(y);
        });


       $(".article-content").css({
             'column-count':5,
              'column-width':'240px',
              'column-gap':' 20px'
         })
        $(".container").css({ 'width': "100%" });
        $(".container").css({ 'max-width': "100%" });
        $(".content").css({ 'margin': "0 auto" })

        $(".sidebar").remove()
        $(".pagination ").remove()
        $(".article-tags").remove()
        $(".relates").remove()


        $(".article-content blockquote").remove()
        $(".article-content >p>:not(img)").parent().remove()

    });

    function next(url){
       console.log(url);
        $.get(url,function(res){
            var nextReg = /<li class='next-page'><a href='(.+)'>(.+)<\/a><\/li>/g;
            var reg =/<img.+src="(.+)"\s+\/>\s*<\/p>/g;
            var match = reg.exec(res);
            while (match != null) {
                $(".article-content p").last().after('<p><img src="'+match[1]+'"></p>');
                match =  reg.exec(res);
            }

            match = nextReg.exec(res);
            if(match != null) {
                next(match[1]);
            }
        },"text");
    }
})();
