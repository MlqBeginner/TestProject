package com.tree.ztreedemo.basedao;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class BaseDao extends SqlSessionDaoSupport implements IBaseDao {

    private final Logger log = LoggerFactory.getLogger(BaseDao.class);

    protected static final String POSTFIX_COUNT = ".count";
    protected static final String POSTFIX_SELECTONE = ".selectOne";
    protected static final String POSTFIX_INSERT = ".insert";
    protected static final String POSTFIX_INSERTLIST = ".insertList";
    protected static final String POSTFIX_UPDATE = ".update";
    protected static final String POSTFIX_UPDATE_BY_ENTITY = ".updateByEntity";
    protected static final String POSTFIX_DELETE = ".delete";
    protected static final String POSTFIX_SELECTLIST = ".selectList";
    protected static final String POSTFIX_SELECTLISTORDERBY = ".selectListOrderBy";

    public BaseDao() {
    }

    @Override
    public <T> Integer count(Object entity) {
        String className = entity.getClass().getName();
        return this.getSqlSession().selectOne(className + POSTFIX_COUNT, entity);
    }

    @Override
    public <T> Integer count(String statementPostfix, Object entity) {
        return this.getSqlSession().selectOne(statementPostfix, entity);
    }

    @Override
    public <T> Integer insert(Object entity) {
        String className = entity.getClass().getName();
        return this.getSqlSession().insert(className + POSTFIX_INSERT, entity);
    }

    @Override
    public <T> Integer insert(String statementPostfix, Object entity) {
        return this.getSqlSession().insert(statementPostfix, entity);
    }

    @Override
    public <T> T selectOne(Object entity) {
        String className = entity.getClass().getName();
        return this.getSqlSession().selectOne(className + POSTFIX_SELECTONE, entity);
    }

    @Override
    public <T> T selectOne(String statementPostfix, Object entity) {
        return this.getSqlSession().selectOne(statementPostfix, entity);
    }

    @Override
    public Integer update(Object entity) {
        String className = entity.getClass().getName();
        return this.getSqlSession().update(className + POSTFIX_UPDATE, entity);
    }

    @Override
    public Integer update(String statementPostfix, Object entity) {
        return this.getSqlSession().update(statementPostfix, entity);
    }

    @Override
    public <T> Integer delete(Object entity) {
        String className = entity.getClass().getName();
        return this.getSqlSession().delete(className + POSTFIX_DELETE, entity);
    }

    @Override
    public <T> Integer delete(String statementPostfix, Object entity) {
        return this.getSqlSession().delete(statementPostfix, entity);
    }

    @Override
    public <T> Integer deleteMultiple(String statementPostfix, Object entity) {
        return this.getSqlSession().delete(statementPostfix, entity);
    }

    @Override
    public <T> List<T> selectList(String statementPostfix) {
        return this.getSqlSession().selectList(statementPostfix);
    }

    @Override
    public <T> List<T> selectList(Object entity) {
        String className = entity.getClass().getName();
        return this.getSqlSession().selectList(className + POSTFIX_SELECTLIST, entity);
    }

    @Override
    public <T> List<T> selectList(String statementPostfix, Object entity) {
        return this.getSqlSession().selectList(statementPostfix, entity);
    }

    @Override
    public <T> List<T> selectList(T var1, String var2) {
        return null;
    }

    @Override
    public <T> List<T> selectList(String var1, Object var2, String var3) {
        return null;
    }

    @Override
    public <T> List<T> selectList(Object var1, int var2, int var3) {
        return null;
    }

    @Override
    public <T> List<T> selectList(String var1, Object var2, int var3, int var4) {
        return null;
    }

    @Override
    public <T> List<T> selectList(Object var1, int var2, int var3, String var4) {
        return null;
    }

    @Override
    public <T> List<T> selectList(String var1, Object var2, int var3, int var4, String var5) {
        return null;
    }

}