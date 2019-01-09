/***********************
 **一些小组件 这里大部分是对bootbox的不足的补充扩展 符合系统体验 放心使用
 * 部分样式基于bootstrap
 DEMO

 //html
 $M_.dialog.html("html弹出层","<small>小字就是很小</small>");

 //ajaxHtml 因为安全问题 不支持有表单的html
 $M_.dialog.ajaxHtml("异步加载弹出层",dataurl);

 //iframe
 $M_.dialog.iframe("框架嵌入弹出层",dataUrl);

 //confirm 选择对话框弹出层
$M_.dialog.confirm(function(){
    $M_.dialog.alert("选择了继续");
},"您确定要继续吗？","系统提示您");

//alert 弹出框
$M_.dialog.alert("选择了继续"); 
//或
alert("选择了继续"); 
alert("选择了继续","title","buttonName",function(){
//callback
}); 

//输入对话框 可捕捉输入结果回调确认后的事件， 也可以捕捉取消按钮 和回调设置
$M_.dialog.prompt(function(data){
   console.log(data);
},"你有键盘吗？","那么你就输入吧");

 *************************/

window.$M_= {};
$M_.PAGE_TIME=new Date().getTime();
(function(window){
    $M_.REG={//宽泛的验证正则
      "IDcard":/^(\d{17}[\d|x]|\d{15})$/,
      "phone":/^1\d{10}$/,
      "tel": /^0\d{2,3}-?\d{7,8}$/,
      "email":/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
      "password":/^[\w]{6,12}$/,
      "postcode":/^\d{6}$/
    };
    //自动定位到表单位置
    $M_.scrollY = function(elem){
      $(window).scrollTop(elem.offset().top-elem.parents(".form-group").height()-50);
      elem[0].focus();
    }
    /*弹出浮层begin*/
    $M_.Dialog_=function(){}
    $M_.Dialog_.prototype={
        //ajax load
        ajaxHtml:function(title, dataurl){
            this.buildJplaneBoxHtml(title,"");
            this.initPlane();
            $("#J-plane-box"+$M_.PAGE_TIME).modal();
            this.planeAutosize();
            $("#J-plane-box"+$M_.PAGE_TIME+" .html-content").load(dataurl,{},function(){
                $("#J-plane-box"+$M_.PAGE_TIME+"-loading").hide();
            });
        },
        //inner Html
        html:function(title,innerHtml){
            this.buildJplaneBoxHtml(title,innerHtml);
            this.initPlane();
            this.planeAutosize();
            $("#J-plane-box"+$M_.PAGE_TIME).modal();
        },
        //include url page
        iframe:function(title,includeUrl){

            this.html(title,this.iframeboxhtml(includeUrl));
            $(".modal .modal-content .modal-header .close").off("click").on(function(){
                $("#J-plane-box"+$M_.PAGE_TIME).remove();
            });
            setTimeout(function(){
                $("#J-plane-box"+$M_.PAGE_TIME+"-loading").hide();
            },300);

        },
        buildJplaneBoxHtml:function(title,innerHtml){
            $("#J-plane-box"+$M_.PAGE_TIME).remove();
            var Jplaneboxhtml = "";
            Jplaneboxhtml += "<div class=\"modal fade\" id=\"J-plane-box"+$M_.PAGE_TIME+"\"  tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">";
            Jplaneboxhtml += " <div class=\"modal-dialog\">";
            Jplaneboxhtml += "    <div class=\"modal-content\">";
            Jplaneboxhtml += "       <div class=\"modal-header\">";
            Jplaneboxhtml += "          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;<\/button>";
            Jplaneboxhtml += "          <h4 class=\"modal-title\" id=\"myModal3Label\">"+title+"<\/h4>";
            Jplaneboxhtml += "       <\/div>";
            Jplaneboxhtml += "       <div class=\"modal-body\">";
            Jplaneboxhtml += "           "+innerHtml;
            Jplaneboxhtml += "       <\/div>";
            Jplaneboxhtml += "                                    <div class=\"modal-dialog\" id=\"J-plane-box"+$M_.PAGE_TIME+"-loading\">";
            Jplaneboxhtml += "                                        <div class=\"modal-hd html-content\">正在载入...<\/div>";
            Jplaneboxhtml += "                                        <div class=\"modal-bd\">";
            Jplaneboxhtml += "                                            <span class=\"icon-spinner icon-spin\"><\/span>";
            Jplaneboxhtml += "                                        <\/div>";
            Jplaneboxhtml += "                                    <\/div>";
            Jplaneboxhtml += "    <\/div>";
            Jplaneboxhtml += " <\/div>";
            Jplaneboxhtml += "<\/div>";
            $("body").append(Jplaneboxhtml);
        },/*弹出框*/
        iframeboxhtml:function(url){

            setTimeout(function(){
                var d_width = $(window).width()-50;
                $(".modal-dialog").css({
                    "width": d_width+"px",
                    "margin-left": (-d_width/2)+"px",
                    "left": "50%"
                });

            },200);


            return "<iframe src=\""+url+"\" frameborder=\"0\" width=\"100%\" height=\""+($(window).height()-130)+"\"><\/iframe>";
        },
        planeAutosize:function(){
            $("#J-plane-box"+$M_.PAGE_TIME+"-loading").show();
            //            $("#J-plane-box"+$M_.PAGE_TIME).width($(window).width()-200);
            //            $("#J-plane-box"+$M_.PAGE_TIME+" .html-content").css({
            //                "max-height":$(window).height()-100+"px",
            //                "overflow-y":"auto",
            //
            //            });
            //            setTimeout(function(){
            //                $("#J-plane-box"+$M_.PAGE_TIME).css({
            //                    "margin-top":-$("#J-plane-box"+$M_.PAGE_TIME).height()/2+"px",
            //                    "margin-left":-$("#J-plane-box"+$M_.PAGE_TIME).width()/2+"px",
            //                });
            //            },100);
        },
        initPlane: function(){
            //关闭面板后初始化页面
            $("#J-plane-box"+$M_.PAGE_TIME).off("closed.modal.amui").on("closed.modal.amui",function(){
                $("#J-plane-box"+$M_.PAGE_TIME+" .html-content").html("");
                $("#J-plane-box"+$M_.PAGE_TIME+"-loading").hide();
                $("#J-plane-box"+$M_.PAGE_TIME+" .html-title").html("...");
            });
        },alert:function(innerHtml,title,buttonName,callfunc){
            //$M_.dialog.alert("验证码错误！","错误提示");
            bootbox.dialog({
                message: innerHtml,
                title: title==null?"系统消息":title,
                buttons: {
                    success: {
                        label: buttonName==null?"知道了！":buttonName,
                        className: "btn-primary btn-alt",
                        callback: function() {

                            //callback result
                            typeof callfunc == "function" ? callfunc.call(this) :"";
                        }
                    }
                }
            });
        },confirm:function(callfunc,innerHtml,title,cancelfunc){
            //            DEMO
            //            $M_.dialog.confirm(function(){
            //                $M_.dialog.alert("选择了继续");
            //            },"您确定要继续吗？","系统提示");
            bootbox.confirm({
                message: innerHtml==null?"您确定要继续吗？":innerHtml,
                title: title==null?"系统消息":title,
                buttons: {
                    cancel:{
                        label:"关闭",
                        className: "btn-primary btn-alt"
                    },
                    confirm:{
                        label:"继续",
                        className: "btn-primary btn-alt"
                    }
                },
                callback: function(result) {
                    //callback result
                    if(result){
                        typeof callfunc == "function" ? callfunc.call(this):"";
                    }else{
                        typeof cancelfunc == "function" ? cancelfunc.call(this):"";
                    }
                }

            });




        },prompt:function(callfunc,title){
            //            DEMO
            //            $M_.dialog.prompt(function(data){
            //                console.log(data);
            //            },"那么你就输入吧");
            bootbox.prompt({
                title: title==null?"请输入":title,
                buttons: {
                    cancel:{
                        label:"关闭",
                        className: "btn-primary btn-alt"
                    },
                    confirm:{
                        label:"保存",
                        className: "btn-primary btn-alt"
                    }
                },
                callback: function(result) {
                    //callback result
                    typeof callfunc == "function" ? callfunc.call(this,result):"";
                }
            });

        }

    }

    $M_.dialog = new $M_.Dialog_();
    /* 弹出浮层end */
      window.alert=$M_.dialog.alert;
})(window);