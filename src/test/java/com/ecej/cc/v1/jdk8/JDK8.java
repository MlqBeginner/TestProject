package com.ecej.cc.v1.jdk8;

import com.google.common.collect.Lists;
import org.apache.commons.collections4.ListUtils;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class JDK8 {

    //按每3个一组分割
    private static final Integer MAX_NUMBER = 100;

    /**
     * 计算切分次数
     */
    private static Integer countStep(Integer size) {
        return (size + MAX_NUMBER - 1) / MAX_NUMBER;
    }


    //*****************************大数据量List分批处理切割  START ***********************************//
    // java8 Stream 大数据量List分批处理
    @Test
    public void cutting() {

        List<Integer> list = new ArrayList<>();
        for (int i = 0; i < 3000; i++) {
            list.add(i);
        }
        int limit = countStep(list.size());

        //方法一：使用流遍历操作
        List<List<Integer>> mglist = new ArrayList<>();
        Stream.iterate(0, n -> n + 1).limit(limit).forEach(i -> {
            mglist.add(list.stream().skip(i * MAX_NUMBER).limit(MAX_NUMBER).collect(Collectors.toList()));
        });

        System.out.println(mglist.size());

        //方法二：获取分割后的集合
        List<List<Integer>> splitList = Stream.iterate(0, n -> n + 1).limit(limit).parallel().map(a -> list.stream().skip(a * MAX_NUMBER).limit(MAX_NUMBER).parallel().collect(Collectors.toList())).collect(Collectors.toList());

        System.out.println(splitList.size());
    }

    /**
     * 使用google guava对List进行分割
     * 2000:表示一组
     */
    @Test
    public void cutting1() {

        List<Integer> intList = new ArrayList<>();
        for (int i = 0; i < 3000; i++) {
            intList.add(i);
        }
        List<List<Integer>> partition = Lists.partition(intList, 2000);
        System.out.println(partition.size());

    }

    /**
     * 使用apache common collection
     * 3：表示一组
     */
    @Test
    public void cutting2() {
        List<Integer> intList = Lists.newArrayList(1, 2, 3, 4, 5, 6, 7, 8);
        List<List<Integer>> subs = ListUtils.partition(intList, 3);
        System.out.println(subs.size());
    }

    /**
     * java 手写将一个List等分成n个list
     * 需要先分页 一共多少 、多少一页、可以分成几页
     */
    @Test
    public void cutting3() {
        List<Integer> list = new ArrayList<>();
        for (int i=0;i<116;i++){
            list.add(i);
        }
        int num = (list.size() % 10 == 0) ? list.size() - 1 : list.size();
        List<List<Integer>> lists = averageAssign(list, countStep(num));
        for (List<Integer> temp:lists){
            System.out.println(temp);
        }
    }

    public static <T> List<List<T>> averageAssign(List<T> source, int n) {
        List<List<T>> result = new ArrayList<>();
        //(先计算出余数)
        int remainder = source.size() % n;
        //然后是商
        int number = source.size() / n;
        //偏移量
        int offset = 0;
        for (int i = 0; i < n; i++) {
            List<T> value;
            if (remainder > 0) {
                value = source.subList(i * number + offset, (i + 1) * number + offset + 1);
                remainder--;
                offset++;
            } else {
                value = source.subList(i * number + offset, (i + 1) * number + offset);
            }
            result.add(value);
        }
        return result;
    }


//*****************************大数据量List分批处理切割  END ***********************************//


}
