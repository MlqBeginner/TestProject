package com.tree.ztreedemo.controller.cookiecontroller;

import com.alibaba.fastjson.JSON;
import com.tree.ztreedemo.utils.CookieUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/cookie/")
public class CookieController {


    @RequestMapping("page")
    public ModelAndView page() {
        return new ModelAndView("cookie/cookiePage");
    }

    @RequestMapping("add")
    public String add(HttpServletResponse response) {
        CookieUtil.addCookie(response, "string", "string", 0);
        Map<String, String> map = new HashMap<String, String>() {{
            put("a", "a");
        }};
        CookieUtil.addCookie(response, "map", JSON.toJSONString(map), 0);
        return "OK";
    }


}
