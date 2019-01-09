//隐藏的遮罩html
function ObstructHtml_none() {
	var html = '';
	html += '<div id="Obstruct" style="width:100%;height:100%;position:absolute;z-index:999999;text-align:center;display:none;"><img src="<%=basePath%>assets/images/loading.gif" style="height:35px;width:35px;margin-top:20%;"/></div>'
	return html;
}
var currentBmbm='';
var title='';
var check='';
//dialog弹出标签页拼接成的字符串
var htmlStr = function(){
	var mkname = $.manageServer().mkname;
	if(mkname=='ZXXJGZC' || mkname=='XQJG'){
		btntype = "main";
//		if(window.zhcx==='check'){
//			btntype = "update";
//		}
	}else{
		btntype = "update";
	}
	var style = $.manageServer().modelStyle;
	if(style=='tabs'){
		mes=GetFrom2(getModalconObj(btntype,mkname), "update", "", 'stuimg', 'with', '50');
		if(zhcx === 'check' || xxdm!==currentBmbm){
			
			mes=GetFrom2(getModalconObj(btntype,mkname), "checkpic", "", 'stuimg', 'with', '50');
		}else if( xxdm==window.currentBmbm){	
			mes=GetFrom2(getModalconObj(btntype,mkname), "update", "", 'stuimg', 'with', '50');
		}
	}else{
		mes=GetFrom1(getModalconObj(btntype,mkname), "update", "", 'stuimg', 'with', '50');
		if(zhcx === 'check' || xxdm!==window.currentBmbm){
			mes=GetFrom2(getModalconObj(btntype,mkname), "checkpic", "", 'stuimg', 'with', '50');
		}
	}
	return ObstructHtml_none() + mes;
};

var htmlStr_add = function(){
	var mkname = $.manageServer().mkname;
	btntype = "add";
	var style = $.manageServer().modelStyle;
	if(style=='tabs'){
		mes=GetFrom2(getModalconObj(btntype,mkname), "add", "", 'stuimg', 'with', '50');
	}else{
		mes=GetFrom1(getModalconObj(btntype,mkname), "add", "", 'stuimg', 'with', '50');
	}
	return ObstructHtml_none() + mes;
};

//dialog弹出标签页直接镶嵌在主页上的初始化数据回填  
function ht(obj){
	$.ajax({
	type:'post',
	url:$.manageServer().toUpdateUrl,
	data:obj,
	dataType:'json',
	success:function(data){
		if(data){
			if(data.spzt!=='0'){//控制申请审核按钮是否显示
				$("#sqsh_button").attr("style","display:none");
			}
			setUpdateDialogValue(data,getModalconObj('update',$.manageServer().mkname));
					
		}else{
			swal("加载失败！", "信息加载失败，请联系技术人员。", "error");
		}
		
		  $("#registrationForm select").select2();
		  //初始化日期控件
			$(".dayinput .input-group.date").datepicker({
		        todayBtn: "linked",
		        keyboardNavigation: !1,
		        forceParse: !1,
		        calendarWeeks: !0,
		        autoclose: !0,
		        format:'yyyymmdd'
		    });
			$(".dayinputy .input-group.date").datepicker( {
				minViewMode : 1,
				keyboardNavigation : !1,
				forceParse : !1,
				autoclose : !0,
				todayHighlight : !0,
				format:'yyyymm'
			});
			$(".dayinputd .input-group.date").datepicker( {
				startView: 1,      //选择日期范围从月开始。0为日，1为月，2为年
				maxViewMode: 1,   //选择日期最大范围到月。0为日，1为月，2为年
				minViewMode:0,    //选择日期最小范围到日。0为日，1为月，2为年
// 				language: "zh-CN", //汉化 
		        todayBtn: "linked",			//突出当前日期
		        todayHighlight : !0 ,		//如果这是真的,突出当前日期.
		        keyboardNavigation: !1,		//是否允许日期导航箭头键.
		        forceParse: !1,
		      //  calendarWeeks: !0,			//是否显示左边的数字每周行.
		        autoclose: !0,
		        endDate : new Date(),  //可选的截至日期为今天
		        format:'mm-dd'

			});
		  var $form_valid = $("#registrationForm").validate({onfocusout: function(element) {
			  $(element).valid(); }});
		
		//设置表单的默认值
		var defaultValue=$.manageServer().updateDefaultValue;
		if(defaultValue!=null && defaultValue !=undefined){
			for(var id_type in defaultValue){
				var type=id_type.split("@")[1];
				var id=id_type.split("@")[0];
				if("select"==type){
					$("#"+id).select2().select2("val", defaultValue[id_type]);
				}else if("input"==type){
					$("#"+id).val(defaultValue[id_type]);
				}else if("textarea"==type){
					$("#"+id).html(defaultValue[id_type]);
				}
				
			}
		}
		//初始化select级联
		if(obj.bj!=undefined){
			$.ajax({
				type:'post',
				url:basePath+'common_getUpdate.do',
				data:{xxdm:obj.xxdm,bj:obj.bj},
				dataType:'text',
				success:function(data){
					if(data!=''&&data!=null){
						var arr=data.split("@");
						if(obj.bj!='gxxxjbxx' && obj.bj!='mbjg'){
							$("#"+obj.bj+"_szds").select2().select2("val",arr[1]);
							if(arr[0]=='0'){
								getXxs(arr[2],obj.bj,arr[15]);
							}
							if(arr[1]!=''&&arr[1]!=null){
								getQxs(arr[1],obj.bj,arr[2]);
							}
							if(arr[2]!=''&&arr[2]!=null){
								getSzxzs(arr[2],obj.bj,arr[3]);
							}
							if(arr[3]!=''&&arr[3]!=null){
								getSzcws(arr[3],obj.bj,arr[4]);
							}
							if(arr[5]!=''&&arr[5]!=null){
								getCjjg3(arr[5],obj.bj,arr[6]);
							}
							if(arr[6]!=''&&arr[6]!=null){
								getCjjg4(arr[6],obj.bj,arr[7]);
							}
							if(arr[7]!=''&&arr[7]!=null){
								getCjjg5(arr[7],obj.bj,arr[8]);
							}
							if(arr[9]!=''&&arr[9]!=null){
								getTjjg3(arr[9],obj.bj,arr[10]);
							}
							if(arr[10]!=''&&arr[10]!=null){
								getTjjg4(arr[10],obj.bj,arr[11]);
							}
							if(arr[11]!=''&&arr[11]!=null){
								getTjjg5(arr[11],obj.bj,arr[12]);
							}
							if(arr[13]!=''&&arr[13]!=null){
								getSzdcxlxms(arr[13],obj.bj,arr[14]);
							}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
						}else{
//								if(arr[0]=='0'){
//									getXxs(arr[2],obj.bj,arr[7]);
//								}
							$("#"+obj.bj+"_dsdm").select2().select2("val",arr[1]);
							if(arr[1]!=''&&arr[1]!=null){
								getQxs(arr[1],obj.bj,arr[2]);
							}
							if(arr[2]!=''&&arr[2]!=null){
								getSzxzs(arr[2],obj.bj,arr[3]);
							}
							if(arr[3]!=''&&arr[3]!=null){
								getSzcws(arr[3],obj.bj,arr[4]);
							}
							if(arr[5]!=''&&arr[5]!=null){
								getSzdcxlxms(arr[5],obj.bj,arr[6]);
							}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
						}
					}
					
	   			}
			});
		}
	}
});
}

function ht_check(obj){//机构端在部门树下增加学校时的查看数据回填
	$.ajax({
	type:'post',
	url:$.manageServer().toUpdateUrl,
	data:obj,
	dataType:'json',
	success:function(data){
		if(data){
			if(data.spzt!=='0'){//控制申请审核按钮是否显示
				$("#sqsh_button").attr("style","display:none");
			}
			setUpdateDialogValue(data,getModalconObj('update',$.manageServer().mkname));
					
		}else{
			swal("加载失败！", "信息加载失败，请联系技术人员。", "error");
		}
		
		  $("#registrationForm select").select2();
		  //初始化日期控件
			$(".dayinput .input-group.date").datepicker({
		        todayBtn: "linked",
		        keyboardNavigation: !1,
		        forceParse: !1,
		        calendarWeeks: !0,
		        autoclose: !0,
		        format:'yyyymmdd'
		    });
			$(".dayinputy .input-group.date").datepicker( {
				minViewMode : 1,
				keyboardNavigation : !1,
				forceParse : !1,
				autoclose : !0,
				todayHighlight : !0,
				format:'yyyymm'
			});
		  var $form_valid = $("#registrationForm").validate({onfocusout: function(element) {
			  $(element).valid(); }});
			
		  //初始化select级联
		if(obj.bj!=undefined){
			$.ajax({
				type:'post',
				url:basePath+'common_getUpdate.do',
				data:{xxdm:obj.xxdm,bj:obj.bj},
				dataType:'text',
				success:function(data){
					if(data!=''&&data!=null){
						var arr=data.split("@");
						if(obj.bj!='gxxxjbxx' && obj.bj!='mbjg'){
							$("#"+obj.bj+"_szds").select2().select2("val",arr[1]);
							if(arr[0]=='0'){
								getXxs(arr[2],obj.bj,arr[15]);
							}
							if(arr[1]!=''&&arr[1]!=null){
								getQxs(arr[1],obj.bj,arr[2]);
							}
							if(arr[2]!=''&&arr[2]!=null){
								getSzxzs(arr[2],obj.bj,arr[3]);
							}
							if(arr[3]!=''&&arr[3]!=null){
								getSzcws(arr[3],obj.bj,arr[4]);
							}
							if(arr[5]!=''&&arr[5]!=null){
								getCjjg3(arr[5],obj.bj,arr[6]);
							}
							if(arr[6]!=''&&arr[6]!=null){
								getCjjg4(arr[6],obj.bj,arr[7]);
							}
							if(arr[7]!=''&&arr[7]!=null){
								getCjjg5(arr[7],obj.bj,arr[8]);
							}
							if(arr[9]!=''&&arr[9]!=null){
								getTjjg3(arr[9],obj.bj,arr[10]);
							}
							if(arr[10]!=''&&arr[10]!=null){
								getTjjg4(arr[10],obj.bj,arr[11]);
							}
							if(arr[11]!=''&&arr[11]!=null){
								getTjjg5(arr[11],obj.bj,arr[12]);
							}
							if(arr[13]!=''&&arr[13]!=null){
								getSzdcxlxms(arr[13],obj.bj,arr[14]);
							}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
						}else{
//								if(arr[0]=='0'){
//									getXxs(arr[2],obj.bj,arr[7]);
//								}
							$("#"+obj.bj+"_dsdm").select2().select2("val",arr[1]);
							if(arr[1]!=''&&arr[1]!=null){
								getQxs(arr[1],obj.bj,arr[2]);
							}
							if(arr[2]!=''&&arr[2]!=null){
								getSzxzs(arr[2],obj.bj,arr[3]);
							}
							if(arr[3]!=''&&arr[3]!=null){
								getSzcws(arr[3],obj.bj,arr[4]);
							}
							if(arr[5]!=''&&arr[5]!=null){
								getSzdcxlxms(arr[5],obj.bj,arr[6]);
							}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
						}
					}
					
	   			}
			});
		}
	}
});
}

	//选项卡样式
function GetFrom2(obj, operation, ajaxurl, type, isthumb, scale) {
	var str = '';
	var body = '';
	var form = '';
	var tab = '';
	var num = 2; //每行的控件个数
	var rownum=2;
	if($.manageServer().rownum!==undefined){
		rownum=$.manageServer().rownum;
	}
		for (var i = 0; i < obj.data.length; i++) {
		var hasPhoto = false;
		var photoNum = 0; //照片数量,拓展指纹照片用
		for (var j = 0; j < obj.data[i].FormGroup.length; j++) {
			if (obj.data[i].FormGroup[j].type == "file") {
				num = 2; //有照片时候放两个form-control,否则放3个
				hasPhoto = true;
				photoNum++;
			} else {
				num = rownum;
			}
		}
		//title=obj.data[i].Title;
		title=$.manageServer().title;
		var act='';
		if(i==0){
			act='active';
		}
		tab += getTitleStr2(obj.data[i].Title, hasPhoto,act,i+1); //拼接title
		var id=i+1;
		//body +='<div id="tab-'+id+'" class="tab-pane '+act+'"><a data-toggle="tab" href="#tab-'+id+'"><div class="panel-body">';
		body +='<div id="tab-'+id+'" class="tab-pane '+act+'"><div class="panel-body">';
		
		for (var j = 0; j < obj.data[i].FormGroup.length; j++) {
			if ((j + 1) % num == 0) {
				if (obj.data[i].fingerPrint && obj.data[i].fingerPrint == "fingerPrint") {
					form = fingerInit();
				} else if (obj.data[i].personalimg && obj.data[i].personalimg == "personalimg") {
					form = uInitContainerByid(obj.data[i].image);
				} else if (obj.data[i].abstract) {
					form = addAbstract(obj.data[i].abstract);
				} else if (obj.data[i].personalimg) {
					if (obj.data[i].oneimg) {
						form = uInitContainerByid_one(obj.data[i].personalimg, obj.data[i].image);
					} else {
						form = uInitContainerByid(obj.data[i].personalimg, obj.data[i].image);
					}
				} else if (obj.data[i].image) {
					form = uInitContainerByid(obj.data[i].image, obj.data[i].inputid);
				} else if (obj.data[i].featureser && obj.data[i].featureser == "featureser") {
					form = specSerInit("featuretb");
				} else if (obj.data[i].coachabstract && obj.data[i].coachabstract == "coachabstract") {
					form = addAbstract("cabstracteditor");
				} else if (obj.data[i].freestandal && obj.data[i].freestandal == "freestandal") {
					form = feeStandal("feetable");
				} else if (obj.data[i].fieldType) {
					form = addAdvertise(obj.data[i].fieldType);
				} else {
					form += Getfromsonstr(obj.data[i].FormGroup[j].control, obj.data[i].FormGroup[j].label, obj.data[i].FormGroup[j].type, obj.data[i].FormGroup[j].id, obj.data[i].FormGroup[j].selectdata, hasPhoto,obj.data[i].FormGroup[j].validate,obj.data[i].FormGroup[j].defaultValue,operation);
				}
				
				body += GetRowConStr(form);
				form = '';
			} else {
				if (j + 1 == obj.data[i].FormGroup.length) {
					if (obj.data[i].fingerPrint && obj.data[i].fingerPrint == "fingerPrint") {
						form = fingerInit();
					} else if (obj.data[i].personalimg) {
						if (obj.data[i].oneimg) {
							form = uInitContainerByid_one(obj.data[i].personalimg, obj.data[i].image);
						} else {
							form = uInitContainerByid(obj.data[i].personalimg, obj.data[i].image);
						}
					} else if (obj.data[i].featureser && obj.data[i].featureser == "featureser") {
						form = specSerInit("featuretb");
					} else if (obj.data[i].image) {
						form = uInitContainerByid(obj.data[i].image, obj.data[i].inputid);
					} else if (obj.data[i].abstract) {
						form = addAbstract(obj.data[i].abstract);
					} else if (obj.data[i].featureser && obj.data[i].featureser == "featureser") {
						form = specSerInit("featuretb");
					} else if (obj.data[i].coachabstract && obj.data[i].coachabstract == "coachabstract") {
						form = addAbstract("cabstracteditor");
					} else if (obj.data[i].freestandal && obj.data[i].freestandal == "freestandal") {
						form = feeStandal("feetable");
					} else if (obj.data[i].fieldType) {
						form = addAdvertise(obj.data[i].fieldType);
					} else {
						form += Getfromsonstr(obj.data[i].FormGroup[j].control, obj.data[i].FormGroup[j].label, obj.data[i].FormGroup[j].type, obj.data[i].FormGroup[j].id, obj.data[i].FormGroup[j].selectdata, hasPhoto,obj.data[i].FormGroup[j].validate,obj.data[i].FormGroup[j].defaultValue,operation);
					}
					
					body += GetRowConStr(form);
					form = '';
				} else {
					if (obj.data[i].fingerPrint && obj.data[i].fingerPrint == "fingerPrint") {
						form = fingerInit();
					} else if (obj.data[i].personalimg) {
						if (obj.data[i].oneimg) {
							form = uInitContainerByid_one(obj.data[i].personalimg, obj.data[i].image);
						} else {
							form = uInitContainerByid(obj.data[i].personalimg, obj.data[i].image);
						}
					} else if (obj.data[i].image) {
						form = uInitContainerByid(obj.data[i].image, obj.data[i].inputid);
					} else if (obj.data[i].featureser && obj.data[i].featureser == "featureser") {
						form = specSerInit("featuretb");
					} else if (obj.data[i].coachabstract && obj.data[i].coachabstract == "coachabstract") {
						form = uInitContainer();
					} else if (obj.data[i].featureser && obj.data[i].featureser == "featureser") {
						form = specSerInit("featuretb");
					} else if (obj.data[i].coachabstract && obj.data[i].coachabstract == "coachabstract") {
						form = addAbstract("cabstracteditor");
					} else if (obj.data[i].freestandal && obj.data[i].freestandal == "freestandal") {
						form = feeStandal("feetable");
					} else if (obj.data[i].fieldType) {
						form = addAdvertise(obj.data[i].fieldType);
					} else {
						form += Getfromsonstr(obj.data[i].FormGroup[j].control, obj.data[i].FormGroup[j].label, obj.data[i].FormGroup[j].type, obj.data[i].FormGroup[j].id, obj.data[i].FormGroup[j].selectdata, hasPhoto,obj.data[i].FormGroup[j].validate,obj.data[i].FormGroup[j].defaultValue,operation);
					}
				}
			}
		}
		//如果有照片进行栅格布局
		if (hasPhoto) {
			//显示详情时候不需添加上传操作
			var width = 100,
				height = 140;
			if (type != "coachimg" && type != "stuimg") {
				width = 84;
			}
			if (operation && operation == "detailde") {
				body += '</div>' + /*<div class="col-lg-10 col-md-9 col-sm-12">结束*/
					'<div class="col-lg-4 col-md-4 col-sm-4">' + /*照片布局开始*/
					'<div id="file-preview" class="center-block">' +
					'<img src="" alt="" id="imagefile" style="width: ' + width + 'px; height: ' + height + 'px;">' +
					'<div style="width:' + width + 'px; margin-top: 10px; text-align:center;" id="photo-desc">照片</div>' +
					'</div>' +
					'</div>' + /*照片布局结束*/
					'</div>'; /*<div class='row'> 结束*/
			} else {
				body += '</div>' + /*<div class="col-lg-10 col-md-9 col-sm-12">结束*/
					'<div class="col-lg-4 col-md-4 col-sm-4">' + /*照片布局开始*/
					'<div id="file-preview" class="center-block" style="width: ' + width + 'px;">' +
					'<img src="" alt="" id="imagefile" style="width: 100%; height: ' + height + 'px;">' +
					'</div>' +
					'<div class="center-block" style="width:' + width + 'px; text-align: center; margin-top: 30px">' +
					'<button type="button" id="upload-btn" class="btn btn-default btn-sm" onclick="showImgFrame(' + "'" + ajaxurl + "'" + ',' + "'" + type + "'" + ',' + "'" + isthumb + "'" + ',' + "'" + scale + "'" +
					');">上传</button>' +
					'<span id="imagefileid" class="hidden"></span>' +
					'</div>' +
					'</div>' + /*照片布局结束*/
					'</div>'; /*<div class='row'> 结束*/
			}
		}
		//body +='</div></a></div>';radio 不能切换
		body +='</div></div>';
		
	}
	
	
	str = '<div class="container-fluid">' +
		'<div style="height:100%;overflow: auto;overflow-x: hidden;">' +
		'<form id="registrationForm" method="post" class="form-horizontal">' +
		'<div class="tabs-container">'+
			'<ul id="tabsul" class="nav nav-tabs">'+
				tab+
			'</ul>'+
			'<div class="tab-content">'+
				body +
			'</div>'+
		'</div>'+
		'</form>' + /*form 结束*/
		'</div>' +
		'</div>'; /*<div class="container-fluid">结束*/
	
	
	
//	str='<div class="tabs-container">'+
//        '<ul class="nav nav-tabs">'+
//            '<li class="active"><a data-toggle="tab" href="#tab-1" aria-expanded="true"> 第一个选项卡</a></li>'+
//            '<li class=""><a data-toggle="tab" href="#tab-2" aria-expanded="false">第二个选项卡</a></li>'+
//       ' </ul>'+
//        '<div class="tab-content">'+
//            '<div id="tab-1" class="tab-pane active">'+
//                '<div class="panel-body">'+
//                    '<strong>HTML5 文档类型</strong>'+
//                    '<p>Bootstrap 使用到的某些 HTML 元素和 CSS 属性需要将页面设置为 HTML5 文档类型。在你项目中的每个页面都要参照下面的格式进行设置。</p>'+
//                '</div>'+
//            '</div>'+
//            '<div id="tab-2" class="tab-pane">'+
//                '<div class="panel-body">'+
//                    '<strong>移动设备优先</strong>'+
//                    '<p>在 Bootstrap 2 中，我们对框架中的某些关键部分增加了对移动设备友好的样式。而在 Bootstrap 3 中，我们重写了整个框架，使其一开始就是对移动设备友好的。这次不是简单的增加一些可选的针对移动设备的样式，而是直接融合进了框架的内核中。也就是说，Bootstrap 是移动设备优先的。针对移动设备的样式融合进了框架的每个角落，而不是增加一个额外的文件。</p>'+
//                '</div>'+
//            '</div>'+
//       ' </div>'+
//    '</div>"';
	
	
	return str;
};


