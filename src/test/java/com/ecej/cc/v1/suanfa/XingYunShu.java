package com.ecej.cc.v1.suanfa;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

public class XingYunShu {

    List<Integer> list = new ArrayList<>();

    @Test
    public void demo() {
        long startTime = System.currentTimeMillis();
        // 100 以内的幸运数
        for (int i = 0; i < 100; i++) {
            boolean flag = isLuckyNumber(i);
            System.out.println("是否为幸运数：{" + i + "}=" + flag);
        }
        long endTime = System.currentTimeMillis();
        System.out.println("程序运行时间：" + (endTime - startTime) + "ms");
        System.out.println(22);
        System.out.println(55);
    }

    // 判断是否为幸运数
    public boolean isLuckyNumber(Integer num) {
        List<Integer> integerList = splitNum(num);
        Integer count = 0;
        for (Integer l : integerList) {
            count += l * l;
        }
        if (count == 1) {
            return true;
        }
        if (list.contains(count)) {
            return false;
        }
        list.add(count);
        return isLuckyNumber(count);
    }
    // 把一个整数拆分为单个数值
    public List<Integer> splitNum(Integer num) {
        List<Integer> list = new ArrayList<Integer>();
        int length = (num + "").length();
        for (int i = length - 1; i >= 0; i--) {
            list.add(num % 10);
            num /= 10;
        }
        return list;
    }

}
