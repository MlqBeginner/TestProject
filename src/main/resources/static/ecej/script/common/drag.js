/**
 * 拖拽插件
 * 
 * drag v1.0.0 - 2017-03-20
 * Copyright (c) 2017 fengli
 */
(function(){
	
	/**
	 * 拖拽插件
	 */
	$.fn.drag = function(config){
		
		var $div = $(this);
		
		if(!config.top){
			config.top = 200;
		}
		if(!config.left){
			config.left = 200;
		}
		if(!config.width){
			config.width = 200;
		}
		if(!config.height){
			config.height = 200;
		}
		if(!config.title){
			config.title = "笔记";
		}
		
		$div.addClass("panel panel-default");
		var _html = "<div><h4 class='panel-title'>"+config.title+"<a href='#'><span class='glyphicon glyphicon-menu-hamburger' style='float:right;'></a></h4></div><div id='collapseBody' class='panel-collapse collapse in'><div class='panel-body'><textarea></textarea><div>"
		$div.html(_html);
		$div.find("div").eq(0).addClass("panel-heading");
		var $textarea = $div.find("div").eq(1).find("textarea");
		$textarea.addClass("form-control").css("width",config.width-30).css("height",config.height-65);
		
		$("a").bind("click",function(){
			var height = $div.css("height");
			if(height==(config.height+"px")){	
				$("#collapseBody").hide();
				$div.css("height",39);
			}else{
				$("#collapseBody").show();
				$div.css("height",config.height);
			}
		});
		if(config.id){
			
			// 绑定keyup事件
			$textarea.bind("keyup",function(){
				var _value = $textarea.val();
				$.cookie(config.id,_value);
			});
			$textarea.val($.cookie(config.id));
		}
		
		$div.css("position","absolute")
			.css("cursor","move")
			.css("z-index",99999)
			.css("top",config.top)
			.css("left",config.left)
			.css("width",config.width)
			.css("height",config.height);
		
		/**
		 * 绑定鼠标左键按住事件
		 */
		$div.bind("mousedown",function(event){
			// 获取需要拖动节点的坐标
			var offset_x = $(this)[0].offsetLeft;
			var offset_y = $(this)[0].offsetTop;
			// 获取当前鼠标的坐标
			var mouse_x = event.pageX;
			var mouse_y = event.pageY;				

			// 绑定拖动事件 由于拖动时，可能鼠标会移出元素，所以应该使用全局（document）元素
			$(document).bind("mousemove",function(ev){
				// 计算鼠标移动了的位置
				var _x = ev.pageX - mouse_x;
				var _y = ev.pageY - mouse_y;
				
				// 设置移动后的元素坐标
				var now_x = (offset_x + _x ) + "px";
				var now_y = (offset_y + _y ) + "px";					
				//改变目标元素的位置
				$div.css({
					top:now_y,
					left:now_x
				});
			});
		});
		// 当鼠标左键松开，接触事件绑定
		$(document).bind("mouseup",function(){
			$(this).unbind("mousemove");
		});
	}
}(jQuery));