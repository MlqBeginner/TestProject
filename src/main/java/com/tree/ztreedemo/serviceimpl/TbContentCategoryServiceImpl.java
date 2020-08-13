package com.tree.ztreedemo.serviceimpl;

import com.alibaba.fastjson.JSON;
import com.tree.ztreedemo.dao.ZTreeBaseDao;
import com.tree.ztreedemo.pojo.my.TbContentCategoryPo;
import com.tree.ztreedemo.pojo.my.TbContentCategoryVo;
import com.tree.ztreedemo.service.TbContentCategoryService;
import com.tree.ztreedemo.utils.BaseUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 树状结构
 */
@Service("tbContentCategoryService")
public class TbContentCategoryServiceImpl implements TbContentCategoryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TbContentCategoryServiceImpl.class);

    @Resource
    private ZTreeBaseDao zTreeBaseDao;


    @Override
    public TbContentCategoryPo queryOne(TbContentCategoryPo categoryPo) {
        try {
            LOGGER.info("service-查询组织结构入参：categoryPo={}", JSON.toJSONString(categoryPo));
            TbContentCategoryPo selectOne = zTreeBaseDao.selectOne(categoryPo);
            LOGGER.info("service-查询组织结构返回结果：selectOne={}", JSON.toJSONString(selectOne));
            return selectOne;
        } catch (Exception e) {
            LOGGER.error("service-查询组织结构异常：error={}" + e.getMessage(), e);
        }
        return new TbContentCategoryPo();
    }

    @Override
    public List<TbContentCategoryPo> queryList(TbContentCategoryPo categoryPo) {
        try {
            LOGGER.info("service-查询组织结构入参：categoryPo={}", JSON.toJSONString(categoryPo));
            List<TbContentCategoryPo> selectList = zTreeBaseDao.selectList(categoryPo);
            LOGGER.info("service-查询组织结构返回结果：selectList={}", JSON.toJSONString(selectList));
            return selectList;
        } catch (Exception e) {
            LOGGER.error("service-查询组织结构异常：error={}" + e.getMessage(), e);
        }
        return new ArrayList<TbContentCategoryPo>();
    }

    @Override
    public List<TbContentCategoryVo> queryList(TbContentCategoryVo categoryVo) {
        try {
            LOGGER.info("service-查询组织结构入参：categoryVo={}", JSON.toJSONString(categoryVo));
            List<TbContentCategoryVo> selectList = zTreeBaseDao.selectList(BaseUtils.makeClazzPath(TbContentCategoryPo.class, "recursionList"), categoryVo);
            LOGGER.info("service-查询组织结构返回结果：selectList={}", JSON.toJSONString(selectList));
            return selectList;
        } catch (Exception e) {
            LOGGER.error("service-查询组织结构异常：error={}" + e.getMessage(), e);
        }
        return new ArrayList<TbContentCategoryVo>();

    }

    @Override
    public List<TbContentCategoryVo> recursion(TbContentCategoryVo tbContentCategoryVo) {
        try {
            LOGGER.info("service-查询入参：tbContentCategoryVo={}", JSON.toJSONString(tbContentCategoryVo));
            List<TbContentCategoryVo> selectList = zTreeBaseDao.selectList(BaseUtils.makeClazzPath(TbContentCategoryPo.class, "recursionList"), tbContentCategoryVo);
            LOGGER.info("service-查询返回参数：selectList={}", JSON.toJSONString(selectList));
            return selectList;
        } catch (Exception e) {
            LOGGER.error("service-递归查询异常：error={}" + e.getMessage(), e);
        }
        return null;
    }

    @Override
    public List<TbContentCategoryVo> recursionList(TbContentCategoryVo contentCategoryVo) {
        try {
            LOGGER.info("递归查询入参：contentCategoryVo={}", JSON.toJSONString(contentCategoryVo));
            List<TbContentCategoryVo> recursion = this.recursion(contentCategoryVo);
            List<TbContentCategoryVo> loop = loop(recursion);
            LOGGER.info("递归查询返回结果：loop={}", JSON.toJSONString(loop));
            return loop;
        } catch (Exception e) {
            LOGGER.error("service-递归查询异常：error={}" + e.getMessage(), e);
        }
        return null;
    }

    private TbContentCategoryVo vo = new TbContentCategoryVo();

    private List<TbContentCategoryVo> loop(List<TbContentCategoryVo> list) {
        if (!ObjectUtils.isEmpty(list)) {
            for (TbContentCategoryVo categoryVo : list) {
                vo.setParentId(categoryVo.getId());
                List<TbContentCategoryVo> recursion = this.recursion(vo);
                if (!ObjectUtils.isEmpty(recursion)) {
                    categoryVo.setChildren(recursion);
                }
                loop(categoryVo.getChildren());
            }
        }
        return list;
    }

    @Override
    public String buildAreaTree(Long pid) {
        try {
            LOGGER.info("service-树状结构组装入参：pid={}", pid);
            pid = (!ObjectUtils.isEmpty(pid)) ? pid : 0;
            StringBuilder treeBuilder = new StringBuilder("[");
            loadTree(treeBuilder, pid, pid == 0 ? true : false);
            // 如果没有拼接的数据则不需要 -1 截取了  直接闭合
            if (!treeBuilder.toString().equals("[")) {
                treeBuilder.deleteCharAt(treeBuilder.length() - 1);
            }
            treeBuilder.append("]");
            return treeBuilder.toString();
        } catch (Exception e) {
            LOGGER.error("service-树状结构组装异常：error={}" + e.getMessage(), e);
        }
        return "[]";
    }

    /***
     * 根据父id遍历目录树
     * @param builder 拼接字符串
     * @param pid 父id
     * @param level
     */
    private void loadTree(StringBuilder builder, Long pid, boolean level) {
        TbContentCategoryPo category = new TbContentCategoryPo();
        category.setParentId(pid);
        if (level) {
            TbContentCategoryPo tbContentCategory = this.queryOne(category);
            if (!ObjectUtils.isEmpty(tbContentCategory)) {
                builder.append("{").append("id:").append(tbContentCategory.getId()).append(",pId:").append(tbContentCategory.getParentId()).append(",name:\"").append(tbContentCategory.getName()).append("\",").append("open:true");
                builder.append(",nocheck:true");
                builder.append("},");
            }
            category.setParentId(tbContentCategory.getId());
        }
        List<TbContentCategoryPo> tbContentCategories = this.queryList(category);
        if (!ObjectUtils.isEmpty(tbContentCategories)) {
            for (TbContentCategoryPo item : tbContentCategories) {
                builder.append("{").append("id:").append(item.getId()).append(",pId:").append(item.getParentId()).append(",name:\"").append(item.getName()).append("\",").append("nocheck:true");
                // 是父节点就展开吗？根据条件判断
                if (item.getIsParent()) {
                    builder.append(",open:true");
                } else {
                    builder.append(",open:false");
                }
                builder.append((item.getIsParent()) ? ",isParent:true" : ",isParent:false").append("},");

                //本行coding为 是否递归查询本节点所有子节点
                loadTree(builder, item.getId(), false);
            }
        }
    }

}
