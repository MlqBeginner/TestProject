// 构造一个Tab函数
const Tab = function(){}
//选项过多超过window的宽度时，就从第一个开始一个一个的存起来，知道数组里的内容的宽度总加上window的宽度稍大于所有选项的宽度为止
var moveArr = [];
function addArrow(){
    var totalWidth = 0;
    for(var i = 0; i < $('.tab_title_item').length; i++){
        totalWidth+=($('.tab_title_item').eq(i).width() + 1);
    }
    $('.tab_title').css('width', totalWidth);

    // 判断总宽度是否大于窗口宽度

    if(totalWidth > $(window).width()){
        $('.tab_arrow_wrap .fa').show();
        var leftPos = 0;
        moveArr = [];
        for(var i = 0; i < $('.tab_title_item').length; i++){
            if(leftPos + $(window).width() < totalWidth){
                moveArr.push($('.tab_title_item').eq(i).width() + 1);
                var leftPos = 0;
                for(var j = 0; j < moveArr.length; j++){
                    leftPos+=moveArr[j];
                }
            }
        }
    }
    else{
        $('.tab_arrow_wrap .fa').hide();
    }
}
/*
* Tab增加或删除星星标记
* id: 定位身份
* flag: 判断是否改变了
* */
Tab.prototype.addStar = function(id, flag){
    $('.tab_title .tab_title_item').each(function(){
        if($(this).attr('tab-src') == id && flag){
            if(flag){
                $(this).addClass('star');
            }else{
                $(this).removeClass('star');
            }
        }
    });
};

/*
* 增加选项卡Tab
* text: 选项卡的title
* src: iframe的路径
* id: 定位身份
* */
Tab.prototype.addTab = function(text, src, id, refreshBtn, rermoveBtn){
    if(typeof refreshBtn == "undefined"){
        refreshBtn = true;
    }
    if(typeof rermoveBtn == "undefined"){
        rermoveBtn = true;
    }

    // 选项卡所有显示的元素删除active的class 隐藏
    $('.tab_title .active').removeClass('active');
    $('.tab_content .active').removeClass('active');

    // 判断是否已存在IFrame，如果不存在的话，就添加相应的标签和内容，如果存在就跳转
    if(!$('#' + id).length){

        // 选项卡title的添加
        var tabTitleItem = '<li class="tab_title_item active" tab-src="' + id + '"><span class="title_item_text">' + text + '</span><i class="fa fa-refresh"></i><i class="fa fa-remove"></i></li>';
        $('.tab_title').append(tabTitleItem);

        //选项卡内容的添加
        var iframeContainer = '<li id="' + id + '" class="tab_content_item active"><div class="load_icon"><i class="fa fa-spinner fa-spin"></i></div><iframe class="frame" name="' + id +'" src="' + src + '" frameborder="0" width="100%" height="100%"></iframe></li>';
        $('.tab_content').append(iframeContainer);

        $('#' + id + ' .frame').css('display', 'none');

        var tabTitleLength = 0;
        $('.tab_title_item').each(function(){
            tabTitleLength+=$(this).outerWidth();
        });
        if(tabTitleLength >= 1280){
            $('.tab_title').css('width', tabTitleLength);
        }
        addArrow();
      //  $('#' + id + ' .frame').load(function(){
            $('.load_icon').remove();
            $('#' + id + ' .frame').css('display', 'block');
      //  });
    }
    else{
        $('.tab_title .tab_title_item').each(function(){
            if($(this).attr('tab-src') == id){
                $(this).addClass('active');
            }
        });
        $('#' + id).addClass('active');
    }
    if(!refreshBtn){
        $('.tab_title_item.active .fa-refresh').remove();
    }
    if(!rermoveBtn){
        $('.tab_title_item.active .fa-remove').remove();
    }
    
};

/*
 * 删除选项卡
 * id: 定位身份
 * */
