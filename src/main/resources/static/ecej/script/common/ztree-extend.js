/**
 * ztree 常见函数封装
 * 
 * ztree-extend - v1.0.0 - 2017-03-22
 * Copyright (c) 2017 fengli
 */
(function($){
	
	// 
	$.fn.tree = function(config){
		
		var zTree;
	    var demoIframe;

	    // 定义默认值
	    var setting = {
	        check: {
	            enable: true
	        },
	        view: {
	            dblClickExpand: false,
	            showLine: true,
	            selectedMulti: false
	        },
	        data: {
	            simpleData: {
	                enable:true,
	                idKey: "id",
	                pIdKey: "pId",
	                rootPId: ""
	            }
	        }
	    };
	    
	    $.each(setting, function(key,value){
	    	
	    	if(!config[key]){
	    		
	    	}
	    });
	}
}(jQuery));