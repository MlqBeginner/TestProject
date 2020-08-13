package com.tree.ztreedemo.controller.TestController;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1/test/")
public class TestController {

    private static Logger LOGGER = LoggerFactory.getLogger(TestController.class);

    @RequestMapping("cat")
    public ModelAndView cat() {
        ModelAndView view = new ModelAndView("ecej/bill_city_category");
        view.addObject("type", 1);
        return view;
    }

    @RequestMapping("bill_question_detail_update")
    public ModelAndView bill_question_detail_update() {
        ModelAndView view = new ModelAndView("ecej/bill_question_detail_update");
        return view;
    }

    @RequestMapping("phone")
    public ModelAndView phone() {
        ModelAndView view = new ModelAndView("ecej/phone");
        return view;
    }

    @RequestMapping("select")
    public ModelAndView select() {
        ModelAndView view = new ModelAndView("ecej/multipleSelect");
        return view;
    }

    @RequestMapping("list")
    public Object list() {

        Map<String, Object> map = new HashMap<>();

        /*map.put("rows", JSONArray.parseArray(" [{\"id\": 101, \"name\": \"最简单的树 --  标准 JSON 数据\",\"sort\": 1}," +
                "{\"id\": 102, \"name\": \"最简单的树 --  简单 JSON 数据\",\"sort\": 2}," +
                "{\"id\": 103, \"name\": \"不显示 连接线\",\"sort\": 3}" +
                "{\"id\": 501, \"name\": \"冻结根节点\",\"sort\": 4}" +
                "]"));*/

        map.put("rows", JSONArray.parseArray("[]"));

        map.put("total", 4);
        map.put("total", 5);
        map.put("total", 6);
        return map;

    }

















}
