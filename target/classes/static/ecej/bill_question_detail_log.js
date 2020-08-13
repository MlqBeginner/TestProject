$(function () {
    $("#btn").click(function () {
        var index = $.layer.openContent($("#box_content"), "咨询单操作日志", '', {area: ['800px', '555px'], id: 'box'});
        $("#layui-layer" + index).css("text-align", "center");

    });
});