package com.tree.ztreedemo.utils;

public class BaseUtils {

    public BaseUtils() {
    }

    public static <T> String makeClazzPath(T object, String methodName) {
        if (object == null) {
            return "";
        } else {
            StringBuffer buffer = new StringBuffer();
            buffer.append(object.getClass().getName());
            buffer.append(".");
            buffer.append(methodName);
            return buffer.toString();
        }
    }

    public static <T> String makeClazzPath(Class<T> clazz, String methodName) {
        StringBuffer buffer = new StringBuffer();
        buffer.append(clazz.getName());
        buffer.append(".");
        buffer.append(methodName);
        return buffer.toString();
    }

}
