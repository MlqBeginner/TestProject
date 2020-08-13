
package com.tree.ztreedemo.pojo.ecej;

import java.io.Serializable;
import java.util.List;

public class CcBillTargetPo implements Serializable {
    private static final long serialVersionUID = 1L;
    //alias
    public static final String TABLE_ALIAS = "CcBillTarget";

    //columns START
    /**
     * id       db_column: bill_target_id
     */
    private Integer billTargetId;
    /**
     * 类型       db_column: type
     */
    private Integer type;
    /**
     * 父id       db_column: pid
     */
    private Integer pid;
    /**
     * 名称       db_column: name
     */
    private String name;
    /**
     * 英文名称       db_column: enname
     */
    private String enname;
    /**
     * 状态( -1 表示无效，1 表示有效）       db_column: state
     */
    private Integer state;
    /**
     * 层级       db_column: level
     */
    private Integer level;
    /**
     * 排序       db_column: sort
     */
    private Integer sort;
    /**
     * 企业代码       db_column: enterprise_code
     */
    private String enterpriseCode;
    /**
     * 城市代码       db_column: city_code
     */
    private String cityCode;
    /**
     * 删除标志：0：未删除，1：已删除       db_column: del_flag
     */
    private Integer delFlag;
    /**
     * 创建时间       db_column: create_time
     */
    private java.util.Date createTime;
    /**
     * 更新时间       db_column: update_time
     */
    private java.util.Date updateTime;
    //columns END

    /**
     * 子节点
     *
     * @return
     */
    private List<CcBillTargetPo> childrens;

    public List<CcBillTargetPo> getChildrens() {
        return childrens;
    }

    public void setChildrens(List<CcBillTargetPo> childrens) {
        this.childrens = childrens;
    }

    public Integer getBillTargetId() {
        return this.billTargetId;
    }

    public void setBillTargetId(Integer value) {
        this.billTargetId = value;
    }


    public Integer getType() {
        return this.type;
    }

    public void setType(Integer value) {
        this.type = value;
    }


    public Integer getPid() {
        return this.pid;
    }

    public void setPid(Integer value) {
        this.pid = value;
    }


    public String getName() {
        return this.name;
    }

    public void setName(String value) {
        this.name = value;
    }


    public String getEnname() {
        return this.enname;
    }

    public void setEnname(String value) {
        this.enname = value;
    }


    public Integer getState() {
        return this.state;
    }

    public void setState(Integer value) {
        this.state = value;
    }


    public Integer getLevel() {
        return this.level;
    }

    public void setLevel(Integer value) {
        this.level = value;
    }


    public Integer getSort() {
        return this.sort;
    }

    public void setSort(Integer value) {
        this.sort = value;
    }


    public String getEnterpriseCode() {
        return this.enterpriseCode;
    }

    public void setEnterpriseCode(String value) {
        this.enterpriseCode = value;
    }


    public String getCityCode() {
        return this.cityCode;
    }

    public void setCityCode(String value) {
        this.cityCode = value;
    }


    public Integer getDelFlag() {
        return this.delFlag;
    }

    public void setDelFlag(Integer value) {
        this.delFlag = value;
    }


    public java.util.Date getCreateTime() {
        return this.createTime;
    }

    public void setCreateTime(java.util.Date value) {
        this.createTime = value;
    }


    public java.util.Date getUpdateTime() {
        return this.updateTime;
    }

    public void setUpdateTime(java.util.Date value) {
        this.updateTime = value;
    }


}

