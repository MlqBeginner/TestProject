package com.tree.ztreedemo.basedao;

import java.util.List;

public interface IBaseDao {

    <T> Integer count(Object entity);

    <T> Integer count(String statementPostfix, Object entity);

    <T> Integer insert(Object entity);

    <T> Integer insert(String statementPostfix, Object entity);

    <T> T selectOne(Object entity);

    <T> T selectOne(String statementPostfix, Object entity);

    Integer update(Object entity);

    Integer update(String statementPostfix, Object entity);

    <T> Integer delete(Object entity);

    <T> Integer delete(String statementPostfix, Object entity);

    <T> Integer deleteMultiple(String statementPostfix, Object entity);

    <T> List<T> selectList(String var1);

    <T> List<T> selectList(Object var1);

    <T> List<T> selectList(String var1, Object var2);

    <T> List<T> selectList(T var1, String var2);

    <T> List<T> selectList(String var1, Object var2, String var3);

    <T> List<T> selectList(Object var1, int var2, int var3);

    <T> List<T> selectList(String var1, Object var2, int var3, int var4);

    <T> List<T> selectList(Object var1, int var2, int var3, String var4);

    <T> List<T> selectList(String var1, Object var2, int var3, int var4, String var5);

}
