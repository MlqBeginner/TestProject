package com.tree.ztreedemo.service;

import com.tree.ztreedemo.pojo.my.TbContentCategoryPo;
import com.tree.ztreedemo.pojo.my.TbContentCategoryVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TbContentCategoryService {

    /**
     * 查询单条记录
     *
     * @param categoryPo
     * @return
     */
    TbContentCategoryPo queryOne(TbContentCategoryPo categoryPo);

    /**
     * 查询多条记录
     *
     * @param categoryPo
     * @return
     */
    List<TbContentCategoryPo> queryList(TbContentCategoryPo categoryPo);

    List<TbContentCategoryVo> queryList(TbContentCategoryVo categoryVo);

    /**
     * 递归查询 一次性查询所有
     *
     * @param tbContentCategoryVo
     * @return
     */
    List<TbContentCategoryVo> recursion(TbContentCategoryVo tbContentCategoryVo);

    List<TbContentCategoryVo> recursionList(TbContentCategoryVo contentCategoryVo);

    /**
     * 树状结构组装
     *
     * @param pid
     * @return
     */
    String buildAreaTree(Long pid);

}
