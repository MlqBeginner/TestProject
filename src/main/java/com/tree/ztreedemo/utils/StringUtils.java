package com.tree.ztreedemo.utils;

import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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

    /**
     * 获取指定HTML标签的指定属性的值
     *
     * @param source  要匹配的源文本
     * @param element 标签名称
     * @param attr    标签的属性名称
     * @return 属性值列表
     */
    public static List<String> match(String source, String element, String attr) {
        List<String> result = new ArrayList<String>();
        String reg = "<" + element + "[^<>]*?\\s" + attr + "=['\"]?(.*?)['\"]?\\s.*?>";
        Matcher m = Pattern.compile(reg).matcher(source);
        while (m.find()) {
            String r = m.group(1);
            result.add(r);
        }
        return result;
    }

    /**
     * 得到网页中图片的地址
     */
    public static List<String> getImgStr(String htmlStr) {
        List<String> pics = new ArrayList<>();
        String img = "";
        Pattern p_image;
        Matcher m_image;
        //     String regEx_img = "<img.*src=(.*?)[^>]*?>"; //图片链接地址
        String regEx_img = "<img.*src\\s*=\\s*(.*?)[^>]*?>";
        p_image = Pattern.compile(regEx_img, Pattern.CASE_INSENSITIVE);
        m_image = p_image.matcher(htmlStr);
        while (m_image.find()) {
            // 得到<img />数据
            img = m_image.group();
            // 匹配<img>中的src数据
            Matcher m = Pattern.compile("src\\s*=\\s*\"?(.*?)(\"|>|\\s+)").matcher(img);
            while (m.find()) {
                pics.add(m.group(1));
            }
        }
        return pics;
    }


}
