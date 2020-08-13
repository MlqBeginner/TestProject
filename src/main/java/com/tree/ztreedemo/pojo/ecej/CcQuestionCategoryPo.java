package com.tree.ztreedemo.pojo.ecej;

import com.alibaba.fastjson.JSON;

import java.io.Serializable;
import java.util.Date;


/**
 * @author mlq_v
 * @Description: cc_question_category
 * @date 2020年07月08日
 */
public class CcQuestionCategoryPo implements Serializable {

    private static final long serialVersionUID = 1L;

    public static final String TABLE_ALIAS = "CcQuestionCategory";

    /**
     * id    db_column:question_category_id
     */
    private Integer questionCategoryId;
    /**
     * 名称    db_column:name
     */
    private String name;
    /**
     * 父id    db_column:pid
     */
    private Integer pid;
    /**
     * 问题分类(1:咨询单;2:抢险单;3:建议单;4:流转单;5:投诉单;6:反馈单)    db_column:type
     */
    private Integer type;
    /**
     * 排序    db_column:sort
     */
    private Integer sort;
    /**
     * 是否支持业务分类（0表示 不支持；1 表示支持）    db_column:support_business
     */
    private Integer supportBusiness;
    /**
     * 是否需要地址（0 表示不支持；1表示支持）    db_column:need_addr
     */
    private Integer needAddr;
    /**
     * 状态( 0 表示无效，1 表示有效）    db_column:state
     */
    private Integer state;
    /**
     * 删除标志：0：未删除，1：已删除    db_column:del_flag
     */
    private Integer delFlag;
    /**
     * 创建时间    db_column:create_time
     */
    private Date createTime;
    /**
     * 更新时间    db_column:update_time
     */
    private Date updateTime;
    /**
     * code    db_column:code
     */
    private String code;
    /**
     * 城市code    db_column:city_code
     */
    private String cityCode;
    /**
     * 备注    db_column:remark
     */
    private String remark;

    public Integer getQuestionCategoryId() {
        return questionCategoryId;
    }

    public void setQuestionCategoryId(Integer questionCategoryId) {
        this.questionCategoryId = questionCategoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Integer getSupportBusiness() {
        return supportBusiness;
    }

    public void setSupportBusiness(Integer supportBusiness) {
        this.supportBusiness = supportBusiness;
    }

    public Integer getNeedAddr() {
        return needAddr;
    }

    public void setNeedAddr(Integer needAddr) {
        this.needAddr = needAddr;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(Integer delFlag) {
        this.delFlag = delFlag;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }


    @Override
    public String toString() {
        return JSON.toJSONString(this);
    }
}