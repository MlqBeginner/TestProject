package com.tree.ztreedemo.pojo.my;

import com.alibaba.fastjson.JSON;

import java.io.Serializable;
import java.util.Date;


/**
 * @author dell
 * @Description: tb_content_category
 * @date 2020年02月27日
 */
public class TbContentCategoryPo implements Serializable {

    private static final long serialVersionUID = 1L;

    public static final String TABLE_ALIAS = "TbContentCategory";

    /**
     * 类目ID    db_column:id
     */
    private Long id;
    /**
     * 父类目ID=0时，代表的是一级的类目    db_column:parent_id
     */
    private Long parentId;
    /**
     * 分类名称    db_column:name
     */
    private String name;
    /**
     * 状态。可选值:1(正常),2(删除)    db_column:status
     */
    private Integer status;
    /**
     * 排列序号，表示同级类目的展现次序，如数值相等则按名称次序排列。取值范围:大于零的整数    db_column:sort_order
     */
    private Integer sortOrder;
    /**
     * 该类目是否为父类目，1为true，0为false    db_column:is_parent
     */
    private Boolean isParent;
    /**
     * 创建时间    db_column:created
     */
    private Date created;
    /**
     * 创建时间    db_column:updated
     */
    private Date updated;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    public Boolean getIsParent() {
        return isParent;
    }

    public void setIsParent(Boolean isParent) {
        this.isParent = isParent;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }


    @Override
    public String toString() {
        return JSON.toJSONString(this);
    }
}