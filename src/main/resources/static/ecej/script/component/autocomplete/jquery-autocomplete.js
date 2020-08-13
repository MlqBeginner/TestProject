/**
 * [description]
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
(function($) {

    // 定义第一次加载数据
    var initData = {};

    /**
     * 自增id
     */
    var incObj = {};
    $.inc = function(key){
        if(incObj[key]){
            incObj[key] = incObj[key] + 1;
        }else{
            incObj[key] = 1;
        }
        return incObj[key];
    }

    $.uuid = function(){
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
    }

    /**
     * [AutoComplete 下拉列表函数定义]
     * @param {[object]} options [下拉列表参数]
     */
    var AutoComplete = function(options){

        // 定义默认函数
        var defaults = {
            type:"get",
            initData:[],
            readonly:false,
            //	width:120, // 文本框宽度
            //    height:30, // 文本框高度
            //    panelWidth:120, // 面板宽度
            panelHeight:124, // 面板高度
            initialize:function(options){}, // 初始化函数
            render:function(id,options,_this,type,_ul,queryCriteria){}, // 数据渲染
            method:function(_this,options,config){}
        };

        this._options = $.extend(defaults, options);
        options.type = (options.type == undefined)?defaults.type:options.type;
        options.readonly = (options.readonly == undefined)?defaults.readonly:options.readonly;
        //	options.width = (options.width == undefined)?defaults.width:options.width;
        options.height = (options.height == undefined)?defaults.height:options.height;
        //	options.panelWidth = (options.panelWidth == undefined)?defaults.panelWidth:options.panelWidth;
        options.panelHeight = (options.panelHeight == undefined)?defaults.panelHeight:options.panelHeight;
    };

    /**
     * [prototype 设置下拉列表组件原型函数]
     * @type {Object}
     */
    AutoComplete.prototype = {
        initialize : function(_this,options){

            // 定义当前对象
            var _currentthis = this;
            // 取样式
            /*var _thisStyle = {
                boxSizing: $(_this).css('box-sizing'),
                width: $(_this).css('width'),
                height: $(_this).css('height'),
                float: $(_this).css('float'),
                margin: $(_this).css('margin'),
                border: $(_this).css('border'),
                color: $(_this).css('color'),
                textAlign: $(_this).css('text-align'),
                padding: $(_this).css('padding')
            };*/

            var _id = "";
            if($(_this).attr("uid")){
                _id = $(_this).attr("uid");
            }else{
                _id = $.uuid();
                $(_this).attr("uid",_id);
            }

            if(!$("#div_"+_id).html()){
                // 创建html
                $(_this).wrap("<div id='div_"+_id+"'></div>");
                $(_this).parent("div").addClass('hselect');
                $(_this).hide();

                // 初始化组件元素
                if(options.height){
                    $(_this).css("height",options.height);
                }
                var _html = "<ul class='hselect_content'></ul>";
                $(_this).after("<i class='fa fa-angle-down'></i>");
                $(_this).next().after(_html);

                if(options.placeholder){
                    $(_this).after("<input placeholder='"+options.placeholder+"'/>");
                }else if($(_this).attr("placeholder")){
                    $(_this).after("<input placeholder='"+$(_this).attr("placeholder")+"'/>");
                }else{
                    $(_this).after("<input placeholder='请选择'/>");
                }

                // 设置验证属性
                var _required = $(_this).attr("required");
                if(typeof $(_this).attr("required") != "undefined"){
                    $(_this).next().attr("required",$(_this).attr("required"));
                    $(_this).removeAttr("required");
                }

                // 判断元素类型
                var _type = $(_this).attr("type");
                if(typeof _type != "undefined"){
                    $(_this).next().attr("type",_type);
                }

                // 设置是否可写
                if(options.readonly){
                    $(_this).next().attr("readonly","readonly");
                }else if($(_this).attr("readonly") == "readonly"){
                    $(_this).next().attr("readonly","readonly");
                }

                // 设置样式
                _this.parent().addClass(_this.attr('class'));
                _this.parent().attr('style', _this.attr('style'));
                _this.parent().css({
                    padding: '0',
                    border: 'none',
                    background: '#fff'
                });
                _this.parent().show();
                _this.next().addClass(_this.attr('class'));
                _this.next().attr('style', _this.attr('style'));
                _this.next().css({
                    width: '100%',
                    height: '100%'
                });
                _this.next().show();
                /*$(_this).parent().css({
                    width: _thisStyle.width,
                    height: _thisStyle.height,
                    float: _thisStyle.float,
                    margin: _thisStyle.margin,
                    lineHeight:_thisStyle.height
                });
                $(_this).next().css({
                    width: '100%',
                    height: '100%',
                    float: _thisStyle.float,
                    padding: _thisStyle.padding,
                    border: _thisStyle.border,
                    color: _thisStyle.color,
                    boxSizing: _thisStyle.boxSizing,
                    textAlign: _thisStyle.textAlign,
                    lineHeight:_thisStyle.height
                });*/

                var _ul = $(_this).parent("div").find("ul");
                if(options.panelHeight){
                    _ul.css("max-height",options.panelHeight);
                }
                if(options.panelWidth){
                	_ul.css("width",options.panelWidth);
                }

            }else{
                $(_this).val("");
                $(_this).next().val("");
                $(_this).removeAttr("data-value");
                $(_this).removeAttr("data-text");

                var _ul = $(_this).parent("div").find("ul");
                if(options.panelHeight){
                    _ul.css("max-height",options.panelHeight);
                }
            }

            // 获取数据面板
            var _ul = $(_this).parent("div").find("ul");
            _ul.hide();

            // 初始化渲染数据
            _currentthis.render(_id,options,_this,1,_ul);

            // 绑定点击事件
            $(document).bind('click', function(e) {
                var e = e || window.event;
                var elem = e.target || e.srcElement;
                while (elem) {
                    if ($(elem).siblings("input").attr("uid") == _id) {
                        return;
                    }
                    elem = elem.parentNode;
                }
                _ul.hide();
                //$(_this).removeAttr("data-value");
                //$(_this).removeAttr("data-text");
            });

            $(_this).next().blur(function(){
                if($(_this).attr('data-text') != $(_this).next().val()){
                    $(_this).val("");
                    $(_this).removeAttr("data-value");
                    $(_this).removeAttr("data-code");
                    $(_this).removeAttr("data-text");
                    $(_this).next().val("");
                }
            });

            // 绑定文本框事件
            var index = 0;
            $(_this).next().on("keyup",function(ev){
                _ul.show();
                _currentthis.render(_id,options,_this,2,_ul,$(this).val());

                var _li = _ul.find('li');

                if(ev.keyCode == 38){
                    if(index <= 0){
                        index = 0;
                    }else{
                        index--;
                    }
                }
                if(ev.keyCode == 40){
                    if(index >= _li.length - 1){
                        index = _li.length - 1;
                    }
                    else{
                        index++;
                    }
                }
                if(ev.keyCode == 13){
                    _li.eq(index).click();
                    _ul.hide();
                }
                _li.eq(index).addClass('active').siblings('.active').removeClass('active');
                if(_li.length > 10){
                    _ul.scrollTop((index + 1 )/ _li.length *(30*(_li.length - 10) + 2));
                }

                // 清空值
                $(_this).val("");
                $(_this).removeAttr("data-value");
                $(_this).removeAttr("data-code");
                $(_this).removeAttr("data-text");
                if($(_this).next().val()){
                    var _lis = $(_this).siblings("ul").find("li");
                    if(_lis && _lis.length>0){
                        for(var _i = 0;_i<_lis.length;_i++){
                            if($(_this).next().val() == _lis.eq(_i).text()){
                                $(_this).val(_lis.eq(_i).attr("data-id"));
                                $(_this).attr("data-value",_lis.eq(_i).attr("data-id"));
                                $(_this).attr("data-text",_lis.eq(_i).text());

                                // 设置文本框值的时候获取文本框焦点
                                $(_this).next().focus();

                                if(_lis.eq(_i).attr("data-code")){
                                    $(_this).attr("data-code",_lis.eq(_i).attr("data-code"));
                                }
                                break;
                            }
                        }
                    }
                }
            });



            // 下拉列表三角符号绑定click事件
            $(_this).next().unbind('click').bind("click",function(){
                if(_ul.css("display") == "block"){
                    _ul.hide();
                }else{
                    _ul.show();
                }
            });
            $(_ul).siblings("i").bind("click",function(){
                if(_ul.css("display") == "block"){
                    _ul.hide();
                }else{
                    _ul.show();
                }
            });
        },
        render:function(_id,options,_this,type,_ul,queryCriteria){
            var renderdata;

            if(type==1){ // 初始化组件数据
                var _data = {};
                if(options.parentSearchName && options.parentSearchValue){
                    _data[options.parentSearchName] = options.parentSearchValue;
                }
                if(options.queryParam){
                    if(!$.isEmptyObject(options.queryParam)){
                        $.each(options.queryParam,function(key,value){
                            _data[key] = value;
                        });
                    }
                }
                if(options.data){
                	initData[_id] = options.data;
                    renderdata = options.data;
                    if(options.onSuccess){
                    	options.onSuccess(options.data);
                    }
                }else{
                	$.ecej.ajax({
                        url:options.url,
                        type:options.type,
                        async:false,
                        data:_data,
                        success:function(data){
                            if(data.resultCode==200){
                                initData[_id] = data.data;
                                renderdata = data.data;

                                // 初始化成功回调函数
                                if(options.onSuccess){
                                    setTimeout(function () {
                                        options.onSuccess(data.data);
                                    },10);
                                }
                            }else{
                                layer.msg('错误代码： ' + data.message);
                            }
                        }
                    });
                }
                
            }else{

                // 根据条件过来数据
                if(!options.searchName){
                    return false;
                }
                // 判断过滤方式
                if(queryCriteria){
                    queryCriteria = $.trim(queryCriteria);
                }

                // 如果后端搜索并且查询条件不为空
                if(options.filterType == "server" && queryCriteria){
                    var _data = {};
                    _data[options.searchName] = queryCriteria;
                    if(options.queryParam){
                        if(!$.isEmptyObject(options.queryParam)){
                            $.each(options.queryParam,function(key,value){
                                _data[key] = value;
                            });
                        }
                    }
                    
                    if(options.data){
                        renderdata = options.data;
                    }else{
                    	$.ecej.ajax({
                            url:options.url,
                            type:options.type,
                            data:_data,
                            async:false,
                            success:function(data){
                                if(data.resultCode==200){
                                    renderdata = data.data;
                                }else{
                                    layer.msg('错误代码： ' + data.message);
                                }
                            }
                        });
                    }
                    
                }else{
                    renderdata = initData[_id];
                    // 过滤查询条件
                    if($.isEmptyObject(renderdata)){
                        return false;
                    }
                    if(queryCriteria){
                        renderdata = $.grep(renderdata,function(n,i){
                            return n[options.searchName].indexOf(queryCriteria)!=-1;
                        });
                    }
                }
            }

            // 渲染数据
            if($.isEmptyObject(renderdata)){
                _ul.hide();
                return ;
            }
            _ul.empty();
            for(var _index=0;_index<renderdata.length;_index++){
                if(options.code){
                    _ul.append("<li data-id='"+renderdata[_index][options.id]+"' data-code='"+renderdata[_index][options.code]+
                        "'>"+renderdata[_index][options.text]+"</li>");
                }else{
                    _ul.append("<li data-id='"+renderdata[_index][options.id]+"'>"+renderdata[_index][options.text]+"</li>");
                }
            }

            // 绑定选项点击事件
            _ul.find("li").unbind('click').bind("click",function(){

                $(_this).val($(this).attr("data-id"));
                $(_this).attr("data-value",$(this).attr("data-id"));
                if(options.code){
                    $(_this).attr("data-code",$(this).attr("data-code"));
                }
                $(_this).attr("data-text",$(this).text());
                $(_this).siblings("input").val($(this).text());

                // 设置文本框值的时候获取文本框焦点
                $(_this).siblings("input").focus();

                _ul.hide();
                if(options.onSelect){

                    var selectedData = {};
                    selectedData[options.id]=$(this).attr("data-id");
                    selectedData[options.text]=$(this).text();
                    if(options.code){
                        selectedData[options.code]=$(this).attr("data-code");
                    }
                    setTimeout(function () {
                        options.onSelect(selectedData);
                    },10);
                }
            }).bind("mouseover",function(){
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
            });
        },
        method:function(_this,options,config){

            if(options == "clear"){
                $(_this).val("");
                $(_this).siblings("input").val("");
                $(_this).removeAttr("data-value");
                $(_this).removeAttr("data-text");
                $(_this).siblings("ul").empty();
                $(_this).siblings("ul").hide();
            }
            if(options == "getText"){
                if($(_this).attr("data-text")){
                    return $(_this).attr("data-text");
                }
                return $(_this).siblings("input").val();
            }
            if(options == "getValue"){
                var _value = $(_this).attr("data-value");
                return _value ? _value:"";
            }
            if(options == "getCode"){
                var _value = $(_this).attr("data-code");
                return _value ? _value:"";
            }
            if(options == "reset"){
                $(_this).val("");
                $(_this).siblings("input").val("");
                $(_this).removeAttr("data-value");
                $(_this).removeAttr("data-code");
                $(_this).removeAttr("data-text");
                $(_this).siblings("ul").find("li.active").removeClass("active");
                $(_this).siblings("ul").show();
                $(_this).siblings("ul").scrollTop(0);
                $(_this).siblings("ul").hide();
            }
            if(options == "setValue"){
                var _lis = $(_this).siblings("ul").find("li");
                for(var index=0;index<_lis.length;index++){
                    if(_lis.eq(index).attr("data-id")==config){
                        $(_this).val(_lis.eq(index).attr("data-id"));
                        $(_this).siblings("input").val(_lis.eq(index).text());
                        $(_this).attr("data-value",_lis.eq(index).attr("data-id"));
                        $(_this).attr("data-text",_lis.eq(index).text());

                        if(_lis.eq(index).attr("data-code")){
                            $(_this).attr("data-code",_lis.eq(index).attr("data-code"));
                        }
                    }
                }
                $(_this).next().focus();

            }
            if(options == "setCode"){
                var _lis = $(_this).siblings("ul").find("li");
                for(var index=0;index<_lis.length;index++){
                    if(_lis.eq(index).attr("data-code")==config){
                        $(_this).val(_lis.eq(index).attr("data-id"));
                        $(_this).siblings("input").val(_lis.eq(index).text());
                        $(_this).attr("data-value",_lis.eq(index).attr("data-id"));
                        $(_this).attr("data-text",_lis.eq(index).text());

                        if(_lis.eq(index).attr("data-code")){
                            $(_this).attr("data-code",_lis.eq(index).attr("data-code"));
                        }
                    }
                }
                $(_this).next().focus();

            }
            if(options == "setIndex"){
                var _lis = $(_this).siblings("ul").find("li");
                if(config>=_lis.length || config<0){
                    //throw "array index out of bounds exception";
                    return;
                }
                $(_this).val(_lis.eq(config).attr("data-id"));
                $(_this).siblings("input").val(_lis.eq(config).text());
                $(_this).attr("data-value",_lis.eq(config).attr("data-id"));
                $(_this).attr("data-text",_lis.eq(config).text());
                if(_lis.eq(config).attr("data-code")){
                    $(_this).attr("data-code",_lis.eq(config).attr("data-code"));
                }
                $(_this).next().focus();
            }
            if(options == "init"){
                var _id = "";
                if($(_this).attr("uid")){
                    _id = $(_this).attr("uid");
                }else{
                    _id = $.uuid();
                    $(_this).attr("uid",_id);
                }
                if(!$("#div_"+_id).html()){
                    // 取样式
                    /*var _thisStyle = {
                        boxSizing: $(_this).css('box-sizing'),
                        width: $(_this).css('width'),
                        height: $(_this).css('height'),
                        float: $(_this).css('float'),
                        margin: $(_this).css('margin'),
                        border: $(_this).css('border'),
                        color: $(_this).css('color'),
                        textAlign: $(_this).css('text-align'),
                        padding: $(_this).css('padding'),
                        lineHeight:$(_this).css('height')
                    };*/
                    // 创建html
                    $(_this).wrap("<div id='div_"+_id+"'></div>");
                    $(_this).parent("div").addClass('hselect');
                    $(_this).hide();

                    var _html = "<ul class='hselect_content'></ul>";
                    $(_this).after("<i class='fa fa-angle-down'></i>");
                    $(_this).next().after(_html);

                    if($(_this).attr("placeholder")){
                        $(_this).after("<input placeholder='"+$(_this).attr("placeholder")+"'/>");
                    }else{
                        $(_this).after("<input placeholder='请选择'/>");
                    }
                    // 设置验证属性
                    var _required = $(_this).attr("required");
                    if(typeof $(_this).attr("required") != "undefined"){
                        $(_this).next().attr("required",$(_this).attr("required"));
                        $(_this).removeAttr("required");
                    }
                    // 判断元素类型
                    var _type = $(_this).attr("type");
                    if(typeof _type != "undefined"){
                        $(_this).next().attr("type",_type);
                    }
                    // 设置是否可写
                    if($(_this).attr("readonly") == "readonly"){
                        $(_this).next().attr("readonly","readonly");
                    }
                    // 设置样式
                    _this.parent().addClass(_this.attr('class'));
                    _this.parent().attr('style', _this.attr('style'));
                    _this.parent().css({
                        padding: '0',
                        border: 'none',
                        background: '#fff'
                    });
                    _this.parent().show();
                    _this.next().addClass(_this.attr('class'));
                    _this.next().attr('style', _this.attr('style'));
                    _this.next().css({
                        width: '100%',
                        height: '100%'
                    });
                    _this.next().show();
                    /*$(_this).parent().css({
                        width: _thisStyle.width,
                        height: _thisStyle.height,
                        float: _thisStyle.float,
                        margin: _thisStyle.margin
                    });
                    $(_this).next().css({
                        width: '100%',
                        height: '100%',
                        float: _thisStyle.float,
                        padding: _thisStyle.padding,
                        border: _thisStyle.border,
                        color: _thisStyle.color,
                        boxSizing: _thisStyle.boxSizing,
                        textAlign: _thisStyle.textAlign
                    });*/

                    if(options.panelHeight){
                        _ul.css("max-height",options.panelHeight);
                    }
                    // 获取数据面板
                    var _ul = $(_this).parent("div").find("ul");
                    _ul.hide();
                }else{
                    // 获取数据面板
                    var _ul = $(_this).parent("div").find("ul");
                    _ul.hide();
                    _ul.empty();
                    $(_this).val("");
                    $(_this).next().val("");
                    $(_this).removeAttr("data-value");
                    $(_this).removeAttr("data-code");
                    $(_this).removeAttr("data-text");
                }
            }
        }
    };

    /**
     * [autoComplete 函数调用入口]
     * @param  {[object]} options [初始化下拉列表参数]
     * @return {[type]}         [description]
     */
    $.fn.autoComplete = function(options,config){

        var _autoComplete = new AutoComplete(options);
        if(typeof options == "string"){
            // 执行对应函数
            return _autoComplete.method(this,options,config);
        }else{
            if(!options.url && !options.data){
                throw "url or data is required";
            }
            if(!options.id){
                throw "id is required";
            }
            if(!options.text){
                throw "text is required";
            }

            // 匹配文本框和面板宽度
            if(options.width && !options.panelWidth){
                options.panelWidth = options.width;
            }
            if(!options.width && options.panelWidth){
                options.width = options.panelWidth;
            }

            // 如果存在多个元素，依次初始化
            if($(this).length){
                for(var index=0;index<$(this).length;index++){
                    _autoComplete.initialize($(this).eq(index),options);
                }
            }
        }

        return _autoComplete;
    }
}(jQuery));