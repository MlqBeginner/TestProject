/*
 * 判断按钮是否显示
 */
function buttonAuth(buttons){
	var exsit = -1;
	if(buttonAuthArr){	
		$.each(buttons,function(index,val){
			console.info(index);
			exsit = $.inArray(buttons[index],buttonAuthArr)
		});
	}
	return exsit;
};

/*
 * 批量设置按钮权限
 */
function buttonBatchAuth(buttons){
	if(buttonAuthArr){	
		$.each(buttons,function(index,val){
			if(-1 != $.inArray(buttons[index],buttonAuthArr)){
				$(buttons[index]).show();
			}else{
				$(buttons[index]).hide();
			}
		});
	}
}