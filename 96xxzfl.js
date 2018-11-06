// ==UserScript==
// @name         96xxzfl.com宅福利自动下一页
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       lihang1329@gmail.com
// @include      *https://96xxzfl.com*
// @supportURL https://github.com/LiHang941/tampermonkey_srcript
// @require https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    if(!/https:\/\/96xxzfl.com\/.+\/\d+\.html(.*?)/.test(window.location.href)){
        return;
    }

    $(function(){
        $(".pagination-multi li a").each(function(){
            if($(this).html()=="下一页"){
                next($(this).attr('href'));
            }
        });

        var flag = false;
        $(window).keydown(function(event){
            var y = window.screen.availHeight;
            if(event.keyCode === 37 ){
                y = $(window).scrollTop() - y;
            }else if(event.keyCode === 39){
                y = $(window).scrollTop() + y;
            } else {return;}
            $("html,body").scrollTop(y);
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
                console.log(match[2]);
                match =  reg.exec(res);
            }
            match = nextReg.exec(res);
            if(match != null) {
                next(match[1]);
            }
        },"text");
    }
})();
