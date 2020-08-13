$(document).ready(function(){
	var parentObj = $(".rule-multi-porp");
    $(parentObj).each(function () {
        var $parentObj = $(this);
        $parentObj.addClass("multi-porp"); //添加样式
        $parentObj.children().hide(); //隐藏内容
        var divObj = $('<ul></ul>').prependTo($parentObj); //前插入一个DIV
        $parentObj.find(":checkbox").each(function () {
            var indexNum = $parentObj.find(":checkbox").index(this); //当前索引
            var liObj = $('<li></li>').appendTo(divObj)
            var newObj = $('<a id="'+ indexNum +'" onclick="' + $parentObj.find('label').eq(indexNum).attr('onclick') + '">' + $parentObj.find('label').eq(indexNum).text() + '</a><i></i>');
            var num = $parentObj.find('label').eq(indexNum).attr('num');
            if(num){
            	var billTypeStr = $parentObj.find('label').eq(indexNum).attr('for');
            	var billTypeArr = billTypeStr.split("_");
            	var bId = "prompt_"+billTypeArr[1];
            	if(num>0){
            		$('<b id="'+bId+'" class="billTypeNum">'+num+'</b>').appendTo(liObj);
            	}else{
            		$('<b id="'+bId+'"></b>').appendTo(liObj);
            	}
            	
            }
            newObj.appendTo(liObj); //查找对应Label创建选项
            if ($(this).prop("checked") == true) {
                liObj.addClass("selected"); //默认选中
            }
            //检查控件是否启用
            if ($(this).prop("disabled") == true) {
                newObj.css("cursor", "default");
                return;
            }
            //绑定事件
            $(newObj).click(function () {
                if ($(this).parent().hasClass("selected")) {
                    //$(this).parent().removeClass("selected");
                } else {
                	$(this).parent().parent().children().removeClass("selected");
                    $(this).parent().addClass("selected");
                }
                $parentObj.find(':checkbox').eq(indexNum).trigger("click"); //触发对应的checkbox的click事件
                //alert(parentObj.find(':checkbox').eq(indexNum).prop("checked"));
            });
        });
    });
});