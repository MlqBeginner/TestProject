/**
 * jQuery 扩展函数
 *
 * jquery-extend - v1.0.0 - 2017-03-23 Copyright (c) 2017 fengli
 */
(function($){

	/**
	 * 正则表达式
	 */
	global_reg_express = {
		number:/^\d+$/,
		phone:/^1(3|4|5|7|8)\d{9}$/,
		tel:/^((0\d{2,3}\d{7,8})|(1[3584]\d{9}))$/,
		email:/^$/,
		url:/^$/,
		date:/^$/,
		identity:/^$/
	}

	/**
	 * 扩展ajax方法
	 */
	$.ecej = {
		ajax : function(config){
			if(!config){
				throw "param is not empty";
			}
			config.time=10000;
			if(!config.url){
				return "url is not empty";
			}
			config.url = config.url;
			if(!config.headers){
				// config.headers = {"token":"123456"};
			}
			config.dataType = "json";
			config.beforeSend = function(XHR){

			};
			config.complete = function(XMLHttpRequest,status){
				if(status=='timeout' || status=='error'){
					　$.layer.msg('无查询结果，请重新输入');
				}
			};
			$.ajax(config);
		},
		post : function(url, param, callback,error){
			var config = {};
			config.url = url;
			config.data = param;
			config.type = "post";
			config.success = function(data){
				if(data.message){
					data.message = $.trim(data.message);
					endStr = data.message.substring(data.message.length-1);
					if(endStr=="," || endStr =="，"){
						data.message = data.message.substring(0,data.message.length-1);
					}
				}
				if (data.resultCode == 200) {
					callback(data.data,data.message);
				}
				if (data.resultCode != 200) {
					if(error)
						error(data.data,data.message);
					else
						layer.msg('错误代码： ' + data.message);
				}
				if (data.resultCode == undefined) {
					layer.msg('数据异常', {icon : 2});
				}
			}
			$.ecej.ajax(config);
		},
		get : function(url, param, callback,async){
			var config = {};
			config.url = url;
			config.data = param;
			config.type = "get";
			if(async==undefined){
				async = true;
			}
			config.async = async;
			config.success = function(data){
				if(data.message){
					data.message = $.trim(data.message);
					endStr = data.message.substring(data.message.length-1);
					if(endStr=="," || endStr =="，"){
						data.message = data.message.substring(0,data.message.length-1);
					}
				}
				if (data.resultCode == 200) {
					callback(data.data,data.message);
				}
				if (data.resultCode != 200) {
					layer.msg('错误代码： ' + data.message);
				}
				if (data.resultCode == undefined) {
					layer.msg('数据异常', {icon : 2});
				}
			}
			$.ecej.ajax(config);
		}
	}

	/**
	 * 拼接url
	 */
	$.joinUrl = function(_url,params){
		// TODO
		_url = _url + "?token="+123456;
		if(typeof params == "string"){
			params = $("#"+params).serializeObj();
		}
		if(params){
			$.each(params,function(key,value){
				_url += "&"+key+"="+value;
			});
		}
		return _url;
	}

	/**
	 * 扩展序列化函数
	 */
	$.fn.serializeObj = function() {
		var serializeObj = {};
		var array = this.serializeArray();
		var str = this.serialize();
		$(array).each(
				function() {
					if (serializeObj[this.name]) {
						if ($.isArray(serializeObj[this.name])) {
							if (this.value) {
								serializeObj[this.name].push($.trim(this.value));
							}
						} else {
							if (this.value) {
								serializeObj[this.name] = [
										serializeObj[this.name], $.trim(this.value)];
							}
						}
					} else {
						if (this.value) {
							serializeObj[this.name] = $.trim(this.value);
						}
					}
				});
		return serializeObj;
	};

	/**
	 * 序列号表单元素到对象，含默认值
	 */
	$.fn.serializeDefaultValueObj = function(defaultValue) {
		if(!defaultValue){
			defaultValue = "-1";
		}
		var serializeObj = {};
		var array = this.serializeArray();
		var str = this.serialize();
		$(array).each(
				function() {
					if (serializeObj[this.name]) {
						if ($.isArray(serializeObj[this.name])) {
							if (this.value) {
								serializeObj[this.name].push($.trim(this.value));
							}else{
								serializeObj[this.name].push(defaultValue);
							}
						} else {
							if (this.value) {
								serializeObj[this.name] = [serializeObj[this.name], $.trim(this.value)];
							}else{
								serializeObj[this.name] = [serializeObj[this.name],defaultValue];
							}
						}
					} else {
						if (this.value) {
							serializeObj[this.name] = $.trim(this.value);
						}else{
							serializeObj[this.name] = defaultValue;
						}
					}
				});
		return serializeObj;
	};

	/**
	 * 加载远程数据
	 */
	$.fn.loadData = function(option){
		if(!option){
			throw "option is not empty";
		}

		if(!option.url){
			throw "url is not empty";
		}

		if(!option.method){
			option.method = "get";
		}

		var config = {};
		config.url = option.url;
		config.type = option.method;
		if(option.data){
			config.data = option.data;
		}
		var _this = this;
		config.success = function(data){
			data = data.data;
			$.each(data,function(key,value){
				if(option.selector=="name"){
					if(option.formTag){
						$(_this).find("[name="+key+"]").val(value);
					}else{
						$(_this).find("[name="+key+"]").text(value);
					}
				}else{
					if(option.formTag){
						$(_this).find("[id="+key+"]").val(value);
					}else{
						$(_this).find("[id="+key+"]").text(value);
					}
				}
			});
			if(option.callback){
				option.callback(data);
			}
		}

		$.ecej.ajax(config);
	};

	/**
	 * 填充表单元素
	 */
	$.fn.renderForm = function(data){
		for(var index in data){
			var key = index;
			var value = data[index];

			$("[name='"+key+"'],[name='"+key+"[]']").each(function(){
				var tagName = $(this)[0].tagName;
				var type = $(this).attr('type');
				if(tagName=='INPUT'){
					if(type=='radio'){
						$(this).attr('checked',$(this).val()==value);
					}else if(type=='checkbox'){
						var array = value.split(',');
						for(var i =0;i<array.length;i++){
							if($(this).val()==array[i]){
								$(this).attr('checked',true);
								break;
							}
						}
					}else{
						$(this).val(value);
					}
				}else if(tagName=='SELECT' || tagName=='TEXTAREA'){
					$(this).val(value);
				}

			});
		}
	};

	/**
	 * 判断数据类型
	 *
	 * @param data
	 * @returns
	 */
	function getDataType(data){
		if(typeof data != 'object'){
			return typeof data;
		}
		if(typeof data.length == 'number'){
			return 'array';
		}else{
			return 'object';
		}
	}

	function renderObj(template,obj,symbol){
		$.each(obj,function(key,value){
			if(value !=undefined && value!=null && !(value==="")){
				if(typeof value == 'object'){
					$.each(value,function(subKey,subValue){
						template = template.replace(symbol+"{"+key+"_"+subKey+"}",subValue);
					});
				}else{
					template = template.replace(symbol+"{"+key+"}",value);
				}
			}
		});
		return template;
	}

	/**
	 * 渲染页面元素
	 *
	 * template 格式模版
	 * content 支持字符串，对象，及数组对象
	 * symbol 默认$
	 */
	$.fn.render = function(template,content,append,loadType,headTemplate,symbol){
		if(!symbol){
			symbol = "$";
		}

		var _html = "";

		if(loadType && loadType=="select"){
			if(!headTemplate){
				headTemplate = "<option value=''>请选择</option>";
			}
			_html += headTemplate;
			if(!template){
				template = "<option value='${key}'>${text}</option>";
			}
		}

		// 字符串宏替换
		if(typeof content == "string"){
			_html = template.replace(symbol,content?content:"");
		}
		// 处理数组
		if(getDataType(content) == "array"){
			for(var index in content){
				_html += renderObj(template,content[index],symbol);
			}
		}

		// 处理对象
		if(getDataType(content) == "object"){
			_html = renderObj(template,content,symbol);
		}

		_html = _html.replace(/\$\{[\w|\d|_]*\}/g,"");

		if(append && append==true){
			$(this).append(_html);
		}else{
			$(this).html(_html);
		}
	};

	/**
	 * 加载渲染
	 */
	$.loadRender = function(config){
		if(!config){
			throw "config is empty";
		}
		if(!config.url){
			throw "url is empty";
		}
		if(!config.id){
			throw "id is empty";
		}
		if(!config.method){
			config.method = "get";
		}else{
			config.method = config.method.toLowerCase();
		}

		if(config.method=="get"){
			$.ecej.get(config.url,config.data,function(data){
				$("#"+config.id).render(config.template,data,config.append,config.loadType,config.headTemplate,config.symbol);
				if(config.callback){
					config.callback(data);
				}
			},false);
		}else{
			$.ecej.post(config.url,config.data,function(data){
				$("#"+config.id).render(config.template,data,config.append,config.loadType,config.headTemplate,config.symbol);
				if(config.callback){
					config.callback(data);
				}
			});
		}
	}

	/**
	 * 获取URL参数
	 */
	$.getUrlParam = function(param) {
		var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		} else {
			return null;
		} // 返回参数值
	}

	/**
	 * 表单预览
	 */
	$.fn.preview = function(){
		var form = $(this);
		var _input = form.find("input");
		if(_input && _input.length>0){
			for(var index =0;index<_input.length;index++){
				var input = _input.eq(index);
				var _type = input.attr("type");
				if(_type == "radio"){
					if(!input.is(":checked")){
						input.next("span").eq(0).css("display","none");
					}
					input.css("display","none")
				}else if(_type == "checkbox"){
					if(!input.is(":checked")){
						input.next("span").eq(0).css("display","none");
					}
					input.css("display","none")
				}else if(_type == "button" || _type == "submit"){
					continue;
				}else{
					input.after("<span class='preview'>"+input.val()+"</span>");
					input.css("display","none")
				}
				input.addClass("preview");
			}
		}
		var _select = form.find("select");
		if(_select && _select.length>0){
			for(var index =0;index<_select.length;index++){
				var select = _select.eq(index);
				if(select.val()!=""){
					select.after("<span class='preview'>"+select.find("option:selected").text()+"</span>");
				}
				select.addClass("preview");
				select.css("display","none");

			}
		}
		var _textarea = form.find("textarea");
		if(_textarea && _textarea.length>0){
			for(var index =0;index<_textarea.length;index++){
				var textarea = _textarea.eq(index);
				textarea.after("<span class='preview'>"+textarea.val()+"</span>");
				textarea.addClass("preview");
				textarea.css("display","none");
			}
		}
	}

	/**
	 * 取消预览
	 */
	$.fn.cancelRreview = function(){
		var form = $(this);
		form.find("span").css("display","inline");
		form.find("span[class='preview']").text("");
		form.find("input[class='preview']").css("display","inline");
		form.find("select[class='preview']").css("display","inline");
		form.find("textarea[class='preview']").css("display","inline");
	}

	/**
	 * 日期格式化
	 */
	$.fn.dateFormat = function(fmt){
		var o = {
			"M+" : this.get(0).getMonth()+1, // 月份
			"d+" : this.get(0).getDate(), // 日
			"h+" : this.get(0).getHours()%12 == 0 ? 12 : this.get(0).getHours()%12, // 小时
			"H+" : this.get(0).getHours(), // 小时
			"m+" : this.get(0).getMinutes(), // 分
			"s+" : this.get(0).getSeconds(), // 秒
			"q+" : Math.floor((this.get(0).getMonth()+3)/3), // 季度
			"S" : this.get(0).getMilliseconds() // 毫秒
		};
		var week = {
			"0" : "/u65e5",
			"1" : "/u4e00",
			"2" : "/u4e8c",
			"3" : "/u4e09",
			"4" : "/u56db",
			"5" : "/u4e94",
			"6" : "/u516d"
		};
		if(/(y+)/.test(fmt)){
			fmt=fmt.replace(RegExp.$1, (this.get(0).getFullYear()+"").substr(4 - RegExp.$1.length));
		}
		if(/(E+)/.test(fmt)){
			fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.get(0).getDay()+""]);
		}
		for(var k in o){
		    if(new RegExp("("+ k +")").test(fmt)){
		    	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
		    }
		}
		return fmt;
	}

	// 获取城市url
	$.getCityUrl = function(){
		if(location.hostname=="devplatform.ecej.com"){
			return "/data/city.json";
		}else{
			return "/v1/common/city/getComeServiceList";
		}
	};

	$.timeValidation=function(time){
        // yyyy-MM-dd HH:mm
        var _reg = /^[1-2][0-9][0-9][0-9]-([1][0-2]|0?[1-9])-([12][0-9]|3[01]|0?[1-9]) ([01][0-9]|[2][0-3]):[0-5][0-9]$/;
        // yyy-MM-dd HH:mm:ss
        //var _reg3 = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
        var regExp = new RegExp(_reg);
        if (regExp.test(time)){
            return true;
        }
        return false;
	};
	$.dataValidation=function (date) {
        // yyyy-MM-dd
        var _reg=/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        var regExp = new RegExp(_reg);
        if (regExp.test(date)){
            return true;
        }
        return false;
    }
    /**
     * UUID 方式一
     */
    $.UUID = function uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    };
    /**
	 * 获取选中的 checkbox 并返回 value 值
     */
    $.selectionIdCheckboxVal = function SelectionIdCheckboxVal(type,param){
        if(type && param){
            if("id"==type){
                var _isTrue=$("#"+param).is(':checked');
                if(_isTrue){
                    return $("#"+param).val();
                }
            }else if('class'==type){
                var _isTrue=$("."+param).eq(0).is(':checked');
                if(_isTrue){
                    return $("."+param).eq(0).val();
                }
            }
        }
        return '';
    }

}(jQuery));

