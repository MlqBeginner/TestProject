document.write("<link rel='stylesheet' href='" + path_root + "/core/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css' />");
document.write("<script type='text/javascript' src='" + path_root + "/core/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js'></script>");
document.write("<link rel='stylesheet' href='" + path_root + "/core/bootstrap-datepicker/css/bootstrap-datepicker.css' />");
document.write("<script type='text/javascript' src='" + path_root + "/core/bootstrap-datepicker/js/bootstrap-datepicker.min.js'></script>");
document.write("<script type='text/javascript' src='" + path_root + "/core/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js'></script>");
document.write("<script type='text/javascript' src='" + path_root + "/core/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js'></script>");
var default_format = "yyyy-mm-dd";
$(function () {

    $.fn.dateInit = function () {
        var _dates = $(this).find(".date");
        for (var index = 0; index < _dates.length; index++) {
            var _date = _dates.eq(index);
            _date.wrap("<div></div>");
            _date.parent().css("display", "inline-block");
            _date.parent().css("position", "relative");

            _date.after("<i></i>");
            _date.next().addClass("glyphicon glyphicon-calendar");

            _date.next().css("position", "absolute");
            _date.next().css("right", "8px");
            _date.next().css("top", "10px");
            _date.next().css("color", "#aaa");

            var _format = _date.attr("data-date-format");
            if (!_format) {
                _format = default_format;
            }
            if (_format == default_format) {
                _date.datepicker({
                    autoclose: true,
                    language: "zh-CN",
                    format: default_format
                });
            } else {
                _date.datetimepicker({
                    autoclose: true,
                    language: "zh-CN",
                    format: _format
                });
            }
        }
    }

    $.fn.dateBind = function (eventName, callback) {
        var _format = $(this).attr("data-date-format");
        if (!_format) {
            _format = default_format;
        }
        if (_format == default_format) {
            return $(this).datepicker().on(eventName, callback);
        } else {
            return $(this).datetimepicker().on(eventName, callback);
        }
    }

    $.fn.dateMethod = function (methodName, value) {
        var _format = $(this).attr("data-date-format");
        if (!_format) {
            _format = default_format;
        }
        if (_format == default_format) {
            $(this).datepicker(methodName, value);
        } else {
            $(this).datetimepicker(methodName, value);
        }
    }

    $("body").dateInit();
});