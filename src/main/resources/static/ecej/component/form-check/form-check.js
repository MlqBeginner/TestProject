;(function($){

    /*
     * options 结构
     *          name 是需要验证的标签的name
     *          基础验证规则是
     *                  required 必填项
     *                  length 的value 是字符串 '4-10'  4是最小长度，10是最长长度；或者一个值时就是最小长度
     *                  euqalto 的值得验证密码和密码一致使用的只能用于password
     *
     * {
     *   defaultColor: {
     *       initColor: '#e5e5e5',初始化边框颜色
     *       errorColor: '#f00'   验证错误色
     *   },
     *   rulers: {
     *      name: {
     *          required: true,
     *          length: '4-10',
     *          equalto: '#password'
     *      },
     *      name: "required"
     *   }
     *  message:{
     *      name: {
     *          required: '必填项不能为空',
     *          length: "必填项不能少于{{}}个必填项不能多于{{}} )",
     *          name: "自定义弹出的内容"
     *      }
     *  },
     *  regexp: {
     *      name: '' // 正则
     *  }
     * }
     *
     * formCheck的返回值：
     *          false     不符合规则
     *          true      符合规则
     *
     * */
    var FormCheck = function(ID, options){
        this.backValue = true;

        var options = options || {};
        this.init(ID, options);
    };
    FormCheck.prototype = {
        init: function(ID, options){

            var _this = this;

            var rules = options.rules || {};

            /* 一个网页的设计会有自己的一种风格，他的输入框一般都是同一种风格的 */
            var defaultColor = options.defaultColor || {};

            /* 默认所有需要验证的input或者textarea如果有边框的border-color都是#e5e5e5 */
            var initColor = defaultColor.initColor || '#e5e5e5';


            var errorColor = defaultColor.errorColor || '#F00';

            var message = options.message || {};

            var regexp = options.reg || {};

            for(var name in rules){
                if(rules[name] == 'required'){
                    $('#' + ID + ' *[name=' + name + ']').attr('required', 'required');
                }
                if(typeof(rules[name]) == 'object'){
                    for(var name2 in rules[name]){
                        $('#' + ID + ' *[name=' + name + ']').attr(name2, rules[name][name2]);
                    }
                }
            }

            $('#'+ID+' *[required]').each(function(){
                if(typeof($(this).css('borderColor')) == 'string'){
                    _this.initColor(this, initColor);
                }
            });

            $('#'+ID+' *[required]').each(function(){
                if(this.tagName == 'INPUT' || 'TEXTAREA'){
                    return _this.check(this, initColor, errorColor, message, regexp);
                }
            });

        },
        initColor: function(that, initColor){
            $(that).css('borderColor', initColor);

            this.backValue = true;
            return this.backValue;
        },
        errorColor: function(that, errorColor, alertMsg){
            $(that).focus();
            $(that).css('borderColor', errorColor);

            // 就跟callback一样，匹配错误时需要弹出错误信息！
            $.layer.alertC(alertMsg);
            this.backValue = false;
            return this.backValue;
        },
        loopMsg: function(that, errorColor, message, alertMsg){
            for(var name in message){
                if(name == $(that).attr('name') && message[name][name]){
                    alertMsg = message[name][name];
                }
            }
            return this.errorColor(that, errorColor, alertMsg);
        },
        loopReg: function(that, regexp, reg, message, errorColor, initColor, alertMsg){
            for(var name in regexp){
                if(name == $(that).attr('name') && regexp[name]){
                    reg = regexp[name] || reg;
                }
            }

            if(!reg.test($(that).val())){
                return this.loopMsg(that, errorColor, message, alertMsg);
            }else{
                return this.initColor(that, initColor);
            }
        },
        check: function(that, initColor, errorColor, message, regexp){

            /* 预存this */
            var _this = this;
            /*
             * 单选框
             * */
            _this.backValue = false;
            if($(that).attr('type') == 'radio'){
                $('input[name="' + $(that).attr('name') + '"]').each(function(){
                    if(this.checked == true){
                        _this.backValue = true;
                    }
                });
                var alertMsg = '单选项不能为空';
                if(_this.backValue){
                    return this.initColor(that, initColor);
                }else{
                    return this.loopMsg(that, errorColor, message, alertMsg);
                }
            }
            /*
             * 复选框
             * 预留位置后期增加规则
             * */
            else if($(that).attr('type') == 'checkbox'){

            }
            /*
            * 输入框或者textarea
            * */
            else{
                /* 最小长度 */
                if(this.lengthCheck(that, initColor, errorColor, message)){
                    /* 类型检测 */

                    if(parseFloat($(that).attr('length')) == 0 && $(that).val().trim().length == 0){
                        return this.backValue;
                    }
                    /* url */
                    if($(that).attr('type') == 'url'){
                        return this.urlCheck(that,initColor, errorColor, message, regexp);
                    }
                    /* phone 默认还是text类型的 可作为标注 手机号码 */
                    if($(that).attr('type') == 'phone'){
                        return this.phoneCheck(that,initColor, errorColor, message, regexp);
                    }
                    /* telephone 默认还是text类型的 可作为标注座机号码 */
                    if($(that).attr('type') == 'telephone'){
                        return this.telephoneCheck(that,initColor, errorColor, message, regexp);
                    }
                    /* number  数字类型校验 */
                    if($(that).attr('type') == 'number'){
                        return this.numberCheck(that,initColor, errorColor, message, regexp);
                    }
                    /* email  邮箱类型校验 */
                    if($(that).attr('type') == 'email'){
                        return this.emailCheck(that,initColor, errorColor, message, regexp);
                    }
                    /* password  密码类型校验 */
                    if($(that).attr('name') == 'password'){
                        return this.passwordCheck(that,initColor, errorColor, message, regexp);
                    }
                    /* confirm_password 验证确认密码*/
                    if($(that).attr('name') == 'confirm_password'){
                        return this.confirmPasswordCheck(that,initColor, errorColor, message, regexp);
                    }
                }
            }
            return this.backValue;
        },
        lengthCheck: function(that, initColor, errorColor, message){
            /* 最小长度 最大长度 */
            var length = $(that).attr('length') || '-1';
            var minlength = parseFloat(length);

            if(/\d-/.test(length)){
                var maxlength = parseFloat(length.substring(length.indexOf('-') + 1));
            }

            if(minlength == -1 && $(that).val().trim().length <= 0){
                var alertMsg = "必填项不能为空";
                return this.errorColor(that, errorColor, alertMsg);

            } else if($(that).val().trim().length < minlength){

                var alertMsg = "必填项最少" + minlength + "个字";
                return this.loopMsg(that, errorColor, message, alertMsg);

            }else if(maxlength && $(that).val().trim().length > maxlength){

                var alertMsg = "必填项最多" + maxlength + "个字";
                return this.loopMsg(that, errorColor, message, alertMsg);

            } else{
                return this.initColor(that, initColor);
            }
        },
        urlCheck: function(that,initColor, errorColor, message, regexp){
            var reg = new RegExp('^((https|http|ftp|rtsp|mms)?://)'
                + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
                + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
                + '|' // 允许IP和DOMAIN（域名）
                + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
                + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
                + '[a-z]{2,6})' // first level domain- .com or .museum
                + '(:[0-9]{1,4})?' // 端口- :80
                + '((/?)|' // a slash isn't required if there is no file name
                + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$');
            var alertMsg = '请输入正确的url地址';

            return this.loopReg(that, regexp, reg, message, errorColor, initColor, alertMsg);
        },
        phoneCheck: function(that, initColor, errorColor, message, regexp){
            var reg = /^(((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8})$/;
            var alertMsg = '请输入正确的手机号码';

            return this.loopReg(that, regexp, reg, message, errorColor, initColor, alertMsg);
        },
        telephoneCheck: function(that, initColor, errorColor, message, regexp){
            var reg = /^(0\d{2}-\d{8}(-\d{1,4})?)|(0\d{3}-\d{7,8}(-\d{1,4})?)$/;
            var alertMsg = '请输入正确的座机号码';

            return this.loopReg(that, regexp, reg, message, errorColor, initColor, alertMsg);
        },
        numberCheck: function(that, initColor, errorColor, message, regexp){
            var reg = /^[0-9]+$/;
            var alertMsg = '请输入数字';

            return this.loopReg(that, regexp, reg, message, errorColor, initColor, alertMsg);
        },
        emailCheck: function(that, initColor, errorColor, message, regexp){
            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            var alertMsg = '请输入正确的邮箱';

            return this.loopReg(that, regexp, reg, message, errorColor, initColor, alertMsg);
        },
        passwordCheck: function(that, initColor, errorColor, message, regexp){
            /* var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; */
            var reg = /[\s\S]*/;
            var alertMsg = '请输入正确的密码，密码格式：任意字符任意长度';

            return this.loopReg(that, regexp, reg, message, errorColor, initColor, alertMsg);
        },
        confirmPasswordCheck: function(that, initColor, errorColor, message, regexp){
            var str = $($(that).attr('equalto')).val();
            var reg = new RegExp(str);
            var alertMsg = '两次密码输入不一致';
            return this.loopReg(that, regexp, reg, message, errorColor, initColor, alertMsg);
        }
    };
    $.fn.formCheck = function(options){
        var ID = $(this).attr('id');
        var _FormCheck = new FormCheck(ID, options);
        return _FormCheck.backValue;
    };
})(jQuery);