function GetFrom1(obj, operation, ajaxurl, type, isthumb, scale) {
	var str = '';
	var body = '';
	var form = '';
	
	var num = 2; //每行的控件个数
	var rownum=2;
	if($.manageServer().rownum!==undefined){
		rownum=$.manageServer().rownum;
	}
	
	var label = "选择照片";
	for (var i = 0; i < obj.data.length; i++) {
		var hasPhoto = false;
		var photoNum = 0; //照片数量,拓展指纹照片用
		for (var j = 0; j < obj.data[i].FormGroup.length; j++) {
			if (obj.data[i].FormGroup[j].type == "file") {
				num = 2; //有照片时候放两个form-control,否则放3个
				hasPhoto = true;
				photoNum++;
			} else {
				num = rownum;
			}
		}
		title=obj.data[i].Title;
//		title=$.manageServer().title;
		body += getTitleStr1(title, hasPhoto); //拼接title
		for (var j = 0; j < obj.data[i].FormGroup.length; j++) {
			if ((j + 1) % num == 0) {
				if (obj.data[i].fingerPrint && obj.data[i].fingerPrint == "fingerPrint") {
					form = fingerInit();
				} else if (obj.data[i].personalimg && obj.data[i].personalimg == "personalimg") {
					form = uInitContainerByid(obj.data[i].image);
				} else if (obj.data[i].abstract) {
					form = addAbstract(obj.data[i].abstract);
				} else if (obj.data[i].personalimg) {
					if (obj.data[i].oneimg) {
						form = uInitContainerByid_one(obj.data[i].personalimg, obj.data[i].image);
					} else {
						form = uInitContainerByid(obj.data[i].personalimg, obj.data[i].image);
					}
				} else if (obj.data[i].image) {
					form = uInitContainerByid(obj.data[i].image, obj.data[i].inputid);
				} else if (obj.data[i].featureser && obj.data[i].featureser == "featureser") {
					form = specSerInit("featuretb");
				} else if (obj.data[i].coachabstract && obj.data[i].coachabstract == "coachabstract") {
					form = addAbstract("cabstracteditor");
				} else if (obj.data[i].freestandal && obj.data[i].freestandal == "freestandal") {
					form = feeStandal("feetable");
				} else if (obj.data[i].fieldType) {
					form = addAdvertise(obj.data[i].fieldType);
				} else {
					form += Getfromsonstr(obj.data[i].FormGroup[j].control, obj.data[i].FormGroup[j].label, obj.data[i].FormGroup[j].type, obj.data[i].FormGroup[j].id, obj.data[i].FormGroup[j].selectdata, hasPhoto,obj.data[i].FormGroup[j].validate,obj.data[i].FormGroup[j].defaultValue,operation);
				}
				body += GetRowConStr(form);
				form = '';
			} else {
				if (j + 1 == obj.data[i].FormGroup.length) {
					if (obj.data[i].fingerPrint && obj.data[i].fingerPrint == "fingerPrint") {
						form = fingerInit();
					} else if (obj.data[i].personalimg) {
						if (obj.data[i].oneimg) {
							form = uInitContainerByid_one(obj.data[i].personalimg, obj.data[i].image);
						} else {
							form = uInitContainerByid(obj.data[i].personalimg, obj.data[i].image);
						}
					} else if (obj.data[i].featureser && obj.data[i].featureser == "featureser") {
						form = specSerInit("featuretb");
					} else if (obj.data[i].image) {
						form = uInitContainerByid(obj.data[i].image, obj.data[i].inputid);
					} else if (obj.data[i].abstract) {
						form = addAbstract(obj.data[i].abstract);
					} else if (obj.data[i].featureser && obj.data[i].featureser == "featureser") {
						form = specSerInit("featuretb");
					} else if (obj.data[i].coachabstract && obj.data[i].coachabstract == "coachabstract") {
						form = addAbstract("cabstracteditor");
					} else if (obj.data[i].freestandal && obj.data[i].freestandal == "freestandal") {
						form = feeStandal("feetable");
					} else if (obj.data[i].fieldType) {
						form = addAdvertise(obj.data[i].fieldType);
					} else {
						form += Getfromsonstr(obj.data[i].FormGroup[j].control, obj.data[i].FormGroup[j].label, obj.data[i].FormGroup[j].type, obj.data[i].FormGroup[j].id, obj.data[i].FormGroup[j].selectdata, hasPhoto,obj.data[i].FormGroup[j].validate,obj.data[i].FormGroup[j].defaultValue,operation);
					}
					body += GetRowConStr(form);
					form = '';
				} else {
					if (obj.data[i].fingerPrint && obj.data[i].fingerPrint == "fingerPrint") {
						form = fingerInit();
					} else if (obj.data[i].personalimg) {
						if (obj.data[i].oneimg) {
							form = uInitContainerByid_one(obj.data[i].personalimg, obj.data[i].image);
						} else {
							form = uInitContainerByid(obj.data[i].personalimg, obj.data[i].image);
						}
					} else if (obj.data[i].image) {
						form = uInitContainerByid(obj.data[i].image, obj.data[i].inputid);
					} else if (obj.data[i].featureser && obj.data[i].featureser == "featureser") {
						form = specSerInit("featuretb");
					} else if (obj.data[i].coachabstract && obj.data[i].coachabstract == "coachabstract") {
						form = uInitContainer();
					} else if (obj.data[i].featureser && obj.data[i].featureser == "featureser") {
						form = specSerInit("featuretb");
					} else if (obj.data[i].coachabstract && obj.data[i].coachabstract == "coachabstract") {
						form = addAbstract("cabstracteditor");
					} else if (obj.data[i].freestandal && obj.data[i].freestandal == "freestandal") {
						form = feeStandal("feetable");
					} else if (obj.data[i].fieldType) {
						form = addAdvertise(obj.data[i].fieldType);
					} else {
						form += Getfromsonstr(obj.data[i].FormGroup[j].control, obj.data[i].FormGroup[j].label, obj.data[i].FormGroup[j].type, obj.data[i].FormGroup[j].id, obj.data[i].FormGroup[j].selectdata, hasPhoto,obj.data[i].FormGroup[j].validate,obj.data[i].FormGroup[j].defaultValue,operation);
					}
				}
			}
		}
		//如果有照片进行栅格布局
		if (hasPhoto) {
			//显示详情时候不需添加上传操作
			var width = 100,
				height = 140;
			if (type != "coachimg" && type != "stuimg") {
				width = 84;
			}
			if (operation && operation == "detailde") {
				body += '</div>' + /*<div class="col-lg-10 col-md-9 col-sm-12">结束*/
					'<div class="col-lg-4 col-md-4 col-sm-4">' + /*照片布局开始*/
					'<div id="file-preview" class="center-block">' +
					'<img src="" alt="" id="imagefile" style="width: ' + width + 'px; height: ' + height + 'px;">' +
					'<div style="width:' + width + 'px; margin-top: 10px; text-align:center;" id="photo-desc">照片</div>' +
					'</div>' +
					'</div>' + /*照片布局结束*/
					'</div>'; /*<div class='row'> 结束*/
			} else {
				body += '</div>' + /*<div class="col-lg-10 col-md-9 col-sm-12">结束*/
					'<div class="col-lg-4 col-md-4 col-sm-4">' + /*照片布局开始*/
					'<div id="file-preview" class="center-block" style="width: ' + width + 'px;">' +
					'<img src="" alt="" id="imagefile" style="width: 100%; height: ' + height + 'px;">' +
					'</div>' +
					'<div class="center-block" style="width:' + width + 'px; text-align: center; margin-top: 30px">' +
					'<button type="button" id="upload-btn" class="btn btn-default btn-sm" onclick="showImgFrame(' + "'" + ajaxurl + "'" + ',' + "'" + type + "'" + ',' + "'" + isthumb + "'" + ',' + "'" + scale + "'" +
					');">上传</button>' +
					'<span id="imagefileid" class="hidden"></span>' +
					'</div>' +
					'</div>' + /*照片布局结束*/
					'</div>'; /*<div class='row'> 结束*/
			}
		}
	}
	title=$.manageServer().title;
	str = '<div class="container-fluid">' +
		'<div style="height:100%;overflow: auto;overflow-x: hidden;">' +
		'<form id="registrationForm" method="post" class="form-horizontal" >' +
		body +
		'</form>' + /*form 结束*/
		'</div>' +
		'</div>'; /*<div class="container-fluid">结束*/
	return str;
};

//获取modalCon
function GetModalCon(GropData) {
	var ModalConData = {}; //定义对象
	ModalConData = {
		"data": []
	}
	for (var i = 0; i < GropData.length; i++) {
		ModalConData.data.push(GetModalCon_one(GropData[i][0], GropData[i][1], GropData[i][2], GropData[i][3]));
	}
	return ModalConData;
}

function getTitleStr1(title, hasPhoto) {
	var str = '';
	str = '<div class="form-title">' +
		'<h5 class="row-title">' +
		title +
		'</h5>' +
		'</div>';
//	str='';  
	return str;
}
//自加选项卡样式
function getTitleStr2(title, hasPhoto,act,i) {
	var str = '';
	str = '<li id="li-'+i+'" class="'+act+'"><a data-toggle="tab" href="#tab-'+i+'" aria-expanded="true">' +
			title +
		'</a></li>';
//	str='';  
	return str;
}

//返回FormGropData
function ReFormGropData(FormGropData) {
	var Data = []; //定义数组
	for (var i = 0; i < FormGropData.length; i++) {
		Data.push({
			"control": FormGropData[i][0],
			"label": FormGropData[i][1],
			"type": FormGropData[i][2],
			"id": FormGropData[i][3],
			"selectdata": ReSelectData(FormGropData[i][4],FormGropData[i][6]),
			"validate": FormGropData[i][5],
			"defaultValue":FormGropData[i][7]
		});
	}
	return Data; //返回数组
}


//返回selectdata
function ReSelectData(SelectData,SelectUrl) {
	var Data = []; //定义数组

	if(SelectData.length>0){
		for (var i = 0; i < SelectData.length; i++) {
			Data.push({
				"Text": SelectData[i][0],
				"value": SelectData[i][1]
			});
		}
	}else if(SelectUrl){
		$.ajax({  
		    url: basePath+SelectUrl, 
		    type: 'post',
		    async: false,
		    dataType: 'json',
		    success:function(data) {
				if(data){
					$.each(data,function(idx,optionObj){
						Data.push({
							"Text": optionObj.TEXT,
							"value": optionObj.VALUE
						});
					});
				}
			}
		});
	}	
	return Data; //返回数组
}


//获取modalCon的一个title
function GetModalCon_one(Title, type, FormGropData, strData) {
	var Data = {}; //定义对象
	switch (type) {
		case "sort":
			Data.Title = Title;
			Data.FormGroup = ReFormGropData(FormGropData);
			break;
		case "img":
			Data.Title = Title;
			Data.image = strData[0];
			Data.inputid = strData[1];
			Data.FormGroup = strData[2];
			break;
		case "fieldType":
			Data.Title = Title;
			Data.fieldType = strData[0];
			Data.FormGroup = strData[1];
			break;
		case "featureser":
			Data.Title = Title;
			Data.featureser = strData[0];
			Data.FormGroup = strData[1];
			break;
		case "freestandal":
			Data.Title = Title;
			Data.freestandal = strData[0];
			Data.FormGroup = strData[1];
			break;
		case "coachabstract":
			Data.Title = Title;
			Data.coachabstract = strData[0];
			Data.FormGroup = strData[1];
			break;
		case "abstract":
			Data.Title = Title;
			Data.abstract = strData[0];
			Data.FormGroup = strData[1];
			break;

	}
	return Data; //返回对象
}


