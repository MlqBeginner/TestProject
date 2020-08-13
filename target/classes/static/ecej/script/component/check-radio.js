(function ($) {
    $.fn.hcheck=function(){
        // 向head标签里加入新增的但复选框样式
        if(!$('#hCheckboxRadio').attr('id')){
            $(document.head).append('<link id="hCheckboxRadio" rel="stylesheet" href="/cc/css-2.0/core/check-radio.css">');
        }
        // 将页面上所有的radio放到新标签名叫hradio的div里
        $(':radio:not(hidden)').each(function(index){
            if(!$(this).parent().hasClass('hradio')){
                $(this).before('<span class="hradio"></span>');
                $('.hradio').eq(index).append($(this));
            }
        });
        // 将页面上所有的checkbox放到新标签名叫hradio的div里
        $(':checkbox:not(hidden)').each(function(index){
            if(!$(this).parent().hasClass('hcheckbox')){
                $(this).before('<span class="hcheckbox"></span>');
                $('.hcheckbox').eq(index).append($(this));
            }
        });
        // 判断radio的选中状态，通过状态的判断给他的父级增加相应的样式
        $(":radio:not(hidden)").each(function () {
            if(this.checked){
                $(this).parent().addClass('checked');
            }
            if(this.disabled){
                $(this).parent().addClass('disabled');
            }
        });
        // 判断checkbox的选中状态，通过状态的判断给他的父级增加相应的样式
        $(":checkbox:not(hidden)").each(function () {
            if(this.checked){
                $(this).parent().addClass('checked');
            }
            if(this.disabled){
                $(this).parent().addClass('disabled');
            }
        });
        // 单选框的点击事件
        $(':radio:not(hidden)').on('click', function(){
            if(this.disabled){
                return ;
            }
            $(':radio[name='+ $(this).attr('name') +']').each(function(){
                $(this).parent().removeClass('checked');
            });
            $(this).parent().addClass('checked');
        });
        // 复选框的点击事件
        $(':checkbox:not(hidden)').on('click', function(){
            if(this.disabled){
                return ;
            }
            if(this.checked){
                $(this).parent().addClass('checked');
            }
            else{
                $(this).parent().removeClass('checked');
            }
        });
        // 单选框的hover事件
        $(':radio:not(hidden)').on('mouseover', function(){
            if(this.disabled || this.checked){
                return false;
            }
            $(this).parent().addClass('hover');
        });
        $(':radio').on('mouseout', function(){
            $(this).parent().removeClass('hover');
        });
        // 复选框的hover事件
        $(':checkbox:not(hidden)').on('mouseover', function(){
            if(this.disabled || this.checked){
                return false;
            }
            $(this).parent().addClass('hover');
        });
        $(':checkbox:not(hidden)').on('mouseout', function(){
            $(this).parent().removeClass('hover');
        });
        // label的hover
        $('label').on('mouseover', function(){
            if($('#' + $(this).attr('for'))[0]){
                if($('#' + $(this).attr('for'))[0].disabled || $('#' + $(this).attr('for'))[0].checked){
                    return false;
                }
                $('#' + $(this).attr('for')).parent().addClass('hover');
            }
        });
        $('label').on('mouseout', function(){
            if($('#' + $(this).attr('for'))[0]){
                $('#' + $(this).attr('for')).parent().removeClass('hover');
            }
        });
    };
})(window.jQuery);
