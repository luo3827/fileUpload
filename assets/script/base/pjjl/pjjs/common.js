//默认加载，函数名称不能改变
var _tableInit = function (config) {
    console.log("22222")
//	var options = $.extend({}, options, config);
    if(config.url!==undefined){
        config.url=basePath + config.url;
    }
    $('#datatable').YDataTableRadio(config);
//	console.log(aa.defaults);
//	//搜索框
//	var $searchForm = $(".search-form");
//	if($searchForm){
//		//查询-点击事件
//		$('.search-submit',$searchForm).click(function(){
//			options.params = $searchForm.serializeObject();
//			$('#datatable').YDataTable(options);
//
//		});
//		//更多查询-点击事件
//		$('#moreSearch',$searchForm).click(function(){
//			$(this).children('i').toggleClass("fa-plus").toggleClass("fa-minus");
//		});
//	}
//	if(multipleSelect){
//		$('#datatable').dataTable('getCheck');
//	}
}
var _tableInitRadio1 = function (config) {
    if(config.url!==undefined){
        config.url=basePath + config.url;
    }
    $('#datatable2').YDataTableRadio(config);
}
var _tableInitRadio2 = function (config) {
    if(config.url!==undefined){
        config.url=basePath + config.url;
    }
    $('#datatable3').YDataTableRadio(config);
}

/**
 * 创建tab
 * 已使用index:99、98、97、96、95、94
 * @param {Object} tab
 * @memberOf {TypeName}
 * @return {TypeName}
 */
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


/**
 * 创建tab
 * 已使用index:99、98、97、96、95、94
 * @param {Object} tab
 * @memberOf {TypeName}
 * @return {TypeName}
 */
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
            serverConfig = config;
            return config;
        }
    });
    $.extend({
        manageServer2:function(config){
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
            serverConfig = config;
            return config;
        }
    });
    $.extend({
        manageServer3:function(config){
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
            serverConfig = config;
            return config;
        }
    });
}
myLoad();

var _showModalObj = function(operType,key) {
//	console.log(operType);
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
                        $('#datatable').YDataTableRadio('reload');
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
                dataType:'json',
                success:function(data){
                    if(data.code=='1'){
                        swal("删除成功！", data.msg, "success");
                        $('#datatable').YDataTableRadio('reload');
                    }else{
                        swal("删除失败！", data.msg, "error");
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
                            swal("删除成功！", data.msg, "success");
                            $('#datatable').YDataTableRadio('reload');
                        }else{
                            swal("删除失败！", data.msg, "error");
                        }
                    }
                });
            });
    }else{
        swal("操作错误！", "请至少勾选一条信息进行删除。", "error");
    }

}

//批量修改

var _updateMore = function (ids) {
    if(ids!==undefined && ids!==null && ids!==''){
        swal({
                title: "您确定要修改勾选的所有信息吗？",
                text: "修改后将难以恢复，请谨慎操作。",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                cancelButtonText: "待我犹豫一会...",
                confirmButtonText: "是的，我要修改！",
                closeOnConfirm: false
            },
            function(){
                $.ajax({
                    type:'post',
                    url:$.manageServer().updateMoreUrl,
                    data:{idList:ids},
                    dataType:'json',
                    success:function(data){
                        if(data.code=='1'){
                            swal("修改成功！", data.msg, "success");
                            $('#datatable').YDataTableRadio('reload');
                        }else{
                            swal("修改失败！", data.msg, "error");
                        }
                    }
                });
            });
    }else{
        swal("操作错误！", "请至少勾选一条信息进行修改。", "error");
    }

}

//批量评阅作业

var _updateMoreZys = function (ids) {
    if(ids!==undefined && ids!==null && ids!==''){
        swal({
                title: "您确定要评阅勾选的所有作业吗？",
                text: "评阅后将难以恢复，请谨慎操作。",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                cancelButtonText: "待我犹豫一会...",
                confirmButtonText: "是的，我要评阅！",
                closeOnConfirm: false
            },
            function(){
                $.ajax({
                    type:'post',
                    url:$.manageServer().updateMoreUrl,
                    data:{idList:ids},
                    dataType:'json',
                    success:function(data){
                        if(data.code=='1'){
                            swal("修改成功！", data.msg, "success");
                            $('#datatable').YDataTableRadio('reload');
                            $(".jstree:jstree").jstree("destroy");
                            $(document).off(".jstree");
                            $.ajax( {
                                data : null,
                                type : "POST",
                                dataType : 'json',
                                url : basePath + 'xxgcgl/kcflTrees.do',
                                error : function(data) {
                                    fnAjaxError(data.responseText);
                                },
                                success : function(data) {
                                    createTree(data);
                                }
                            });
                        }else{
                            swal("修改失败！", data.msg, "error");
                        }
                    }
                });
            });
    }else{
        swal("操作错误！", "请至少勾选一条信息进行修改。", "error");
    }

}