function getModalconObj(btntype,nkname) {
	var ModalconObj = '';
	
	switch(nkname) {
		case "LSGX"://部门隶属关系调整
			ModalconObj = LSGX_Management_Modal_Con(btntype);
			break;
		case "XTGN": //系统功能模块
			ModalconObj = XTGN_Management_Modal_Con(btntype);
			break;
		case "XTCS": //系统参数模块
			ModalconObj = XTCS_Management_Modal_Con(btntype);
			break;
		case "XTYH": //系统用户模块
			ModalconObj = XTYH_Management_Modal_Con(btntype);
			break;
		case "MBJG": //民办机构模块
			ModalconObj = MBJG_Management_Modal_Con(btntype);
			break;
		case "MBJGSH": //民办机构审核模块
			ModalconObj = MBJGSH_Management_Modal_Con(btntype);
			break;
		case "ZZJG": //中职机构模块
			ModalconObj = ZZJG_Management_Modal_Con(btntype);
			break;
		case "ZZJGSH": //中职机构审核模块
			ModalconObj = ZZJGSH_Management_Modal_Con(btntype);
			break;
		case "ZZXXXQ": //中职机构校区模块
			ModalconObj = ZZXXXQ_Management_Modal_Con(btntype);
			break;
		case "ZZJGWH": //中职机构维护模块
			ModalconObj = ZZJGWH_Management_Modal_Con(btntype);
			break;
		case "ZZJGCX": //中职机构撤销登记模块
			ModalconObj = ZZJGCX_Management_Modal_Con(btntype);
			break;
		case "ZZXXBG": //中职机构信息变更模块
			ModalconObj = ZZXXBG_Management_Modal_Con(btntype);
			break;
		case "ZZXXBGSH": //中职机构信息变更审核模块
			ModalconObj = ZZXXBGSH_Management_Modal_Con(btntype);
			break;
		case "DWWH": //单位维护
			ModalconObj = DWWH_Management_Modal_Con(btntype);
			break;
		case "WYHRYGL": //高等教育下委员会人员管理模块
			ModalconObj = WYHRYGL_Management_Modal_Con(btntype);
			break;
		case "NBJGXXZC": //高等教育下内部机构注册模块
			ModalconObj = NBJGXXZC_Management_Modal_Con(btntype);
			break;
		case "CoachesManagement": //教练车模块
			CoachesManagement_Modal_Set(btntype, id, name);
			break;
		case "StudentManagement": //学员模块
			StudentManagement_Modal_Set(btntype, id, name);
			break;
		case "role": //角色模块
			Role_Modal_Set(btntype, id, name);
			break;
		case "user": //用户模块
			User_Modal_Set(btntype, id, name);
			break;
		case "Assessment": //考核员模块
			Assessment_Modal_Set(btntype, id, name);
			break;
		case "Safement": //安全员添加
			Safement_Modal_Set(btntype, id, name);
			break;
		case "TrainingEnd": //安全员添加
			TrainingEnd_Modal_Set(btntype, id, name);
			break;
		case "OrderAccept": //预约受理
			OrderAccept_Modal_Set(btntype, id, name);
			break;
		case "ScheduleArray": //排班分组
			ScheduleArray_Modal_Set(btntype, id, name);
			break;
		case "SchScheduleModel": //教练场排班模板
			SchScheduleModel_Modal_Set(btntype, id, name);
			break;
		case "CoaScheduleModel": //教练排班模板
			CoaScheduleModel_Modal_Set(btntype, id, name);
			break;
		case "StudentChargeConfirm": // 收费管理
			StudentChargeConfirm_Modal_Set(btntype, id, name);
			break;
		case "StudentChargeConfirms": // 收费管理
			StudentChargeConfirm_Modal_Set(btntype, id, name);
			break;
		case "XQJG"://学前机构注册
			ModalconObj = XQJG_Management_Modal_Con(btntype);
			break;
		case "XQJGSH"://学前机构审核
			ModalconObj = XQJGSH_Management_Modal_Con(btntype);
			break;
		case "GDJGLXFS"://高等教育机构联系方式
			ModalconObj= GDJGLXFS_Management_Modal_Con(btntype);
			break;
		case "XQJGBG"://学前机构信息变更
			ModalconObj = XQJGBG_Management_Modal_Con(btntype);
			break;
		case "XQJGBGSH"://学前机构信息变更审核
			ModalconObj = XQJGBGSH_Management_Modal_Con(btntype);
			break;
		case "XQJGCX"://学前机构审核
			ModalconObj = XQJGCX_Management_Modal_Con(btntype);
			break;
		case "XQXXYD"://学前学校用地数据
			ModalconObj = XQXXYD_Management_Modal_Con(btntype);
			break;
		case "XQXNJG"://学前内部机构维护
			ModalconObj = XQXNJG_Management_Modal_Con(btntype);
			break;
		case "XQXQ"://学前校区基本数据
			ModalconObj = XQXQ_Management_Modal_Con(btntype);
			break;
		case "JGXXZC"://高等教育机构信息注册
			ModalconObj = JGXXZC_Management_Modal_Con(btntype);
			break;
		case "WYHZCDJ"://高等教育机构委员会注册登记
			ModalconObj = WYHZCDJ_Management_Modal_Con(btntype);
			break;
		case "GDJGCX"://高等教育机构信息撤销
			ModalconObj = GDJGCX_Management_Modal_Con(btntype);
			break;
		case "ZXXJGZC"://中小学机构信息注册
			ModalconObj = ZXXJGZC_Management_Modal_Con(btntype);
			break;
		case "ZXXJGSH"://中小学机构信息审核
			ModalconObj = ZXXJGSH_Management_Modal_Con(btntype);
			break;
		case "ZXXJGBG"://中小学机构信息变更
			ModalconObj = ZXXJGBG_Management_Modal_Con(btntype);
			break;
		case "ZXXJGBGSH"://中小学机构信息变更审核
			ModalconObj = ZXXJGBGSH_Management_Modal_Con(btntype);
			break;
		case "ZXXXNJG"://中小学校内机构信息
			ModalconObj = ZXXXNJG_Management_Modal_Con(btntype);
			break;
		case "ZXXJGCX"://中小学校内机构撤销
			ModalconObj = ZXXJGCX_Management_Modal_Con(btntype);
			break;
		case "JGXXSH"://高等教育机构信息审核
			ModalconObj = JGXXSH_Management_Modal_Con(btntype);
		break;
		case "JGXXBG"://高等教育机构信息变更
			ModalconObj = JGXXBG_Management_Modal_Con(btntype);
		break;
		case "XXYDSJ"://高等教育机构学校用地数据
			ModalconObj = XXYDSJ_Management_Modal_Con(btntype);
		break;
		case "ZXXXQ"://中小学校校区信息
			ModalconObj = ZXXXQ_Management_Modal_Con(btntype);
			break;
		case "ZXXXXYD"://中小学学校用地信息
			ModalconObj = ZXXXXYD_Management_Modal_Con(btntype);
			break;
		case "JGXXBGSH"://高等教育机构信息变更审核
			ModalconObj = JGXXBGSH_Management_Modal_Con(btntype);
			break;
		case "GDJGXQ"://高等教育机构校区基本数据
			ModalconObj = GDJGXQ_Management_Modal_Con(btntype);
			break;
		case "XZJGGL"://教育行政管理机构注册
			ModalconObj = XZJGGL_Management_Modal_Con(btntype);
			break;
		case "XZJGGLSH"://教育行政管理机构审核
			ModalconObj = XZJGGLSH_Management_Modal_Con(btntype);
			break;
		case "JYSYDWSH"://教育事业单位审核
			ModalconObj = JYSYDWSH_Management_Modal_Con(btntype);
			break;
		case "GXXKDZC"://学科点注册登记
			ModalconObj = GXXKDZC_Management_Modal_Con(btntype);
		break;
		
		case "MBJGBG"://民办培训机构变更申请
			ModalconObj = MBJGBG_Management_Modal_Con(btntype);
		break;
		case "MBJGBGSH"://民办培训机构变更审核
			ModalconObj = MBJGBGSH_Management_Modal_Con(btntype);
		break;
		case "MBJGCXDJ"://民办培训机构撤销登记
			ModalconObj = MBJGCXDJ_Management_Modal_Con(btntype);
		break;
	}
	return ModalconObj; 
}

       
//加载模态框
function Getfromsonstr(control, label, type, id, selectData, flag,validate,defaultValue,operation) {
//	if(label=='审批文号'){
//	    console.log(control);
//		console.log(label);
	
//		console.log(id);
//		console.log(selectData);
//		console.log(flag);
//		console.log(validate);
//		console.log("nimeinimei");
//	console.log(defaultValue);
//		console.log("********************************");
//	}
	//如果是文件类型，则不需要添加至form-control
	if (type == "file") {
		return "";
	}
//	console.log("***************");
//	console.log(control);
//	console.log(label);
//	console.log(type);
//	console.log(id);
	
	var str = ''; //返回字符串
	var controlStr = ''; //中间内容
	var classStr='';
	var controlStr1;
	var controlStr2;
	var controlStr3;
	var i=0;
	
	
	switch (control) {
		case "input":
			if(label=='统一社会信用代码'||label=='法定代表人号'||label=='组织机构码'||label=='审批文号'){
				var ids="";
				//slelectData(值的格式：a_b_c，a为从0开始的数据，b为附件类型编码，c为列如： gdjyjgxxzc_addJgxx.do截取gdjyjgxxzc为c) 2017.3.1 郭毅 
				if(selectData!=null){
					
					for(var i=0;i<selectData.length;i++){
						ids+=selectData[i].Text;
					}
				}
				
				classStr="form-control input-sm";
				controlStr1 = '<input id="' + id + '" type="' + type + '"   class="'+classStr+'" '+validate+'  name="' + id.split("_")[1] + '" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
				//controlStr2='<input id="'+ids+'" type="text" name="filename"  style="display:none;">';
				
				controlStr2='<input id="'+ids+'" type="file" name="file"  style="display:none;" onchange="uploadFile(this);">';
				if(operation!='checkpic'){
					controlStr2+='<button data-bb-handler="success" id="' + ids + '_sc"  type="button" class="btn btn-primary btn-sm" onclick="picSc(this)">上传</button>';
				}
				if(operation=='update'||operation=='checkpic'){
					controlStr3='<button data-bb-handler="success" id="' + ids + '_ck"  type="button" class="btn btn-danger btn-sm" onclick="picCk(this)">查看</button>';
					//controlStr3='<button data-bb-handler="success" id="' + ids + '_ck" disabled=true type="button" class="btn btn-danger btn-sm" onclick="picCk(this)">查看</button>';
				}else{
					controlStr3='<button data-bb-handler="success" id="' + ids + '_ck"  type="button" class="btn btn-danger btn-sm" onclick="picCk(this)" style="display:none;">查看</button>';
				}
				
			}else{
				classStr="form-control input-sm "+validate;
				classStr="form-control input-sm ";
				controlStr = '<input id="' + id + '" type="' + type + '"   class="'+classStr+'" '+validate+'  name="' + id.split("_")[1] + '" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
			}
			break;
		case "inputr":
			if(label=='统一社会信用代码'||label=='法定代表人号'||label=='组织机构码'||label=='审批文号'){
				var ids="";
				if(selectData!=null){
					
					for(var i=0;i<selectData.length;i++){
						ids+=selectData[i].Text;
					
					}
				}
				
				classStr="form-control input-sm";
				controlStr1 = '<input id="' + id + '" type="' + type + '"  readonly="readonly" class="'+classStr+'" '+validate+'  name="' + id.split("_")[1] + '" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
				//controlStr2='<input id="'+ids+'" type="text" name="filename"  style="display:none;">';
				
				controlStr2='<input id="'+ids+'" type="file" name="file"  style="display:none;" onchange="uploadFile(this);">';
				if(operation!='checkpic'){
					controlStr2+='<button data-bb-handler="success" id="' + ids + '_sc"  type="button" class="btn btn-primary btn-sm" onclick="picSc(this)">上传</button>';
				}
				if(operation=='update'||operation=='checkpic'){
					
					//controlStr3='<button data-bb-handler="success" id="' + ids + '_ck" disabled=true type="button" class="btn btn-danger btn-sm" onclick="picCk(this)">查看</button>';
					controlStr3='<button data-bb-handler="success" id="' + ids + '_ck"   type="button" class="btn btn-danger btn-sm" onclick="picCk(this)">查看</button>';
				}else{
					controlStr3='<button data-bb-handler="success" id="' + ids + '_ck"  type="button" class="btn btn-danger btn-sm" onclick="picCk(this)" style="display:none;">查看</button>';
				}
				
			}else{
				classStr="form-control input-sm "+validate;
				classStr="form-control input-sm ";
				controlStr = '<input id="' + id + '" type="' + type + '"   readonly="readonly" class="'+classStr+'" '+validate+'  name="' + id.split("_")[1] + '" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
			}
			break;
		case "select":
			controlStr += '<select id="' + id + '" style="width:100%"  class="'+classStr+'" '+validate+'  name="' + id.split("_")[1] + '"><option value="">请选择</option>';
			if (selectData.length > 0) {
				for (var i = 0; i < selectData.length; i++) {
					if(defaultValue==selectData[i].value){
						controlStr += '<option  value="' + selectData[i].value + '">' + selectData[i].Text + '</option>';
					}else{
						controlStr += '<option value="' + selectData[i].value + '">' + selectData[i].Text + '</option>';
					}
					
					
					
					
				}
			}
			controlStr += '</select>';
			break;
		case "button":
			controlStr += '<div class="col-lg-6 col-md-6 col-xs-6  "><div class="col-md-8 col-xs-8 no-padding-left  padding-right-5"><button data-bb-handler="success" id="' + id + '"   type="button" class="btn btn-primary" onclick="test1();">'+validate+'</button></div></div>';
			break;
		case "selectr":
			controlStr += '<select id="' + id + '" disabled=true readonly="readonly" style="width:100%" name="' + id.split("_")[1] + '"><option value="">请选择</option>';
//			controlStr += '<select id="' + id + '" readonly="readonly" style="width:100%" name="' + id.split("_")[1] + '"><option value="">请选择</option>';
			if (selectData.length > 0) {
				for (var i = 0; i < selectData.length; i++) {
					controlStr += '<option value="' + selectData[i].value + '">' + selectData[i].Text + '</option>';
				}
			}
			controlStr += '</select>';
			break;
		case "selects":
			controlStr += '<select id="' + id + '" multiple="multiple" style="width:100%" name="' + id.split("_")[1] + '">';
			if (selectData.length > 0) {
				for (var i = 0; i < selectData.length; i++) {
					controlStr += '<option value="' + selectData[i].value + '">' + selectData[i].Text + '</option>';
				}
			}
			controlStr += '</select>';
			break;
		case "dayinput":
			classStr="input-group "+validate;
			controlStr = '<div class="dayinput"><div class="'+classStr+'"><span class="input-group-addon"><i class="fa fa-calendar"></i></span><input id="' + id + '" class="form-control "'+validate+'" name="' + id.split("_")[1] + '" type="text" data-date-format="yyyy-mm-dd"></div></div>';
			break;
		case "dayinputr":
			controlStr = '<div class="input-group"><span class="input-group-addon"><i class="fa fa-calendar"></i></span><input id="' + id + '" class="form-control" readonly="readonly" name="' + id.split("_")[1] + '" type="text" data-date-format="yyyy-mm-dd"></div>';
			break;
			//年月日历
		case "dayinputy":
			classStr="input-group "+validate;
			controlStr = '<div class="dayinputy"><div class="'+classStr+'"><span class="input-group-addon"><i class="fa fa-calendar"></i></span><input id="' + id + '" class="form-control "'+validate+'" name="' + id.split("_")[1] + '" type="text" data-date-format="yyyy-mm-dd"></div></div>';
			break;
		case "dayinputd":
			classStr="input-group "+validate;
			controlStr = '<div class="dayinputd"><div class="'+classStr+'"><span class="input-group-addon"><i class="fa fa-calendar"></i></span><input id="' + id + '" class="form-control "'+validate+'" name="' + id.split("_")[1] + '" type="text" data-date-format="yyyy-mm-dd"></div></div>';
			break;			
			
		case "Timeinput":
			controlStr = '<div class="input-group"><input class="form-control" id="' + id + '" name="' + id.split("_")[1] + '" type="text"><span class="input-group-addon" ><i class="fa fa-clock-o"></i></span></div>';
			break;
		case "Timeinputr":
			controlStr = '<div class="input-group"><input class="form-control" id="' + id + '" name="' + id.split("_")[1] + '"  readonly="readonly" type="text"><span class="input-group-addon" ><i class="fa fa-clock-o"></i></span></div>';
			break;
		case "textarea":
			controlStr = '<textarea id="' + id + '" type="' + type + '" class="form-control" name="' + id.split("_")[1] + '" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" ></textarea>';
			break;
		case "textarear":
			controlStr = '<textarea id="' + id + '"  class="form-control" name="' + id.split("_")[1] + '" readonly="readonly"   data-bv-notempty="true" data-bv-notempty-message="" ></textarea>';
			break;
		case "inputradio":
			if (selectData.length > 0) {
				for (var i = 0; i < selectData.length; i++) {
					if(defaultValue==selectData[i].value){
						controlStr += '<div class="radio radio-info radio-inline"><input type="' + type + '"  value="' + selectData[i].value + '" id="' + id +i+ '" name="' + id.split("_")[1] + '" checked><label for="' + id +i+ '"> ' + selectData[i].Text + ' </label></div>';
					}else{
						controlStr += '<div class="radio radio-info radio-inline"><input type="' + type + '"  value="' + selectData[i].value + '" id="' + id +i+ '" name="' + id.split("_")[1] + '"><label for="' + id +i+ '"> ' + selectData[i].Text + ' </label></div>';
					}
				}
			}
			//controlStr='<div class="radio radio-info radio-inline"> <input type="radio" id="inlineRadio1" value="option1" name="radioInline" checked=""><label for="inlineRadio1"> 选项 01 </label></div>';
			//controlStr+='<div class="radio radio-info radio-inline"><input type="radio" id="inlineRadio2" value="option2" name="radioInline"><label for="inlineRadio2"> 选项 02 </label></div>';
			
			break;
			
		case "inputradior":
			if (selectData.length > 0) {
				for (var i = 0; i < selectData.length; i++) {
					if(defaultValue==selectData[i].value){
						controlStr += '<div class="radio radio-info radio-inline"><input disabled="disabled"  type="' + type + '"  value="' + selectData[i].value + '" id="' + id +i+ '" name="' + id.split("_")[1] + '" checked><label for="' + id +i+ '"> ' + selectData[i].Text + ' </label></div>';
					}else{
						controlStr += '<div class="radio radio-info radio-inline"><input disabled="disabled"  type="' + type + '"  value="' + selectData[i].value + '" id="' + id +i+ '" name="' + id.split("_")[1] + '"><label for="' + id +i+ '"> ' + selectData[i].Text + ' </label></div>';
					}
				}
			}
			//controlStr='<div class="radio radio-info radio-inline"> <input type="radio" id="inlineRadio1" value="option1" name="radioInline" checked=""><label for="inlineRadio1"> 选项 01 </label></div>';
			//controlStr+='<div class="radio radio-info radio-inline"><input type="radio" id="inlineRadio2" value="option2" name="radioInline"><label for="inlineRadio2"> 选项 02 </label></div>';
			
			break;
	}
	//添加照片后调整布局
	if (flag) {
		str = '<div class="col-lg-6 col-md-6 col-xs-6 ">' +
			'<label class="col-md-4 col-xs-4 control-label ">' + label + '</label>' +
			'<div class="col-md-8 col-xs-8 no-padding-left  padding-right-5">' +
			controlStr +
			'</div>' +
			'</div>';
	} else {
		var rownum= $.manageServer().rownum;
		if(rownum==1){
			str = '<div class="col-lg-8 col-md-8 col-xs-8  ">' +
			'<label class="col-md-4 col-xs-4 control-label ">' + label + '</label>' +
			'<div class="col-md-8 col-xs-8 no-padding-left  padding-right-5">' +
			controlStr +
			'</div>' +
			'</div>';
		}else if(rownum==2){
			if(label=='统一社会信用代码'||label=='法定代表人号'||label=='组织机构码'||label=='审批文号'){
				str = '<div class="col-lg-6 col-md-6 col-xs-6  ">' +
				'<label class="col-md-4 col-xs-4 control-label ">' + label + '</label>' +
				'<div class="col-md-8 col-xs-8 no-padding-left  padding-right-5">' +
				'<div class="row">'+
				'<div class="col-md-8 col-xs-8">'+
				controlStr1 +
				'</div>' +
				'<div class="col-md-2 col-xs-2">'+
				controlStr2 +
				'</div>' +
				'<div class="col-md-2 col-xs-2">'+
				controlStr3 +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>';
			}else{
				str = '<div class="col-lg-6 col-md-6 col-xs-6  ">' +
				'<label class="col-md-4 col-xs-4 control-label ">' + label + '</label>' +
				'<div class="col-md-8 col-xs-8 no-padding-left  padding-right-5">' +
				controlStr +
				'</div>' +
				'</div>';
			}
			
			
			
			
			
		}else if(rownum==3){
			str = '<div class="col-lg-4 col-md-4 col-xs-4  ">' +
			'<label class="col-md-4 col-xs-4 control-label ">' + label + '</label>' +
			'<div class="col-md-8 col-xs-8 no-padding-left  padding-right-5">' +
			controlStr +
			'</div>' +
			'</div>';
		}else{
			str = '<div class="col-lg-6 col-md-6 col-xs-6  ">' +
			'<label class="col-md-4 col-xs-4 control-label ">' + label + '</label>' +
			'<div class="col-md-8 col-xs-8 no-padding-left  padding-right-5">' +
			controlStr +
			'</div>' +
			'</div>';
		}
	}
	return str;
}


