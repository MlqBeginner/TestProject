package com.tree.ztreedemo.controller.requestcontroller;

import com.alibaba.fastjson.JSON;
import com.tree.ztreedemo.pojo.ecej.test.TestVo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author MLQ
 * @Description: 请求接收参数测试控制器
 * @date 2020年3月18日11:08:07
 */
@RestController
@RequestMapping("/request/param/")
public class requestController {

    @RequestMapping("/requestParam")
    public ModelAndView demo01() {
        ModelAndView view = new ModelAndView("request_page/requestParam");
        return view;
    }

    @RequestMapping("/send")
    public String show01(TestVo testVo) {
        System.out.println(JSON.toJSONString(testVo));
        return "OK";

    }


}
