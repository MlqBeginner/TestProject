$(function () {

    var _div_phone = '<div style="display: flex;margin-bottom: 7px">\n' +
        '            <input name="cellPhoneNumber" value="">\n' +
        '            <img class="del_phone" src="../../ecej/imgs/u52.png" style="width: 20px;height: 20px;margin-left: 9px;">\n' +
        '        </div>';

    $("#addPhone").click(function () {
        $("#container").append(_div_phone);
    });
    $(".del_phone").click(function () {
        $(this).parent().remove();
    });

    $("#have").click(function () {
        var _phones = $('input[name=cellPhoneNumber]');
        console.log(_phones.length);
        var _douhao = "";
        var flag = true;
        $.each(_phones, function (index, dom) {
            var phone = $(dom).val();
            if (!(/^1[3456789]\d{9}$/.test(phone))) {
                flag = false;
            }
            if (phone) {
                if (index + 1 < _phones.length) {
                    _douhao += phone + ","
                } else {
                    _douhao += phone;
                }
            }
        });
        if (!flag) {
            $.layer.alert("手机号码有误，请重填", {}, function (index) {
                $.layer.close(index);
            });
        } else {
            console.log(_douhao)
        }
    });


});