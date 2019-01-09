//    点击图片地址预览图片
function yl_Img(url){
    var str='<div class="bootbox modal fade in" tabindex="-1" role="dialog" style="display: block;    margin: 0 auto; padding-right: 6px;width: 550px;box-sizing: border-box;"><div style="width: 100%;box-sizing: border-box;" class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true" onclick="close_dialog()">×</button><h4 class="modal-title">图片预览</h4></div><div class="modal-body"><div class="bootbox-body" style="text-align: center;"><img style="max-width: 100%;max-height: 100%;" src="'+url+'" alt=" "/></div></div><div class="modal-footer"><button data-bb-handler="success" type="button" class="btn btn-primary btn-alt" onclick="close_dialog()">确定</button></div></div></div></div>';
    // var str='<div class="bootbox modal fade in" tabindex="-1" role="dialog" style="display: block; padding-right: 6px;"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true" onclick="close_dialog()">×</button><h4 class="modal-title">图片预览</h4></div><div class="modal-body"><div class="bootbox-body" style="text-align: center;"><img src="'+basePath+'images/icon10.png" alt=" "/></div></div><div class="modal-footer"><button data-bb-handler="success" type="button" class="btn btn-primary btn-alt" onclick="close_dialog()">确定</button></div></div></div></div>';
    $("body").append(str);
}

function close_dialog(){
    $(".bootbox").remove();
}