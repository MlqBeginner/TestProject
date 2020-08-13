var _TREE, _TREEID, _TREE_NODE, _TYPE, _SIGN, closeLayer;
var _TableDataSort = {};
var _FORM;
var billType;
var setting = {
    view: {
        selectedMulti: false
    },
    edit: {
        enable: false,//是否可以编辑
        showRemoveBtn: false,//设置是否显示删除按钮。[setting.edit.enable = true 时生效]
        showRenameBtn: false//设置是否显示编辑名称按钮。[setting.edit.enable = true 时生效]

    },
    data: {
        simpleData: {
            enable: true,
            dKey: "id",
            pIdKey: "pId"
        }
    },
    callback: {
        onClick: onClick1,//节点被点击的事件回调函数
        onAsyncSuccess: function (event, treeId, treeNode, msg) {//成功后的回调

        }
    }
    //异步初始化
    // async: {
    //     enable: true,
    //     url: "/my/zTree/buildAreaTree",
    //     autoParam: ["id"],
    //     otherParam: {
    //         cityCode: "xxx",
    //         type: billType
    //     },
    //     dataType: "text",
    //     type: "post"
    // }
};


var zNodes = [
    {id: 1, pId: 0, name: "[core] 基本功能 演示", open: true},
    {id: 101, pId: 1, name: "最简单的树 --  标准 JSON 数据"},
    {id: 102, pId: 1, name: "最简单的树 --  简单 JSON 数据"},
    {id: 103, pId: 1, name: "不显示 连接线"},
    {id: 104, pId: 1, name: "不显示 节点 图标"},
    {id: 108, pId: 1, name: "异步加载 节点数据"},
    {id: 109, pId: 1, name: "用 zTree 方法 异步加载 节点数据"},
    {id: 110, pId: 1, name: "用 zTree 方法 更新 节点数据"},
    {id: 111, pId: 1, name: "单击 节点 控制"},
    {id: 112, pId: 1, name: "展开 / 折叠 父节点 控制"},
    {id: 113, pId: 1, name: "根据 参数 查找 节点"},
    {id: 114, pId: 1, name: "其他 鼠标 事件监听"},

    {id: 2, pId: 0, name: "[excheck] 复/单选框功能 演示", open: false},
    {id: 201, pId: 2, name: "Checkbox 勾选操作"},
    {id: 206, pId: 2, name: "Checkbox nocheck 演示"},
    {id: 207, pId: 2, name: "Checkbox chkDisabled 演示"},
    {id: 208, pId: 2, name: "Checkbox halfCheck 演示"},
    {id: 202, pId: 2, name: "Checkbox 勾选统计"},
    {id: 203, pId: 2, name: "用 zTree 方法 勾选 Checkbox"},
    {id: 204, pId: 2, name: "Radio 勾选操作"},
    {id: 209, pId: 2, name: "Radio nocheck 演示"},
    {id: 210, pId: 2, name: "Radio chkDisabled 演示"},
    {id: 211, pId: 2, name: "Radio halfCheck 演示"},
    {id: 205, pId: 2, name: "用 zTree 方法 勾选 Radio"},

    {id: 3, pId: 0, name: "[exedit] 编辑功能 演示", open: false},
    {id: 301, pId: 3, name: "拖拽 节点 基本控制"},
    {id: 302, pId: 3, name: "拖拽 节点 高级控制"},
    {id: 303, pId: 3, name: "用 zTree 方法 移动 / 复制 节点"},
    {id: 304, pId: 3, name: "基本 增 / 删 / 改 节点"},
    {id: 305, pId: 3, name: "高级 增 / 删 / 改 节点"},
    {id: 306, pId: 3, name: "用 zTree 方法 增 / 删 / 改 节点"},
    {id: 307, pId: 3, name: "异步加载 & 编辑功能 共存"},
    {id: 308, pId: 3, name: "多棵树之间 的 数据交互"},

    {id: 4, pId: 0, name: "大数据量 演示", open: false},
    {id: 401, pId: 4, name: "一次性加载大数据量"},
    {id: 402, pId: 4, name: "分批异步加载大数据量"},
    {id: 403, pId: 4, name: "分批异步加载大数据量"},

    {id: 5, pId: 0, name: "组合功能 演示", open: false},
    {id: 501, pId: 5, name: "冻结根节点"},
    {id: 502, pId: 5, name: "单击展开/折叠节点"},
    {id: 503, pId: 5, name: "保持展开单一路径"},
    {id: 504, pId: 5, name: "添加 自定义控件"},
    {id: 505, pId: 5, name: "checkbox / radio 共存"},
    {id: 506, pId: 5, name: "左侧菜单"},
    {id: 507, pId: 5, name: "下拉菜单"},
    {id: 509, pId: 5, name: "带 checkbox 的多选下拉菜单"},
    {id: 510, pId: 5, name: "带 radio 的单选下拉菜单"},
    {id: 508, pId: 5, name: "右键菜单 的 实现"},
    {id: 511, pId: 5, name: "与其他 DOM 拖拽互动"},
    {id: 512, pId: 5, name: "异步加载模式下全部展开"},

    {id: 6, pId: 0, name: "其他扩展功能 演示", open: false},
    {id: 601, pId: 6, name: "隐藏普通节点"},
    {id: 602, pId: 6, name: "配合 checkbox 的隐藏"},
    {id: 603, pId: 6, name: "配合 radio 的隐藏"}
];

