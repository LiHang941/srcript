// ==UserScript==
// @name        工具
// @description   瀑布流排序
// @namespace    https://github.com/LiHang941/srcript/
// @version      0.01
// @author       lihang1329
// @include      https://www.javbus.com/*
// @supportURL https://github.com/LiHang941/srcript
// @grant        none
// ==/UserScript==

(function () {
  let datas = $(".masonry-brick");
  datas= Array.from(datas).sort((a,b)=>{
    let dateA = $($(a).find("date")[1]).html()
    let dateB = $($(b).find("date")[1]).html()
    return new Date(dateA).getTime() - new Date(dateA).getTime()
  })
  $("#waterfall").html('')
  $("#waterfall").html(datas)
  $('.movie-box').css("height", "500px");
  $('#waterfall').masonry({
            itemSelector: ".item",
            isAnimated: false,
            isFitWidth: true
        });
})();
