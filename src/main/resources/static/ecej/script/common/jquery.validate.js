// 基于jquery校验组件
(function($){
	
	$(function(){
		// 绑定事件
		$("input,textarea").bind("input",function(){
			var el = $(this);
			var _max = el.attr("max");
			if(_max){
				if(/^0[0-9]+/.test(el.val())){
					el.val(el.val().substring(1));
				}
				if(parseFloat(el.val())>parseFloat(_max)){
					el.val(Math.floor(el.val()/10));
					return false;
				}
			}
			var _min = el.attr("min");
			if(_min){
				if(/^0[0-9]+/.test(el.val())){
					el.val(el.val().substring(1));
				}
				if(parseFloat(el.val())<parseFloat(_min)){
					el.val("");
					return false;
				}
			}
		});
	});
	$.fn.validate = function(){
		var form = $(this);
		var _formElements = form.find("input,textarea,select,span[required='']");
		_formElements.removeClass("layui-form-danger");
		var _data = form.serializeObj();
		for(var index=0;index<_formElements.length;index++){
			// 校验是否必填项
			var _required = _formElements.eq(index).attr("required");
			if(_required){
				if(!_formElements.eq(index).val() && _formElements[index].tagName!="SPAN"){
					layer.msg('必填项不能为空', {icon: 5,time:1200});
					_formElements.eq(index).addClass("layui-form-danger");
					_formElements.eq(index).focus();
					return false;
				}else{
					if(_formElements[index].tagName=="SPAN"){
						if(!_formElements.eq(index).text() || _formElements.eq(index).text()=="请选择完成要求"){							
							_formElements.eq(index).html("<b class='review_star_mark'>"+_formElements.eq(index).attr("message")+"</b>");
							layer.msg('请选择完成要求', {icon: 5,time:1200});
							return false;
						}
					}
				}
			}
			var _maxlength = _formElements.eq(index).attr("maxlength");
			if(_maxlength && _formElements.eq(index).val()){
				if(parseInt(_maxlength)<_data[_formElements.eq(index).attr("name")].length){
					_formElements.eq(index).addClass("layui-form-danger");
					_formElements.eq(index).focus();
					layer.msg('文字超过最大限制', {icon: 5,time:1200});
					return false;
				}
			}
		}
		return true;
	}
}(jQuery));