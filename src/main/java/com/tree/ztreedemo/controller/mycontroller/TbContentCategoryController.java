package com.tree.ztreedemo.controller.mycontroller;

import com.tree.ztreedemo.pojo.my.TbContentCategoryVo;
import com.tree.ztreedemo.service.TbContentCategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.List;
import java.util.regex.Pattern;

/**
 * 树状结构控制器
 */
@RestController
@RequestMapping("/my/zTree/")
public class TbContentCategoryController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TbContentCategoryController.class);

    @Resource
    private TbContentCategoryService tbContentCategoryService;

    @RequestMapping("pageOne")
    public ModelAndView pageOne() {
        ModelAndView view = new ModelAndView("ztree_page/pageOne");
        return view;
    }

    /**
     * 方式一
     *
     * @param pid
     * @return
     */
    @RequestMapping("buildAreaTree")
    public String buildAreaTree(@RequestParam(value = "id", defaultValue = "", required = false) Long pid) {
        LOGGER.info("查询树桩结构入参：pid={}", pid);
        String areaTree = tbContentCategoryService.buildAreaTree(pid);
        LOGGER.info("查询树桩结构返回结果：areaTree={}", areaTree);
        return areaTree;
    }

    /**
     * 方式二 递归一次性查询
     *
     * @param pid
     * @return
     */
    @RequestMapping("recursionList")
    @ResponseBody
    public Object recursionList(@RequestParam(value = "id", defaultValue = "", required = false) Long pid) {
        pid = ObjectUtils.isEmpty(pid) ? 0 : pid;
        TbContentCategoryVo categoryVo = new TbContentCategoryVo();
        categoryVo.setParentId(pid);
        LOGGER.info("递归查询入参：pid={}", pid);
        List<TbContentCategoryVo> tbContentCategoryVos = tbContentCategoryService.recursionList(categoryVo);
        LOGGER.info("递归查询返回结果：tbContentCategoryVos={}", tbContentCategoryVos);
        return tbContentCategoryVos;
    }

    /**
     * 方式三 直接查询所有 （极度不推荐 可控性低）看自己需求来选
     *
     * @param pid
     * @return
     */
    @RequestMapping("selectList")
    @ResponseBody
    public Object selectList(@RequestParam(value = "id", defaultValue = "", required = false) Long pid) {
        pid = ObjectUtils.isEmpty(pid) ? 0 : pid;
        TbContentCategoryVo categoryVo = new TbContentCategoryVo();
        categoryVo.setParentId(pid);
        LOGGER.info("查询所有入参：pid={}", pid);
        List<TbContentCategoryVo> tbContentCategoryVos = tbContentCategoryService.queryList(categoryVo);
        LOGGER.info("查询所有返回结果：tbContentCategoryVos={}", tbContentCategoryVos);
        return tbContentCategoryVos;
    }

    public static void main(String[] args) {

        boolean matches = Pattern.compile("^\\d{8}$").matcher("22222222").matches();
        boolean b = "bigData".compareTo("bigData") != 0;
        System.out.println("bb="+b);
        System.out.println(matches);

    }


}
