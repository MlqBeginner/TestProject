package com.ecej.cc.v1.demo;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import org.junit.Test;
import org.springframework.util.ObjectUtils;

import java.util.*;

public class TestMain {

    @Test
    public void demo() {
        System.out.println(33);
        System.out.println(33);
        System.out.println(33);
        System.out.println(33);
        System.out.println(33);
        System.out.println(33);
        System.out.println(33);
        System.out.println(33);
        System.out.println(33);
        System.out.println(33);

        System.out.println(11);
        System.out.println(22);
        System.out.println(33);
        System.out.println(44);
        System.out.println(55);
//chaixizhongceshi22222222222
        //chaixizhongceshi22222222222
               //chaixizhongceshi22222222222
        System.out.println(22);
    }

    @Test
    public void demo1() {
        JSONArray jsonArray = new JSONArray();
        jsonArray.addAll(new ArrayList<>());
    }

    // 获取XML字符串中的数据
    @Test
    public void demoXml() {

        String xml = "<Output xmlns=\"nice.uniform://\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><Data xmlns:a=\"http://schemas.microsoft.com/2003/10/Serialization/Arrays\"><a:long>6805043233049096381</a:long></Data><Result xmlns:a=\"http://nice.uniform/CallDiscovery2\"><a:ResultCode>CallDiscovery_OK</a:ResultCode><a:ResultMessage>OK</a:ResultMessage></Result><Exception i:nil=\"true\" xmlns:a=\"http://schemas.datacontract.org/2004/07/System\"/></Output>";

        System.out.println("a:long={}" + StringUtils.getTotalMidValue(xml, "<a:long>", "</a:long>"));

        System.out.println("a:long={}" + StringUtils.getFieldListByRegex(xml, "a:long"));
    }

    @Test
    public void riqi() {
        try {
            StringBuilder builder = new StringBuilder();
            builder.append("http://10.128.29.115:8002/REST/Discovery/Periodic/PBXUniversalCallInteractionID");
            builder.append("?PBXUniversalCallInteractionID=" + "200312001");// 话务ID
            String formatTime = "2020-03-27 16:24:21";
            formatTime = formatTime.replaceAll("-", ".");
            formatTime = formatTime.replaceAll(" ", "%20");
            builder.append("&TimeOfInteration=" + formatTime);// 更新时间

            String doGet = HttpClientUtil.doGet(builder.toString());
            List<String> listByRegex = StringUtils.getFieldListByRegex(doGet, "a:long");
            System.out.println("listByRegex={}"+ JSON.toJSONString(listByRegex));
            if (!ObjectUtils.isEmpty(listByRegex)){
                System.out.println("------" + listByRegex.get(0));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
