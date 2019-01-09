//默认加载，函数名称不能改变
var _tableInit = function (config,containerId,icheck02) {//icheck02是区分iframe加载后复选框触发事件的问题
    if(config.url!==undefined){
        config.url=basePath + config.url;
    }

    if(containerId){

        $("#"+containerId).find('#datatable').YDataTable(config);
    }else{
        $('#datatable').YDataTable(config,icheck02);
    }
}

var myLoad = function(){
    var serverConfig = {};
    /**
     * 管理服务配置
     * 调用:$.manageServer();
     */
    $.extend({
        manageServer:function(config){
            if(config===undefined){
                return serverConfig;
            }
            var defaultConfig = {
                areaAdd:['600px','500px'],
                areaUpdate:['600px','500px']
            };
            config = $.extend({}, defaultConfig, config);

            if(config.addUrl!==undefined){config.addUrl = basePath+config.addUrl;}
            if(config.toAddUrl!==undefined){config.toAddUrl = basePath+config.toAddUrl;}
            if(config.updateUrl!==undefined){config.updateUrl = basePath+config.updateUrl;}
            if(config.toUpdateUrl!==undefined){config.toUpdateUrl = basePath+config.toUpdateUrl;}
            if(config.deleteUrl!==undefined){config.deleteUrl = basePath+config.deleteUrl;}
            if(config.deleteMoreUrl!==undefined){config.deleteMoreUrl = basePath+config.deleteMoreUrl;}
            if(config.addTitle===undefined){config.addTitle = '添加'+config.title;}
            if(config.updateTitle===undefined){config.updateTitle = '修改'+config.title;}
            if(config.detaildeTitle===undefined){config.detaildeTitle = config.title+'详情';}
            if(config.sqshUrl!==undefined){config.sqshUrl = basePath+config.sqshUrl;}
            if(config.resetPasswordUrl!==undefined){config.resetPasswordUrl = basePath+config.resetPasswordUrl;}
            if(config.dateLimitedUrl!==undefined){config.dateLimitedUrl = basePath+config.dateLimitedUrl;}
            serverConfig = config;
            return config;
        }
    });
}
myLoad();

var _showModalObj = function(operType,key) {
}

var _resetPassword = function (data) {

    swal({
            title: "您确定要重置用户密码吗？",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            cancelButtonText: "待我犹豫一会...",
            confirmButtonText: "是的，我要重置！",
            closeOnConfirm: false
        },
        function(){
            $.ajax({
                type:'post',
                url:$.manageServer().resetPasswordUrl,
                data:data,
                dataType:'json',
                success:function(data){
                    if(data.code=='1'){
                        swal("重置用户密码成功！", "", "success");
                        $('#datatable').YDataTable('reload');
                    }else{
                        swal("重置用户密码失败！", "", "error");
                    }
                }
            });
        });
}

var _sqsh = function (data) {
    swal({
            title: "您确定要提交申请吗？",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            cancelButtonText: "取消申请",
            confirmButtonText: "是的，我要申请！",
            closeOnConfirm: false
        },
        function(){
            $.ajax({
                type:'post',
                url:$.manageServer().sqshUrl,
                data:data,
                dataType:'json',
                success:function(data){
                    if(data.code=='1'){
                        swal("申请审核成功！", data.message, "success");
                        if($("#sqsh_button").length>0){//申请审核完成后隐藏申请审核按钮
                            $("#sqsh_button").attr("style","display: none;");
                        }
                        $('#datatable').YDataTable('reload');
                    }else{
                        swal("申请审核失败！", data.message, "error");
                    }
                }
            });
        });
}



var _delete = function (data) {
    swal({
            title: "您确定要删除这条信息吗？",
            text: "删除后将无法恢复，请谨慎操作。",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            cancelButtonText: "待我犹豫一会...",
            confirmButtonText: "是的，我要删除！",
            closeOnConfirm: false
        },
        function(){
            $.ajax({
                type:'post',
                url:$.manageServer().deleteUrl,
                data:data,
                async: false,
                dataType:'json',
                success:function(data){
                    if(data.code=='1'){
                        //确保点击提示框的‘OK’按钮才执行
                        swal({
                            title: "删除成功!",
                            text: data.message,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#A7D5EA",
                            closeOnConfirm: true
                        }, function () {
                            $('#datatable').YDataTable('reload');
                            //添加局部树的刷新--宋涛20170116
                            var xzids =	window.parent.xzID;
                            if(xzids){
                                xzid = xzids.replace(new RegExp("@", "g"), "\\@");
                                var idss = parent.$("#"+xzid);
                                idss.jstree('refresh');
                            }
                        });

                    }else{
                        swal("删除失败！", data.message, "error");
                    }
                }
            });
        });


}

