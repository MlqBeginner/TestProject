package com.ecej.cc.v1.yzh;

import com.alibaba.fastjson.JSON;
import com.tree.ztreedemo.utils.HttpClientUtil;
import org.junit.Test;
import com.tree.ztreedemo.utils.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.util.ObjectUtils;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.*;

public class CloudHe {

    List<Integer> list = new ArrayList<>();

    @Test
    public void demo() {
        List<String> list = new ArrayList<String>() {{
            add("timestamp=789&");
            add("appId=123&");
            add("nonce=456&");
        }};
        String[] strings = list.toArray(new String[list.size()]);
        System.out.printf("==111===" + JSON.toJSONString(strings));
        Arrays.sort(strings, String.CASE_INSENSITIVE_ORDER);
        System.out.printf("==22===" + JSON.toJSONString(strings));
    }

    @Test
    public void demo1() {

        double doubleValue = new BigDecimal((169.54 / 3)).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
        System.out.println(169.54 / 3);
        System.out.println(doubleValue);

    }


    @Test
    public void sishe() {

        String num = "36.56";
        Double num1 = 36.46;
        Float num2 = 36.56F;

        System.out.println(bigDecimal(num, 1, Double.class));
        System.out.println(bigDecimal(num1, 0, Integer.class));
        System.out.println(bigDecimal(num2, 1, Float.class));

        DecimalFormat df = new DecimalFormat("0"); // 格式化number String字符

        System.out.println(df.format(num1));


        System.out.println(new BigDecimal(num1).setScale(0, BigDecimal.ROUND_HALF_UP).intValue());

    }

    /**
     * 四舍五入
     *
     * @param data 要转换的数据
     * @param num  保留的位数
     * @param cla  要转换的类型
     * @return
     */
    public static Object bigDecimal(Object data, Integer num, Class cla) {

        if (Double.class.equals(cla) && data instanceof Double) {
            return new BigDecimal((Double) data).setScale(num, BigDecimal.ROUND_HALF_UP).doubleValue();
        } else if (Integer.class.equals(cla) && data instanceof Integer) {
            return (Integer) new BigDecimal((Integer) data).setScale(0, BigDecimal.ROUND_HALF_UP).intValue();
        } else if (Float.class.equals(cla) && data instanceof Float) {
            return (Float) new BigDecimal((Float) data).setScale(num, BigDecimal.ROUND_HALF_UP).floatValue();
        }

        return 0;
    }

    @Test
    public void demo11() {
        String html = "<figure class=\"image\"><img src=\"https://img.yunzhonghe.com/image/1588069166129PZqYrMBEBV.jpg\"></figure><figure class=\"image\"><img src=\"https://img.yunzhonghe.com/image/1588069166259naMzwkJvVY.jpg\"></figure><figure class=\"image\"><img src=\"https://img.yunzhonghe.com/image/1588069166286rJXpSsgCvu.jpg\"></figure><figure class=\"image\"><img src=\"https://img.yunzhonghe.com/image/1588069166302IAcvANtLdS.jpg\"></figure><figure class=\"image\"><img src=\"https://img.yunzhonghe.com/image/1588069166614PlRkKzZlZf.jpg\"></figure>";

        String html2 = "<p><img src='https://static.yzhlink.cn/8967532589126599437.jpg'></p><p><img src='https://static.yzhlink.cn/905418715307658538.jpg'></p><p><img src='https://static.yzhlink.cn/3124890442156520670.jpg'></p><p><img src='https://static.yzhlink.cn/1687731061502099380.jpg'></p><p><img src='https://static.yzhlink.cn/686396877505345071.jpg'></p>";


        List<String> match = StringUtils.match(html, "img", "src");

        List<String> imgStr = StringUtils.getImgStr(html2);

        for (String item : imgStr) {
            System.out.println(item);
        }

        System.out.println("---------------------------------");

        for (String item : match
                ) {
            System.out.println(item);
        }

    }

    @Test
    public void paqu() throws Exception {

        // 旧数据
        List<Integer> listA = new ArrayList<Integer>() {{
            add(2);
            add(3);
            add(4);
            add(5);
        }};
        // 新数据
        List<Integer> listB = new ArrayList<Integer>() {{
            add(2);
            add(3);
            add(4);
        }};

        // 计算需要新增的  和 需要删除的

        // 新增的
        listB.removeAll(listA);
        System.out.println(listB);

        // 需要删除的
//        listA.removeAll(listB);
//        System.out.println(listA);
    }

    @Test
    public void asd() {

        cccc("2");

    }
    public void cccc(String... c){
        System.out.println(ObjectUtils.isEmpty(c));
    }

}


class a {
    private String c = "11";

    public String getC() {
        return c;
    }

    public void setC(String c) {
        this.c = c;
    }
}

class b {
    private String c = "52";

    public String getC() {
        return c;
    }

    public void setC(String c) {
        this.c = c;
    }
}