//获取一行表单
function GetRowConStr(fromsonstr) {
	var str = '';
	str = '<div class="form-group has-feedback">' +
		fromsonstr +
		'</div>';
	return str;
}

//系统功能模块
var XTGN_Management_Modal_Con = function(btntype) {
	var ModalconObj2 = "";
	ModalconObj2 = ModalconObj_XTGN;
	return ModalconObj2;
}



var btntype = "add";
var zhcxBj = "";
$('#ListAdd').click(function(){
	btntype="add";
	var style = $.manageServer().modelStyle;
	var mes = '';
	if(style=='tabs'){
		mes=GetFrom2(getModalconObj(btntype,$.manageServer().mkname), "add", "", 'stuimg', 'with', '50');
	}else{
		mes=GetFrom1(getModalconObj(btntype,$.manageServer().mkname), "add", "", 'stuimg', 'with', '50');
	}

   			bootbox.dialog({
				message: ObstructHtml_none() + mes, // init() + GetFrom1(getModalconObj(btntype), "add", IP + "/rmwebapp/file/", 'stuimg', 'with', '50'),
				title: title,
				size: $.manageServer().modelSize,
				buttons: {
					success: {
						label: "保存",
						className: "btn-primary",
						callback: function() {
   							if(style=='tabs'){
   								var len = $("#tabsul li").length;
   								for(var i=1;i<len+1;i++){
   									$('#tab-'+i).addClass("active");
   								}
   								if($("#registrationForm").valid()){
									_addFunction();
								}else{
									var errorTabId = '';
									var validateRes=true;
									$.each($('#registrationForm .tab-content>.tab-pane'),function(i,$tab){
										$.each($('input,select',$tab),function(i,$tab_li){
											if(!$form_valid.element($tab_li)){
												errorTabId = $($tab).attr('id');
												
												validateRes=false;
												return false;
											}
										});
										if(!validateRes){
											return false;
										}
									});
									
									for(var i=1;i<len+1;i++){
   										$('#tab-'+i).removeClass("active");
   										$('#li-'+i).removeClass("active");
   									}
									$('#'+errorTabId).addClass("active");
									$('#li-'+errorTabId.split('-')[1]).addClass("active");
									return false;
								}
   							}else{
								if($("#registrationForm").valid()){
									_addFunction();
								}else{
									return false;
								}
   							}
						}
					},
					"取消": {
						className: "btn-warning",
						callback: function() {
							
						}
					}
				}
			});  
   			
   			//设置表单的默认值
   			var defaultValue=$.manageServer().defaultValue;
   			if(defaultValue!=null && defaultValue !=undefined){
   				for(var id in defaultValue){
   					$("#"+id).val(defaultValue[id]);
   				}
   			}
   				
   			
   			$("#registrationForm select").select2();
   			 //初始化日期控件
			$(".dayinput .input-group.date").datepicker({
		        todayBtn: "linked",			//突出当前日期
		        todayHighlight : !0 ,		//如果这是真的,突出当前日期。
		        keyboardNavigation: !1,		//是否允许日期导航箭头键。
		        forceParse: !1,
		      //  calendarWeeks: !0,			//是否显示左边的数字每周行。
		        autoclose: !0,
		        format:'yyyymmdd'
		    });
			//年月
			$(".dayinputy .input-group.date").datepicker( {
				minViewMode : 1,		//最小选择范围，0为日，1为月，2为年
				keyboardNavigation : !1,
				forceParse : !1,
				autoclose : !0,
				todayHighlight : !0 ,
				format:'yyyymm'
			});
			$(".dayinputd .input-group.date").datepicker({
				
				startView: 1,      //选择日期范围从月开始。0为日，1为月，2为年
				maxViewMode: 1,   //选择日期最大范围到月。0为日，1为月，2为年
				minViewMode:0,    //选择日期最小范围到日。0为日，1为月，2为年
// 				language: "zh-CN", //汉化 
		        todayBtn: "linked",			//突出当前日期
		        todayHighlight : !0 ,		//如果这是真的,突出当前日期.
		        keyboardNavigation: !1,		//是否允许日期导航箭头键.
		        forceParse: !1,
		      //  calendarWeeks: !0,			//是否显示左边的数字每周行.
		        autoclose: !0,
		        endDate : new Date(),  //可选的截至日期为今天
		        format:'mm-dd'
		    });
			
			 var $form_valid = $("#registrationForm").validate({onfocusout: function(element) {
			  $(element).valid(); }});
//			$("#"+$.manageServer().addFormId,window.parent.document).validate({
//					onfocusout: function(element) {
//				alert(1111);
//					  $(element).valid(); 
//					}
//			});
	   	});

//添加子表的编辑
function updateDialogChildren(obj){
	check = "check";
	updateDialog1(obj);
}

function updateDialog(obj){
	updateDialog1(obj);
}

function save_add(){
    	 	var style = $.manageServer().modelStyle;
	             if(style=='tabs'){
   								var len = $("#tabsul li").length;
   								
									var errorTabId = '';
   								
									$.each($('#registrationForm .tab-content>.tab-pane'),function(i,$tab){
										if($($tab).hasClass("active")){
											errorTabId=$($tab)[0].id;
											return false;
										}
									});
   								for(var i=1;i<len+1;i++){
   									$('#tab-'+i).addClass("active");
   								}
   								if($("#registrationForm").valid()){
   									for(var i=1;i<len+1;i++){
   										$('#tab-'+i).removeClass("active");
   										$('#li-'+i).removeClass("active");
   									}
									$('#'+errorTabId).addClass("active");
									$('#li-'+errorTabId.split('-')[1]).addClass("active");
									_addFunction_add();
									if(dialogbj!=='1'){
										return false;
									}
								}else{
									var validateRes=true;															
//									$.each($('#registrationForm .tab-content>.tab-pane'),function(i,$tab){
//										$.each($('input,select',$tab),function(i,$tab_li){
//											if(!$form_valid.element($tab_li)){
//												errorTabId = $($tab).attr('id');
//												validateRes=false;
//												return false;
//											}
//										});
//										if(!validateRes){
//											return false;
//										}
//									});
									for(var i=1;i<len+1;i++){
   										$('#tab-'+i).removeClass("active");
   										$('#li-'+i).removeClass("active");
   									}
									$('#'+errorTabId).addClass("active");
									$('#li-'+errorTabId.split('-')[1]).addClass("active");
									return false;
								}
   							}else{
								if($("#registrationForm").valid()){
									_addFunction_add();
									if(dialogbj!=='1'){
										return false;
									}
								}else{
									return false;
								}
   							}
}

var _addFunction_add = function () {
	$.ajax({
		type:'post',
		async: false,
		url:$.manageServer().addUrl,
		data:$("#registrationForm").serialize(),
		dataType:'json',
		success:function(data){
			if(data.code=='1'){
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
					if(xzids){
						xzid = xzids.replace(new RegExp("@", "g"), "\\@");				    	
						var idss = parent.$("#"+xzid);
					    idss.jstree('refresh');
					}
					window.history.back();
			    });	
			}else{
				swal("保存失败！", data.message, "error");
			}
			dialogaddbj=data.code;
		}
	});
}

     function save(){
    	 	var style = $.manageServer().modelStyle;
	             if(style=='tabs'){
   								var len = $("#tabsul li").length;
   								
									var errorTabId = '';
   								
									$.each($('#registrationForm .tab-content>.tab-pane'),function(i,$tab){
										if($($tab).hasClass("active")){
											errorTabId=$($tab)[0].id;
											return false;
										}
									});
   								for(var i=1;i<len+1;i++){
   									$('#tab-'+i).addClass("active");
   								}
   								if($("#registrationForm").valid()){
   									for(var i=1;i<len+1;i++){
   										$('#tab-'+i).removeClass("active");
   										$('#li-'+i).removeClass("active");
   									}
									$('#'+errorTabId).addClass("active");
									$('#li-'+errorTabId.split('-')[1]).addClass("active");
									_updateFunction();
//									$("#bc").attr("style","display: none;");	
//							        $("#sqsh_button").removeAttr("disabled");
									if(dialogbj!=='1'){
										return false;
									}
								}else{
									var validateRes=true;															
//									$.each($('#registrationForm .tab-content>.tab-pane'),function(i,$tab){
//										$.each($('input,select',$tab),function(i,$tab_li){
//											if(!$form_valid.element($tab_li)){
//												errorTabId = $($tab).attr('id');
//												validateRes=false;
//												return false;
//											}
//										});
//										if(!validateRes){
//											return false;
//										}
//									});
									for(var i=1;i<len+1;i++){
   										$('#tab-'+i).removeClass("active");
   										$('#li-'+i).removeClass("active");
   									}
									$('#'+errorTabId).addClass("active");
									$('#li-'+errorTabId.split('-')[1]).addClass("active");
									return false;
								}
   							}else{
								if($("#registrationForm").valid()){
									_updateFunction();
									if(dialogbj!=='1'){
										return false;
									}
								}else{
									return false;
								}
   							}
}
function updateDialog1(obj){
	btntype = "update";
	var style = $.manageServer().modelStyle;
	var mes = '';
	if(style=='tabs'){
		mes=GetFrom2(getModalconObj(btntype,$.manageServer().mkname), "update", "", 'stuimg', 'with', '50');
	}else{
		mes=GetFrom1(getModalconObj(btntype,$.manageServer().mkname), "update", "", 'stuimg', 'with', '50');
	}
		bootbox.dialog({
				message: ObstructHtml_none() + mes, // init() + GetFrom1(getModalconObj(btntype), "add", IP + "/rmwebapp/file/", 'stuimg', 'with', '50'),
				title: title,
				size: $.manageServer().modelSize,
				buttons: {
					success: {
						label: "保存",
						className: "btn-primary",
						callback: function() {
			
							if(style=='tabs'){
   								var len = $("#tabsul li").length;
   								
									var errorTabId = '';
   								
									$.each($('#registrationForm .tab-content>.tab-pane'),function(i,$tab){
										if($($tab).hasClass("active")){
											errorTabId=$($tab)[0].id;
											return false;
										}
									});
   								for(var i=1;i<len+1;i++){
   									$('#tab-'+i).addClass("active");
   								}
   								if($("#registrationForm").valid()){
   									for(var i=1;i<len+1;i++){
   										$('#tab-'+i).removeClass("active");
   										$('#li-'+i).removeClass("active");
   									}
									$('#'+errorTabId).addClass("active");
									$('#li-'+errorTabId.split('-')[1]).addClass("active");
									_updateFunction();
									if(dialogbj!=='1'){
										return false;
									}
								}else{
									var validateRes=true;															
//									$.each($('#registrationForm .tab-content>.tab-pane'),function(i,$tab){
//										$.each($('input,select',$tab),function(i,$tab_li){
//											if(!$form_valid.element($tab_li)){
//												errorTabId = $($tab).attr('id');
//												validateRes=false;
//												return false;
//											}
//										});
//										if(!validateRes){
//											return false;
//										}
//									});
									for(var i=1;i<len+1;i++){
   										$('#tab-'+i).removeClass("active");
   										$('#li-'+i).removeClass("active");
   									}
									$('#'+errorTabId).addClass("active");
									$('#li-'+errorTabId.split('-')[1]).addClass("active");
									return false;
								}
   							}else{
								if($("#registrationForm").valid()){
									_updateFunction();
									if(dialogbj!=='1'){
										return false;
									}
								}else{
									return false;
								}
   							}
						}
					},
					"取消": {
						className: "btn-warning",
						callback: function() {
							
						}
					}
				}
			}); 
		
		
			$("#registrationForm select").select2();
	   			 //初始化日期控件
			$(".dayinput .input-group.date").datepicker({
		        todayBtn: "linked",
		        keyboardNavigation: !1,
		        forceParse: !1,
		        calendarWeeks: !0,
		        autoclose: !0,
		        format:'yyyymmdd'
		    });
			$(".dayinputy .input-group.date").datepicker( {
				minViewMode : 1,
				keyboardNavigation : !1,
				forceParse : !1,
				autoclose : !0,
				todayHighlight : !0,
				format:'yyyymm'
			});
			$(".dayinputd .input-group.date").datepicker( {
								startView: 1,      //选择日期范围从月开始。0为日，1为月，2为年
				maxViewMode: 1,   //选择日期最大范围到月。0为日，1为月，2为年
				minViewMode:0,    //选择日期最小范围到日。0为日，1为月，2为年
// 				language: "zh-CN", //汉化 
		        todayBtn: "linked",			//突出当前日期
		        todayHighlight : !0 ,		//如果这是真的,突出当前日期.
		        keyboardNavigation: !1,		//是否允许日期导航箭头键.
		        forceParse: !1,
		      //  calendarWeeks: !0,			//是否显示左边的数字每周行.
		        autoclose: !0,
		        endDate : new Date(),  //可选的截至日期为今天
		        format:'mm-dd'

			});
		  var $form_valid = $("#registrationForm").validate({onfocusout: function(element) {
			  $(element).valid(); }});
		
			$.ajax({
				type:'post',
				url:$.manageServer().toUpdateUrl,
				data:obj,
				dataType:'json',
				success:function(data){
					if(data){
						setUpdateDialogValue(data,getModalconObj(btntype,$.manageServer().mkname));
						 
					}else{
						swal("加载失败！", "信息加载失败，请联系技术人员。", "error");
					}
					
					
					//设置表单的默认值
		   			var defaultValue=$.manageServer().updateDefaultValue;
		   			if(defaultValue!=null && defaultValue !=undefined){
		   				for(var id_type in defaultValue){
		   					var type=id_type.split("@")[1];
		   					var id=id_type.split("@")[0];
		   					if("select"==type){
		   						$("#"+id).select2().select2("val", defaultValue[id_type]);
		   					}else if("input"==type){
		   						$("#"+id).val(defaultValue[id_type]);
		   					}else if("textarea"==type){
		   						$("#"+id).html(defaultValue[id_type]);
		   					}
		   					
		   				}
		   			}
					
				}
			});
			var xxdmNew = obj.xxdm;
			if(obj.bj=="mbjg"){//区分民办和其他教育机构
				xxdmNew = obj.jgbm;
			}
			if(obj.bj!=undefined){
				$.ajax({
					type:'post',
					url:basePath+'common_getUpdate.do',
					data:{xxdm:xxdmNew,bj:obj.bj},
					dataType:'text',
					success:function(data){
						if(data!=''&&data!=null){
							var arr=data.split("@");
							if(obj.bj!='gxxxjbxx' && obj.bj!='mbjg'){
								$("#"+obj.bj+"_szds").select2().select2("val",arr[1]);
								if(arr[0]=='0'){
									getXxs(arr[2],obj.bj,arr[15]);
								}
								if(arr[1]!=''&&arr[1]!=null){
									getQxs(arr[1],obj.bj,arr[2]);
								}
								if(arr[2]!=''&&arr[2]!=null){
									getSzxzs(arr[2],obj.bj,arr[3]);
								}
								if(arr[3]!=''&&arr[3]!=null){
									getSzcws(arr[3],obj.bj,arr[4]);
								}
								if(arr[5]!=''&&arr[5]!=null){
									getCjjg3(arr[5],obj.bj,arr[6]);
								}
								if(arr[6]!=''&&arr[6]!=null){
									getCjjg4(arr[6],obj.bj,arr[7]);
								}
								if(arr[7]!=''&&arr[7]!=null){
									getCjjg5(arr[7],obj.bj,arr[8]);
								}
								if(arr[9]!=''&&arr[9]!=null){
									getTjjg3(arr[9],obj.bj,arr[10]);
								}
								if(arr[10]!=''&&arr[10]!=null){
									getTjjg4(arr[10],obj.bj,arr[11]);
								}
								if(arr[11]!=''&&arr[11]!=null){
									getTjjg5(arr[11],obj.bj,arr[12]);
								}
								if(arr[13]!=''&&arr[13]!=null){
									getSzdcxlxms(arr[13],obj.bj,arr[14]);
								}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
							}else{
//								if(arr[0]=='0'){
//									getXxs(arr[2],obj.bj,arr[7]);
//								}
								$("#"+obj.bj+"_dsdm").select2().select2("val",arr[1]);
								if(arr[1]!=''&&arr[1]!=null){
									getQxs(arr[1],obj.bj,arr[2]);
								}
								if(arr[2]!=''&&arr[2]!=null){
									getSzxzs(arr[2],obj.bj,arr[3]);
								}
								if(arr[3]!=''&&arr[3]!=null){
									getSzcws(arr[3],obj.bj,arr[4]);
								}
								if(arr[5]!=''&&arr[5]!=null){
									getSzdcxlxms(arr[5],obj.bj,arr[6]);
								}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
							}
						}
						
		   			}
				});
			}
			
		
}

