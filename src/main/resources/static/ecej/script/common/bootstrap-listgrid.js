/**
 * 详情页分页插件
 * bootstrap-listgrid - v1.0.0 - 2017-04-13
 * Copyright (c) 2017 fengli
 */

// 加载分页插件
document.write("<script type='text/javascript' src='"+path_root+"/core/bootstrap-datepicker/js/bootstrap-datepicker.min.js'></script>");
document.write("<script type='text/javascript' src='"+path_root+"/core/bootstrap-datepicker/js/bootstrap-datepicker.min.js'></script>");
(function($){

	var _options = {};
	var _pageNumber;
	var _firstOnload = true;
	var _row = [];
	var _this;
	$.fn.listgrid = function(options,rowIndex){
		// 处理是分页请求还是初始化请求
		if(typeof options == "number"){
			_pageNumber = options;
		}
		
		// 封装外部调用函数
		if(typeof options == "string"){
			if(options=="getCurrentRow"){
				return _row[rowIndex];
			}else if(options=="getSelectedRows"){
				var _getCheckedRows = $("input[name='chkListGrid']:checked")
				var getSelectedRows = [];
				for(var index=0;index<_getCheckedRows.length;index++){
					var _value = _getCheckedRows.eq(index).val();
					if(_value){
						getSelectedRows.push(_row[Number(_value.split("_")[1])]);
					}
				}
				return getSelectedRows;
			}else if(options=="getSelectedIds"){
				var _getCheckedRows = $("input[name='chkListGrid']:checked")
				var getSelectedIds = [];
				for(var index=0;index<_getCheckedRows.length;index++){
					var _value = _getCheckedRows.eq(index).val();
					if(_value){
						getSelectedIds.push(_row[Number(_value.split("_")[1])][rowIndex]);
					}
				}
				return getSelectedIds;
			}
		}
		
		if(typeof options == "object"){
			if(!options.columns){
				throw "columns is not empty!";
			}
			if(!options.pageSize){
				options.pageSize = 10;
			}
			_options = options;
			_this = this;
			
		} 
		
		// 第一次加载发送两次请求修复
		if(_firstOnload && _pageNumber == 1 && typeof options != "object"){
			_firstOnload = false;
			return;
		}
		
		if(!_pageNumber){
			_pageNumber = 1;
		}
		
		// 处理查询参数
		var _queryParam = _options.data;
		if(!_queryParam){
			_queryParam = {};
		}
		_queryParam.pageNumber = _pageNumber;
		_queryParam.pageSize = _options.pageSize;
		$.ecej.ajax({
			url:_options.url,
			type:_options.method,
			data:_queryParam,
			success:function(data){
				
				var _html = "";
				var _total = data.total?data.total:data.data.length;
				data = data.list?data.list:data.data?data.data:data.rows;
				_row = data;
				if(data && data.length){
					var _columns = _options.columns;
					
					for(var dataIndex in data){
						_html += "<div>";
							for(var columnIndex in _columns){
								_style = _columns[columnIndex].style?_columns[columnIndex].style:"";
								// 如果配置复选框
								if(_columns[columnIndex].checkbox){
									_html += "<span style='"+_style+"'><input type='checkbox' name='chkListGrid' value='chkListGrid_"+dataIndex+"'/></span>";
								}else if(_columns[columnIndex].title){
									if(_columns[columnIndex].formatter){
										_html += "<span style='"+_style+"'>"+_columns[columnIndex].formatter(dataIndex,data[dataIndex],_columns[columnIndex].title)+"</span>";
									}else{
										_html += "<span style='"+_style+"'>"+_columns[columnIndex].title+"</span>";
									}
								}else if(_columns[columnIndex].id){
									var _value = "";
									if(data[dataIndex][_columns[columnIndex].id]!=undefined){
										_value = data[dataIndex][_columns[columnIndex].id];
										if(_columns[columnIndex].formatter){
											_value = _columns[columnIndex].formatter(_value);
										}
									}
									_html += "<span class='sss' style='"+_style+"'>"+_value+"</span>";
								}
							}
							if(_options.callback){
								_html = _options.callback(data[dataIndex],_html);
							}
						_html += "</div>"
					}
				}else{
					if(_options.callback){
						_html = _options.callback(data,_html,_options.columns);
					}
				}
				
				$(_this).html(_html);
				
				// 渲染分页插件
				if(typeof options == "object"){
					if(!options.pagination){
						return;
					}
				// 初始化分页插件
				var pagenationElement = "<div style=''>"+
					"<nav  aria-label=''>"+
					"<span style='display: inline-block; float: left; margin-top: 28px; margin-right: 10px;'>共<span>"+Math.ceil(_total/_options.pageSize)+"</span>页</span>"+
					"<span style='display: inline-block; float: left; margin-top: 28px; margin-right: 10px;'>共<span>"+_total+"</span>条数据</span>"+
					"<ul style='float: left;' class='pagination' id='pagination'></ul>"+
					"<input id='txtPageStartNumber' style='display: inline-block; text-align: left; width: 40px; height: 33px; float: left; margin-top: 21px; margin-left: 10px;' type='text' name='title' lay-verify='title' autocomplete='off'  class='layui-input'/>"+
					"<button id='txtPageGoStartPage' style='display: inline-block; float: left; margin-left: 10px; margin-top: 20px;' type='button' class='btn btn-primary'>确定</button></nav></div>";
				$(_this).after(pagenationElement);
				var _paginationDefaults = {
		            totalPages: Math.ceil(_total/_options.pageSize),
		            visiblePages: 10,
		            first: '首页',
		            prev: '上一页',
		            next: '下一页',
		            last:"尾页",
		            onPageClick: function (event, page) {
		            	$("#txtPageStartNumber").val("");
		            	$(_this).listgrid(page);
		            }
		        };
				$("#pagination").twbsPagination(_paginationDefaults);
				
				$("#txtPageStartNumber").keypress(function(event) { 
		            var keyCode = event.which; 
		            if(keyCode >= 48 && keyCode<=57){
		            	return true;
		            }else{
		            	return false;
		            }
		        }).keyup(function(){
		        	var _value = $(this).val();
		        	if(!Number(_value)){
		        		$(this).val("")
		        	}
		        }).mouseout(function(){
		        	var _value = $(this).val();
		        	if(!Number(_value)){
		        		$(this).val("")
		        	}
		        }); 
			
				$("#txtPageGoStartPage").click(function(){
					var currentPage = $("#txtPageStartNumber").val();
					if(!currentPage || currentPage > Math.ceil(_total/_options.pageSize)){
						$("#txtPageStartNumber").focus();
						return ;
					}
					var _pagination = _paginationDefaults;
					_pagination.startPage = Number(currentPage);
					$("#pagination").twbsPagination('destroy');
					$("#pagination").twbsPagination(_pagination);
				});
				
					/*$(_this).after("<nav aria-label=''><ul class='pagination' id='pagination'></ul></nav>");
					$('#pagination').twbsPagination({
			            totalPages: Math.ceil(_total / 10),
			            visiblePages: 10,
			            first: '首页',
			            prev: '上一页',
			            next: '下一页',
			            last:"尾页",
			            onPageClick: function (event, page) {
			            	$(_this).listgrid(page);
			            }
			        });*/
				}else{
					options = _options;
				}
			}
		});
	}
}(jQuery));