//自动生成的form表单模式
var _updateFunction = function () {
    $.ajax({
        type:'post',
        url:$.manageServer().updateUrl,
        data:$("#registrationForm").serialize(),
        dataType:'json',
        success:function(data){
            if(data.code=='1'){
                if($.manageServer().updateUrl.indexOf("xqjgsh_shXqjg.do")>0){   //学前机构审核单独处理
                    swal("审核成功！", data.message, "success");
                }else{
                    swal("保存成功！", data.message, "success");
                }
                $('#datatable').YDataTableRadio('reload');
            }else{
                swal("修改失败！", data.message, "error");
            }
        }
    });
}

//页面的form表单模式
var _updateFunctionByJsp = function () {
    $.ajax({
        type:'post',
        url:$.manageServer().updateUrl,
        dataType:'json',
        data:$("#"+$.manageServer().updateFormId,window.parent.document).serialize(),
        success:function(data){
            if($.manageServer().updateUrl=="xqjgsh_shXqjg.do"){   //审核单独处理
                if(data.code=='1'){
                    swal("审核成功！", data.message, "success");
                }else{
                    swal("保存成功！", data.message, "success");
                }
                $('#datatable').YDataTableRadio('reload');
            }else{
                swal("保存失败！", data.message, "error");
            }
        }
    });
}