//审核 系统管理使用  2017.4.4 郭毅
var dourl;
function updateDialog_sh(obj){
	btntype = "update";
	var style = $.manageServer().modelStyle;
	var mknames = $.manageServer().mkname;
	var tourl = $.manageServer().toUpdateUrl;
	 dourl = $.manageServer().updateUrl;
	var mes = '';
	if(style=='tabs'){
		if(obj.bj=='xqjg'){
			mknames =  $.manageServer().mknamexq;
			tourl = $.manageServer().toUpdateUrlxq;
			dourl = $.manageServer().updateUrlxq;
		}else if(obj.bj=='zxxjgzc'){
			mknames =  $.manageServer().mknamezxx;
			tourl = $.manageServer().toUpdateUrlzxx;
			dourl = $.manageServer().updateUrlzxx;
		}else if(obj.bj=='jgxx'){
			mknames =  $.manageServer().mknamezz;
			tourl = $.manageServer().toUpdateUrlzz;
			dourl = $.manageServer().updateUrlzz;
		}else if(obj.bj=='gxxxjbxx'){
			mknames =  $.manageServer().mknamegd;
			tourl = $.manageServer().toUpdateUrlgd;
			dourl = $.manageServer().updateUrlgd;
		}
		mes=GetFrom2(getModalconObj(btntype,mknames), "checkpic", "", 'stuimg', 'with', '50');
	}else{
		mes=GetFrom1(getModalconObj(btntype,mknames), "update", "", 'stuimg', 'with', '50');
	}
		bootbox.dialog({
				message: ObstructHtml_none() + mes, // init() + GetFrom1(getModalconObj(btntype), "add", IP + "/rmwebapp/file/", 'stuimg', 'with', '50'),
				title: title,
				size: $.manageServer().modelSize,
				buttons: {
					success: {
						label: "保存",
						className: "btn-primary",
						callback: function() {
			
							if(style=='tabs'){
   								var len = $("#tabsul li").length;
   								for(var i=1;i<len+1;i++){
   									$('#tab-'+i).addClass("active");
   								}
   								if($("#registrationForm").valid()){
									_updateFunctionsh();
								}else{
									var errorTabId = '';
									var validateRes=true;
									$.each($('#registrationForm .tab-content>.tab-pane'),function(i,$tab){
										$.each($('input,select',$tab),function(i,$tab_li){
											if(!$form_valid.element($tab_li)){
												errorTabId = $($tab).attr('id');
												validateRes=false;
												return false;
											}
										});
										if(!validateRes){
											return false;
										}
									});
									for(var i=1;i<len+1;i++){
   										$('#tab-'+i).removeClass("active");
   										$('#li-'+i).removeClass("active");
   									}
									$('#'+errorTabId).addClass("active");
									$('#li-'+errorTabId.split('-')[1]).addClass("active");
									return false;
								}
   							}else{
								if($("#registrationForm").valid()){
									_updateFunctionsh();
								}else{
									return false;
								}
   							}
						}
					},
					"取消": {
						className: "btn-warning",
						callback: function() {
							
						}
					}
				}
			}); 
		
		
			$("#registrationForm select").select2();
	   			 //初始化日期控件
			$(".dayinput .input-group.date").datepicker({
		        todayBtn: "linked",
		        keyboardNavigation: !1,
		        forceParse: !1,
		        calendarWeeks: !0,
		        autoclose: !0,
		        format:'yyyymmdd'
		    });
			$(".dayinputy .input-group.date").datepicker( {
				minViewMode : 1,
				keyboardNavigation : !1,
				forceParse : !1,
				autoclose : !0,
				todayHighlight : !0,
				format:'yyyymm'
			});
			$(".dayinputd .input-group.date").datepicker( {
								startView: 1,      //选择日期范围从月开始。0为日，1为月，2为年
				maxViewMode: 1,   //选择日期最大范围到月。0为日，1为月，2为年
				minViewMode:0,    //选择日期最小范围到日。0为日，1为月，2为年
// 				language: "zh-CN", //汉化 
		        todayBtn: "linked",			//突出当前日期
		        todayHighlight : !0 ,		//如果这是真的,突出当前日期.
		        keyboardNavigation: !1,		//是否允许日期导航箭头键.
		        forceParse: !1,
		      //  calendarWeeks: !0,			//是否显示左边的数字每周行.
		        autoclose: !0,
		        endDate : new Date(),  //可选的截至日期为今天
		        format:'mm-dd'

			});
		  var $form_valid = $("#registrationForm").validate({onfocusout: function(element) {
			  $(element).valid(); }});
		
			$.ajax({
				type:'post',
				url:tourl,
				data:obj,
				dataType:'json',
				success:function(data){
					if(data){
						setUpdateDialogValue(data,getModalconObj(btntype,mknames));
						 
					}else{
						swal("加载失败！", "信息加载失败，请联系技术人员。", "error");
					}
					
					
					//设置表单的默认值
		   			var defaultValue=$.manageServer().updateDefaultValue;
		   			if(defaultValue!=null && defaultValue !=undefined){
		   				for(var id_type in defaultValue){
		   					var type=id_type.split("@")[1];
		   					var id=id_type.split("@")[0];
		   					if("select"==type){
		   						$("#"+id).select2().select2("val", defaultValue[id_type]);
		   					}else if("input"==type){
		   						$("#"+id).val(defaultValue[id_type]);
		   					}else if("textarea"==type){
		   						$("#"+id).html(defaultValue[id_type]);
		   					}
		   					
		   				}
		   			}
					
				}
			});
			
			if(obj.bj!=undefined){
				//alert(obj.bj);
				$.ajax({
					type:'post',
					url:basePath+'common_getUpdate.do',
					data:{xxdm:obj.xxdm,bj:obj.bj},
					dataType:'text',
					success:function(data){
//						console.log(data);
						if(data!=''&&data!=null){
							var arr=data.split("@");
							if(obj.bj!='gxxxjbxx'){
								$("#"+obj.bj+"_szds").select2().select2("val",arr[1]);
								if(arr[0]=='0'){
									getXxs(arr[2],obj.bj,arr[15]);
								}
								if(arr[1]!=''&&arr[1]!=null){
									getQxs(arr[1],obj.bj,arr[2]);
								}
								if(arr[2]!=''&&arr[2]!=null){
									getSzxzs(arr[2],obj.bj,arr[3]);
								}
								if(arr[3]!=''&&arr[3]!=null){
									getSzcws(arr[3],obj.bj,arr[4]);
								}
								if(arr[5]!=''&&arr[5]!=null){
									getCjjg3(arr[5],obj.bj,arr[6]);
								}
								if(arr[6]!=''&&arr[6]!=null){
									getCjjg4(arr[6],obj.bj,arr[7]);
								}
								if(arr[7]!=''&&arr[7]!=null){
									getCjjg5(arr[7],obj.bj,arr[8]);
								}
								if(arr[9]!=''&&arr[9]!=null){
									getTjjg3(arr[9],obj.bj,arr[10]);
								}
								if(arr[10]!=''&&arr[10]!=null){
									getTjjg4(arr[10],obj.bj,arr[11]);
								}
								if(arr[11]!=''&&arr[11]!=null){
									getTjjg5(arr[11],obj.bj,arr[12]);
								}
								if(arr[13]!=''&&arr[13]!=null){
									getSzdcxlxms(arr[13],obj.bj,arr[14]);
								}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
							}else{
//								if(arr[0]=='0'){
//									getXxs(arr[2],obj.bj,arr[7]);
//								}
								$("#"+obj.bj+"_dsdm").select2().select2("val",arr[1]);
								if(arr[1]!=''&&arr[1]!=null){
									getQxs(arr[1],obj.bj,arr[2]);
								}
								if(arr[2]!=''&&arr[2]!=null){
									getSzxzs(arr[2],obj.bj,arr[3]);
								}
								if(arr[3]!=''&&arr[3]!=null){
									getSzcws(arr[3],obj.bj,arr[4]);
								}
								if(arr[5]!=''&&arr[5]!=null){
									getSzdcxlxms(arr[5],obj.bj,arr[6]);
								}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
							}
						}
						
		   			}
				});
			}
			
		
}

//审核 撤销时使用  2017.3.11 郭毅

function updateDialog_shcx(obj){
	btntype = "update";
	var style = $.manageServer().modelStyle;
	var mes = '';
	if(style=='tabs'){
		mes=GetFrom2(getModalconObj(btntype,$.manageServer().mkname), "checkpic", "", 'stuimg', 'with', '50');
	}else{
		mes=GetFrom1(getModalconObj(btntype,$.manageServer().mkname), "update", "", 'stuimg', 'with', '50');
	}
		bootbox.dialog({
				message: ObstructHtml_none() + mes, // init() + GetFrom1(getModalconObj(btntype), "add", IP + "/rmwebapp/file/", 'stuimg', 'with', '50'),
				title: title,
				size: $.manageServer().modelSize,
				buttons: {
					success: {
						label: "保存",
						className: "btn-primary",
						callback: function() {
			
							if(style=='tabs'){
   								var len = $("#tabsul li").length;
   								for(var i=1;i<len+1;i++){
   									$('#tab-'+i).addClass("active");
   								}
   								if($("#registrationForm").valid()){
									_updateFunction();
								}else{
									var errorTabId = '';
									var validateRes=true;
									$.each($('#registrationForm .tab-content>.tab-pane'),function(i,$tab){
										$.each($('input,select',$tab),function(i,$tab_li){
											if(!$form_valid.element($tab_li)){
												errorTabId = $($tab).attr('id');
												validateRes=false;
												return false;
											}
										});
										if(!validateRes){
											return false;
										}
									});
									for(var i=1;i<len+1;i++){
   										$('#tab-'+i).removeClass("active");
   										$('#li-'+i).removeClass("active");
   									}
									$('#'+errorTabId).addClass("active");
									$('#li-'+errorTabId.split('-')[1]).addClass("active");
									return false;
								}
   							}else{
								if($("#registrationForm").valid()){
									_updateFunction();
								}else{
									return false;
								}
   							}
						}
					},
					"取消": {
						className: "btn-warning",
						callback: function() {
							
						}
					}
				}
			}); 
		
		
			$("#registrationForm select").select2();
	   			 //初始化日期控件
			$(".dayinput .input-group.date").datepicker({
		        todayBtn: "linked",
		        keyboardNavigation: !1,
		        forceParse: !1,
		        calendarWeeks: !0,
		        autoclose: !0,
		        format:'yyyymmdd'
		    });
			$(".dayinputy .input-group.date").datepicker( {
				minViewMode : 1,
				keyboardNavigation : !1,
				forceParse : !1,
				autoclose : !0,
				todayHighlight : !0,
				format:'yyyymm'
			});
			$(".dayinputd .input-group.date").datepicker( {
							startView: 1,      //选择日期范围从月开始。0为日，1为月，2为年
				maxViewMode: 1,   //选择日期最大范围到月。0为日，1为月，2为年
				minViewMode:0,    //选择日期最小范围到日。0为日，1为月，2为年
// 				language: "zh-CN", //汉化 
		        todayBtn: "linked",			//突出当前日期
		        todayHighlight : !0 ,		//如果这是真的,突出当前日期.
		        keyboardNavigation: !1,		//是否允许日期导航箭头键.
		        forceParse: !1,
		      //  calendarWeeks: !0,			//是否显示左边的数字每周行.
		        autoclose: !0,
		        endDate : new Date(),  //可选的截至日期为今天
		        format:'mm-dd'

			});
		  var $form_valid = $("#registrationForm").validate({onfocusout: function(element) {
			  $(element).valid(); }});
		
			$.ajax({
				type:'post',
				url:$.manageServer().toUpdateUrl,
				data:obj,
				dataType:'json',
				success:function(data){
					if(data){
						setUpdateDialogValue(data,getModalconObj(btntype,$.manageServer().mkname));
						 
					}else{
						swal("加载失败！", "信息加载失败，请联系技术人员。", "error");
					}
					
					
					//设置表单的默认值
		   			var defaultValue=$.manageServer().updateDefaultValue;
		   			if(defaultValue!=null && defaultValue !=undefined){
		   				for(var id_type in defaultValue){
		   					var type=id_type.split("@")[1];
		   					var id=id_type.split("@")[0];
		   					if("select"==type){
		   						$("#"+id).select2().select2("val", defaultValue[id_type]);
		   					}else if("input"==type){
		   						$("#"+id).val(defaultValue[id_type]);
		   					}else if("textarea"==type){
		   						$("#"+id).html(defaultValue[id_type]);
		   					}
		   					
		   				}
		   			}
					
				}
			});
			
			if(obj.bj!=undefined){
				$.ajax({
					type:'post',
					url:basePath+'common_getUpdate.do',
					data:{xxdm:obj.xxdm,bj:obj.bj},
					dataType:'text',
					success:function(data){
//						console.log(data);
						if(data!=''&&data!=null){
							var arr=data.split("@");
							if(obj.bj!='gxxxjbxx'){
								$("#"+obj.bj+"_szds").select2().select2("val",arr[1]);
								if(arr[0]=='0'){
									getXxs(arr[2],obj.bj,arr[15]);
								}
								if(arr[1]!=''&&arr[1]!=null){
									getQxs(arr[1],obj.bj,arr[2]);
								}
								if(arr[2]!=''&&arr[2]!=null){
									getSzxzs(arr[2],obj.bj,arr[3]);
								}
								if(arr[3]!=''&&arr[3]!=null){
									getSzcws(arr[3],obj.bj,arr[4]);
								}
								if(arr[5]!=''&&arr[5]!=null){
									getCjjg3(arr[5],obj.bj,arr[6]);
								}
								if(arr[6]!=''&&arr[6]!=null){
									getCjjg4(arr[6],obj.bj,arr[7]);
								}
								if(arr[7]!=''&&arr[7]!=null){
									getCjjg5(arr[7],obj.bj,arr[8]);
								}
								if(arr[9]!=''&&arr[9]!=null){
									getTjjg3(arr[9],obj.bj,arr[10]);
								}
								if(arr[10]!=''&&arr[10]!=null){
									getTjjg4(arr[10],obj.bj,arr[11]);
								}
								if(arr[11]!=''&&arr[11]!=null){
									getTjjg5(arr[11],obj.bj,arr[12]);
								}
								if(arr[13]!=''&&arr[13]!=null){
									getSzdcxlxms(arr[13],obj.bj,arr[14]);
								}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
							}else{
//								if(arr[0]=='0'){
//									getXxs(arr[2],obj.bj,arr[7]);
//								}
								$("#"+obj.bj+"_dsdm").select2().select2("val",arr[1]);
								if(arr[1]!=''&&arr[1]!=null){
									getQxs(arr[1],obj.bj,arr[2]);
								}
								if(arr[2]!=''&&arr[2]!=null){
									getSzxzs(arr[2],obj.bj,arr[3]);
								}
								if(arr[3]!=''&&arr[3]!=null){
									getSzcws(arr[3],obj.bj,arr[4]);
								}
								if(arr[5]!=''&&arr[5]!=null){
									getSzdcxlxms(arr[5],obj.bj,arr[6]);
								}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
							}
						}
						
		   			}
				});
			}
			
		
}