var _deleteMore = function (ids) {
    if(ids!==undefined && ids!==null && ids!==''){
        swal({
                title: "您确定要删除勾选的所有信息吗？",
                text: "删除后将无法恢复，请谨慎操作。",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                cancelButtonText: "待我犹豫一会...",
                confirmButtonText: "是的，我要删除！",
                closeOnConfirm: false
            },
            function(){
                $.ajax({
                    type:'post',
                    url:$.manageServer().deleteMoreUrl,
                    data:{idList:ids},
                    dataType:'json',
                    success:function(data){
                        if(data.code=='1'){
                            //确保点击提示框的‘OK’按钮才执行
                            swal({
                                title: "删除成功!",
                                text: data.message,
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#A7D5EA",
                                closeOnConfirm: true
                            }, function () {
                                $('#datatable').YDataTable('reload');
                                //添加局部树的刷新--宋涛20170116
                                var xzids =	window.parent.xzID;
                                if(xzids){
                                    xzid = xzids.replace(new RegExp("@", "g"), "\\@");
                                    var idss = parent.$("#"+xzid);
                                    idss.jstree('refresh');
                                }
                            });
                        }else{
                            swal("删除失败！", data.message, "error");
                        }
                    }
                });
            });
    }else{
        swal("操作错误！", "请至少勾选一条信息进行删除。", "error");
    }


}

//自动生成的form表单模式  系统管理审核2017.4.5

var _updateFunctionsh = function () {
    //console.log('##########'+dourl);
    $.ajax({
        type:'post',
        async: false,
        url:dourl,
        data:$("#registrationForm").serialize(),
        dataType:'json',
        success:function(data){
            if(data.code=='1'){
                if(dourl.indexOf("xqjgsh_shXqjg.do")>0){   //学前机构审核单独处理
                    swal("审核成功！", data.message, "success");
                }else{
                    swal("保存成功！", data.message, "success");
                }
                $('#datatable').YDataTable('reload');
            }else{
                swal("保存失败！", data.message, "error");
            }
            dialogbj=data.code;
        }
    });
}

//自动生成的form表单模式
var dialogbj;
var _updateFunction = function () {
    //console.log('##########'+dourl);
    $.ajax({
        type:'post',
        async: false,
        url:$.manageServer().updateUrl,
        data:$("#registrationForm").serialize(),
        dataType:'json',
        success:function(data){
            if(data.code=='1'){
                if($.manageServer().updateUrl.indexOf("xqjgsh_shXqjg.do")>0){   //学前机构审核单独处理
                    swal("审核成功！", data.message, "success");
                }else{
                    swal("保存成功！", data.message, "success");
                    if($("#sqsh_button").length>0){//申请审核完成后隐藏申请审核按钮
                        $("#sqsh_button").removeAttr("style");

                    }
                }
                $('#datatable').YDataTable('reload');
            }else{
                swal("保存失败！", data.message, "error");
            }
            dialogbj=data.code;
        }
    });
}

//页面的form表单模式
var _updateFunctionByJsp = function () {
    $.ajax({
        type:'post',
        url:$.manageServer().updateUrl,
        data:$("#"+$.manageServer().updateFormId,window.parent.document).serialize(),
        dataType:'json',
        success:function(data){
            if(data.code=='1'){
                //确保点击提示框的‘OK’按钮才执行--党王震20170117
                swal({
                    title: "保存成功!",
                    text: data.message,
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#A7D5EA",
                    closeOnConfirm: true
                }, function () {
                    $('#datatable').YDataTable('reload');
                    //添加局部树的刷新
                    var xzids =	window.parent.xzID;
                    if(xzids){
                        xzid = xzids.replace(new RegExp("@", "g"), "\\@");
                        var idss = parent.$("#"+xzid);
                        idss.jstree('refresh');
                    }
                });
                $('#datatable').YDataTable('reload');
            }else{
                swal("保存失败！", data.message, "error");
            }
        }
    });
}

//自动生成的form表单提交
var dialogaddbj;
var _addFunction = function () {
    $.ajax({
        type:'post',
        async: false,
        url:$.manageServer().addUrl,
        data:$("#registrationForm").serialize(),
        dataType:'json',
        success:function(data){
            if(data.code=='1'){
                swal("保存成功！", data.message, "success");
                $('#datatable').YDataTable('reload');
            }else{
                swal("保存失败！", data.message, "error");
            }
            dialogaddbj=data.code;
        }
    });
}



