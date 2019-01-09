var searchFormJg;	
var bmjb='';
var jglx='';
//var yhXzqh='';
var yhBmbm='';
var sjblx='';
//mknameArray中包含页面列表上有审批状态的学前、中小学、中职mkname
var mknameArray=["XQJGSH","XQJGCX","XQJG","XQJGBG","ZXXJGSH","ZXXJGCX","ZXXJGZC","ZXXJGBG","ZZJGSH","ZZJGCX","ZZJG","ZZXXBG"];
//判断某个元素是否在数组内
function contains(value,array){
	var index = array.length;
	while(index--){
		if(array[index]==value){
			return true;
		}
	}
	return false;
}
(function($) {
	"use strict";
	var $page, $this;
	var plug_icheck01;//
	var defaults = {   
		pagenumber: 1,     
		pagecount: 1,
		currentPage: 1,
		rownumbers: false,
		multipleSelect: false
	};
	var YDataTable = function(options,icheck01) {
		$this = $(this);
		if ( typeof(options) === 'string' ) {
			if( /^(getCheck|getUnCheck|reload)$/i.test(options) ) {
				if ( options==='getCheck' ) {
					_icheckInit();
				}else if(options==='reload'){
					$page.currentPage = 1;
					_reloadTable();
				}
			}
//			} else if( $.isArray(options) ){
//				if( /^(toggleColumn)$/i.test(options[0]) ) {
//					if ( options[0]==='toggleColumn' ) {
//						this.toggleColumn(_getFieldIndex($page.fieldColumns,options[1]) ,false , true);
//						_createTable();
//					}
//				}
		} else{
		    if(icheck01){
                plug_icheck01=icheck01;
             }
			var opts = $.extend({}, defaults, options); 
			_initPageVal(opts);
			if(!$page.url){
				return false;
			}
			_initTable(plug_icheck01);
			_initSearchForm();
			_initSearch();
			initSelectInput();
		}
	};
	var _getFieldIndex = function (columns, field) {
        var index = -1;
        $.each(columns, function (i, column) {
            if (column.id === field) {
                index = i;
                return false;
            }
            return true;
        });
        return index;
    };
    
	var _icheckInit = function() {
	    // debugger;
		$("input[type=checkbox]",$this).each(function(){//each()方法遍历所有的复选框 
	        if($this.attr("checked")){//这里就可以判断当前是否被选择了 
	            $this.iCheck('uncheck');//如果已选择，可以用iCheck取消选择  
	        }else{ 
//	            $this.iCheck('check');//如果没选择，可以用iCheck美化选择    
	        } 
	    }); 
	}
	function _initPageVal(options){
		bmjb=$.manageServer().yhBmjb;
   		jglx=$.manageServer().yhJglx;
   		//yhXzqh=$.manageServer().yhXzqh;
   		var mkname=$.manageServer().mkname;
   		yhBmbm=$.manageServer().yhBmbm;
   		//console.log('$$$$$$$$$'+$.manageServer().zhcx);
   		if($.manageServer().zhcx==''||$.manageServer().zhcx==undefined){//非综合查询有检索框
   			
   			//console.log('#######'+bmjb);
   			//console.log('@@@@@@@'+jglx);
   			
	   		if(bmjb==1 && jglx=='0'){//省级级用户
				searchFormJg = [
		 			{name:'xxmc',type:'input',title:'学校名称',inputtext:'学校名称'},
		  			{name:'szds',type:'select',title:'地市',url:'serchform_getserchformDsQxXz.do?sjbmbm='+yhBmbm},
		  			{name:'szqx',type:'select',title:'区县',url:''},
		  			{name:'szxz',type:'select',title:'乡镇',url:''}
	   			];
			}else if(bmjb==2 && jglx=='0'){//市级用户
				searchFormJg = [
		 			{name:'xxmc',type:'input',title:'学校名称',inputtext:'学校名称'},
		  			//{name:'dsdm',type:'hidden',title:'地市代码',inputtext:'地市代码'},
		  			{name:'szqx',type:'select',title:'区县',url:'serchform_getserchformDsQxXz.do?sjbmbm='+yhBmbm},
		  			{name:'szxz',type:'select',title:'乡镇',url:''}
	   			];
			}else if(bmjb==3 && jglx=='0'){//区县用户
				if(contains(mkname,mknameArray)){
					searchFormJg = [
		 			{name:'xxmc',type:'input',title:'学校名称',inputtext:'学校名称'},
		 			{name:'spzt',type:'select',title:'审批状态',url:'serchform_getspzt.do?zdbh=SPZT'},
		  			//{name:'dsdm',type:'hidden',title:'地市代码',inputtext:'地市代码'},
		  			//{name:'qxdm',type:'hidden',title:'区县代码',inputtext:'区县代码'},
		  			{name:'szxz',type:'select',title:'乡镇',url:'serchform_getserchformDsQxXz.do?sjbmbm='+yhBmbm}
	   				];
				}else{
					searchFormJg = [
		 			{name:'xxmc',type:'input',title:'学校名称',inputtext:'学校名称'},
		  			{name:'szxz',type:'select',title:'乡镇',url:'serchform_getserchformDsQxXz.do?sjbmbm='+yhBmbm}
	   				];
				}
				
			}else{
				searchFormJg=options.searchForm;
			}
   		}
		//表格+分页用到的对象
		var opts = $.extend({}, defaults, options); 
		if($page!==undefined){
			$page = $.extend({}, $page, options); 
		}else{
			$page = {
				rownumbers : options.rownumbers,
				multipleSelect : options.multipleSelect,
				currentPage : options.currentPage,
				url : options.url,
				beginNumber : 0,
				columns : options.columns,
				totalPage : 0,
				totalCount : 0,
				pageSize : 0,
				params: options.params,
				showColCount: options.columns.length,
				showToolColCount: 0,
				fieldColumns: new Array(),
				hideColumns: new Array(),
				ajaxData: null,
				searchForm: searchFormJg
			}
		}
	}
	
	var _initTable = function() {
		_ajaxGetData();
		_setFieldColumns();
		_createTable();
		_initPaginator();
		_initChooseColumns();
	}
	
	
	var _reloadTable = function(){
		_ajaxGetData();
		_createTable();
		_initPaginator();
	}
	
	var _ajaxGetData = function() {
		//访问后台带的参数
		$page.params = $.extend({}, $page.params, {'currentPage':$page.currentPage});
		//ajax访问后台，渲染界面
		$.ajax({  
		    url: $page.url,// 跳转到 action  
		    data: $page.params,
		    type: 'post',
		    cache: false,
		    async: false, //同步，默认:true-异步
		    dataType: 'json',
		    success:function(data) {
//			alert(data);
//				if (data.errorcode === 0) {
					$page.ajaxData = data;
//				} else if (data.errorcode === 200) {
//					modal_confirm_log("登录过期,请重新登陆！", relogin);
//				}
		    },  
		    error : function() {
		          
		    }
		});
	}
	var _createTable = function() {
		var $rows, $table, theadStr, theadTrStr, tbodyStr, tbodyTrStr, tbodyTdStr,
		 btn_cz, tagTextStr, paramIndex=0, clickFunParamStr='', clickFunParamAry={}, funhandlStr,checkStr='';
		$page.totalPage = $page.ajaxData.totalPage;
		$page.totalCount = $page.ajaxData.totalCount;
		$page.pageSize = $page.ajaxData.pageSize
		$page.rows = $page.ajaxData.rows;
		theadStr = '<thead>';
		theadTrStr = '<tr>';
		tbodyStr = '<tbody>';
		
		if( $page.totalCount >0 ){
			$page.beginNumber = ( $page.currentPage - 1 ) * $page.pageSize + 1; //当前页开始行号
			$page.endNumber = $page.currentPage < $page.totalCount ? $page.beginNumber + $page.pageSize - 1 : $page.totalCount; //当前页结束行号
			$page.endNumber = $page.endNumber>$page.totalCount?$page.totalCount:$page.endNumber;
		}
		if ( $page.columns.length ) {
			$this.empty();
			if ( $page.multipleSelect ) {
				if($.manageServer().title!='教育机构查询'){
					theadTrStr += '<th><input type="checkbox" class="i-checks"></th>';
					$page.showColCount++;
				}
				
				
			}
			if ( $page.rownumbers ) {
				if( $.inArray('iIndex', $page.hideColumns)===-1 ){
					theadTrStr += '<th>序号</th>';
					$page.showColCount++;
				}
			}
			//表头
			$.each($page.columns, function(n, column){
				if( $.inArray(column.dataIndex, $page.hideColumns)===-1 ){
					theadTrStr += '<th>' + column.title + '</th>';
				}
			});
			theadStr += theadTrStr+'</tr></thead>';
			//表体
			if( $page.rows.length==0 ){
				tbodyStr = '<tbody><tr><td colspan="'+$page.showColCount+'" style="text-align:center;height:120px;font-size:16px;"><i class="fa fa-info-circle fa-lg" style="color:#090;padding-right:4px;"></i>&nbsp;&nbsp;没有找到匹配的记录</td></tr></tbody>';
			}else{
				$.each($page.rows, function(m, map){
					tbodyTrStr = '<tr>';
					if ( $page.multipleSelect ) {//有ichecks多选框
						if($.manageServer().ichecks){
							checkStr='';
							$.each($.manageServer().ichecks, function(n, value){
								if(n>=1){
									checkStr+="@"+map[value];
								}else{
									checkStr=map[value];
								}
							})
						}
//						console.log("************"+checkStr);
						if($.manageServer().title!='教育机构查询'){
							tbodyTrStr += '<td><input type="checkbox" class="i-checks" name="idList" value="'+checkStr+'"></td>';
						}
						
					}
					if ( $page.rownumbers && $.inArray('iIndex', $page.hideColumns)===-1 ) {
						tbodyTrStr += '<td>' + (m+$page.beginNumber) + '</td>';
					}
					//遍历数据集合
					$.each($page.columns, function(n, column){
						if( $.inArray(column.dataIndex, $page.hideColumns)===-1 ){
							//判断td单元格内是否是显示数据，或带有点击事件的按钮标签
							if ( column.htmlTag ) {
								tbodyTdStr = '<td>';
								//处理操作按钮的标签组
								$.each(column.htmlTag, function(t, tag){
									var dataStr='';
									clickFunParamStr='', paramIndex ='', clickFunParamAry={};
									paramIndex = tag.paramIndex;
//									//判断函数的参数是否为数组:htmlTag.paramIndex
									if(paramIndex){
										dataStr="{";
										if ( ( typeof paramIndex =='object' ) && paramIndex.constructor==Array ) {
											$.each(tag.paramIndex, function(p, paramIndexStr){
												if ( clickFunParamStr > 0 ) {
													clickFunParamStr += ',';
												}
												clickFunParamStr += map[paramIndexStr];
//												console.log(p+'---'+tag.paramName[p]);
												dataStr+=tag.paramName[p]+":"+"'"+map[paramIndexStr]+"'"+",";
												clickFunParamAry[paramIndexStr] = map[paramIndexStr];
											});
											dataStr=dataStr.substring(0,dataStr.length-1);
										}else{
											clickFunParamStr = map[paramIndex];
											clickFunParamAry[paramIndex] = map[paramIndex];
										}
										dataStr+="}";
										
									}
//									console.log("dataStr:----->"+dataStr);
									btn_cz = '', funhandlStr='', tagTextStr = tag.text===undefined?'':' '+tag.text;
									//操作按钮点击事件添加方式
									if ( tag.onClick!==undefined ) {
										//$btn_cz.bind('click' ,function(){ tag.onClick(clickFunParamAry)});
									} else if(tag.functionName!==undefined){
//										funhandlStr = ' onclick="'+tag.functionName+'('+clickFunParamStr+')"';
										funhandlStr = " onclick="+tag.functionName+"("+dataStr+")";
									}
									//判断使用什么表现展示操作按钮
									if(tag.aClass!==undefined){
										if(tag.title=='申请审核'){
											if(map['SPZT']!='2' & map['SPZT']!='1'){//申请审核单独处理
												btn_cz = '<a class="' + tag.aClass + '" href="javascript:void(0);" title="' + tag.title + '" '+funhandlStr+'><i class="' + tag.iClass + '"></i>' + tagTextStr + '</a>';
											}
										}else if(tag.title=='变更申请审核'){
											if(map['SPZT']=='0'){
												btn_cz = '<a class="' + tag.aClass + '" href="javascript:void(0);" title="' + tag.title + '" '+funhandlStr+'><i class="' + tag.iClass + '"></i>' + tagTextStr + '</a>';
											}else{
												btn_cz = '----';
											}
										}else if(tag.title=='审核'){
											if(map['SPZT']=='1'){
												btn_cz = '<a class="' + tag.aClass + '" href="javascript:void(0);" title="' + tag.title + '" '+funhandlStr+'><i class="' + tag.iClass + '"></i>' + tagTextStr + '</a>';
											}else{
												btn_cz = '----';
											}
										}else if(tag.title=='撤销登记'){
											if(map['ZT']!='0'){
												btn_cz = '<a class="' + tag.aClass + '" href="javascript:void(0);" title="' + tag.title + '" '+funhandlStr+'><i class="' + tag.iClass + '"></i>' + tagTextStr + '</a>';
											}else{
												btn_cz = '----';
											}
										}
										else if(tag.title=='修改机构信息' || tag.title=='变更机构信息'){
//											if(map['SPZT']!='2' & map['SPZT']!='1' ){
												btn_cz = '<a class="' + tag.aClass + '" href="javascript:void(0);" title="' + tag.title + '" '+funhandlStr+'><i class="' + tag.iClass + '"></i>' + tagTextStr + '</a>';
//											}
//											else{
//												btn_cz = '----';
//											}
										}
										else if(tag.title=='删除机构信息'){
											if(map['SPZT']!='2' & map['SPZT']!='1' ){
												btn_cz = '<a class="' + tag.aClass + '" href="javascript:void(0);" title="' + tag.title + '" '+funhandlStr+'><i class="' + tag.iClass + '"></i>' + tagTextStr + '</a>';
											}
										}
										else{
											btn_cz = '<a class="' + tag.aClass + '" href="javascript:void(0);" title="' + tag.title + '" '+funhandlStr+'><i class="' + tag.iClass + '"></i>' + tagTextStr + '</a>';
										}
										
									}else if(tag.bClass!==undefined){
										btn_cz = '<button class="' + tag.bClass + '" data-toggle="tooltip" data-placement="left" title="' + tag.title + '"'+funhandlStr+'><i class="' + tag.iClass + '"></i>' + tagTextStr + '</button>';
									}else if(tag.iClass!==undefined){
										btn_cz = '<i class="'+tag.iClass+'" title="'+tag.title+'"'+funhandlStr+'></i>';
									}
									//处理
									
									if ( $page.multipleSelect ) {//有ichecks多选框
										//tbodyTrStr += '<td><input type="checkbox" class="i-checks" name="input[]" value="@value"></td>';
										//tbodyTrStr=tbodyTrStr.replace("@value",dataStr);
									}
									
									
									
									tbodyTdStr += btn_cz;
								});
								tbodyTrStr += tbodyTdStr + '</td>';
							} else if ( column.format ) {
								tbodyTrStr += '<td>'+column.format(map)+'</td>';
							} else if ( column.dataIndex ) {
								var value=map[column.dataIndex];
								if(value==null || value=='null'){
									value='';
								}
								tbodyTrStr += '<td>'+value+'</td>';
							}
						}
					});
					tbodyStr += tbodyTrStr + '</tr>';
				});
			}
			$this.append(theadStr+tbodyStr);
			if ( $page.multipleSelect ) {
				$('.i-checks',$this).iCheck({
				    checkboxClass: 'icheckbox_square-green',
				    radioClass: 'iradio_square-green',
				});
				//全选、反选
				$('thead input.i-checks',$this).on('ifChecked', function(event){ $('tbody td input.i-checks',$this).iCheck('check');	});
				$('thead input.i-checks',$this).on('ifUnchecked', function(event){ $('tbody td input.i-checks',$this).iCheck('uncheck');	});
			}
		}
		
	}
	
	var _initPaginator = function() {
		if( $page.totalCount > 0 ){
			//分页栏信息
			var pageInfoHtml = '<div class="col-sm-6"><div class="dataTables_info" id="pageLink">显示 ' + $page.beginNumber
			+ ' 到 ' + $page.endNumber + ' ,共 ' + $page.totalPage + ' 页, ' + $page.totalCount + ' 条记录</div></div><div class="col-sm-6">'
			+ '<div class="dataTables_paginate paging_bootstrap_full_number"><div id="pagination"></div></div></div>';
	        var $div_page = $('#divPage');
			if( $div_page.length>0 ){
				$div_page.empty();
				$div_page.html(pageInfoHtml);
			}else{
				$this.parent().parent().append('<div id="divPage" class="row">' + pageInfoHtml + '</div>');
			}
	        var options = {
	            currentPage: $page.currentPage,
	            totalPages: $page.totalPage,
		        onPageClicked: function (event, originalEvent, type,page) {
                    // debugger;
					if ( page!== $page.currentPage ){
						$page.currentPage = page;
						_reloadTable();
						//console.log($("input[name='idList']"));
						if(plug_icheck01=="icheck01"){
                            $("#datatable tbody").find("tr").each(function (index,value) {
                              //  console.log(  $("#datatable tbody"));
                                $(value).find("td").each(function(ind,val){
									if(ind>2&&ind<9){
                                        var td_old_html=$(val).html();
                                        $(val).html("");
                                        var self_td=$(val);
                                        var new_str=td_old_html.split(/[;@]/);
                                        $.each(new_str,function(ind_str,val_str){
                                            var html='<p style=\"width:160px;\">'+val_str+'</p>';
                                            self_td.append(html);
                                        });

                                    }
                                })


                            });
						    $(".icheckbox_square-green").find("input").iCheck("uncheck");
                            var Is_allchecked=true;
                            var change_iframe=$("#iframe0",window.parent.document).attr("src").split("=")[1];//左边容器
                            $("."+change_iframe+"-info",window.parent.document).find("span").each(function (index,value) {
                                var order_num=$(value).attr("data-value");
                                $(".iCheck-helper").each(function(index,value) {
                                    var xuhao=$(value).prev("input[name='idList']").val();//右边
                                    if (order_num == xuhao) {
                                        $(value).prev("input[name='idList']").iCheck("check");
                                    }
                                });

                            });
                            $(".iCheck-helper").on("click",function () {
                                var change_iframe=$("#iframe0",window.parent.document).attr("src").split("=")[1];
                                var xuhao="";
                                var order_num="";
                                if($(this).parent(".icheckbox_square-green ").hasClass("checked")){//选中
                                    var html="";
                                    var chosen_info=$(this).parents("tr").find("td").eq(2).html();

                                    if($(this).parents("tr").find("th").length!==0){//全选 $(this).iCheck-helper

                                        var arr01=[];//右边的
                                        var arr02=[];//左边的
                                        var name=[];
                                        if($("."+change_iframe+"-info",window.parent.document).html()==""){//全选直接都追加
                                            $(".checked:not(.checked:first)").each(function () {
                                                xuhao=$(this).find("input[name='idList']").val();//$(this)是.checked 右边的
                                                chosen_info=$(this).parents("tr").find("td").eq(2).html();
												html+="<span data-value='"+xuhao+"'>"+chosen_info+"<img src='"+basePath+"images/delete.png' alt=\"\"></span>";

                                            });
                                        }else{//全选剔除重复的追加
                                            $(".checked:not(.checked:first)").each(function () {//全选追加
                                                xuhao=$(this).find("input[name='idList']").val();//$(this)是.checked 右边的
                                                chosen_info=$(this).parents("tr").find("td").eq(2).html();
                                                arr01.push(xuhao);
                                                name.push(chosen_info);
                                            });
                                            $("."+change_iframe+"-info",window.parent.document).find("span").each(function () {
                                                order_num=$(this).attr("data-value");
                                                arr02.push(order_num);

                                            });
                                            for(var i=0;i<arr01.length;i++){
                                                var right_val=arr01[i];
                                                if(arr02.indexOf(right_val)==-1){
                                                    html+="<span data-value='"+arr01[i]+"'>"+name[i]+"<img src='"+basePath+"images/delete.png' alt=\"\"></span>";

                                                }
                                            }
                                        }
                                        //$(this).parents("th").find("input").iCheck("check");
									 }else{//单选
                                        xuhao=$(this).prev("input[name='idList']").val();//$(this).iCheck-helper
                                        html+="<span data-value='"+xuhao+"'>"+chosen_info+"<img src='"+basePath+"images/delete.png' alt=\"\"></span>";

                                    }
                                    $("."+change_iframe+"-info",window.parent.document).append(html);


                                }else{//全选移除
                                    if($(this).parents("tr").find("th").length!==0){//点击全选
                                        $(".icheckbox_square-green:not(.icheckbox_square-green:first)").each(function (){
                                            xuhao=$(this).find("input[name='idList']").val();
                                            $("."+change_iframe+"-info",window.parent.document).find("span").each(function () {
                                                order_num=$(this).attr("data-value");

                                                if(order_num==xuhao){
                                                    $("."+change_iframe+"-info",window.parent.document).find("span[data-value='"+xuhao+"']").remove();
                                                }

                                            })
                                        })
                                    }else{//单选移除
                                        xuhao=$(this).prev("input[name='idList']").val();
                                        $("."+change_iframe+"-info",window.parent.document).find("span").each(function () {
                                            order_num=$(this).attr("data-value");

                                            if(order_num==xuhao){
                                                $("."+change_iframe+"-info",window.parent.document).find("span[data-value='"+xuhao+"']").remove();
                                            }

                                        })

                                    }
								 }
                                $("."+change_iframe+"-info",window.parent.document).find("img").on("click",function () {
									order_num=$(this).parent("span").attr("data-value");
                                  	$("tbody").find(".checked").each(function (){
										xuhao=$(this).find("input[name='idList']").val();
										if(order_num==xuhao){
                                            $(this).find("input[name='idList']").iCheck("uncheck");

                                        }
                                  	});

                                    $(this).parent("span").remove();
                                });
							 });
                            var valid_info=$("."+change_iframe+"-info",window.parent.document);
                            if(valid_info.html()!=""){
                                $("."+change_iframe+"-info",window.parent.document).siblings(".error").remove();
                            }

                            $('tbody td input.i-checks',$this).each(function(){
                                if(!$(this).parent(".icheckbox_square-green").hasClass("checked")){
                                    Is_allchecked=false;
                                }
                            })
                            if(Is_allchecked){
                                $('thead th input.i-checks',$this).iCheck('check');
                            }



                        }

					}
		        }
	        }
			$("#pagination").bootstrapPaginator(options);
	        //初始化刷新表格按钮事件
	        _refreshData();
	        if($page.multipleSelect){
	        	//_icheckInit();
	        }
			if ( options.onLoadSuccess ) {
				options.onLoadSuccess();
			}
		}else{
			$('#divPage').empty();
		}
	}
	var _setFieldColumns = function(){
		if ( $page.columns.length===0 ) {
			return;
		}
		$page.fieldColumns = new Array();
		if ( $page.multipleSelect ) {
			$page.showColCount++;
		}
		if ( $page.rownumbers ) {
			$page.fieldColumns.push({id:'iIndex',text:'序号'});
		}
		$.each($page.columns, function(n, column){
			$page.fieldColumns.push({id:column.dataIndex,text:column.title});
		});
	}
	
	var _initChooseColumns = function() {
		var columnsStr = '';
		$.each($page.fieldColumns,function(index,obj){
			columnsStr += '<li><label><input type="checkbox" data-field="'+obj.id+'" value="'+obj.id+'" checked="checked"> '+obj.text+'</label></li>';
		});
		$('#ChooseColumnsUl').html(columnsStr);
		_initOnClickCol();
	}
	
	var _initOnClickCol = function(){
    	$('#ChooseColumnsUl input[type=checkbox]').click(function(e){
        	var $clicked = $(this);
    		toggleColumn(_getFieldIndex($page.fieldColumns, $clicked.val()) , $clicked.is(':checked'), true);
    		_createTable();
       	});
    }
	
	var _initSearch = function(){
		var $searchForm = $(".search-form");
		if($searchForm){
			//查询-点击事件
			$('#searchSubmit',$searchForm).click(function(){
				$page.params = $searchForm.serializeObject();
				$page.currentPage = 1;
				_reloadTable();
			});
			
			//刷新-点击事件
			$('#flushButton').click(function(){
				$page.currentPage = 1;
				_reloadTable();
			});
			
			//重置-点击事件
			$('#clearSearch').click(function(){
				$(".search-form").get(0).reset();
//				$('.search-form select').val('');
				//增加第一个select之后所有select的重置(2017-1-10党王震)
				var szds = $("select[name='szds']")
				var szqx = $("select[name='szqx']");
				var szxz = $("select[name='szxz']");
				//20170315 党王震
				if(szds.length!=0){
					szqx.empty();
					szxz.empty();
				}
				if(szqx.length!=0){
					szxz.empty();
				}
//				if(szqx){
//					szqx.empty();
//				}
//				if(szxz){
//					szxz.empty();
//				}
				$('.search-form select').trigger('chosen:updated');//更新选项  
				$page.params = $searchForm.serializeObject();
				$page.currentPage = 1;
				_reloadTable();
			});
			
			
			//批量删除-点击事件
			$('#deleteButton').click(function(){
				 var str="";
			  	 var ids="";
				$("input[name='idList']:checkbox").each(function(){
				    if(true == $(this).is(':checked')){
				       str+=$(this).val()+",";
				    }
				  });
				
				 ids = str.substr(0,str.length-1);
				 //以下三行只针对字典项目中不可维护的字典批量删除时使用 20170105 song
				 if(ids.indexOf("不可维护")>=0){
					 alert("字典不可维护，无法删除，请联系超级管理员！");
					 return false;
				 }
				 _deleteMore(ids);
			});
			
			//更多查询-点击事件
			$('#moreSearch',$searchForm).click(function(){
				$(this).children('i').toggleClass("fa-plus").toggleClass("fa-minus");
			});


		}
		//设置增加地市代码，区县代码，所在乡镇代码	
//       	var bmjb=$.manageServer().yhBmjb;
//   		var jglx=$.manageServer().yhJglx;
//   		var yhXzqh=$.manageServer().yhXzqh;
//		if(bmjb==1 && jglx=='0'){//省级级用户
//			
// 			$("select[name='dsdm']").change(function() {//获取区县
//			  var qxSelect = $("select[name='qxdm']");
//			  var xzSelect = $("select[name='xzdm']");
//			  var szdsxzqh=$("select[name='dsdm']").val();
//			  qxSelect.val('');
//			  xzSelect.val('');
//			  if(szdsxzqh){
//					  $.ajax({
//						type:'post',
//						url:basePath+'basezdxm_getzdSelectQx.do',
//						data:{xzqh:szdsxzqh},
//						dataType:'json',
//						success:function(data){
//							qxSelect.empty(); 
//							qxSelect.append("<option value=''>--请选择--</option>");
//							for(var i in data){
//								var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
//						    	qxSelect.append(str);
//						    	
//			   				}
//							xzSelect.empty();
//							xzSelect.append("<option value=''>--请选择--</option>");
//							qxSelect.trigger('chosen:updated');
//							xzSelect.trigger('chosen:updated');
//			   			}
//					});
//				  }else{
//					  qxSelect.empty(); 
//					  xzSelect.empty();
//					  qxSelect.append("<option value=''>--请选择--</option>");
//				 	  xzSelect.append("<option value=''>--请选择--</option>");
//				 	  qxSelect.trigger('chosen:updated');
//					  xzSelect.trigger('chosen:updated');
//				  }
//			});
//			$("select[name='qxdm']").change(function() {//获取乡镇
//				  var szqxxzqh=$("select[name='qxdm']").val();
//				  var xzSelect = $("select[name='xzdm']");
//				  xzSelect.val('');
//				  if(szqxxzqh){
//					  $.ajax({
//						type:'post',
//						url:basePath+'basezdxm_getzdSelectXz.do',
//						data:{xzqh:szqxxzqh},
//						dataType:'json',
//						success:function(data){
//							xzSelect.empty(); 
//							xzSelect.append("<option value=''>--请选择--</option>");
//							for(var i in data){
//								var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
//						    	xzSelect.append(str);
//			   				}
//							xzSelect.trigger('chosen:updated');
//			   			}
//					});
//				  }else{
//					  xzSelect.empty(); 
//					  xzSelect.append("<option value=''>--请选择--</option>");
//					  xzSelect.trigger('chosen:updated');
//				  }
//				});
//		}else if(bmjb==2 && jglx=='0'){//市级用户
//				$("select[name='dsdm']").val(yhXzqh);
//				$("select[name='dsdm']").trigger('chosen:updated');
//				var qxSelect = $("select[name='qxdm']");
//  				  $.ajax({
//						type:'post',
//						url:basePath+'basezdxm_getzdSelectQx.do',
//						dataType:'json',
//						success:function(data){
//							console.log(data);
//							qxSelect.empty(); 
//							qxSelect.append("<option value=''>--请选择--</option>");
//							for(var i in data){
//								var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
//						    	qxSelect.append(str);
//						    	
//			   				}
//							xzSelect.empty();
//							xzSelect.append("<option value=''>--请选择--</option>");
//							qxSelect.trigger('chosen:updated');
//							xzSelect.trigger('chosen:updated');
//			   			}
//					});
//  				   qxSelect.trigger('chosen:updated');
//   				$("select[name='qxdm']").change(function() {
//				  var szqxxzqh=$("select[name='qxdm']").val();
//				  var xzSelect = $("select[name='xzdm']");
//  				  xzSelect.val('');
//				  if(szqxxzqh){
//					  $.ajax({
//						type:'post',
//						url:basePath+'basezdxm_getzdSelectXz.do',
//						data:{xzqh:szqxxzqh},
//						dataType:'json',
//						success:function(data){
//							xzSelect.empty(); 
//							xzSelect.append("<option value=''>--请选择--</option>");
//							for(var i in data){
//								var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
//						    	xzSelect.append(str);
//			   				}
//							 xzSelect.trigger('chosen:updated');
//			   			}
//					});
//				  }else{
//					  xzSelect.empty(); 
//					  xzSelect.append("<option value=''>--请选择--</option>");
//					  xzSelect.trigger('chosen:updated');
//				  }
//				  
//				});
//   				
//   				
//   			}else if(bmjb==3 && jglx=='0'){//区县级用户
//   				 var qxSelect = $("select[name='qxdm']");
//			 	 var xzSelect = $("select[name='xzdm']");
//			 	 var szdsxzqh=$("select[name='dsdm']");
//   				$.ajax({
//						type:'post',
//						url:basePath+'basezdxm_getzdSelectQx.do',
//						dataType:'json',
//						success:function(data){
//							qxSelect.empty(); 
//							qxSelect.append("<option value=''>--请选择--</option>");
//							for(var i in data){
//								var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
//						    	qxSelect.append(str);
//			   				}
//			   			}
//					});
//   				 $.ajax({
//						type:'post',
//						url:basePath+'basezdxm_getzdSelectXz.do',
//						data:{xzqh:yhXzqh},
//						dataType:'json',
//						success:function(data){
//							xzSelect.empty(); 
//							xzSelect.append("<option value=''>--请选择--</option>");
//							for(var i in data){
//								var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
//						    	xzSelect.append(str);
//			   				}
//							xzSelect.trigger('chosen:updated');
//			   			}
//					});
//   				 	szdsxzqh.val(yhXzqh.substring(0,4)+'00');
//   				 	szdsxzqh.trigger('chosen:updated');
// 				 	qxSelect.val(yhXzqh);
//					qxSelect.trigger('chosen:updated');
//					xzSelect.trigger('chosen:updated');
//   			}
		
		if(bmjb==1 && jglx=='0'){//省级级用户
 			$("select[name='szds']").change(function() {//获取区县
			  var qxSelect = $("select[name='szqx']");
			  var xzSelect = $("select[name='szxz']");
			  var szdsxzqh=$("select[name='szds']").val();
			  qxSelect.val('');
			  xzSelect.val('');
			  if(szdsxzqh){
					  $.ajax({
						type:'post',
						url:basePath+'serchform_getserchformDsQxXz.do',
						data:{sjbmbm:szdsxzqh},
						dataType:'json',
						success:function(data){
							qxSelect.empty(); 
							qxSelect.append("<option value=''>--请选择--</option>");
							for(var i in data){
								var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
						    	qxSelect.append(str);
						    	
			   				}
							xzSelect.empty();
							xzSelect.append("<option value=''>--请选择--</option>");
							qxSelect.trigger('chosen:updated');
							xzSelect.trigger('chosen:updated');
			   			}
					});
				  }else{
					  qxSelect.empty(); 
					  xzSelect.empty();
					  qxSelect.append("<option value=''>--请选择--</option>");
				 	  xzSelect.append("<option value=''>--请选择--</option>");
				 	  qxSelect.trigger('chosen:updated');
					  xzSelect.trigger('chosen:updated');
				  }
			});
			$("select[name='szqx']").change(function() {//获取乡镇
				  var szqxxzqh=$("select[name='szqx']").val();
				  var xzSelect = $("select[name='szxz']");
				  xzSelect.val('');
				  if(szqxxzqh){
					  $.ajax({
						type:'post',
						url:basePath+'serchform_getserchformDsQxXz.do',
						data:{sjbmbm:szqxxzqh},
						dataType:'json',
						success:function(data){
							xzSelect.empty(); 
							xzSelect.append("<option value=''>--请选择--</option>");
							for(var i in data){
								var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
						    	xzSelect.append(str);
			   				}
							xzSelect.trigger('chosen:updated');
			   			}
					});
				  }else{
					  xzSelect.empty(); 
					  xzSelect.append("<option value=''>--请选择--</option>");
					  xzSelect.trigger('chosen:updated');
				  }
				});
		}else if(bmjb==2 && jglx=='0'){//市级用户
   				$("select[name='szqx']").change(function() {
				  var szqxxzqh=$("select[name='szqx']").val();
				  var xzSelect = $("select[name='szxz']");
  				  xzSelect.val('');
				  if(szqxxzqh){
					  $.ajax({
						type:'post',
						url:basePath+'serchform_getserchformDsQxXz.do',
						data:{sjbmbm:szqxxzqh},
						dataType:'json',
						success:function(data){
							xzSelect.empty(); 
							xzSelect.append("<option value=''>--请选择--</option>");
							for(var i in data){
								var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
						    	xzSelect.append(str);
			   				}
							 xzSelect.trigger('chosen:updated');
			   			}
					});
				  }else{
					  xzSelect.empty(); 
					  xzSelect.append("<option value=''>--请选择--</option>");
					  xzSelect.trigger('chosen:updated');
				  }
				  
				});
   				
   				
   			}
//		else if(bmjb==3 && jglx=='0'){//区县级用户
//   				 var qxSelect = $("select[name='szqx']");
//			 	 var xzSelect = $("select[name='szxz']");
//			 	 var szdsxzqh=$("select[name='szds']");
//   				$.ajax({
//						type:'post',
//						url:basePath+'basezdxm_getzdSelectQx.do',
//						dataType:'json',
//						success:function(data){
//							qxSelect.empty(); 
//							qxSelect.append("<option value=''>--请选择--</option>");
//							for(var i in data){
//								var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
//						    	qxSelect.append(str);
//			   				}
//			   			}
//					});
//   				 $.ajax({
//						type:'post',
//						url:basePath+'basezdxm_getzdSelectXz.do',
//						data:{xzqh:yhXzqh},
//						dataType:'json',
//						success:function(data){
//							xzSelect.empty(); 
//							xzSelect.append("<option value=''>--请选择--</option>");
//							for(var i in data){
//								var str="<option value='"+data[i].value+"'>"+data[i].text+"</option>";
//						    	xzSelect.append(str);
//			   				}
//							xzSelect.trigger('chosen:updated');
//			   			}
//					});
//   				 	szdsxzqh.val(yhXzqh.substring(0,4)+'00');
//   				 	szdsxzqh.trigger('chosen:updated');
// 				 	qxSelect.val(yhXzqh);
//					qxSelect.trigger('chosen:updated');
//					xzSelect.trigger('chosen:updated');
//   			}
		
		
	}
	
	var toggleColumn = function (index, checked, needUpdate) {
		if (index === -1) {
            return;
        }
        $page.fieldColumns[index].visible = checked;
        if(checked){
        	$page.hideColumns.splice($.inArray($page.fieldColumns[index].id,$page.hideColumns),1);
        }else if( $.inArray($page.fieldColumns[index].id, $page.hideColumns)===-1 ) {
        	$page.hideColumns.push($page.fieldColumns[index].id);
        }
        //_createTable();
	}
	
	var getColumnIsVisible = function(id) {
		$.each($page.fieldColumns,function(i,n){
			if(n.id==id){
				return n.visible;
			}
		});
		return true;
	}
	
	
	function _getSearchContent(obj) {
		var search_content_type = '';
		var id = obj.id===undefined?obj.name:obj.id, name = obj.name===undefined?obj.id:obj.name,
			title = obj.title, inputtext = obj.inputtext===undefined?'':obj.inputtext;
		switch (obj.type) {
			case "select":
				search_content_type += '<div class="col-sm-3 no-padding">';
				search_content_type += '<div class="search-group">';
				search_content_type += '<span>'+title+'：</span>';
				search_content_type += '<select name="'+name+'" data-placeholder="请选择" class="chosen-select-search">';
				search_content_type += '<option value="">请选择</option>';
				var optionObj = null;
				if ( obj.data!==undefined ) {
					for (var i = 0; i < obj.data.length; i++) {
						optionObj = obj.data[i];
						if ( ( typeof paramIndex =='object' ) && paramIndex.constructor==Array ) {
							search_content_type += '<option value="' + optionObj.value + '" data-tokens="'+optionObj.text+'">' + optionObj.text + '</option>';
						}else{
							search_content_type += '<option value="' + obj.data[i][0] + '" data-tokens="'+obj.data[i][1]+'">' + obj.data[i][1] + '</option>';
						}
					}
				}else if( obj.url!==undefined ){
//					console.log(obj);
					$.ajax({  
					    url: basePath+obj.url, 
					    type: 'post',
					    async: false,
					    dataType: 'json',
					    data:{zdbh:obj.zdbh},
					    success:function(data) {
							if(data){
								$.each(data,function(idx,optionObj){
									search_content_type += '<option value="' + optionObj.value + '" data-tokens="'+optionObj.text+'">' + optionObj.text + '</option>';
								});
							}
						}
					});
				}
				search_content_type += '</select>';
				search_content_type += '</div>';

				search_content_type += '</div>';
//				console.log(obj.url);
//				console.log(search_content_type);
				break;
			case "select-no":
				search_content_type += '<div class="col-lg-3 col-md-3 col-xs-3 text-center">';

				search_content_type += '<div id="title_' + id + '" class="col-lg-4 col-md-4 col-xs-4 " style="margin-top: 8px;padding-right:7px!important ;text-align:right ;">';
				search_content_type += title;
				search_content_type += ':</div>';

				search_content_type += '<div  style="margin-top:4px;text-align:left;" class="col-lg-8 col-md-8 col-xs-8 padding-right-5 no-padding-left">';
				search_content_type += '<select id="' + id + '" name="' + id + '" style="width:100%" onchange="' + onchange + 'AddSelect(\'s\',\'' + sqlname + '\',\'\',\'SelectTab\',\'' + sqlname + '\');">';
				if (obj.data) {
					for (var i = 0; i < obj.data.length; i++) {
						search_content_type += '<option value="' + obj.data[i][0] + '">' + obj.data[i][1] + '</option>';
					}
				}
				search_content_type += '</select>';
				search_content_type += '</div>';

				search_content_type += '</div>';
				break;
			case "input":
				search_content_type += '<div class="col-sm-3 no-padding">';
				search_content_type += '<div class="search-group">';
				search_content_type += '<span>'+title+'：</span> <input id="'+id+'" name="'+name+'" type="text" placeholder="'+inputtext+'" class="form-control input-sm">';
				search_content_type += '</div>';
				search_content_type += '</div>';
				break;
			case "datasearch":	
				search_content_type  = '<div class="col-sm-5 no-padding" id="data_5">';
                search_content_type += '<span style="float:left;padding-right:5px; line-height:30px;">'+title+"："+'</span>';
                search_content_type += '<div class="input-daterange input-group" id="datepicker">';
                search_content_type += '<input type="text" class="input-sm form-control" placeholder="开始日期" name="starttime">';
                search_content_type += '<span class="input-group-addon">至</span>';
                search_content_type += '<input type="text" class="input-sm form-control" placeholder="结束日期" name="endtime">';
                search_content_type += '</div>';
                search_content_type += '</div>';
                break;
            case "datasearch1":
                search_content_type  = '<div class="col-sm-5 no-padding" id="data_6">';
                search_content_type += '<select name="shsjlb" style="float:left;padding-right:0px; line-height:30px;height: 30px;width:80px">';
                search_content_type += '<option value="0">'+title+'</option>';
                search_content_type += '<option value="1">'+obj.title1+'</option>';
                search_content_type += '</select><span style="float:left;padding-right:5px; line-height:30px;">:</span>';
                search_content_type += '<div class="input-daterange input-group" id="datepicker1">';
                search_content_type += '<input type="text" class="input-sm form-control" placeholder="开始日期" name="starttime1">';
                search_content_type += '<span class="input-group-addon">至</span>';
                search_content_type += '<input type="text" class="input-sm form-control" placeholder="结束日期" name="endtime1">';
                search_content_type += '</div>';
                search_content_type += '</div>';
                break;
		}
		return search_content_type;
	}
	
	var _getSelectContentRow = function (body) {
		var select_content_row = '<div class="row">';
		select_content_row += body;
		select_content_row += '</div>';
		return select_content_row;
	}
	
	var _getSelectContentRowOther = function (body) {
		var select_content_row = '<div id="otherSelectDiv" class="collapse" aria-expanded="false">';
		select_content_row += body;
		select_content_row += '</div>';
		return select_content_row;
	}
	
	
	var _getStr = function(obj){
		if(obj!==undefined && obj!==null){
			return obj;
		}else{
			return '';
		}
	}
	
	var _getSearchBnt = function(showOther){
		var btns = ''; 
		btns = '<div class="col-sm-3">'+
			'<button class="btn btn-sm btn-primary search-submit" id="searchSubmit" type="button"><i class="fa fa-search"></i>&nbsp;查询</button>'+
			'<button class="btn btn-sm btn-white" id="clearSearch" type="button"><i class="fa fa-remove"></i>&nbsp;重置</button>';
		if(showOther){
			btns += '<button id="moreSearch" class="btn btn-sm btn-primary" data-toggle="collapse" data-parent="#accordion" href="#otherSelectDiv"><i class="fa fa-plus"></i>&nbsp;更多查询</button>';
		}
		btns += '</div>';
		return btns;
	}
	
	var _initSearchForm = function() {
		if(!$page.searchForm){
			return false;
		}
		var $searchForm = $('.search-form');
		var $rows = null, $row = null, rowOfCnt=4, showOtherBtn = $page.searchForm.length>=rowOfCnt;
		var j=0,search_content = '',searchContentRow = '',searchContents = '',search_content_body = '',rowCount=0;
		$.each($page.searchForm,function(i,obj){
			j = i+1;
			if ( i===(rowOfCnt-2) ){
				searchContents += _getSearchContent(obj);
				searchContents += _getSearchBnt(showOtherBtn);
				searchContentRow += _getSelectContentRow(searchContents);
				if($page.searchForm.length>=rowOfCnt){
					searchContentRow += '<div id="otherSelectDiv" class="collapse" aria-expanded="false">';
				}
				searchContents = '';
			}else if ( (j+1) % rowOfCnt === 0) {
				searchContents += _getSearchContent(obj);
				searchContentRow += _getSelectContentRow(searchContents);
				searchContents = '';
			} else {
				if (j == $page.searchForm.length) {
					searchContents += _getSearchContent(obj);
					if(i<(rowOfCnt-2)){
						searchContents += _getSearchBnt(showOtherBtn);
					}
					searchContentRow += _getSelectContentRow(searchContents);
					if(i>rowOfCnt){
						searchContentRow += '</div>';
					}
					searchContents = '';
				} else {
					searchContents += _getSearchContent(obj);
				}
			}
		});
		$searchForm.html(searchContentRow);
	}


    YDataTable.prototype.showColumn = function() {
//		console.log('YDataTable.prototype.aa0000000');
	}
	YDataTable.prototype.toggleColumn = function (index, checked, needUpdate) {
        if (index === -1) {
            return;
        }
        this.$page.columns[index].visible = checked;
//        this.initHeader();
//        this.initSearch();
//        this.initPagination();
//        this.initBody();
        this._initTable();

//        if (this.options.showColumns) {
//            var $items = this.$toolbar.find('.keep-open input').prop('disabled', false);
//
//            if (needUpdate) {
//                $items.filter(sprintf('[value="%s"]', index)).prop('checked', checked);
//            }
//
//            if ($items.filter(':checked').length <= this.options.minimumCountColumns) {
//                $items.filter(':checked').prop('disabled', true);
//            }
//        }
        
        
        
        
    };
//	$.fn.YDataTable.defaults = defaults;
    var allowedMethods = [
        'showColumn', 'hideColumn'
    ];
    
    
	$.fn.YDataTable = YDataTable;
    $.fn.YDataTable.defaults = defaults;
//    $.fn.YDataTable.Constructor = BootstrapTable;
//    $.fn.YDataTable.columnDefaults = BootstrapTable.COLUMN_DEFAULTS;
//    $.fn.YDataTable.locales = BootstrapTable.LOCALES;
    $.fn.YDataTable.methods = allowedMethods;
    
    
    

    
    
    
    
 })(jQuery);