//function getDsdms(bj,dsdm){
//	$("#"+bj+"_dsdm").select2().select2("val",dsdm);
//}


function getXxs(qxdm,bj,xxdm){
	//1-中小学，2-中职，4-高教,6-学前教育
	var jglx="";
	var xxSelect = $("#"+bj+"_xxdm",window.parent.document);
	if(bj=='zxxjgzc'){
		jglx='1'
	}else if(bj=='jgxx'){
		jglx='2';
	}else if(bj=='xqjg'){
		jglx='6';
	}else{
		jglx='5';
	}
	if(qxdm){
		$.ajax({
			type:'post',
			url:basePath+'common_getXx.do',
			data:{qxdm:qxdm,jglx:jglx},
			dataType:'json',
			success:function(data){
				xxSelect.empty(); 
				xxSelect.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	xxSelect.append(str);
   				}
				xxSelect.trigger('chosen:updated');
				$("#"+bj+"_xxdm").select2().select2("val",xxdm);
   			}
		});
	}
}




//修改时级联

function getQxs(dsdm,bj,qxdm){//在本页面上的级联
//	var qxSelect = $("#"+bj+"_szqx");
	var qxSelect;
	if(bj!='gxxxjbxx'&&bj!='mbjg'){
		qxSelect = $("#"+bj+"_szqx");
	}else{
		qxSelect= $("#"+bj+"_qxdm");
	}
	
	if(dsdm){
		  $.ajax({
			type:'post',
			url:basePath+'common_getQx.do',
			data:{dsdm:dsdm},
			dataType:'json',
			success:function(data){
				qxSelect.empty(); 
				qxSelect.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	qxSelect.append(str);
   				}
				qxSelect.trigger('chosen:updated');
				if(bj!='gxxxjbxx'&&bj!='mbjg'){
					$("#"+bj+"_szqx").select2().select2("val",qxdm);
				}else{
					$("#"+bj+"_qxdm").select2().select2("val",qxdm);
				}
//				$("#"+bj+"_szqx").select2().select2("val",qxdm);
   			}
		});
	  }
}

function getQxs_parent(dsdm,bj,qxdm){//在父页面上的级联
//	var qxSelect = $("#"+bj+"_szqx");
	var qxSelect;
	if(bj!='gxxxjbxx'&&bj!='mbjg'){
		qxSelect = $("#"+bj+"_szqx",window.parent.document);
	}else{
		qxSelect= $("#"+bj+"_qxdm",window.parent.document);
	}
	
	if(dsdm){
		  $.ajax({
			type:'post',
			url:basePath+'common_getQx.do',
			data:{dsdm:dsdm},
			dataType:'json',
			success:function(data){
				qxSelect.empty(); 
				qxSelect.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	qxSelect.append(str);
   				}
				qxSelect.trigger('chosen:updated');
				if(bj!='gxxxjbxx'&&bj!='mbjg'){
					$("#"+bj+"_szqx",window.parent.document).select2().select2("val",qxdm);
				}else{
					$("#"+bj+"_qxdm",window.parent.document).select2().select2("val",qxdm);
				}
//				$("#"+bj+"_szqx").select2().select2("val",qxdm);
   			}
		});
	  }
}

//获取所在乡镇
	function getSzxzs(qxdm,bj,xzdm){
		var xzSelect = $("#"+bj+"_szxz");
		if(qxdm){
			  $.ajax({
				type:'post',
				url:basePath+'common_getSzxz.do',
				data:{qxdm:qxdm},
				dataType:'json',
				success:function(data){
					xzSelect.empty(); 
					xzSelect.append("<option value=''>--请选择--</option>");
					for(var i in data){
						var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
				    	xzSelect.append(str);
	   				}
					xzSelect.trigger('chosen:updated');
					$("#"+bj+"_szxz").select2().select2("val",xzdm);
	   			}
			});
		  }
}
	function getSzxzs_parent(qxdm,bj,xzdm){
		var xzSelect = $("#"+bj+"_szxz",window.parent.document);
		if(qxdm){
			  $.ajax({
				type:'post',
				url:basePath+'common_getSzxz.do',
				data:{qxdm:qxdm},
				dataType:'json',
				success:function(data){
					xzSelect.empty(); 
					xzSelect.append("<option value=''>--请选择--</option>");
					for(var i in data){
						var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
				    	xzSelect.append(str);
	   				}
					xzSelect.trigger('chosen:updated');
					$("#"+bj+"_szxz",window.parent.document).select2().select2("val",xzdm);
	   			}
			});
		  }
}
	
//所在村委	
function getSzcws(xzdm,bj,cwdm){
	var cwSelect = $("#"+bj+"_szcw");
	if(xzdm){
	  $.ajax({
		type:'post',
		url:basePath+'common_getSzcw.do',
		data:{xzdm:xzdm},
		dataType:'json',
		success:function(data){
			cwSelect.empty(); 
			cwSelect.append("<option value=''>--请选择--</option>");
			for(var i in data){
				var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	cwSelect.append(str);
   				}
					cwSelect.trigger('chosen:updated');
					$("#"+bj+"_szcw").select2().select2("val",cwdm);
	   			}
			});
		  }
}
	
function getSzcws_parent(xzdm,bj,cwdm){
	var cwSelect = $("#"+bj+"_szcw",window.parent.document);
	if(xzdm){
	  $.ajax({
		type:'post',
		url:basePath+'common_getSzcw.do',
		data:{xzdm:xzdm},
		dataType:'json',
		success:function(data){
			cwSelect.empty(); 
			cwSelect.append("<option value=''>--请选择--</option>");
			for(var i in data){
				var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	cwSelect.append(str);
   				}
					cwSelect.trigger('chosen:updated');
					$("#"+bj+"_szcw",window.parent.document).select2().select2("val",cwdm);
	   			}
			});
		  }
}
	
//获取采集机构3
function getCjjg3(dsdm,bj,qxdm){
	 var cjjg3Select = $("#"+bj+"_cjjg3");
	 if(dsdm){
		 $.ajax({
			type:'post',
			url:basePath+'common_getCjjg3.do',
			data:{dsdm:dsdm,bj:"cj"},
			dataType:'json',
			success:function(data){
				cjjg3Select.empty(); 
				cjjg3Select.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	cjjg3Select.append(str);
   				}
				cjjg3Select.trigger('chosen:updated');
				$("#"+bj+"_cjjg3").select2().select2("val",qxdm);
   			}
		});
	 }
}

function getCjjg3_parent(dsdm,bj,qxdm){
	 var cjjg3Select = $("#"+bj+"_cjjg3",window.parent.document);
	 if(dsdm){
		 $.ajax({
			type:'post',
			url:basePath+'common_getCjjg3.do',
			data:{dsdm:dsdm,bj:"cj"},
			dataType:'json',
			success:function(data){
				cjjg3Select.empty(); 
				cjjg3Select.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	cjjg3Select.append(str);
   				}
				cjjg3Select.trigger('chosen:updated');
				$("#"+bj+"_cjjg3",window.parent.document).select2().select2("val",qxdm);
   			}
		});
	 }
}

//获取采集机构4
function getCjjg4(qxdm,bj,xzdm){
	 var cjjg4Select = $("#"+bj+"_cjjg4");
	 if(qxdm){
		 $.ajax({
			type:'post',
			url:basePath+'common_getCjjg4.do',
			data:{dsdm:qxdm,bj:"cj"},
			dataType:'json',
			success:function(data){
				cjjg4Select.empty(); 
				cjjg4Select.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	cjjg4Select.append(str);
   				}
				cjjg4Select.trigger('chosen:updated');
				$("#"+bj+"_cjjg4").select2().select2("val",xzdm);
   			}
		});
	 }
}

function getCjjg4_parent(qxdm,bj,xzdm){
	 var cjjg4Select = $("#"+bj+"_cjjg4",window.parent.document);
	 if(qxdm){
		 $.ajax({
			type:'post',
			url:basePath+'common_getCjjg4.do',
			data:{dsdm:qxdm,bj:"cj"},
			dataType:'json',
			success:function(data){
				cjjg4Select.empty(); 
				cjjg4Select.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	cjjg4Select.append(str);
   				}
				cjjg4Select.trigger('chosen:updated');
				$("#"+bj+"_cjjg4",window.parent.document).select2().select2("val",xzdm);
   			}
		});
	 }
}


//获取采集机构5
function getCjjg5(xzdm,bj,cwdm){
	 var cjjg5Select = $("#"+bj+"_cjjg5");
	 if(xzdm){
		 $.ajax({
			type:'post',
			url:basePath+'common_getCjjg5.do',
			data:{dsdm:xzdm,bj:"cj"},
			dataType:'json',
			success:function(data){
				cjjg5Select.empty(); 
				cjjg5Select.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	cjjg5Select.append(str);
   				}
				cjjg5Select.trigger('chosen:updated');
				$("#"+bj+"_cjjg5").select2().select2("val",cwdm);
   			}
		});
	 }
}

function getCjjg5_parent(xzdm,bj,cwdm){
	 var cjjg5Select = $("#"+bj+"_cjjg5",window.parent.document);
	 if(xzdm){
		 $.ajax({
			type:'post',
			url:basePath+'common_getCjjg5.do',
			data:{dsdm:xzdm,bj:"cj"},
			dataType:'json',
			success:function(data){
				cjjg5Select.empty(); 
				cjjg5Select.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	cjjg5Select.append(str);
   				}
				cjjg5Select.trigger('chosen:updated');
				$("#"+bj+"_cjjg5",window.parent.document).select2().select2("val",cwdm);
   			}
		});
	 }
}

//区分查看/编辑页面
function checkDialog(obj){
	check = "check";
	btntype = "check";
	var style = $.manageServer().modelStyle;
	var mes = '';
	if(style=='tabs'){
		mes=GetFrom2(getModalconObj(btntype,$.manageServer().mkname), "update", "", 'stuimg', 'with', '50');
	}else{
		mes=GetFrom1(getModalconObj(btntype,$.manageServer().mkname), "update", "", 'stuimg', 'with', '50');
	}
	if($.manageServer().zhcx==''){
		bootbox.dialog({
				message: ObstructHtml_none() + mes, // init() + GetFrom1(getModalconObj(btntype), "add", IP + "/rmwebapp/file/", 'stuimg', 'with', '50'),
				title: title,
				size: $.manageServer().modelSize,
				buttons: {
					"关闭": {
						className: "btn-warning",
						callback: function() {
							
						}
					}
				}
			}); 
	}else{
		parent.bootbox.dialog({
				message: ObstructHtml_none() + mes, // init() + GetFrom1(getModalconObj(btntype), "add", IP + "/rmwebapp/file/", 'stuimg', 'with', '50'),
				title: title,
				size: $.manageServer().modelSize,
				buttons: {
					"关闭": {
						className: "btn-warning",
						callback: function() {
							
						}
					}
				}
			}); 
	}
		
			$("#registrationForm select").select2();
	   			 //初始化日期控件
			$(".dayinput .input-group.date").datepicker({
		        todayBtn: "linked",
		        keyboardNavigation: !1,
		        forceParse: !1,
		        calendarWeeks: !0,
		        autoclose: !0,
		        format:'yyyymmdd'
		    });
			$(".dayinputy .input-group.date").datepicker( {
				minViewMode : 1,
				keyboardNavigation : !1,
				forceParse : !1,
				autoclose : !0,
				todayHighlight : !0,
				format:'yyyymm'
			});
			$(".dayinputd .input-group.date").datepicker( {
							startView: 1,      //选择日期范围从月开始。0为日，1为月，2为年
				maxViewMode: 1,   //选择日期最大范围到月。0为日，1为月，2为年
				minViewMode:0,    //选择日期最小范围到日。0为日，1为月，2为年
// 				language: "zh-CN", //汉化 
		        todayBtn: "linked",			//突出当前日期
		        todayHighlight : !0 ,		//如果这是真的,突出当前日期.
		        keyboardNavigation: !1,		//是否允许日期导航箭头键.
		        forceParse: !1,
		      //  calendarWeeks: !0,			//是否显示左边的数字每周行.
		        autoclose: !0,
		        endDate : new Date(),  //可选的截至日期为今天
		        format:'mm-dd'

			});
		  var $form_valid = $("#registrationForm").validate({onfocusout: function(element) {
			  $(element).valid(); }});
		
			$.ajax({
				type:'post',
				url:$.manageServer().toUpdateUrl,
				data:obj,
				dataType:'json',
				success:function(data){
					if(data){
						if($.manageServer().zhcx==''){
							setUpdateDialogValue(data,getModalconObj(btntype,$.manageServer().mkname));
						 }else{
							setUpdateDialogValue2(data,getModalconObj(btntype,$.manageServer().mkname));
						 }
					}else{
						swal("加载失败！", "信息加载失败，请联系技术人员。", "error");
					}
					
					
					//设置表单的默认值
		   			var defaultValue=$.manageServer().updateDefaultValue;
		   			if(defaultValue!=null && defaultValue !=undefined){
		   				for(var id_type in defaultValue){
		   					var type=id_type.split("@")[1];
		   					var id=id_type.split("@")[0];
		   					if("select"==type){
		   						$("#"+id).select2().select2("val", defaultValue[id_type]);
		   					}else if("input"==type){
		   						$("#"+id).val(defaultValue[id_type]);
		   					}else if("textarea"==type){
		   						$("#"+id).html(defaultValue[id_type]);
		   					}
		   					
		   				}
		   			}
					
				}
			});
			var xxdmNew = obj.xxdm;
			if(obj.bj=="mbjg"){//区分民办和其他教育机构
				xxdmNew = obj.jgbm;
			}
			if(obj.bj!=undefined){
				$.ajax({
					type:'post',
					url:basePath+'common_getUpdate.do',
					data:{xxdm:xxdmNew,bj:obj.bj},
					dataType:'text',
					success:function(data){
//						console.log(data);
						if(data!=''&&data!=null){
							var arr=data.split("@");
							if(obj.bj!='gxxxjbxx' && obj.bj!='mbjg'){
								$("#"+obj.bj+"_szds").select2().select2("val",arr[1]);
								if(arr[0]=='0'){
									getXxs(arr[2],obj.bj,arr[15]);
								}
								if(arr[1]!=''&&arr[1]!=null){
									getQxs(arr[1],obj.bj,arr[2]);
								}
								if(arr[2]!=''&&arr[2]!=null){
									getSzxzs(arr[2],obj.bj,arr[3]);
								}
								if(arr[3]!=''&&arr[3]!=null){
									getSzcws(arr[3],obj.bj,arr[4]);
								}
								if(arr[5]!=''&&arr[5]!=null){
									getCjjg3(arr[5],obj.bj,arr[6]);
								}
								if(arr[6]!=''&&arr[6]!=null){
									getCjjg4(arr[6],obj.bj,arr[7]);
								}
								if(arr[7]!=''&&arr[7]!=null){
									getCjjg5(arr[7],obj.bj,arr[8]);
								}
								if(arr[9]!=''&&arr[9]!=null){
									getTjjg3(arr[9],obj.bj,arr[10]);
								}
								if(arr[10]!=''&&arr[10]!=null){
									getTjjg4(arr[10],obj.bj,arr[11]);
								}
								if(arr[11]!=''&&arr[11]!=null){
									getTjjg5(arr[11],obj.bj,arr[12]);
								}
								if(arr[13]!=''&&arr[13]!=null){
									getSzdcxlxms(arr[13],obj.bj,arr[14]);
								}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
							}else{
//								if(arr[0]=='0'){
//									getXxs(arr[2],obj.bj,arr[7]);
//								}
								$("#"+obj.bj+"_dsdm").select2().select2("val",arr[1]);
								if(arr[1]!=''&&arr[1]!=null){
									getQxs(arr[1],obj.bj,arr[2]);
								}
								if(arr[2]!=''&&arr[2]!=null){
									getSzxzs(arr[2],obj.bj,arr[3]);
								}
								if(arr[3]!=''&&arr[3]!=null){
									getSzcws(arr[3],obj.bj,arr[4]);
								}
								if(arr[5]!=''&&arr[5]!=null){
									getSzdcxlxms(arr[5],obj.bj,arr[6]);
								}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
							}
						}
						
		   			}
				});
			}
			

 }
