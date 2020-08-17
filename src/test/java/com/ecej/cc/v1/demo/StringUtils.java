package com.ecej.cc.v1.demo;

import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtils {



    /**
     * 获取指定标签中的内容
     *
     * @param xml   传入的xml字符串
     * @param label 指定的标签
     */
    public static List<String> getFieldListByRegex(String xml, String label) {
        //正则表达式
        String regex = "<" + label + ">(.*?)</" + label + ">";
        Pattern pattern = Pattern.compile(regex);
        Matcher m = pattern.matcher(xml);
        //匹配的有多个
        List<String> fieldList = new ArrayList<>();
        while (m.find()) {
            if (!ObjectUtils.isEmpty(m.group(1).trim())) {
                fieldList.add(m.group(1).trim());
            }
        }

//chaixizhongceshi22222222222

        return fieldList;
    }

    public static String getTotalMidValue(String source, String priStr, String suxStr) {
        if (source == null)
            return null;
        int iFirst = source.indexOf(priStr);
        int iLast = source.lastIndexOf(suxStr);
        if (iFirst < 0 || iLast < 0)
            return null;
        int beginIndex = iFirst + priStr.length();
        return source.substring(beginIndex, iLast);
    }









}
