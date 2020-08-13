$(document).ready(function(){
	centerStyle(); //用于图标对齐的函数
	addTab = function(title,url,id){
		window.parent.addTab(title,url,id);
	};
});

//当浏览器窗体大小改变
$(window).resize(function () {
   centerStyle();// 用于图标对齐的函数
});



//用于图标对齐的函数
function centerStyle(){
	var divWidth = $('.e_content div').width();
	divWidth = (divWidth-81)/2;
	$('.e_content_div_img').css('left',divWidth+'px');  
};