//查看审核  2017.4.4
function ckDialogsh(obj){
	btntype = "update";
	var style = $.manageServer().modelStyle;
	var mknames = $.manageServer().mkname;
	var tourl = $.manageServer().toUpdateUrl;
//	var dourl = $.manageServer().updateUrl;
	var mes = '';
	if(style=='tabs'){
		if(obj.bj=='xqjg'){
			mknames =  $.manageServer().mknamexq;
			tourl = $.manageServer().toUpdateUrlxq;
		}else if(obj.bj=='zxxjgzc'){
			mknames =  $.manageServer().mknamezxx;
			tourl = $.manageServer().toUpdateUrlzxx;
		}else if(obj.bj=='jgxx'){
			mknames =  $.manageServer().mknamezz;
			tourl = $.manageServer().toUpdateUrlzz;
		}else if(obj.bj=='gxxxjbxx'){
			mknames =  $.manageServer().mknamegd;
			tourl = $.manageServer().toUpdateUrlgd;
		}
		mes=GetFrom2(getModalconObj(btntype,mknames), "checkpic", "", 'stuimg', 'with', '50');
	}else{
		mes=GetFrom1(getModalconObj(btntype,$.manageServer().mkname), "update", "", 'stuimg', 'with', '50');
	}
		bootbox.dialog({
				message: ObstructHtml_none() + mes, // init() + GetFrom1(getModalconObj(btntype), "add", IP + "/rmwebapp/file/", 'stuimg', 'with', '50'),
				title: title,
				size: $.manageServer().modelSize,
				buttons: {
					"关闭": {
						className: "btn-warning",
						callback: function() {
							
						}
					}
				}
			}); 
		
		
			$("#registrationForm select").select2();
	   			 //初始化日期控件
			$(".dayinput .input-group.date").datepicker({
		        todayBtn: "linked",
		        keyboardNavigation: !1,
		        forceParse: !1,
		        calendarWeeks: !0,
		        autoclose: !0,
		        format:'yyyymmdd'
		    });
			$(".dayinputy .input-group.date").datepicker( {
				minViewMode : 1,
				keyboardNavigation : !1,
				forceParse : !1,
				autoclose : !0,
				todayHighlight : !0,
				format:'yyyymm'
			});
			$(".dayinputd .input-group.date").datepicker( {
							startView: 1,      //选择日期范围从月开始。0为日，1为月，2为年
				maxViewMode: 1,   //选择日期最大范围到月。0为日，1为月，2为年
				minViewMode:0,    //选择日期最小范围到日。0为日，1为月，2为年
// 				language: "zh-CN", //汉化 
		        todayBtn: "linked",			//突出当前日期
		        todayHighlight : !0 ,		//如果这是真的,突出当前日期.
		        keyboardNavigation: !1,		//是否允许日期导航箭头键.
		        forceParse: !1,
		      //  calendarWeeks: !0,			//是否显示左边的数字每周行.
		        autoclose: !0,
		        endDate : new Date(),  //可选的截至日期为今天
		        format:'mm-dd'

			});
		  var $form_valid = $("#registrationForm").validate({onfocusout: function(element) {
			  $(element).valid(); }});
		
			$.ajax({
				type:'post',
				url:tourl,
				data:obj,
				dataType:'json',
				success:function(data){
					if(data){
						setUpdateDialogValue(data,getModalconObj(btntype,mknames));
						 
					}else{
						swal("加载失败！", "信息加载失败，请联系技术人员。", "error");
					}
					
					
					//设置表单的默认值
		   			var defaultValue=$.manageServer().updateDefaultValue;
		   			if(defaultValue!=null && defaultValue !=undefined){
		   				for(var id_type in defaultValue){
		   					var type=id_type.split("@")[1];
		   					var id=id_type.split("@")[0];
		   					if("select"==type){
		   						$("#"+id).select2().select2("val", defaultValue[id_type]);
		   					}else if("input"==type){
		   						$("#"+id).val(defaultValue[id_type]);
		   					}else if("textarea"==type){
		   						$("#"+id).html(defaultValue[id_type]);
		   					}
		   					
		   				}
		   			}
					
				}
			});
			if(obj.bj!=undefined){
				
				$.ajax({
					type:'post',
					url:basePath+'common_getUpdate.do',
					data:{xxdm:obj.xxdm,bj:obj.bj},
					dataType:'text',
					success:function(data){
//						console.log(data);
						if(data!=''&&data!=null){
							var arr=data.split("@");
							if(obj.bj!='gxxxjbxx'){
								$("#"+obj.bj+"_szds").select2().select2("val",arr[1]);
								if(arr[0]=='0'){
									getXxs(arr[2],obj.bj,arr[15]);
								}
								if(arr[1]!=''&&arr[1]!=null){
									getQxs(arr[1],obj.bj,arr[2]);
								}
								if(arr[2]!=''&&arr[2]!=null){
									getSzxzs(arr[2],obj.bj,arr[3]);
								}
								if(arr[3]!=''&&arr[3]!=null){
									getSzcws(arr[3],obj.bj,arr[4]);
								}
								if(arr[5]!=''&&arr[5]!=null){
									getCjjg3(arr[5],obj.bj,arr[6]);
								}
								if(arr[6]!=''&&arr[6]!=null){
									getCjjg4(arr[6],obj.bj,arr[7]);
								}
								if(arr[7]!=''&&arr[7]!=null){
									getCjjg5(arr[7],obj.bj,arr[8]);
								}
								if(arr[9]!=''&&arr[9]!=null){
									getTjjg3(arr[9],obj.bj,arr[10]);
								}
								if(arr[10]!=''&&arr[10]!=null){
									getTjjg4(arr[10],obj.bj,arr[11]);
								}
								if(arr[11]!=''&&arr[11]!=null){
									getTjjg5(arr[11],obj.bj,arr[12]);
								}
								if(arr[13]!=''&&arr[13]!=null){
									getSzdcxlxms(arr[13],obj.bj,arr[14]);
								}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
							}else{
//								if(arr[0]=='0'){
//									getXxs(arr[2],obj.bj,arr[7]);
//								}
								$("#"+obj.bj+"_dsdm").select2().select2("val",arr[1]);
								if(arr[1]!=''&&arr[1]!=null){
									getQxs(arr[1],obj.bj,arr[2]);
								}
								if(arr[2]!=''&&arr[2]!=null){
									getSzxzs(arr[2],obj.bj,arr[3]);
								}
								if(arr[3]!=''&&arr[3]!=null){
									getSzcws(arr[3],obj.bj,arr[4]);
								}
								if(arr[5]!=''&&arr[5]!=null){
									getSzdcxlxms(arr[5],obj.bj,arr[6]);
								}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
							}
						}
						
		   			}
				});
			}
			
			

 }

function ckDialog_parent(obj){//在父页面弹出
	zhcxBj=zhcx;
	ckDialog(obj);
}

function ckDialog(obj){
	
	btntype = "update";
	var xxdmNew = obj.xxdm;
	if(obj.bj=="mbjg"){//区分民办和其他教育机构
		xxdmNew = obj.jgbm;
	}
	var style = $.manageServer().modelStyle;
	var mes = '';
	if(style=='tabs'){
		mes=GetFrom2(getModalconObj(btntype,$.manageServer().mkname), "checkpic", "", 'stuimg', 'with', '50');
	}else{
		mes=GetFrom1(getModalconObj(btntype,$.manageServer().mkname), "update", "", 'stuimg', 'with', '50');
	}
	if(zhcxBj==='parent'){//传综合查询标记是为了区分弹出框是在该页面还是在父页面弹出
		parent.bootbox.dialog({
			message: ObstructHtml_none() + mes, // init() + GetFrom1(getModalconObj(btntype), "add", IP + "/rmwebapp/file/", 'stuimg', 'with', '50'),
			title: title,
			size: $.manageServer().modelSize,
			buttons: {
				"关闭": {
					className: "btn-warning",
					callback: function() {
						
					}
				}
			}
		}); 
		
		if(obj.bj!=undefined){
				$.ajax({
					type:'post',
					url:basePath+'common_getUpdate.do',
					data:{xxdm:xxdmNew,bj:obj.bj},
					dataType:'text',
					success:function(data){
						console.log(data);
						if(data!=''&&data!=null){
							var arr=data.split("@");
							if(obj.bj!='gxxxjbxx' && obj.bj!='mbjg'){
								$("#"+obj.bj+"_szds").select2().select2("val",arr[1]);
								if(arr[0]=='0'){
									getXxs(arr[2],obj.bj,arr[15]);
								}
								if(arr[1]!=''&&arr[1]!=null){
									getQxs_parent(arr[1],obj.bj,arr[2]);
								}
								if(arr[2]!=''&&arr[2]!=null){
									getSzxzs_parent(arr[2],obj.bj,arr[3]);
								}
								if(arr[3]!=''&&arr[3]!=null){
									getSzcws_parent(arr[3],obj.bj,arr[4]);
								}
								if(arr[5]!=''&&arr[5]!=null){
									getCjjg3_parent(arr[5],obj.bj,arr[6]);
								}
								if(arr[6]!=''&&arr[6]!=null){
									getCjjg4_parent(arr[6],obj.bj,arr[7]);
								}
								if(arr[7]!=''&&arr[7]!=null){
									getCjjg5_parent(arr[7],obj.bj,arr[8]);
								}
								if(arr[9]!=''&&arr[9]!=null){
									getTjjg3_parent(arr[9],obj.bj,arr[10]);
								}
								if(arr[10]!=''&&arr[10]!=null){
									getTjjg4_parent(arr[10],obj.bj,arr[11]);
								}
								if(arr[11]!=''&&arr[11]!=null){
									getTjjg5_parent(arr[11],obj.bj,arr[12]);
								}
								if(arr[13]!=''&&arr[13]!=null){
									getSzdcxlxms_parent(arr[13],obj.bj,arr[14]);
								}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
							}else{
//								if(arr[0]=='0'){
//									getXxs(arr[2],obj.bj,arr[7]);
//								}
								$("#"+obj.bj+"_dsdm").select2().select2("val",arr[1]);
								if(arr[1]!=''&&arr[1]!=null){
									getQxs_parent(arr[1],obj.bj,arr[2]);
								}
								if(arr[2]!=''&&arr[2]!=null){
									getSzxzs_parent(arr[2],obj.bj,arr[3]);
								}
								if(arr[3]!=''&&arr[3]!=null){
									getSzcws_parent(arr[3],obj.bj,arr[4]);
								}
								if(arr[5]!=''&&arr[5]!=null){
									getSzdcxlxms_parent(arr[5],obj.bj,arr[6]);
								}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
							}
						}
						
		   			}
				});
			}
	}else{
		bootbox.dialog({
			message: ObstructHtml_none() + mes, // init() + GetFrom1(getModalconObj(btntype), "add", IP + "/rmwebapp/file/", 'stuimg', 'with', '50'),
			title: title,
			size: $.manageServer().modelSize,
			buttons: {
				"关闭": {
					className: "btn-warning",
					callback: function() {
						
					}
				}
			}
		});
		if(obj.bj!=undefined){
				$.ajax({
					type:'post',
					url:basePath+'common_getUpdate.do',
					data:{xxdm:xxdmNew,bj:obj.bj},
					dataType:'text',
					success:function(data){
						console.log(data);
						if(data!=''&&data!=null){
							var arr=data.split("@");
							if(obj.bj!='gxxxjbxx' && obj.bj!='mbjg'){
								$("#"+obj.bj+"_szds").select2().select2("val",arr[1]);
								if(arr[0]=='0'){
									getXxs(arr[2],obj.bj,arr[15]);
								}
								if(arr[1]!=''&&arr[1]!=null){
									getQxs(arr[1],obj.bj,arr[2]);
								}
								if(arr[2]!=''&&arr[2]!=null){
									getSzxzs(arr[2],obj.bj,arr[3]);
								}
								if(arr[3]!=''&&arr[3]!=null){
									getSzcws(arr[3],obj.bj,arr[4]);
								}
								if(arr[5]!=''&&arr[5]!=null){
									getCjjg3(arr[5],obj.bj,arr[6]);
								}
								if(arr[6]!=''&&arr[6]!=null){
									getCjjg4(arr[6],obj.bj,arr[7]);
								}
								if(arr[7]!=''&&arr[7]!=null){
									getCjjg5(arr[7],obj.bj,arr[8]);
								}
								if(arr[9]!=''&&arr[9]!=null){
									getTjjg3(arr[9],obj.bj,arr[10]);
								}
								if(arr[10]!=''&&arr[10]!=null){
									getTjjg4(arr[10],obj.bj,arr[11]);
								}
								if(arr[11]!=''&&arr[11]!=null){
									getTjjg5(arr[11],obj.bj,arr[12]);
								}
								if(arr[13]!=''&&arr[13]!=null){
									getSzdcxlxms(arr[13],obj.bj,arr[14]);
								}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
							}else{
//								if(arr[0]=='0'){
//									getXxs(arr[2],obj.bj,arr[7]);
//								}
								$("#"+obj.bj+"_dsdm").select2().select2("val",arr[1]);
								if(arr[1]!=''&&arr[1]!=null){
									getQxs(arr[1],obj.bj,arr[2]);
								}
								if(arr[2]!=''&&arr[2]!=null){
									getSzxzs(arr[2],obj.bj,arr[3]);
								}
								if(arr[3]!=''&&arr[3]!=null){
									getSzcws(arr[3],obj.bj,arr[4]);
								}
								if(arr[5]!=''&&arr[5]!=null){
									getSzdcxlxms(arr[5],obj.bj,arr[6]);
								}
//								setTimeout(getDsdms(obj.bj,arr[1]),1000);
							}
						}
						
		   			}
				});
			}
	}
		
			
			$("#registrationForm select").select2();
	   			 //初始化日期控件
			$(".dayinput .input-group.date").datepicker({
		        todayBtn: "linked",
		        keyboardNavigation: !1,
		        forceParse: !1,
		        calendarWeeks: !0,
		        autoclose: !0,
		        format:'yyyymmdd'
		    });
			$(".dayinputy .input-group.date").datepicker( {
				minViewMode : 1,
				keyboardNavigation : !1,
				forceParse : !1,
				autoclose : !0,
				todayHighlight : !0,
				format:'yyyymm'
			});
			$(".dayinputd .input-group.date").datepicker( {
								startView: 1,      //选择日期范围从月开始。0为日，1为月，2为年
				maxViewMode: 1,   //选择日期最大范围到月。0为日，1为月，2为年
				minViewMode:0,    //选择日期最小范围到日。0为日，1为月，2为年
// 				language: "zh-CN", //汉化 
		        todayBtn: "linked",			//突出当前日期
		        todayHighlight : !0 ,		//如果这是真的,突出当前日期.
		        keyboardNavigation: !1,		//是否允许日期导航箭头键.
		        forceParse: !1,
		      //  calendarWeeks: !0,			//是否显示左边的数字每周行.
		        autoclose: !0,
		        endDate : new Date(),  //可选的截至日期为今天
		        format:'mm-dd'

			});
		  var $form_valid = $("#registrationForm").validate({onfocusout: function(element) {
			  $(element).valid(); }});
		
			$.ajax({
				type:'post',
				url:$.manageServer().toUpdateUrl,
				data:obj,
				dataType:'json',
				success:function(data){
					if(data){
						if(zhcxBj==='parent'){
							setUpdateDialogValue2(data,getModalconObj(btntype,$.manageServer().mkname));
						}else{
							setUpdateDialogValue(data,getModalconObj(btntype,$.manageServer().mkname));
						}						 
					}else{
						swal("加载失败！", "信息加载失败，请联系技术人员。", "error");
					}
					
					
					//设置表单的默认值
		   			var defaultValue=$.manageServer().updateDefaultValue;
		   			if(defaultValue!=null && defaultValue !=undefined){
		   				for(var id_type in defaultValue){
		   					var type=id_type.split("@")[1];
		   					var id=id_type.split("@")[0];
		   					if("select"==type){
		   						$("#"+id).select2().select2("val", defaultValue[id_type]);
		   					}else if("input"==type){
		   						$("#"+id).val(defaultValue[id_type]);
		   					}else if("textarea"==type){
		   						$("#"+id).html(defaultValue[id_type]);
		   					}
		   					
		   				}
		   			}
					
				}
			});
			

 }