//页面的form表单提交
var _addFunctionByJsp = function () {
    $.ajax({
        type:'post',
        url:$.manageServer().addUrl,
        data:$("#"+$.manageServer().addFormId,window.parent.document).serialize(),
        dataType:'json',
        success:function(data){
            if(data.code=='1'){
                //确保点击提示框的‘OK’按钮才执行--党王震20170117
                swal({
                    title: "保存成功!",
                    text: data.message,
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#A7D5EA",
                    closeOnConfirm: true
                }, function () {
                    $('#datatable').YDataTable('reload');
                    //添加局部树的刷新--宋涛20170116
                    var xzids =	window.parent.xzID;
//					alert(xzids);
                    if(xzids){
                        xzid = xzids.replace(new RegExp("@", "g"), "\\@");
//						alert(xzid);
                        var idss = parent.$("#"+xzid);
                        idss.jstree('refresh');
                    }
                });
//				swal("保存成功！", data.message, "success");
//				$('#datatable').YDataTable('reload');
            }else{
                swal("保存失败！", data.message, "error");
            }
        }
    });
}

/**
 * json对象转地址栏string字符串
 * @param {Object} param 对象
 * @param {Object} key 前缀
 * @memberOf {TypeName}
 * @return {TypeName} string
 */
var _parseJsonParamToStr = function (param, key) {
    var paramStr="";
    if(param instanceof String || param instanceof Number || param instanceof Boolean){
        paramStr+="&"+key+"="+param;
    }else{
        $.each(param,function(i){
            var k = key == null ? i : key+( param instanceof Array ? "[" + i + "]" : "." + i );
            paramStr+='&'+_parseJsonParamToStr(this, k);
        });
    }
    return paramStr.substr(1);
};
/**
 * 表单序列化json对象
 */
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [ o[this.name] ];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}

/**
 * 页面跳转
 * @param {Object} url 跳转的url
 * @param {Object} param 地址栏参数对象
 * @param {Object} key 对象前缀
 */
var _jspForward = function (url, param, key) {
    url = url+'?'+_parseJsonParamToStr(param, key);
    window.location.href=url;
}

/**
 * 刷新页面数据表格
 */
var _refreshData = function(){
    $("#refresh-data-btn").click(function(){
        var btn=$(this);
        simpleLoad(btn,true);
        _tableInit();
        simpleLoad(btn,false)
    });
}

var _openAddWindow=function(obj){
    parent.layer.open({
        type: 1,
        title: obj.title,
        shadeClose: true,
        shade: [0.8, '#393D49'],
        maxmin: true,
        area: obj.area,
        content:obj.content,
        btn: ['保存', '取消'],
        yes: function(index, layero){
            var type=true;
            if(obj.type=='add'){
                if($("#"+$.manageServer().addFormId,window.parent.document).valid()){
                    if($.manageServer().addFormId=="jsdyAddForm"){//角色定义单独处理
                        $("#jsgnTree",window.parent.document).jstree({
                            "checkbox" : {
                                "keep_selected_style" : false
                            },
                            "plugins" : [ "checkbox"]
                        });
                        var nodes=$('#jsgnTree',window.parent.document).jstree().get_checked(true); //获取所有选中的节点ID
                        //var nodes = $('#jsgnTree').jstree("get_checked",null,true) ;

                        //console.log(nodes);
                        var ids = "";
                        $.each(nodes, function(i, node) {
                            var parent = $('#jsgnTree',window.parent.document).jstree().get_parent(node);
                            if( parent != "#" & ids.indexOf(parent+",")<0){
                                ids += parent+",";
                            }
                            if(parent != "#"){
                                ids += node.id+",";
                            }
                        });
                        if(ids!=""){
                            ids=ids.substring(0,ids.length-1);
                        }else{
                            window.parent.swal("操作错误！", "请给该角色至少授予一项权限！", "error");
                            type= false;
                        }
                        $("#ids",window.parent.document).val(ids);
                        //alert($("#ids",window.parent.document).val());
                    }
                    if(type){
                        _addFunctionByJsp();
                    }
                }else{
                    return false;
                }
            }else if(obj.type=='update'){
                if($("#"+$.manageServer().updateFormId,window.parent.document).valid()){

                    if($.manageServer().updateFormId=="jsdyUpdateForm"){//角色定义单独处理
                        $("#jsgnTree",window.parent.document).jstree({
                            "checkbox" : {
                                "keep_selected_style" : false
                            },
                            "plugins" : [ "checkbox"]
                        });
                        var nodes=$('#jsgnTree',window.parent.document).jstree().get_checked(true); //获取所有选中的节点ID
                        //var nodes = $('#jsgnTree').jstree("get_checked",null,true) ;

                      //  console.log(nodes);
                        var ids = "";
                        $.each(nodes, function(i, node) {
                            var parent = $('#jsgnTree',window.parent.document).jstree().get_parent(node);
                            if( parent != "#" & ids.indexOf(parent+",")<0){
                                ids += parent+",";
                            }
                            if(parent != "#"){
                                ids += node.id+",";
                            }
                        });
                        if(ids!=""){
                            ids=ids.substring(0,ids.length-1);
                        }else{
                            window.parent.swal("操作错误！", "请给该角色至少授予一项权限！", "error");
                            type= false;
                        }
                        $("#ids",window.parent.document).val(ids);
                        //alert($("#ids",window.parent.document).val());
                    }
                    if(type){
                        _updateFunctionByJsp();
                    }

                }else{
                    return false;
                }

            }
//					//添加局部树的刷新--宋涛20170116
//					var xzids =	window.parent.xzID;
//					if(xzids){
//						alert("又在局部刷新了？？？？？？？");
//						xzid = xzids.replace(new RegExp("@", "g"), "\\@");
//						var idss = parent.$("#"+xzid);
//					    idss.jstree('refresh');
//					}
            parent.layer.close(index); //如果设定了yes回调，需进行手工关闭
        }
    });

    $("#"+$.manageServer().addFormId,window.parent.document).validate({
        onfocusout: function(element) {
            $(element).valid();
        }
    });
    $("#"+$.manageServer().updateFormId,window.parent.document).validate({
        onfocusout: function(element) {
            $(element).valid();
        }
    });
}