$(function () {

    billType = $("#billType").val();

    layui.use('form', function () {
        _FORM = layui.form();

        //初始化树
        $.fn.zTree.init($("#tree"), setting,zNodes);


        // 初始化表格信息
        initTable();

        $("#resultData").submit(function () {

            var formData = {};
            formData.type = 1;
            formData.cityCode = "BJ";
            formData.questionCategoryId = 1;
            formData.names = "测试节点01";

            $.ajax({
                type: "post",
                url: "/v1/test/testAdd",
                dataType: "json",
                contentType:"application/json;charset=utf-8",//默认值
                data: JSON.stringify(formData),
                success: function (data) {
                    console.log(data);
                },
                error: function (jqXHR) {
                    alert("发生错误：" + jqXHR.status);
                }
            });
            return false;
        });

        // 新增弹窗事件
        $("#addCateGory").click(function () {
            if (!getZTreeSingleNode()) {
                $.layer.alert("请选择左侧节点");
                return false;
            }
            _SIGN = "add";
            popupBox(_TREE_NODE);
            $("#superior").text((_TREE_NODE.level == 0) ? "无" : getParentNames(_TREE_NODE));
            $("#level").text((_TREE_NODE.level + 1) + "级");
            $("#hide-edit").hide();
            $("#hide-add").show();
        });
        // 删除事件
        $("#delCateGory").click(function () {
            if (!getZTreeSingleNode()) {
                $.layer.alert("请选择需要删除的分类！");
                return false;
            }
            if (_TREE_NODE.level == 0) {
                $.layer.alert("根目录不能删除！");
                return false;
            }
            if (_TREE_NODE.children) {
                $.layer.alert("请先删除所选分类的子分类！");
                return false;
            }
            $.layer.confirmContext("您确认删除所选分类吗？", "信息", ['确定', '取消'], function (index) {
                refreshParentNode();
                form.render("select");
                $.layer.close(index);
            });

        });

        // 关闭当前弹窗事件
        $("#cancel").click(function () {
            $.layer.close(closeLayer);
        });
        // 换行事件
        $("#categoryClass").keypress(function (event) {
            if (event.which === 13) {
                var flag = splitFormat($("#categoryClass").val());
                if (typeof flag == "number" && flag == -1) {
                    $.layer.alert("分类名称最多20个字");
                    return false;
                }
                if (typeof flag == "number" && flag == -2) {
                    $.layer.alert("一次性最多输入20个分类");
                    return false;
                }
                if (typeof flag == "number" && flag == -3) {
                    $.layer.alert("分类填写重复");
                    return false;
                }
            }
        })

    });

});


function initTable() {
    $("#table").datagrid({
        url: '/v1/test/list',
        queryParams: {},
        pagination: false, // 是否分页
        showColumns: false,
        toolbar: false,
        sortable : true,
        columns: [
            {field: 'id', title: '分类ID'},
            {field: 'name', title: '分类名称'},
            {
                title: '操作', field: 'id', align: 'center',
                formatter: function (value, row, index) {
                    var _a = '<a href="javacript:void(0);" style="color: #0033ff" onclick="edit_category(' + row.id + ',\'' + row.name + '\')">编辑</a>';
                    _a += '&nbsp;&nbsp;&nbsp;';
                    _a += '<a href="javacript:void(0);" style="color: #0033ff" onclick="del_category(' + row.id + ',\'' + row.name + '\')">删除</a>';
                    return _a;
                }
            },
            {
                title: '排序', field: 'id', align: 'center',
                formatter: function (value, row, index) {
                    var count = $('#table').bootstrapTable('getOptions').totalRows;
                    var _imgs = '';
                    var _src1 = "";
                    var _src2 = "";
                    var _onclick1 = '';
                    var _onclick2 = '';
                    if (index == 0) {
                        _onclick2 = 'xia_shift("' + row.id + '","' + row.sort + '","' + index + '")';
                        _src1 = '/ecej/imgs/u464.png';
                        _src2 = '/ecej/imgs/u462.png';
                    } else if (index + 1 == count) {
                        _onclick1 = 'move_up("' + row.id + '","' + row.sort + '","' + index + '")';
                        _src1 = '/ecej/imgs/u462.png';
                        _src2 = '/ecej/imgs/u464.png';
                    } else {
                        _onclick1 = 'move_up("' + row.id + '","' + row.sort + '","' + index + '")';
                        _onclick2 = 'xia_shift("' + row.id + '","' + row.sort + '","' + index + '")';
                        _src1 = '/ecej/imgs/u462.png';
                        _src2 = '/ecej/imgs/u462.png';
                    }
                    _imgs += '<img onclick="' + _onclick1 + '" src="' + _src1 + '" style="transform:rotate(180deg);width: 27px;height: 25px"/>';
                    _imgs += '&nbsp;&nbsp;&nbsp;';
                    _imgs += '<img onclick="' + _onclick2 + '" src="' + _src2 + '" style="width: 27px;height: 25px"/>';
                    _TableDataSort[index] = row.sort;
                    return _imgs;
                }
            }

        ]
    });
}


