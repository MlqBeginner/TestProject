package com.tree.ztreedemo.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CookieUtil {

    public static final String USER_INFORMATION_NAME = "user_information_name";

    /**
     * @param request
     * @param name
     * @return String
     * @Description: 根据名称去cookie值
     */
    public static String getCookieValueByName(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null || cookies.length == 0) {
            return "";
        }
        for (Cookie cookie : cookies) {
            if (cookie.getName().equalsIgnoreCase(name)) {
                try {
                    byte[] asBytes = Base64.getDecoder().decode(URLDecoder.decode(cookie.getValue(), "UTF-8"));
                    return new String(asBytes, "utf-8");
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
            }
        }
        return "";
    }

    /**
     * 设置cookie 先base64转码然后URLEncode
     *
     * @param response
     * @param name     cookie名字
     * @param value    cookie值
     * @param maxAge   cookie生命周期 以秒为单位
     */
    public static void addCookie(HttpServletResponse response, String name, String value, Integer maxAge) {
        Cookie cookie = null;
        try {
            cookie = new Cookie(name, URLEncoder.encode(Base64.getEncoder().encodeToString(value.getBytes()), "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        cookie.setPath("/");
        if (maxAge > 0) {
            cookie.setMaxAge(maxAge);
        }
        response.addCookie(cookie);
    }

    /**
     * 根据名字获取cookie
     *
     * @param request
     * @param name    cookie名字
     * @return
     */
    public static Cookie getCookieByName(HttpServletRequest request, String name) {
        Map<String, Cookie> cookieMap = ReadCookieMap(request);
        if (cookieMap.containsKey(name)) {
            Cookie cookie = cookieMap.get(name);
            return cookie;
        } else {
            return null;
        }
    }

    /**
     * 将cookie封装到Map里面
     *
     * @param request
     * @return
     */
    private static Map<String, Cookie> ReadCookieMap(HttpServletRequest request) {
        Map<String, Cookie> cookieMap = new HashMap<String, Cookie>();
        Cookie[] cookies = request.getCookies();
        if (null != cookies) {
            for (Cookie cookie : cookies) {
                cookieMap.put(cookie.getName(), cookie);
            }
        }
        return cookieMap;
    }

    /**
     * @param response
     * @return
     * @Description: 删除cookie
     */
    public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, List<String> list) {
        Cookie[] cookies = request.getCookies();
        if (null != cookies) {
            for (Cookie cookie : cookies) {
                if (list.contains(cookie.getName())) {
                    cookie.setValue(null);
                    cookie.setMaxAge(0);
                    cookie.setPath("/");
                    response.addCookie(cookie);
                }
            }
        }
    }
}
