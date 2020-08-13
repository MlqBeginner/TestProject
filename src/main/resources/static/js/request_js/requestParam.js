$(function () {

    var _obj = $("#demo01").serializeObj();
    _obj.enterpriseIds=_obj.enterpriseIds.join(",");

    $.ajax({
        type: "POST",
        url: "/request/param/send",
        data: _obj,
        success: function (data) {
            alert(data);
        },
        error: function (jqXHR) {
            alert("发生错误：" + jqXHR.status);
        }
    });
});