$('#addButton').click(function(){
    $.post($.manageServer().toAddUrl, {}, function(str){
        _openAddWindow({
            title:$.manageServer().addTitle,
            area:$.manageServer().areaAdd,
            content:str,
            type:'add'
        });
    });
});

function updateModel(obj){
    $.post($.manageServer().toUpdateUrl, obj, function(str){
        fnAjaxError(str);
        _openAddWindow({
            //id:"user_update",
            title:$.manageServer().updateTitle,
            area:$.manageServer().areaUpdate,
            content:str,
            type:'update'
        });
    }).error(function(data) {
        fnAjaxError(data.responseText);
    });
}

var fnAjaxError = function(flag){
    if(flag==='logout'){
        url = basePath + 'login.jsp';
        top.window.location.href = url;
    }
}
var initSelectInput=function(){
    var selectConfig = {
        ".chosen-select": {},
        ".chosen-select-deselect": {
            allow_single_deselect: !0
        },
        ".chosen-select-no-single": {
            disable_search_threshold: 10
        },
        ".chosen-select-no-results": {
            no_results_text: "Oops, nothing found!"
        },
        ".chosen-select-width": {
            width: "95%"
        },
        ".chosen-select-search": {
            width: "70%",
            height: "30px",
            no_results_text: "未找到此选项!"
        }
    };
    for (var selector in selectConfig) {
        $(selector).chosen(selectConfig[selector]);
    }
}



var addIfram = function(tab){
    var o = tab.href, id='iframe'+tab.index, m = tab.index, l = tab.title, k = true;
    var $top = window.top.document;
    if (o == undefined || $.trim(o).length == 0) {
        return false
    }
    $(".J_menuTab", $top).each(
        function() {
            if ($(this).data("id") == id) {
                if (!$(this).hasClass("active")) {
                    $(this).addClass("active").siblings(".J_menuTab")
                        .removeClass("active");
                    g(this);
                    $(".J_mainContent .J_iframe", $top).each(
                        function() {
                            if ($(this).data("id") == id) {
                                $(this).attr('src',o).show()
                                    .siblings(".J_iframe")
                                    .hide();
                                return false
                            }
                        })
                }
                k = false;
                return false
            }
        });
    if (k) {
        var p = '<a href="javascript:;" class="active J_menuTab" data-id="'
            + id + '" data-href="' + o + '">' + l + ' <i class="fa fa-times-circle"></i></a>';
        $(".J_menuTab", $top).removeClass("active");
        var n = '<iframe class="J_iframe" name="iframe' + m
            + '" width="100%" height="100%" src="' + o
            + '" frameborder="0" data-id="' + id
            + '" seamless></iframe>';
        $(".J_mainContent", $top).find("iframe.J_iframe").hide().parents(
            ".J_mainContent").append(n);
        $(".J_menuTabs .page-tabs-content", $top).append(p);
    }
    return false;
}


function simpleLoad(a,b){if(b){a.children().addClass("fa-spin");a.contents().last().replaceWith(" 刷新中")}else{setTimeout(function(){a.children().removeClass("fa-spin");a.contents().last().replaceWith(" 刷新")},1000)}}