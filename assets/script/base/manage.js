$(function(){
	$.manage = function(config) {
		var t_url=config.url,
			t_currentPage=config.currentPage,
			t_columns=config.columns;
		
		//默认加载，函数名称不能改变
		$('#datatable').dataTable({
			url: config.t_url,
			currentPage: t_currentPage,
			columns: t_columns,
			rownumbers: true,
			multipleSelect: true
		});
		$('#datatable').dataTable('getCheck');
	//	this.init();
	};
})