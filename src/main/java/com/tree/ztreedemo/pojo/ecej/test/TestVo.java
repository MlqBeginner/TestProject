package com.tree.ztreedemo.pojo.ecej.test;

import java.io.Serializable;
import java.util.List;

public class TestVo implements Serializable {

    private List<Integer> enterpriseIds;

    public List<Integer> getEnterpriseIds() {
        return enterpriseIds;
    }

    public void setEnterpriseIds(List<Integer> enterpriseIds) {
        this.enterpriseIds = enterpriseIds;
    }
}
