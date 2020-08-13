package com.ecej.cc.v1.demo;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


public class DateUtils {

    private final static long nd = 1000 * 24 * 60 * 60;// 一天的毫秒数
    private final static long nh = 1000 * 60 * 60;// 一小时的毫秒数
    private final static long nm = 1000 * 60;// 一分钟的毫秒数
    private final static long ns = 1000;// 一秒钟的毫秒数



    public final static String DEFAULT_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    public final static String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

    public final static String SHORT_TIME_FORMAT = "yyyy-MM-dd HH:mm";

    public final static String FULL_SEQ_FORMAT = "yyyyMMddHHmmssSSS";

    public final static String FULL_SEQ_FORMAT_MILLISECOND = "yyyyMMddHHmmss";

    public final static String[] MULTI_FORMAT = {"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm", "yyyy-MM"};

    public final static DateFormat DEFAULT_TIME_FORMATER = new SimpleDateFormat(DEFAULT_TIME_FORMAT);

    public final static DateFormat DEFAULT_DATE_FORMATER = new SimpleDateFormat(DEFAULT_DATE_FORMAT);

    public final static DateFormat SHORT_TIME_FORMATER = new SimpleDateFormat(SHORT_TIME_FORMAT);

    public final static String FORMAT_YYYY = "yyyy";

    public final static String FORMAT_YYYYMM = "yyyyMM";

    public final static String FORMAT_YYYYMMDD = "yyyyMMdd";

    public final static DateFormat FORMAT_YYYY_FORMATER = new SimpleDateFormat(FORMAT_YYYY);

    public final static DateFormat FORMAT_YYYYMM_FORMATER = new SimpleDateFormat(FORMAT_YYYYMM);

    public final static DateFormat FORMAT_YYYYMMDD_FORMATER = new SimpleDateFormat(FORMAT_YYYYMMDD);

    private final static Map<String, Integer> CALENDAR = new HashMap<String, Integer>() {{
        put("y", Calendar.YEAR);
        put("m", Calendar.MONTH);
        put("d", Calendar.DATE);
        put("h", Calendar.HOUR);
        put("n", Calendar.MINUTE);
        put("s", Calendar.SECOND);
        put("ms", Calendar.MILLISECOND);
    }};


    public static String formatDate(Date date) {
        if (date == null) {
            return "";
        }
        return DEFAULT_DATE_FORMATER.format(date);
    }

    public static String formatDate(Date date, String format) {
        if (date == null) {
            return null;
        }
        return new SimpleDateFormat(format).format(date);
    }

    public static Integer formatDateToInt(Date date, String format) {
        if (date == null) {
            return null;
        }
        return Integer.valueOf(new SimpleDateFormat(format).format(date));
    }

    public static String formatTime(Date date) {
        if (date == null) {
            return null;
        }
        return DEFAULT_TIME_FORMATER.format(date);
    }

    public static String formatShortTime(Date date) {
        if (date == null) {
            return null;
        }
        return SHORT_TIME_FORMATER.format(date);
    }


    public static Date parseDate(String date, DateFormat df) {
        if (date == null) {
            return null;
        }
        try {
            return df.parse(date);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    public static Date parseTime(String date, DateFormat df) {
        if (date == null) {
            return null;
        }
        try {
            return df.parse(date);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    public static Date parseDate(String date) {
        return parseDate(date, DEFAULT_DATE_FORMATER);
    }

    public static Date parseTime(String date) {
        return parseTime(date, DEFAULT_TIME_FORMATER);
    }


    public static String getHumanDisplayForTimediff(Long diffMillis) {
        if (diffMillis == null) {
            return "";
        }
        long day = diffMillis / (24 * 60 * 60 * 1000);
        long hour = (diffMillis / (60 * 60 * 1000) - day * 24);
        long min = ((diffMillis / (60 * 1000)) - day * 24 * 60 - hour * 60);
        long se = (diffMillis / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);
        StringBuilder sb = new StringBuilder();
        if (day > 0) {
            sb.append(day + "D");
        }
        DecimalFormat df = new DecimalFormat("00");
        sb.append(df.format(hour) + ":");
        sb.append(df.format(min) + ":");
        sb.append(df.format(se));
        return sb.toString();
    }


    public static Date parseMultiFormatDate(String date) {
        try {
            return org.apache.commons.lang3.time.DateUtils.parseDate(date, MULTI_FORMAT);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }


    /**
     * 日期 加减
     */
    public static Date DatePeration(Date date, String interval, Integer number, DateFormat format) {
        Date newDate = null;
        String temporaryDate = null;
        newDate = parseDate(format.format(date), format);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(newDate);
        calendar.add(CALENDAR.get(interval), number);
        newDate = calendar.getTime();
        return newDate;
    }

    /**
     * @param startTime 字符串 开始时间
     * @param endTime   字符串 结束时间
     * @param format    日期类型
     * @param str       返回格式
     * @author MaLQ
     * @Description: 计算两个时间差
     * @date 2020年3月23日16:43:43
     */
    public static Long dateDiff(String startTime, String endTime,
                                String format, String str) {
        SimpleDateFormat sd = new SimpleDateFormat(format);
        try {
            // 获得两个时间的毫秒时间差异
            long diff = sd.parse(endTime).getTime() - sd.parse(startTime).getTime();
            long day = diff / nd;// 计算差多少天
            long hour = diff % nd / nh + day * 24;// 计算差多少小时
            long min = diff % nd % nh / nm + day * 24 * 60;// 计算差多少分钟
            long sec = diff % nd % nh % nm / ns;// 计算差多少秒
            if (str.equalsIgnoreCase("d")) {
                return day;
            } else if (str.equalsIgnoreCase("h")) {
                return hour;
            } else if (str.equalsIgnoreCase("m")) {
                return min;
            } else if (str.equalsIgnoreCase("s")) {
                return sec;
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return 0L;
    }

    public static void main(String[] args) {
        //System.out.println(DatePeration(new Date(), "h", 3, DateUtils.DEFAULT_TIME_FORMATER));

        System.out.println(dateDiff("2020-03-16 00:00:00", "2020-03-23 00:00:00", "yyyy-MM-dd HH:mm:ss", "d"));
        System.out.println(dateDiff("2018-06-25 23:00:00", "2018-06-26 23:00:00", "yyyy-MM-dd HH:mm:ss", "d"));

    }


}