//自动生成的form表单提交
var _addFunction = function () {
    $.ajax({
        type:'post',
        url:$.manageServer().addUrl,
        data:$("#registrationForm").serialize(),
        dataType:'json',
        success:function(data){

            if(data.code=='1'){
                swal("保存成功！", data.msg, "success");
                $('#datatable').YDataTableRadio('reload');
            }else{
                swal("保存失败！", data.msg, "error");
            }
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
                swal("保存成功！", data.msg, "success");
                $('#datatable').YDataTableRadio('reload');
            }else{
                swal("保存失败！", data.msg, "error");
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
    $.ajax( {
        data : obj,
        type : "POST",
        url : $.manageServer().toUpdateUrl,
        error : function(data) {
            fnAjaxError(data.responseText);
        },
        success : function(str) {
            fnAjaxError(str);
            _openAddWindow({
                //id:"user_update",
                title:$.manageServer().updateTitle,
                area:$.manageServer().areaUpdate,
                content:str,
                type:'update'
            });

        }
    });
}
function updateqyxxModel(obj){
    _openAddWindows({
        id:"user_update",
        title:$.manageServer().updateTitle,
        area:$.manageServer().areaUpdate,
        content:$.manageServer().toUpdateUrl+"?qy="+obj.qy,
        url:$.manageServer().updateUrl
    });
}
//选择课程iframe弹出窗口
function addKcModel(){
    _openAddWindows2({
        id:"add_kc",
        title:'选择课程',
        area:['900px','700px'],
        content:basePath+'jsp/pxjhgl/kcfl_list.jsp',
        url:''
    });
}
//使用ifarm弹窗
var _openAddWindows2=function(obj){
    parent.layer.open({
        type: 2,
        title: obj.title,
        shadeClose: true,
        maxmin: true,
        shade: [0.8, '#393D49'],
        area: obj.area,
        // offset: 'rb', //右下角弹出
        // time: 2000, //2秒后自动关闭
        btn: ['确定', '取消'],
        content:obj.content, //iframe的url，no代表不显示滚动条
        yes: function(index, layero) {
            if(!$('iframe',layero)[0].contentWindow.fnValidationForm()){
                return false;
            }
            var dataParame = $('iframe',layero)[0].contentWindow.fnGetFormData();
            $.ajax({
                type:'post',
                url:obj.url,
                data:dataParame,
                dataType:'json',
                success:function(data){
                    if(data.code=='1'){
                        swal("保存成功！", data.msg, "success");
                        $('#datatable').YDataTableRadio('reload');
                    }else{
                        swal("保存失败！", data.msg, "error");
                    }
                }
            });
            //console.log($('iframe',layero)[0].contentWindow.aa());
            //  _addFunctionByJsp(layero);
            parent.layer.close(index);
        }
    });
}
//使用ifarm弹窗
var _openAddWindows=function(obj){
    parent.layer.open({
        type: 2,
        title: obj.title,
        shadeClose: true,
        maxmin: true,
        shade: [0.8, '#393D49'],
        area: obj.area,
        // offset: 'rb', //右下角弹出
        // time: 2000, //2秒后自动关闭
        btn: ['保存', '取消'],
        content:obj.content, //iframe的url，no代表不显示滚动条
        yes: function(index, layero) {
            if(!$('iframe',layero)[0].contentWindow.fnValidationForm()){
                return false;
            }
            var dataParame = $('iframe',layero)[0].contentWindow.fnGetFormData();
            $.ajax({
                type:'post',
                url:obj.url,
                data:dataParame,
                dataType:'json',
                success:function(data){
                    if(data.code=='1'){
                        swal("保存成功！", data.msg, "success");
                        $('#datatable').YDataTableRadio('reload');
                    }else{
                        swal("保存失败！", data.msg, "error");
                    }
                }
            });
            //console.log($('iframe',layero)[0].contentWindow.aa());
            //  _addFunctionByJsp(layero);
            parent.layer.close(index);
        }
    });
}
//使用ifarm预览弹窗
var _preview=function(obj){
    parent.layer.open({
        type: 2,
        title: obj.title,
        shadeClose: true,
        maxmin: true,
        shade: [0.8, '#393D49'],
        area: obj.area,
        content:obj.content,
    });
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
        },
        ".chosen-select-search2": {
            width: "55%",
            height: "30px",
            no_results_text: "未找到此选项!"
        },
        ".chosen-select-search3": {
            width: "90%",
            height: "30px",
            no_results_text: "未找到此选项!"
        }
    };
    for (var selector in selectConfig) {
        $(selector).chosen(selectConfig[selector]);
    }
}

var fnAjaxError = function(flag){
    if(flag==='logout'){
        url = basePath + 'jsp/login.jsp';
        top.window.location.href = url;
    }
}

var fnBootboxDialog = function(title, msg, successLabel, successFun, cancelFun){
    bootbox.dialog({
        message: msg,
        title: title,
        buttons: {
            success: {
                label: successLabel!==undefined?successLabel:'保存',
                className: "btn-primary",
                callback: function() {
                    if(successFun===undefined || successFun===null || successFun===''){
                        if($("#registrationForm").valid()){
                            _addFunction();
                        }else{
                            return false;
                        }
                    }else{
                        return successFun();
                    }
                }
            },
            "取消": {
                className: "btn-warning",
                callback: function() {
                    if(cancelFun!==undefined && cancelFun!==null && successFun!==''){
                        cancelFun();
                    }
                }
            }
        }
    });
}

var _cancel = function (data) {
    swal({
            title: "您确定要注销吗？",
            text: "注销后将无法使用，请谨慎操作。",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            cancelButtonText: "待我犹豫一会...",
            confirmButtonText: "是的，我要注销！",
            closeOnConfirm: false
        },
        function(){
            $.ajax({
                type:'post',
                url:$.manageServer().deleteUrl,
                data:data,
                dataType:'json',
                success:function(data){
                    if(data.code=='1'){
                        swal("注销成功！", data.msg, "success");
                        $('#datatable').YDataTableRadio('reload');
                    }else{
                        swal("注销失败！", data.msg, "error");
                    }
                }
            });
        });
}

var _cancelBanner = function (data) {
    swal({
            title: "您确定要删除吗？",
            text: "删除后将无法使用，请谨慎操作。",
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
                dataType:'json',
                success:function(data){
                    if(data.code=='1'){
                        swal("删除成功！", data.msg, "success");
                        $('#datatable').YDataTableRadio('reload');
                    }else{
                        swal("删除失败！", data.msg, "error");
                    }
                }
            });
        });
}


function simpleLoad(a,b){if(b){a.children().addClass("fa-spin");a.contents().last().replaceWith(" 刷新中")}else{setTimeout(function(){a.children().removeClass("fa-spin");a.contents().last().replaceWith(" 刷新")},1000)}}