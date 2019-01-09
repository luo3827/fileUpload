var $page;
(function($) {
	"use strict";
	var $this;
	var defaults = {   
		pagenumber: 1,     
		pagecount: 1,
		currentPage: 1,
		rownumbers: false,
		multipleSelect: false
	};
	var YDataTableRadio = function(options) {
		$this = $(this);
		if ( typeof(options) === 'string' ) {
			if( /^(getCheck|getUnCheck|reload|getCheckedValue)$/i.test(options) ) {
				if ( options==='getCheck' ) {
					_icheckInit();
				}else if(options==='reload'){
					//$page.currentPage = 1;
					_reloadTable();
				}else if(options==='getCheckedValue'){
					return _getCheckedValue();
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
			var opts = $.extend({}, defaults, options); 
			_initPageVal(opts);
			if(!$page.url){
				return false;
			}
			_initTable();
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
		$("input[type=checkbox]",$this).each(function(){//each()方法遍历所有的复选框 
	        if($this.attr("checked")){//这里就可以判断当前是否被选择了 
	            $this.iCheck('uncheck');//如果已选择，可以用iCheck取消选择  
	        }else{ 
//	            $this.iCheck('check');//如果没选择，可以用iCheck美化选择    
	        } 
	    }); 
	}
	function _initPageVal(options){
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
				searchForm: options.searchForm
			}
		}
	}
	
	var _initTable = function() {
		fnLoading();
		_ajaxGetData();
	}
	
	var _reloadTable = function(){
		fnLoading();
		_ajaxGetData2();
	}
	function isExitsFunction(funcName) {
	    try {
	        if (typeof(eval(funcName)) == "function") {
	            return true;
	        }
	    } catch(e) {}
	    return false;
	}
	var _reloadTable2 = function(){
		fnLoading();
		if(isExitsFunction('searchAfter')){
			searchAfter();
		}
		_ajaxGetData2();
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
		    async: true, //同步，默认:true-异步
		    dataType: 'json',
		    success:function(data) {
//				if (data.errorcode === 0) {
					$page.ajaxData = data;
//				} else if (data.errorcode === 200) {
//					modal_confirm_log("登录过期,请重新登陆！", relogin);
//				}
				_setFieldColumns();
				_createTable();
				_initPaginator();
				_initChooseColumns();
		    },  
		    error : function(data) {
		    	fnAjaxError(data.responseText);
		    },complete: function(){
		    	fnLoadClose();
		    }
		});
	}
	
	var _ajaxGetData2 = function() {
		//访问后台带的参数
		var data = {'currentPage':$page.currentPage};
		var pageSize = $('#pageSize').val();
		if(pageSize){
			data['pageSize'] = pageSize;
		}
		$page.params = $.extend({}, $page.params, data);
		//ajax访问后台，渲染界面
		$.ajax({  
		    url: $page.url,// 跳转到 action  
		    data: $page.params,
		    type: 'post',
		    cache: false,
		    async: true, //同步，默认:true-异步
		    dataType: 'json',
		    success:function(data) {
				$page.ajaxData = data;
				_createTable();
				_initPaginator();
				$('#pageSize').val(data.pageSize);
				if(isExitsFunction('searchSuccess')){
					searchSuccess();
				}
		    },  
		    error : function(data) {
		    	fnAjaxError(data.responseText);
		    },complete: function(){
		    	fnLoadClose();
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
		}else{
			$page.rows = [];
			$page.beginNumber = 0;
		}
		if ( $page.columns.length ) {
			$this.empty();
			if ( $page.multipleSelect ) {
				theadTrStr += '<th></th>';
				$page.showColCount++;
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
					if(!column.hidden)
					theadTrStr += '<th>' + column.title + '</th>';
				}
			});
			theadStr += theadTrStr+'</tr></thead>';
			//表体
			if( !$page.rows || $page.rows.length==0 ){
				tbodyStr = '<tbody><tr><td colspan="'+$page.showColCount+'" style="text-align:center;height:120px;font-size:16px;"><i class="fa fa-info-circle fa-lg" style="color:#090;padding-right:4px;"></i>&nbsp;&nbsp;没有找到匹配的记录</td></tr></tbody>';
			}else{
				$.each($page.rows, function(m, map){
					tbodyTrStr = '<tr>';
					if ( $page.multipleSelect ) {//有ichecks多选框
						if($.manageServer().ichecks){
								checkStr='';	
							$.each($.manageServer().ichecks, function(n, value){
								if(map[value]){
									if(n>=1){
										checkStr+="@"+map[value];
									}else{
										checkStr=map[value];
									}
								}
							})
						}
						tbodyTrStr += '<td><input type="radio" class="i-checks" name="idList" value="'+checkStr+'"></td>';
						
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
											var pamVal = '';
											pamVal = '';
											$.each(tag.paramIndex, function(p, paramIndexStr){
												if ( clickFunParamStr > 0 ) {
													clickFunParamStr += ',';
												}
												pamVal = map[paramIndexStr];
												if(!pamVal || pamVal==='null'){
													pamVal = '';
												}
												clickFunParamStr += pamVal;
												dataStr+=tag.paramName[p]+":"+"'"+pamVal+"'"+",";
												clickFunParamAry[paramIndexStr] = pamVal;
											});
											dataStr=dataStr.substring(0,dataStr.length-1);
										}else{
											clickFunParamStr = map[paramIndex];
											clickFunParamAry[paramIndex] = map[paramIndex];
										}
										dataStr+="}";
										
									}
									btn_cz = '', funhandlStr='', tagTextStr = tag.text===undefined?'':' '+tag.text;
									//操作按钮点击事件添加方式
									if ( tag.onClick!==undefined ) {
										//$btn_cz.bind('click' ,function(){ tag.onClick(clickFunParamAry)});
									} else if(tag.functionName!==undefined){
//										funhandlStr = ' onclick="'+tag.functionName+'('+clickFunParamStr+')"';
										funhandlStr = " onclick=\""+tag.functionName+"("+dataStr+")\"";
									}
									//判断使用什么表现展示操作按钮
									if(tag.aClass!==undefined){
										btn_cz = '<a class="' + tag.aClass + '" href="javascript:void(0);" title="' + tag.title + '" '+funhandlStr+'><i class="' + tag.iClass + '"></i>' + tagTextStr + '</a>';
									}else if(tag.bClass!==undefined){
										btn_cz = '<button class="' + tag.bClass + '" data-toggle="tooltip" data-placement="left" title="' + tag.title + '"'+funhandlStr+'><i class="' + tag.iClass + '"></i>' + tagTextStr + '</button>';
									}else if(tag.iClass!==undefined){
										btn_cz = '<i class="'+tag.iClass+'" title="'+tag.title+'"'+funhandlStr+'></i>';
									}
									//处理
//									if ( $page.multipleSelect ) {//有ichecks多选框
//										//tbodyTrStr += '<td><input type="checkbox" class="i-checks" name="input[]" value="@value"></td>';
//										//tbodyTrStr=tbodyTrStr.replace("@value",dataStr);
//									}
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
								if(!column.hidden){
									if(column.width){
										tbodyTrStr += '<td width="'+column.width+'" style="overflow:hidden;text-overflow:ellipsis ;white-space:norwap">'+value+'</td>';
									}else{
										tbodyTrStr += '<td>'+value+'</td>';
									}
								}
								
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
			var pageInfoHtml = '<div class="col-sm-6"><div class="dataTables_info" id="pageLink">'
			+ '每页<select id="pageSize"><option value="20">20</option><option value="50">50</option><option value="100">100</option><option value="200">200</option></select>条, '
			+ '显示 ' + $page.beginNumber
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
					if ( page!== $page.currentPage ){
						$page.currentPage = page;
						_reloadTable();
					}
		        }
	        }
			$("#pagination").bootstrapPaginator(options);
	        //初始化刷新表格按钮事件
//	        _refreshData();
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
	$(document).on('change', '#pageSize', function(){
		$page.currentPage = 1;
		_reloadTable();
	});
	
	var _getCheckedValue = function(){
		var ids = null;
		$('input:checkbox[name=idList]:checked', $this).each(function(i){
			if(i===0){
				ids = $(this).val();
			}else{
				ids += ',' + $(this).val();
			}
		});
		return ids;
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
				_reloadTable2();
			});
			//刷新-点击事件
			$('#flushButton').click(function(){
				//$page.currentPage = 1;
				//_reloadTable();
				location.reload();
			});
			//重置-点击事件
			$('#clearSearch').click(function(){
				$(".search-form").get(0).reset();
				$('.search-form select').val('');
				$('.search-form select').trigger('chosen:updated');//更新选项  
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
				 _deleteMore(ids);
			});
			
			//更多查询-点击事件
			$('#moreSearch',$searchForm).click(function(){
				$(this).children('i').toggleClass("fa-plus").toggleClass("fa-minus");
			});
		}
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
							search_content_type += '<option value="' + optionObj.value + '">' + optionObj.text + '</option>';
						}else{
							search_content_type += '<option value="' + obj.data[i][0] + '">' + obj.data[i][1] + '</option>';
						}
					}
				}else if( obj.url!==undefined ){
					console.log(obj);
					$.ajax({  
					    url: basePath+obj.url, 
					    type: 'post',
					    async: false,
					    dataType: 'json',
					    data:{zdbh:obj.zdbh},
					    success:function(data) {
							if(data){
								$.each(data,function(idx,optionObj){
									search_content_type += '<option value="' + optionObj.value + '">' + optionObj.text + '</option>';
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
                search_content_type += '<span style="float:left;padding-right:5px; line-height:30px;">'+title+":"+'</span>';
                search_content_type += '<div class="input-daterange input-group" id="datepicker">';
                search_content_type += '<input type="text" class="input-sm form-control" placeholder="开始日期" name="starttime">';
                search_content_type += '<span class="input-group-addon">至</span>';
                search_content_type += '<input type="text" class="input-sm form-control" placeholder="结束日期" name="endtime">';
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
	
	YDataTableRadio.prototype.toggleColumn = function (index, checked, needUpdate) {
        if (index === -1) {
            return;
        }
        this.$page.columns[index].visible = checked;
//        this.initHeader();
//        this.initSearch();
//        this.initPagination();
//        this.initBody();
        this._initTable();
    };
//	$.fn.YDataTable.defaults = defaults;
    var allowedMethods = [
        'showColumn', 'hideColumn'
    ];
	$.fn.YDataTableRadio = YDataTableRadio;
    $.fn.YDataTableRadio.defaults = defaults;
    $.fn.YDataTableRadio.methods = allowedMethods;
 })(jQuery);