//获取统计机构3
function getTjjg3(dsdm,bj,qxdm){
	 var tjjg3Select = $("#"+bj+"_tjjg3");
	 if(dsdm){
		 $.ajax({
			type:'post',
			url:basePath+'common_getCjjg3.do',
			data:{dsdm:dsdm,bj:"tj"},
			dataType:'json',
			success:function(data){
				tjjg3Select.empty(); 
				tjjg3Select.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	tjjg3Select.append(str);
   				}
				tjjg3Select.trigger('chosen:updated');
				$("#"+bj+"_tjjg3").select2().select2("val",qxdm);
   			}
		});
	 }
}

function getTjjg3_parent(dsdm,bj,qxdm){
	 var tjjg3Select = $("#"+bj+"_tjjg3",window.parent.document);
	 if(dsdm){
		 $.ajax({
			type:'post',
			url:basePath+'common_getCjjg3.do',
			data:{dsdm:dsdm,bj:"tj"},
			dataType:'json',
			success:function(data){
				tjjg3Select.empty(); 
				tjjg3Select.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	tjjg3Select.append(str);
   				}
				tjjg3Select.trigger('chosen:updated');
				$("#"+bj+"_tjjg3",window.parent.document).select2().select2("val",qxdm);
   			}
		});
	 }
}

//获取统计机构4
function getTjjg4(qxdm,bj,xzdm){
	 var tjjg4Select = $("#"+bj+"_tjjg4");
	 if(qxdm){
		 $.ajax({
			type:'post',
			url:basePath+'common_getCjjg4.do',
			data:{dsdm:qxdm,bj:"tj"},
			dataType:'json',
			success:function(data){
				tjjg4Select.empty(); 
				tjjg4Select.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	tjjg4Select.append(str);
   				}
				tjjg4Select.trigger('chosen:updated');
				$("#"+bj+"_tjjg4").select2().select2("val",xzdm);
   			}
		});
	 }
}

function getTjjg4_parent(qxdm,bj,xzdm){
	 var tjjg4Select = $("#"+bj+"_tjjg4",window.parent.document);
	 if(qxdm){
		 $.ajax({
			type:'post',
			url:basePath+'common_getCjjg4.do',
			data:{dsdm:qxdm,bj:"tj"},
			dataType:'json',
			success:function(data){
				tjjg4Select.empty(); 
				tjjg4Select.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	tjjg4Select.append(str);
   				}
				tjjg4Select.trigger('chosen:updated');
				$("#"+bj+"_tjjg4",window.parent.document).select2().select2("val",xzdm);
   			}
		});
	 }
}


//获取统计机构5
function getTjjg5(xzdm,bj,cwdm){
	 var tjjg5Select = $("#"+bj+"_tjjg5");
	 if(xzdm){
		 $.ajax({
			type:'post',
			url:basePath+'common_getCjjg5.do',
			data:{dsdm:xzdm,bj:"tj"},
			dataType:'json',
			success:function(data){
				tjjg5Select.empty(); 
				tjjg5Select.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	tjjg5Select.append(str);
   				}
				tjjg5Select.trigger('chosen:updated');
				$("#"+bj+"_tjjg5").select2().select2("val",cwdm);
   			}
		});
	 }
}

function getTjjg5_parent(xzdm,bj,cwdm){
	 var tjjg5Select = $("#"+bj+"_tjjg5",window.parent.document);
	 if(xzdm){
		 $.ajax({
			type:'post',
			url:basePath+'common_getCjjg5.do',
			data:{dsdm:xzdm,bj:"tj"},
			dataType:'json',
			success:function(data){
				tjjg5Select.empty(); 
				tjjg5Select.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	tjjg5Select.append(str);
   				}
				tjjg5Select.trigger('chosen:updated');
				$("#"+bj+"_tjjg5",window.parent.document).select2().select2("val",cwdm);
   			}
		});
	 }
}

//获取所在地城乡类型码
function getSzdcxlxms(szdcxfz,bj,szdcxlxm){
	var szdcxlxmSelect=$("#"+bj+"_szdcxlxm");
	if(szdcxfz=='1'){
		szdcxfz='11';
	}else if(szdcxfz=='2'){
		szdcxfz='12';
	}else if(szdcxfz=='3'){
		szdcxfz='2';
	}
	if(szdcxfz){
		 $.ajax({
			type:'post',
			url:basePath+'common_getSzdcxlxm.do',
			data:{szdcxfz:szdcxfz},
			dataType:'json',
			success:function(data){
				szdcxlxmSelect.empty(); 
				szdcxlxmSelect.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	szdcxlxmSelect.append(str);
   				}
				szdcxlxmSelect.trigger('chosen:updated');
				$("#"+bj+"_szdcxlxm").select2().select2("val",szdcxlxm);
   			}
		});
	  }
}


function getSzdcxlxms_parent(szdcxfz,bj,szdcxlxm){
	var szdcxlxmSelect=$("#"+bj+"_szdcxlxm",window.parent.document);
	if(szdcxfz=='1'){
		szdcxfz='11';
	}else if(szdcxfz=='2'){
		szdcxfz='12';
	}else if(szdcxfz=='3'){
		szdcxfz='2';
	}
	if(szdcxfz){
		 $.ajax({
			type:'post',
			url:basePath+'common_getSzdcxlxm.do',
			data:{szdcxfz:szdcxfz},
			dataType:'json',
			success:function(data){
				szdcxlxmSelect.empty(); 
				szdcxlxmSelect.append("<option value=''>--请选择--</option>");
				for(var i in data){
					var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
			    	szdcxlxmSelect.append(str);
   				}
				szdcxlxmSelect.trigger('chosen:updated');
				$("#"+bj+"_szdcxlxm",window.parent.document).select2().select2("val",szdcxlxm);
   			}
		});
	  }
}


	
//设置修改框的值
var setUpdateDialogValue = function(valueObj,modalConObj){
//	console.log(modalConObj);
	var id_name='';
	var mapKey='';
	for (var i = 0; i < modalConObj.data.length; i++) {
		for (var j = 0; j < modalConObj.data[i].FormGroup.length; j++) {
			id_name=modalConObj.data[i].FormGroup[j].id;
			mapKey=id_name.split("_")[1];
			if(check=='check'){
				mapKey=mapKey.toUpperCase();
			}
			switch (modalConObj.data[i].FormGroup[j].type) {
				case "text":
					$("#"+id_name).val(valueObj[mapKey]);
					break;
				case "select":
					 $("#"+id_name).select2().select2("val", valueObj[mapKey]);
					break;
				case "selects"://2017.2.25  修改下拉多选框的值  党王政
					if(valueObj[mapKey]!= ''&&valueObj[mapKey]!= null){
						var preload_data = "[";
						var valueObjKey=valueObj[mapKey].split(",");
						for(var k = 0; k < valueObjKey.length; k++){
							var xzz = $("#"+id_name+" option[value='"+valueObjKey[k]+"']").text();
							preload_data += "{ id: '"+valueObjKey[k]+"', text: '"+xzz+"'},";
						}
						preload_data = preload_data.substring(0,(preload_data.length-1))+"]";
						var	preload_dataJson = eval(preload_data);
						//locked : true  选中回填的值不能删除
	//					var preload_data = [{ id: '1', text: '国家示范校',locked : true},{ id: '2', text: '国家级重点'},{ id: '3', text: '省部级重点'},{ id: '5', text: '国家实训基地'}];
						$("#"+id_name).select2("data",preload_dataJson);//多选
					}
					break;
				case "hidden":
					$("#"+id_name).val(valueObj[mapKey]);
					break;
				case "password":
					$("#"+id_name).val(valueObj[mapKey]);
					break;
				case "radio":
					$("input:radio[name='"+mapKey.toLowerCase()+"'][value='"+valueObj[mapKey]+"']").attr('checked',true);
					break;
				case "textarea":
					$("#"+id_name).html(valueObj[mapKey]);
					break;
				case "dayinput":
					$("#"+id_name).val(valueObj[mapKey]);
					break;
				case "dayinputy":
					$("#"+id_name).val(valueObj[mapKey]);
					break;
			}
			
			//form += Getfromsonstr(obj.data[i].FormGroup[j].control, obj.data[i].FormGroup[j].label, obj.data[i].FormGroup[j].type, obj.data[i].FormGroup[j].id, obj.data[i].FormGroup[j].selectdata, hasPhoto);		
		}
		
	}
	
}
//设置修改框的值
var setUpdateDialogValue2 = function(valueObj,modalConObj){
//	console.log(valueObj);
	var id_name='';
	var mapKey='';
	for (var i = 0; i < modalConObj.data.length; i++) {
		for (var j = 0; j < modalConObj.data[i].FormGroup.length; j++) {
			id_name=modalConObj.data[i].FormGroup[j].id;
			mapKey=id_name.split("_")[1];
			if(check=='check'){
				mapKey=mapKey.toUpperCase();
			}
			switch (modalConObj.data[i].FormGroup[j].type) {
				case "text":
					$("#"+id_name, window.parent.document).val(valueObj[mapKey]);
					break;
				case "select":
					 $("#"+id_name, window.parent.document).select2().select2("val", valueObj[mapKey]);
					break;
				case "selects"://2017.2.25  修改下拉多选框的值  党王政
				if(valueObj[mapKey]!= ''&&valueObj[mapKey]!= null){
					var preload_data = "[";
					var valueObjKey=valueObj[mapKey].split(",");
					for(var k = 0; k < valueObjKey.length; k++){
						var xzz = $("#"+id_name+" option[value='"+valueObjKey[k]+"']").text();
						preload_data += "{ id: '"+valueObjKey[k]+"', text: '"+xzz+"'},";
					}
					preload_data = preload_data.substring(0,(preload_data.length-1))+"]";
					var	preload_dataJson = eval(preload_data);
					//locked : true  选中回填的值不能删除
//					var preload_data = [{ id: '1', text: '国家示范校',locked : true},{ id: '2', text: '国家级重点'},{ id: '3', text: '省部级重点'},{ id: '5', text: '国家实训基地'}];
					$("#"+id_name, window.parent.document).select2("data",preload_dataJson);//多选
				}
				break;
				case "hidden":
					$("#"+id_name, window.parent.document).val(valueObj[mapKey]);
					break;
				case "password":
					$("#"+id_name, window.parent.document).val(valueObj[mapKey]);
					break;
				case "radio":
//					$("input:radio[name='"+mapKey+"'][value='"+valueObj[mapKey]+"']", window.parent.document).attr('checked',true);
					//2017.2.8单选按钮选择器 name值为小写，需转换(宋涛)
					$("input:radio[name='"+mapKey.toLowerCase()+"'][value='"+valueObj[mapKey]+"']", window.parent.document).attr('checked',true);
					//$("input:radio[name='"+mapKey+"'][value='"+valueObj[mapKey]+"']").attr('checked',true);
					break;
				case "textarea":
					$("#"+id_name, window.parent.document).html(valueObj[mapKey]);
					break;
				case "dayinput":
					$("#"+id_name, window.parent.document).val(valueObj[mapKey]);
					break;
				case "dayinputy":
					$("#"+id_name, window.parent.document).val(valueObj[mapKey]);
					break;
			}
			
			//form += Getfromsonstr(obj.data[i].FormGroup[j].control, obj.data[i].FormGroup[j].label, obj.data[i].FormGroup[j].type, obj.data[i].FormGroup[j].id, obj.data[i].FormGroup[j].selectdata, hasPhoto);		
		}
		
	}
	
}
/*//添加或修改时校验    2017.1.14  宋涛
$(document).on('change','select',function(){
		var $form_valid = $("#registrationForm").validate({onfocusout: function(element) {$(element).valid(); }});
		var id=$(this).attr("id");
		if(!$form_valid.element($(this))){
			return false;
		}
	});
$(document).on('change','input',function(){
		var $form_valid = $("#registrationForm").validate({onfocusout: function(element) {$(element).valid(); }});
		var id=$(this).attr("id");
		if(!$form_valid.element($(this))){
			return false;
		}
	});*/

function picSc(e){
	var arr=e.id.split("_");
	var ids=arr[0]+"_"+arr[1]+"_"+arr[2];
	$("#"+ids).click();
}
//上传
function uploadFile(e){	
//	var xxdm = $("#zxxjgzc_xxdm").val();
	var arr=e.id.split("_");
	var fjlx=arr[1];
    var filebj=arr[0];
    var xxlx=arr[2];
	var formData = new FormData($( "#registrationForm" )[0]);
//	var index = layer.load(0, {shade: false}); 
	var index = layer.load(1, {//正在加载中的旋转图标，防止用户进行其它操作
		  shade: [0.5,'#fff'] //0.1透明度的白色背景
		});
	$.ajax({  
          url: basePath+xxlx+'_AddFj.do?fjlx='+fjlx+'&filebj='+filebj,    
          type: 'POST',  
          data: formData,  
          async: false,  
          cache: false,  
          contentType: false,   
          processData: false,  
          success: function (data) {
        	  	layer.close(index);//加载完成后关闭旋转图标
//        	  	console.log("$$$$$$$$$");
//        	  	console.log(data);
				$("#"+e.id+"_ck").show();
				
				if(data.code=='1'){
					swal("上传成功！");
				}
				else{				
				swal("上传失败！", data.message, "error");
			   }
				if(fjlx=='03'){
					$("#"+xxlx+"_zzfj").val(1);
				}else if(fjlx=='01'){
					$("#"+xxlx+"_spfj").val(1);
					}else if(fjlx=='02'){
					$("#"+xxlx+"_frfj").val(1);
					}else{
					$("#"+xxlx+"_tyfj").val(1);
					}
	
          },  
          error: function (data) {  
        	    swal("上传失败！");
          }  
     });
}
  //查看图片		
function picCk(e) {
//	$("#1_01_xqjggl_ck").attr({"disabled":"disabled"});
//	$("#0_03_xqjggl_ck").attr({"disabled":"disabled"});
//	$("#2_02_xqjggl_ck").attr({"disabled":"disabled"});
//	$("#3_04_xqjggl_ck").attr({"disabled":"disabled"});
	var xxdm='';
	var zzfj='';
    var spfj=''; 
    var frfj='';
    var tyfj='';
	var arr=e.id.split("_");
	var filebj=arr[0];
	var fjlx=arr[1];
    var xxlx=arr[2];
    if(xxlx=='xqjg'){//学前
    	
    	xxdm=$("#xqjg_xxdm").val();//获取学校代码
    	zzfj = $("#xqjg_zzfj").val();
    	spfj = $("#xqjg_spfj").val();
    	frfj = $("#xqjg_frfj").val();
    	tyfj = $("#xqjg_tyfj").val();
    }else if(xxlx=='zxxjgzc'){//中小学
    	xxdm=$("#zxxjgzc_xxdm").val();//获取学校代码
    	zzfj = $("#zxxjgzc_zzfj").val();
    	spfj = $("#zxxjgzc_spfj").val();
    	frfj = $("#zxxjgzc_frfj").val();
    	tyfj = $("#zxxjgzc_tyfj").val();
    	
    }else if(xxlx=='jgxx'){//中职
    	xxdm=$("#jgxx_xxdm").val();//获取学校代码
    	zzfj = $("#jgxx_zzfj").val();
    	spfj = $("#jgxx_spfj").val();
    	frfj = $("#jgxx_frfj").val();
    	tyfj = $("#jgxx_tyfj").val();
    }else if(xxlx=='gxxxjbxx'){//高等
    	xxdm=$("#gxxxjbxx_xxdm").val();//获取学校代码
    	zzfj = $("#gxxxjbxx_zzfj").val();
    	spfj = $("#gxxxjbxx_spfj").val();
    	frfj = $("#gxxxjbxx_frfj").val();
    	tyfj = $("#gxxxjbxx_tyfj").val();
    }
    if(filebj==0){//判断点击组织按钮
    	if(zzfj==0){//判断图片是否存在  0否 1是
    	   swal("无组织机构代码证附件图片！");
		   return;
    	}
    }else if(filebj==1){//判断点击审批按钮
    	if(spfj==0){//判断图片是否存在  0否 1是
    		 swal("无学校设立批复文件的扫描件附件图片！");
		   return;
    	}
    }else if(filebj==2){//判断点击法人按钮
    	if(frfj==0){//判断图片是否存在  0否 1是
    	   swal("无法人证书附件图片！");
		   return;
    	}
    }else if(filebj==3){//判断点击统一按钮    	
    	if(tyfj==0){//判断图片是否存在  0否 1是
    	   swal("无统一社会信用证附件图片！");
		   return;
    	}
    }
//    src=basePath+xxlx+"_Zstp.do?xxdm="+xxdm+"&fjlx="+fjlx;
    parent.layer.open({
	  type: 1,
	  title: false,//不显示标题
//	  title: ['xxx', 'font-size:18px;'],
	  skin: 'layui-layer-rim', //加上边框
	  area: ['99%', '99%'], //宽高
//	  anim: 4, //动画类型
	  content: '<img style=\"height: 100%;width: 100%\" src=\"'+basePath+xxlx+'_Zstp.do?xxdm='+xxdm+'&fjlx='+fjlx+'&t=' + Math.random()+'\"/>'
	});
//   
}



		    