package com.tree.ztreedemo.pojo.my;

import java.util.List;

public class TbContentCategoryVo extends TbContentCategoryPo {

    private Long pid;

    private List<TbContentCategoryVo> children;

    public List<TbContentCategoryVo> getChildren() {
        return children;
    }

    public void setChildren(List<TbContentCategoryVo> children) {
        this.children = children;
    }

    public Long getPid() {
        return super.getParentId();
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }
}
