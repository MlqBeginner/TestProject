var _FORM;
$(function () {

    layui.use('form', function () {
        _FORM = layui.form();


        _FORM.on('select(demos)', function (data) {
            var _id = $(this).val();
            console.log(data.value)
        });
        _FORM.on('select(serviceStation)', function (data) {
            $("#serviceStation").click();
            return false;
        });

        $("#div_serviceStation").click(function () {
            if (!$("#factory").find("option:selected").val()) {
                $.layer.alert("请选择工厂", function (index) {
                    $("#factory").change();
                    $.layer.close(index);
                });
                return false;
            }
        });


        //监听提交
        _FORM.on('submit(formDemo)', function (data) {

            return false;
        });

    });

});