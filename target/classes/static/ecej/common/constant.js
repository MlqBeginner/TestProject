var billTypeArray = [
    ["billTitle", "subIdStr", "billDir", "code"],
    ["咨询单", "billQuestionId", "billQuestion","1"],
    ["抢险单", "billRiskId", "billRisk","2"],
    ["建议单", "billProposalId", "billProposal","3"],
    ["流转单", "billFlowId", "billFlow","4"],
    ["投诉单", "billComplaintId", "billComplaint","5"],
    ["反馈单", "billFeedbackId", "billFeedback","6"],
    ["表扬单", "billPraiseId", "billPraise","7"],
    ["订单", "orderId", "order","8"]
];

var billApplyTypeArray = [
    ["code", "name"],
    ["1", "查看"],
    ["2", "处理"],
    ["3", "审核"],
    ["4", "回复"],
];

var operatorTypeArray = [
    ["code","name"],
    ["1","个人"],
    ["2","公司"]
];

var billStatusArray = [
    ["code","name"],
    ["1","初始"],
    ["2","已接收"],
    ["3","已处理"],
    ["4","已驳回"],
    ["5","已完成"],
    ["6","再流转"],
    ["7",""],
    ["8",""],
    ["9","已取消"]
];

/**
 * 新投诉枚举
 */
var newBillComplaintEnum = {};
newBillComplaintEnum.StatusEnum = [
    ["code","name"],
    ["1","初始"],
    ["2","已接收"],
    ["3","已处理"],
    ["4","已驳回"],
    ["5","已完成"],
    ["6","再流转"],
    ["7",""],
    ["8",""],
    ["9","已取消"],
    ["10",""],
    ["11",""],
    ["12",""],
    ["13",""],
    ["14","已退回"],
    ["15","已调查"],
    ["16","已回访"],
    ["17","已驳回"],
    ["18","已初审"],
    ["19","已终审"]
];

var DataChannel=[
    {id: 1, name: "95158"},
    {id: 2, name: "微信在线客服"},
    {id: 3, name: "e城e家APP客服"},
    {id: 4, name: "400-86-95158"},
    {id: 5, name: "95158网站"},
    {id: 6, name: "回访"},
    {id: 8, name: "400-06-85158"},
    {id: 12, name: "400-61-95158"},
    {id: 9, name: "集团示险赋能群"},
    {id: 10, name: "日常业务回访"},
    {id: 11, name: "客服敏感信息监测"},
    {id: 7, name: "其它"}
];
var DataChannelName=function (id) {
    for(var i=0;i<DataChannel.length;i++) {
        if(DataChannel[i].id==id){
            return DataChannel[i].name;
        }
    }
};
var newBillComplaint=[
    {"id":1, name:"初始"},
    {"id":2, name:"已接收"},
    {"id":3, name:"已处理"},
    {"id":9, name:"已取消"},
    {"id":14,name:"已退回"},
    {"id":15, name:"已调查"},
    {"id":16, name:"已回访"},
    {"id":17, name:"已驳回"},
    {"id":18, name:"已初审"},
    {"id":19, name:"已终审"}
];
var newBillComplaintName=function (id) {
    for(var i=0;i<newBillComplaint.length;i++) {
        if(newBillComplaint[i].id==id){
            return newBillComplaint[i].name;
        }
    }
};