function addHoverDom(treeId, treeNode) {

}

//选中树节点
function getZTreeSingleNode(root) {
    var zTree = $.fn.zTree.getZTreeObj(root);
    var nodes = zTree.getSelectedNodes();
    return nodes[0];
}

//弹出新页面
function popupBox(treeNode) {
    _TREEID = treeNode.id;
    var title = "";
    //弹框大小控制
    var options = {area: ['555px', '555px'], id: 'box'};
    if (_SIGN == "add") {
        title = "新增" + (treeNode.level + 1) + "级分类";
    } else if (_SIGN == "edit") {
        title = "修改" + (treeNode.level + 1) + "级分类";
    }
    closeLayer = $.layer.openContent($("#box_content"), title, '', options);
}

//节点被点击的事件回调函数
function onClick1(event, treeId, treeNode) {
    _TREE_NODE = treeNode;
    _TREE = $.fn.zTree.getZTreeObj("tree");
    $("#classifyId").text(treeNode.id);
    $("#classifyName").val(treeNode.name);
}

// 获取当前节点的所有父级Name
function getParentNames(treeObj) {
    if (treeObj == null) return "";
    var filename = treeObj.name;
    var pNode = treeObj.getParentNode();
    if (pNode != null) {
        filename = getParentNames(pNode) + " > " + filename;
    }
    return filename;
}

function splitFormat(str) {
    var snsArr = str.split(/[(\r\n)\r\n]+/);
    var _flag = true;
    $.each(snsArr, function (index, item) {
        if (item.length > 20) {
            _flag = false;
            return;
        }
    });
    if (!_flag) {
        return -1;
    }
    if (snsArr.length > 20) {
        return -2;
    }
    var arr = snsArr.slice(0, snsArr.length - 1);
    if (snsArr.length > 1 && $.inArray(snsArr[snsArr.length - 1], arr) != -1) {
        return -3;
    }
    return snsArr.join(",");
}

// 刷新节点信息
function reAsyncChildNodes(treeNode) {
    if (!treeNode.isParent) {
        var _parentNode = treeNode.getParentNode();
        _TREE.reAsyncChildNodes(_parentNode, "refresh");
    } else {
        _TREE.reAsyncChildNodes(treeNode, "refresh");
    }
}

/**
 * 刷新当前节点
 */
function refreshNode() {
    /*根据 treeId 获取 zTree 对象*/
    var zTree = $.fn.zTree.getZTreeObj("tree"),
        type = "refresh",
        silent = false,
        /*获取 zTree 当前被选中的节点数据集合*/
        nodes = zTree.getSelectedNodes();
    /*强行异步加载父节点的子节点。[setting.async.enable = true 时有效]*/
    zTree.reAsyncChildNodes(nodes[0], type, silent);
    zTree.checkAllNodes(false);
    zTree.cancelSelectedNode();
    $("#classifyId").text('');
    $("#classifyName").val('');
}

/**
 * 刷新当前选择节点的父节点
 */
function refreshParentNode() {
    var zTree = $.fn.zTree.getZTreeObj("tree"),
        type = "refresh",
        silent = false,
        nodes = zTree.getSelectedNodes();
    /*根据 zTree 的唯一标识 tId 快速获取节点 JSON 数据对象*/
    var parentNode = zTree.getNodeByTId(nodes[0].parentTId);
    /*选中指定节点*/
    zTree.selectNode(parentNode);
    zTree.reAsyncChildNodes(parentNode, type, silent);
    zTree.checkAllNodes(false);
    zTree.cancelSelectedNode();
    $("#classifyId").text('');
    $("#classifyName").val('');
}

//选中树节点
function getZTreeSingleNode() {
    var zTree = $.fn.zTree.getZTreeObj("tree");
    var nodes = zTree.getSelectedNodes();
    if (nodes.length == 0) {
        return false;
    }
    return nodes[0];
}

function lookupNode(id) {
    zTree = $.fn.zTree.getZTreeObj("tree");//treeDemo界面中加载ztree的div
    var node = zTree.getNodeByParam("id", id);
    _TREE_NODE = node;
    zTree.cancelSelectedNode();//先取消所有的选中状态
    zTree.selectNode(node, true);//将指定ID的节点选中
    zTree.expandNode(node, true, false);//将指定ID节点展开
    $("#classifyId").text(node.id);
    $("#classifyName").val(node.name);
}

function del_category(id, name) {
    lookupNode(id);
    refreshParentNode();
}

function edit_category(id, name) {
    lookupNode(id);
    _SIGN = "edit";
    popupBox(_TREE_NODE);
    $("#superior").text((_TREE_NODE.level == 0) ? "无" : getParentNames(_TREE_NODE));
    $("#level").text((_TREE_NODE.level + 1) + "级");
    $("#hide-add").hide();
    $("#hide-edit").show();
}

// 上移
function move_up(id, sort, index) {

}

function xia_shift(id, sort, index) {

}