$(function () {

    // 获取
    $("#btn").click(function () {
        var _vals = $("#xinghao_id").val();
        console.log(_vals)
    });

    var _option = "";
    for (var i = 0; i < 100; i++) {
        _option += '<option value="' + i + '">' + '测试' + i + '</option>';
    }
    $("#xinghao_id").append(_option);

    // 动态追加元素需要 重新刷新渲染
    $('.selectpicker').selectpicker('refresh');

});