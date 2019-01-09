//点击保存或修改时，页面跳转至列表页，并刷新列表页
function tz_flush(delete_url,tz_url){
    var delete_href=delete_url;
    $(window.parent.document).find(".page-tabs-content a.J_menuTab").each(function(){
        if($(this).attr("data-id")==tz_url){
            $(this).addClass("active");
        }
    })
    $(window.parent.document).find("iframe.J_iframe").each(function(){

        if($(this).attr("src")==tz_url){
            $(this).css("display","block");
            $(this).contents().find("#flushButton").click();
        }
        if($(this).attr("src")==delete_href){
            $(this).remove();
        }
    })
}