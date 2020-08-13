/**
 * 扩展bootstrap插件
 * bootstrap-extend - v1.0.0 - 2017-03-20
 * Copyright (c) 2017 fengli
 */
(function($){
	
	/**
	 * 扩展bootstrap-table
	 */
	$.fn.datagrid = function(config,params){
		if(typeof config == "string"){
			// 定义没有返回值函数的函数名
			var noReturnValueArray = ["demo"];
			if($.inArray(config,noReturnValueArray) > -1){
				$(this).bootstrapTable(config, params);
				
			// 扩展选择行的ids，使用方法：$("#demo").datagrid("getSelectionIds","id");
			}else if("getSelectionIds"==config){	
				
				// 设置默认值
				if(!params){
					params = "id";
				}
				var rows = $(this).bootstrapTable("getSelections", params);
				var ids = [];
				if(rows!= null && rows.length>0){
					for(var index=0;index<rows.length;index++){
						ids.push(rows[index][params]);
					}
				}
				return ids;
			}else{
				
				// init querm params
				if(config=="refresh"){					
					var config = $(this).bootstrapTable("getOptions");
					var _formObj;
					if(params && typeof params == "string"){
						_formObj = $("#"+params).serializeObj();
					};
					config.pageNumber = 1;
					config.queryParams = function(params){
						if(_formObj){
							$.each(_formObj,function(key,value){
								params[key] = value;
							});
						};
						return params;
					}
					$(this).bootstrapTable("destroy");
					$(this).bootstrapTable(config);
				}else{
					return $(this).bootstrapTable(config,params);
				}
			}
		}else{
			// 定义表格属性默认值
			var defaultPropertyValue = {
				locale:'zh-CN',
				method:'post',
				striped:'true',
				contentType: "application/x-www-form-urlencoded",
				showColumns:true,   
				clickToSelect:true,
				queryParamsType:"",
				pagination:true,
				sidePagination:'server',
				pageNumber:1,
				pageSize:50,
				sortable : true, 
				pageList : [ 10, 25, 50, 100 ],
				paginationPreText : "上一页",
				paginationNextText : "下一页",
				paginationFirstText: "首页",
			    paginationLastText: "尾页",
				dataType : "json",
				toolbar : "#toolbar",
				// 设置头信息
				ajaxOptions:{
			        headers: {"token":"123456"}
			    }
			};

			// 设置默认值
			if(config){
				$.each(defaultPropertyValue,function(key, value){
					if(config[key]==undefined){
						config[key] = value;
					}
				});
			}
			config.url = config.url;
			var columns = config.columns;
			if(columns && columns.length>0){
				for(var index in columns){
					var column = columns[index];
					if(column["type"]=="datetime"){
						column.formatter = function(value,row,index){
							return $(new Date(value)).dateFormat("yyyy-MM-dd HH:mm:ss");
						}
					}else if(column["type"]=="date"){
						column.formatter = function(value,row,index){
							return $(new Date(value)).dateFormat("yyyy-MM-dd");
						}
					}
					column["align"] = "center";
				}
			}
			
			if(!config.queryParams){
				if(!config.formId){
					config.formId = "form1";
				}
			}
			
			// 初始化查询列表
			$(this).bootstrapTable(config);
		}
	};
	
	// 扩展bootstrap-treeview
	$.fn.tree = function(config){
		if(!config){
			throw "params not empty!";
		}
		if(!config.url){
			throw "url not empty!";
		}
		
		/*$.ecej.ajax({
			url:config.url,
			type:config.method,
			success:function(data){
				
				// 初始化树
				
			}
		});*/
		$(this).treeview({
			data:[
				  {
					    text: "Parent 1",
					    nodes: [
					      {
					        text: "Child 1",
					        nodes: [
					          {
					            text: "Grandchild 1"
					          },
					          {
					            text: "Grandchild 2"
					          }
					        ]
					      },
					      {
					        text: "Child 2"
					      }
					    ]
					  },
					  {
					    text: "Parent 2"
					  },
					  {
					    text: "Parent 3"
					  },
					  {
					    text: "Parent 4"
					  },
					  {
					    text: "Parent 5"
					  }
					],
	        showCheckbox: true,
	        highlightSelected:true,
	        onNodeChecked:function(event, data) {
	    		checkAllRoots(data,$(this));
	    		checkAllChildNodes(data,$(this));
			},
			onNodeUnchecked:function(event, data) {
				// 取消父节点
				unCheckRootNode(data,$(this));
				// 取消子节点
				unCheckChildNode(data,$(this));
			}
		});
	};
	
	// check子节点
    function checkAllChildNodes(node,obj){
    	if(node.nodeId==0 || node.nodeId==-1){
    		obj.treeview('checkAll',{silent: true});
    		var nodes = node.nodes;
    		if(nodes!=null && nodes.length>0){
    			for(var index=0;index<nodes.length;index++){
    				checkAllChildNodes(nodes[index],obj);
    			}
    		}
    	}else{
    		var nodes = node.nodes;
    		if(nodes!=null && nodes.length>0){
    			for(var index=0;index<nodes.length;index++){
    				obj.treeview('checkNode',[nodes[index].nodeId,{silent: true}]);
    				checkAllChildNodes(nodes[index],obj);
    			}
    		}
    	}
    }
    // check父节点
    function checkAllRoots(node,obj){
    	if(node.nodeId==0 || node.nodeId==-1){
    		return false;
    	}
    	var rootNode = obj.treeview('getParent',node);
    	if(rootNode.state.checked){
    		return false;
    	}
    	if(rootNode){
    		obj.treeview('checkNode',[rootNode.nodeId,{silent: true}]);
    		checkAllRoots(rootNode,obj);
    	}
    }
    
    // 取消子节点
    function unCheckChildNode(node,obj){
    	if(node.nodeId==0 || node.nodeId==-1){
    		obj.treeview('uncheckAll',{silent: true});
    	}else{
    		var nodes = node.nodes;
    		if(nodes!=null && nodes.length>0){
    			for(var index=0;index<nodes.length;index++){
    				obj.treeview('uncheckNode',[nodes[index].nodeId,{silent: true}]);
    				unCheckChildNode(nodes[index],obj);
    			}
    		}
    	}
    }
    
    // 取消父节点选择
    function unCheckRootNode(node,obj){
    	// 获取兄弟节点
    	var siblings = obj.treeview('getSiblings',node);
    	obj.treeview('uncheckNode',[node.nodeId,{silent: true}]);
    	if(siblings.length==0){
    		if(node.nodeId!=0 && node.nodeId!=-1){    			
    			var rootNode = obj.treeview('getParent',node);
    			unCheckRootNode(rootNode,obj);
    		}
    	} else {
    		var flag = false;
    		for(var index=0;index<siblings.length;index++){
    			if(siblings[index].state.checked){
    				flag = true;
    				break;
    			}
    		}
    		if(!flag){
    			var rootNode = obj.treeview('getParent',node);
    	    	if(rootNode.state && rootNode.state.checked){
    	    		unCheckRootNode(rootNode,obj);
    	    	}
    		}
    	}
    }
}(jQuery));