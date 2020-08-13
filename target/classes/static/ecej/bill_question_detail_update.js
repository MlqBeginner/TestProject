var _FORM;
$(function () {

    layui.use('form', function () {
        _FORM = layui.form();


        $('#deal_method').keyup(function () {
                var remain = $(this).val().length;
                $('#wordage').text(remain);
            }
        );

        //监听提交
        _FORM.on('submit(formDemo)', function (data) {

            return false;
        });

    });

});