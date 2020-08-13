/**
 * 定义一些常用的小工具js方法 2017-04-25 Copyright (c) 2017 shixiaofeng
 */

/**
 * 根据data翻译 data 数据格式参考如下： [{"name":"aaa","code":111},{"name":"bbb","code":14}]
 * 
 * 
 * srcValue:被翻译对象的value
 * 
 * @param srcValue
 * @param params
 */
function formatterByData(srcValue, data) {
	var retStr = srcValue;
	if (!data || !srcValue) {
		if(srcValue != '0'){
			return retStr;
		}
	}
	
	$.each(data, function(key, item) {
		if (item && srcValue == item.code) {
			if (item.name) {
				retStr = item.name;
			}
		}
	});
	return retStr;
}

/**
 * 时间格式化
 * @param strTime
 * @param separator
 * @returns
 */
function formatDateYMDhms(strTime, separator) {
	separator = separator || '-';
	if(strTime){
		var date = new Date(strTime);
		return date.getFullYear()+separator+ zeroFormat(date.getMonth()+1)+separator+ zeroFormat(date.getDate()) + " " + 
		zeroFormat(date.getHours()) + ":" + zeroFormat(date.getMinutes());
		//+ ":" + zeroFormat(date.getSeconds());
	}
	return '';
}

function zeroFormat(time){
	if(time < 10){
		time = "0" + time;
	}
	return time;
}

/**
 * [Enter]回车查询事件
 * @param tableId 需加载的表格id
 * @param formId 对应查询条件form表单的id
 */
function enterKeyEvent(tableId,formId){
	tableId = tableId || 'table';
	formId = formId || 'form1';
	$(document).keypress(function(event) {
		if (event.keyCode == "13") {//keyCode=13是回车键
			event.stopPropagation();
			event.returnValue = false;
			event.preventDefault();
			$("#" + tableId).datagrid("refresh",formId);
		}
	});
}
/**
 * 获取匹配后的详细地址
 * @param cityName 城市
 * @param communityName 小区
 * @param address 详细地址
 * @returns
 */
function getRegexMatchAddress(cityName,communityName,address){
	if(typeof(cityName) == 'undefined' ||  $.trim(cityName) === ''){
		cityName = '';
	}else{
		cityName = $.trim(cityName);
	}
	if(typeof(communityName) == 'undefined' ||  $.trim(communityName) === ''){
		communityName = '';
	}else{
		communityName = $.trim(communityName);
	}
	if(typeof(address) == 'undefined' ||  $.trim(address) === ''){
		address = '';
	}else{
		address = $.trim(address);
	}
	var cityNameTmp = cityName;
	var communityNameTmp = communityName;
	if(cityName.indexOf('市') > -1){
		cityName = cityName.replace(/市$/,'');
	}
	
	var cityRe = new RegExp("^" + cityName);
	address = address.replace(cityRe,'');
	if(address.indexOf(communityName) > -1){
		communityNameTmp = '';
	}
	if(/市$/.test(cityNameTmp) && /^市/.test(address)){
		cityNameTmp = cityNameTmp.replace(/市$/, '');
	}
	if(cityRe.test(communityNameTmp)){
		cityNameTmp = '';
	}
    address = cityNameTmp + communityNameTmp + address;
    return address;
}
//遮罩层
function maskLayer(imgPath) {
	var height = $(document).height();
	var width = $(document).width();
	var layer = $("#maskLayer").length?$("#maskLayer"):$("<div id='maskLayer'/>").appendTo($("body"));
	var maskLayer = '<div style="text-align:center;background:#efeef0; width:'
			+ width + 'px;height:' + height
			+ 'px;opacity:0.5;"><div></div></div>';
	layer.html(maskLayer);
	
	var wHeight = $(window).height();
	var imgW = '';
	if(height > wHeight){
		imgW = wHeight/2 + 'px';
	}
	imgPath = imgPath || "../../../";
	layer.css({
		"background":"url(/cc/core/layer-v3.0.3/skin/default/loading-0.gif) no-repeat 50% 50%",
		position:"absolute", // fixed
		top:"0px",
		left:"0px",
		"z-index":1000
	});
}

//关闭遮罩层
function closeMaskLayer(){
	$('#maskLayer').html("");
}