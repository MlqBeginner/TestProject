package com.ecej.cc.v1.javaapi;

import com.alibaba.fastjson.JSON;

import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.io.*;
import java.util.Iterator;
import javax.imageio.ImageIO;
import javax.imageio.ImageReadParam;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;

public class ImageUtils {

    // 方案A
    public static void cutJPG(InputStream input, OutputStream out, int x,
                              int y, int width, int height) throws IOException {
        ImageInputStream imageStream = null;
        try {
            Iterator<ImageReader> readers = ImageIO.getImageReadersByFormatName("jpg");
            ImageReader reader = readers.next();
            imageStream = ImageIO.createImageInputStream(input);
            reader.setInput(imageStream, true);
            ImageReadParam param = reader.getDefaultReadParam();

            System.out.println(reader.getWidth(0));
            System.out.println(reader.getHeight(0));
            Rectangle rect = new Rectangle(x, y, width, height);
            param.setSourceRegion(rect);
            BufferedImage bi = reader.read(0, param);
            ImageIO.write(bi, "jpg", out);
        } finally {
            imageStream.close();
        }
    }


    public static void cutPNG(InputStream input, OutputStream out, int x,
                              int y, int width, int height) throws IOException {
        ImageInputStream imageStream = null;
        try {
            Iterator<ImageReader> readers = ImageIO.getImageReadersByFormatName("png");
            ImageReader reader = readers.next();
            imageStream = ImageIO.createImageInputStream(input);
            reader.setInput(imageStream, true);
            ImageReadParam param = reader.getDefaultReadParam();

            System.out.println(reader.getWidth(0));
            System.out.println(reader.getHeight(0));

            Rectangle rect = new Rectangle(x, y, width, height);
            param.setSourceRegion(rect);
            BufferedImage bi = reader.read(0, param);
            ImageIO.write(bi, "png", out);
        } finally {
            imageStream.close();
        }
    }

    public static void cutImage(InputStream input, OutputStream out, String type, int x,
                                int y, int width, int height) throws IOException {
        ImageInputStream imageStream = null;
        try {
            String imageType = (null == type || "".equals(type)) ? "jpg" : type;
            Iterator<ImageReader> readers = ImageIO.getImageReadersByFormatName(imageType);
            ImageReader reader = readers.next();
            imageStream = ImageIO.createImageInputStream(input);
            reader.setInput(imageStream, true);
            ImageReadParam param = reader.getDefaultReadParam();
            Rectangle rect = new Rectangle(x, y, width, height);
            param.setSourceRegion(rect);
            BufferedImage bi = reader.read(0, param);
            ImageIO.write(bi, imageType, out);
        } finally {
            imageStream.close();
        }
    }

    // 方案B

    public static void FA() throws Exception {
        String inputPath = "E:\\MaLQ-TestProject\\MaLQ-TestProject-Trunk\\MaLQ-TestProject\\libs\\ccc.jpg";
        String outPath = "E:\\MaLQ-TestProject\\test.jpg";
        FileInputStream inputStream = new FileInputStream(inputPath);
        BufferedImage image = ImageIO.read(inputStream);

        int height = image.getHeight();
        int width = image.getWidth();
        int x = 0;
        int y = 60;
        BufferedImage result = image.getSubimage(x, y, width, 500);

        byte[] data = ((DataBufferByte) result.getData().getDataBuffer()).getData();
        byte[] data1 = ((DataBufferByte) result.getData().getDataBuffer()).getData();
        int code = data.hashCode();
        int code1 = data1.hashCode();
        System.out.println("---------={}"+(code == code1));
        System.out.println("bytes={}" + JSON.toJSONString(data));


        FileOutputStream out = new FileOutputStream(outPath);
        ImageIO.write(result, "jpg", out);

    }


    public static void main(String[] args) throws Exception {

        FA();

    }
}




