Tab.prototype.removeTab = function(id){

    if($('#' + id).length){
        if($('#' + id).hasClass('active')){
            $('.tab_title_item').each(function () {
                if ($(this).attr('tab-src') == id) {
                    if($(this).hasClass('star')){
                        if(confirm("数据未保存确定删除吗？")){
                            var preIndex = $(this).index() - 1;
                            $('.tab_title_item').eq(preIndex).addClass('active');

                            var preIframeID = $('.tab_title_item').eq(preIndex).attr('tab-src');
                            $('#' + preIframeID).addClass('active');
                            $(this).remove();
                            $('#' + id).remove();
                        }
                    }
                    else{
                        var preIndex = $(this).index() - 1;
                        $('.tab_title_item').eq(preIndex).addClass('active');

                        var preIframeID = $('.tab_title_item').eq(preIndex).attr('tab-src');
                        $('#' + preIframeID).addClass('active');
                        $(this).remove();
                        $('#' + id).remove();
                    }
                }
            });
        }
        else{
            $('.tab_title_item').each(function () {
                if ($(this).attr('tab-src') == id) {
                    if($(this).hasClass('star')){
                        if(confirm("数据未保存确定删除吗？")){
                            $(this).remove();
                            $('#' + id).remove();
                        }
                    }else{
                        $(this).remove();
                        $('#' + id).remove();
                    }
                }
            });
        }
        addArrow();
    	// 删除该页面的localStorage变量
    	localStorage.removeItem("customerInfo"+id);
    	localStorage.removeItem("customerCity"+id);
    	localStorage.removeItem("customerId"+id);
    }
};

/*
 * 刷新选项卡
 * id: 定位身份
 * */
Tab.prototype.refreshTab = function(id){
    if($('#' + id).length){
        $('.tab_title .active').removeClass('active');
        $('.tab_title_item').each(function(){
            if($(this).attr('tab-src') == id){
                $(this).addClass('active');
            }
        });
        $('#' + id).addClass('active').prepend('<div class="load_icon"><i class="fa fa-spinner fa-spin"></i></div>').siblings('.active').removeClass('active');
        $('#' + id + ' .frame').attr({
            'src': $('#' + id + ' .frame').attr('src'),
            'display': 'none'
        });

        $('.load_icon').remove();
        $('#' + id + ' .frame').css('display', 'block');
    }
};

/*
 * 跳转选项卡
 * id: 定位身份
 * */
Tab.prototype.changeTab = function(id){
    if($('#' + id + ' .frame').length) {
        $('.tab_title .active').removeClass('active');
        $('.tab_title_item').each(function () {
            if ($(this).attr('tab-src') == id) {
                $(this).addClass('active');
            }
        });
        $('#' + id).addClass('active').siblings('.active').removeClass('active');
    }
};

var cc_tab = new Tab();

// 已经打开过的ifame
var opendIframeId = {};

$(function(){

//  iframe高度的重置
    
    var HeaderHeight = $('.header').height() || 0;
    var CallMessageHeight = $('.call_message').height() || 0;
	function resetHeight(){
		$('.tab_content').css('height', $(window).height() - HeaderHeight - CallMessageHeight);
	}
	resetHeight();
	
	$(window).resize(function(){
		resetHeight();
	});

    // iframe的创建及加载
    $('#main_index .frame').attr({'src': '/v1/common/mainIndex'});
    $('#call_in_platform .frame').attr({'src': '/v1/platform/customer/index'});

    // 选项卡切换
    // 将tab_title下的所有li的点击事件委托给根元素
    $('.tab_title').on('click', '.title_item_text', function(){
    	$('.tab_content').css('height', $(window).height() - HeaderHeight - CallMessageHeight - 1);
        $('.tab_content').css('height', $(window).height() - HeaderHeight - CallMessageHeight + 1);
        // 选项卡增加删除class 控制 tab_title_item的显示隐藏
        $(this).parent().addClass('active').siblings('.active').removeClass('active');

        var iframeID = $(this).parent().attr('tab-src');
        $('.tab_content li.active').removeClass('active');

        // 判断被点击的选项卡下有没有IFrame的存在，如果没有，创建一个，如果有就显示出来

        $('#' + iframeID).addClass('active');
        
        if(!opendIframeId[iframeID] && iframeID == "call_in_platform"){
        	opendIframeId[iframeID] = 1;
        	refreshTab(iframeID);
        }
        
    });

    // 删除选项卡
    $('.tab_title').on('click', '.fa-remove', function(){
    	cc_tab.removeTab($(this).parent().attr('tab-src'));
    });

    // 刷新选项卡
    $('.tab_title').on('click', '.fa-refresh', function(){
        cc_tab.refreshTab($(this).parent().attr('tab-src'));
    })
    
});