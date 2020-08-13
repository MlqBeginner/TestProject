/**
 * jQuery 扩展函数
 * 
 * jquery-extend - v1.0.0 - 2017-04-15 Copyright (c) 2017 jack
 */

(function($){
	
	$.layer={
			/********************************alert********************************/
			alert:function(text,options,callback){
				if(!options){
					options= {
							//time : 5000,
							resize : false,
							zIndex : layer.zIndex
						}
				}
				return layer.alert(text,options,callback);
			},
			// 成功提示
			alertS : function(text, title) {
				return $.layer.alert(text, {
					title : title,
					icon : 1,
					//time : 5000,
					resize : false,
					zIndex : layer.zIndex
				});
			},
			// 错误提示
			alertE : function(text, title) {
				return $.layer.alert(text, {
					title : title,
					icon : 2,
					//time : 5000,
					resize : false,
					zIndex : layer.zIndex
				});
			},
			//表单验证提示
			alertC:function(text){
				return $.layer.alert(text, {
					title:false,
					icon : 5,
					time : 2000,
					resize : false,
					shade:0,
					shadeClose:true,
					//area: ['180px', '64px'],
					anim:6,
					closeBtn:0,
					btn:false,
					zIndex : layer.zIndex
				});
			},
			// 信息提示,不带图标
			alertI : function(text) {
				return $.layer.alert(text);
			},
			/********************************msg********************************/
			//信息提示不带按钮
			msg:function(context,options){
				return layer.msg(context,options);
			},
			//信息提示 错误图标
			msgE:function(context,options){
				return $.layer.msg(context,{
					icon:2,
					shade :0.1,
					shadeClose:true,
					anim:6
				});
			},
			/********************************load********************************/
			//加载层
			load:function(icon,options){
				if(!options){
					options={};
					options.shade=0.1;
					options.time=10000000;
				}
				return layer.load(icon,options);
			},
			close:function(index)
			{
				layer.close(index);
			},
			/********************************confirm********************************/
			confirmContext:function(content,title,btn,callBack,options){
				if(!options){
					options={};
					options.icon=3;
				}
				options.title=title;
				options.resize=false;
				options.btn=btn;
				options.btnAlign='c';
				layer.confirm(content, options, function(index) {
					callBack(index);
				});
			},
			/********************************open********************************/
			open:function(options){
				return layer.open(options);
			},
			//打开一个url
			openUrl:function(url,title,btn,options){
				if(!title) title="信息";
				if(!options){
					options={};
					options.area=["850px","600px"];
				}
				if(btn) options.btn=btn;
				options.type=2;
				options.content=path_root+url;
				options.title=title;
				options.btnAlign='c';
				return $.layer.open(options);
			},
			//打开一个div
			openContent:function(content,title,btn,options){
				if(!title) title="信息";
				if(!options){
					options={};
					options.area=["550px","400px"];
				}
				if(btn) options.btn=btn;
				options.type=1;
				options.content=content;
				options.title=title;
				options.btnAlign='c';
				return $.layer.open(options);
			},
			//打开一个tab
			openTab:function(url,title){
				window.parent.vm.ccTab(title,path_root+url);
			},
			//只能在打开打的tab中调用，关闭的是当前打开的tab。
			closeTab: function(){
				window.parent.vm.closeTab();
			},
			//刷新tab
			refreshTab:function(url){
				window.parent.vm.refreshTab(url)
			},
			// tips框，
			tips:function(text,obj,options,callback){
				var defaultOptions = {
						tips:[1,'#FFED97'], // 1,2,3,4 ：位置（ 上右下左）
						color:'black',
						size: 2.5
				};
				if(!options){
					options= defaultOptions;
				}else{
					$.extend(options, defaultOptions);
				}
				
				text = '<font style="word-wrap:break-word" size="'+ (options.size || 2.5) +'" color="'+ (options.color ||  'black')+'">' + text + '</font>'
				return layer.tips(text,obj,options,callback);
			},
	}
	
}(jQuery));