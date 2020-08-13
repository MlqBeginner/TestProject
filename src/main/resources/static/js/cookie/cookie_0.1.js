/**
 * 全局cookies操作
 */
(function ($) {

    /**
     * 设置cookie
     */
    $.setCookie = function (key, value, expires) {
        /*var  _key = $.base64.encode(encodeURIComponent(key));*/
        if (value) {
            if (typeof value == "object" || typeof value == "number") {
                value = JSON.stringify(value);
            }
            value = $.Base64encode(value);
        }
        var options = {path: '/'};
        if (expires) {
            options.expires = expires;
        }
        return $.cookie(key, value, options);
    };

    /**
     * 获取cookie
     */
    $.getCookie = function (key) {
        /*var _key = $.base64.encode(encodeURIComponent(key));*/
        var value = $.cookie(key);
        if (value) {
            value = $.Base64decode(value);
            value = decodeURIComponent(value);
            try {
                value = JSON.parse(value);
            } catch (e) {
            }
        }
        return value;
    };

    /**
     * 清理cookie
     */
    $.cleanCookie = function (key) {
        $.removeCookie(key, {path: '/'});
        return !$.cookie(key);
    };


}(jQuery));