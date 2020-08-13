/**
 * 弹出全部信息框公用方法
 */


/**
 * 展示tips
 * @param obj
 * @returns
 */
function showTips(obj,options){
    $.layer.tips($(obj).find('.template-input').val(),obj,options);
}

/**
 * hover展示tips
 * @returns
 */
function bindHover(){
    // Hover事件 展示tips
    $('body').on('mouseover','.template-div',function(event){
        showTips(this,{time:0});
    });
    $('body').on('mouseout','.template-div',function(event){
        $('.layui-layer-tips').remove();
    });
}

/**
 * hover展示tips
 * @param elem
 * @param valType
 * @returns
 */
function bindTipHover(elem,valType){
	elem = elem || '.template-div';
	valType = valType || 'value';
    // Hover事件 展示tips
    $('body').on('mouseover',elem,function(event){
    	var value = '';
    	switch(valType){
	    	case 'text' : value = $(this).text(); break;
	    	case 'value' : value = $(this).val(); break;
    		default : value = $(this).attr(valType);break;
    	}
    	
    	showTipHover(this,value,{time:0});
    });
    $('body').on('mouseout',elem,function(event){
        $('.layui-layer-tips').remove();
    });
}

/**
 * 展示tips
 * @param obj
 * @param value
 * @param options
 * @returns
 */
function showTipHover(obj,value,options){
    $.layer.tips(value,obj,options);
}