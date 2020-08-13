package com.tree.ztreedemo.dao;

import com.tree.ztreedemo.basedao.BaseDao;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

@Repository
public class ZTreeBaseDao extends BaseDao {

    @Resource(name = "zTreeSqlSessionFactory")
    public void setZTreeSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
        super.setSqlSessionFactory(sqlSessionFactory);
    }
}
