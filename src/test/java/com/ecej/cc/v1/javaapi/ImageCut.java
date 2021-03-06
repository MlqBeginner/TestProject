package com.ecej.cc.v1.javaapi;

import com.alibaba.fastjson.JSON;

import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.io.*;
import java.net.URL;
import java.util.Date;
import java.util.Iterator;

import javax.imageio.ImageIO;
import javax.imageio.ImageReadParam;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;

/**
 * @author xhw
 * @date 2012-11-26
 */
public class ImageCut {

    /**
     * 源图片路径名称如:c:\1.jpg
     */
    private static String srcpath = "https://static.yzhlink.cn/1461032172755437949.jpg";
    /**
     * 剪切图片存放路径名称.如:c:\2.jpg
     */
    private String subpath = "E:\\MaLQ-TestProject\\";
    /**
     * jpg图片格式
     */
    private static final String IMAGE_FORM_OF_JPG = "jpg";
    /**
     * png图片格式
     */
    private static final String IMAGE_FORM_OF_PNG = "png";
    /**
     * 剪切点x坐标
     */
    private int x;

    /**
     * 剪切点y坐标
     */
    private int y;

    /**
     * 剪切点宽度
     */
    private int width;

    /**
     * 剪切点高度
     */
    private int height;

    public ImageCut() {

    }

    public ImageCut(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public static void main(String[] args) throws Exception {

        URL url = new URL(srcpath);
        InputStream is = url.openConnection().getInputStream();
        BufferedImage image = ImageIO.read(is);

        byte[] data = ((DataBufferByte) image.getData().getDataBuffer()).getData();
       // System.out.println("bytes={}" + JSON.toJSONString(data));


        System.out.println("高度：={}" + image.getHeight());
        System.out.println("宽度：={}" + image.getWidth());

        ImageCut imageCut = new ImageCut(0, 0, image.getWidth(), 500);

        imageCut.cut(imageCut.getSrcpath(), imageCut.getSubpath());
    }

    /**
     * 返回包含所有当前已注册 ImageReader 的 Iterator，这些 ImageReader 声称能够解码指定格式。
     * 参数：formatName - 包含非正式格式名称 .（例如 "jpeg" 或 "tiff"）等 。
     *
     * @param postFix 文件的后缀名
     * @return
     */
    public Iterator<ImageReader> getImageReadersByFormatName(String postFix) {
        switch (postFix) {
            case IMAGE_FORM_OF_JPG:
                return ImageIO.getImageReadersByFormatName(IMAGE_FORM_OF_JPG);
            case IMAGE_FORM_OF_PNG:
                return ImageIO.getImageReadersByFormatName(IMAGE_FORM_OF_PNG);
            default:
                return ImageIO.getImageReadersByFormatName(IMAGE_FORM_OF_JPG);
        }
    }

    /**
     * 对图片裁剪，并把裁剪完蛋新图片保存 。
     *
     * @param srcpath 源图片路径
     * @param subpath 剪切图片存放路径
     * @throws IOException
     */
    public void cut(String srcpath, String subpath) throws IOException {
        URL url = new URL(srcpath);
        InputStream is = null;
        ImageInputStream iis = null;
        try {
            // 读取图片文件
            is = url.openConnection().getInputStream();

            // 获取文件的后缀名
            String postFix = getPostfix(srcpath);
            System.out.println("图片格式为：" + postFix);
            /*
             * 返回包含所有当前已注册 ImageReader 的 Iterator，这些 ImageReader 声称能够解码指定格式。
             * 参数：formatName - 包含非正式格式名称 .（例如 "jpeg" 或 "tiff"）等 。
             */
            Iterator<ImageReader> it = getImageReadersByFormatName(postFix);

            ImageReader reader = it.next();
            // 获取图片流
            iis = ImageIO.createImageInputStream(is);

            /*
             * <p>iis:读取源.true:只向前搜索 </p>.将它标记为 ‘只向前搜索’。
             * 此设置意味着包含在输入源中的图像将只按顺序读取，可能允许 reader 避免缓存包含与以前已经读取的图像关联的数据的那些输入部分。
             */
            reader.setInput(iis, true);

            /*
             * <p>描述如何对流进行解码的类<p>.用于指定如何在输入时从 Java Image I/O
             * 框架的上下文中的流转换一幅图像或一组图像。用于特定图像格式的插件 将从其 ImageReader 实现的
             * getDefaultReadParam 方法中返回 ImageReadParam 的实例。
             */
            ImageReadParam param = reader.getDefaultReadParam();
            /*
             * 图片裁剪区域。Rectangle 指定了坐标空间中的一个区域，通过 Rectangle 对象
             * 的左上顶点的坐标（x，y）、宽度和高度可以定义这个区域。
             */
            Rectangle rect = new Rectangle(x, y, width, height);

            // 提供一个 BufferedImage，将其用作解码像素数据的目标。
            param.setSourceRegion(rect);
            /*
             * 使用所提供的 ImageReadParam 读取通过索引 imageIndex 指定的对象，并将 它作为一个完整的
             * BufferedImage 返回。
             */
            BufferedImage bi = reader.read(0, param);

            byte[] data = ((DataBufferByte) bi.getData().getDataBuffer()).getData();
            System.out.println("bytes-bi={}" + JSON.toJSONString(data));
            // 保存新图片
            ImageIO.write(bi, postFix, new File(subpath + "_" + new Date().getTime() + "." + postFix));
        } finally {
            if (is != null)
                is.close();
            if (iis != null)
                iis.close();
        }

    }

    /**
     * 获取inputFilePath的后缀名，如："e:/test.pptx"的后缀名为："pptx"<br>
     *
     * @param inputFilePath
     * @return
     */
    public String getPostfix(String inputFilePath) {
        return inputFilePath.substring(inputFilePath.lastIndexOf(".") + 1);
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public String getSrcpath() {
        return srcpath;
    }

    public void setSrcpath(String srcpath) {
        this.srcpath = srcpath;
    }

    public String getSubpath() {
        return subpath;
    }

    public void setSubpath(String subpath) {
        this.subpath = subpath;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public static byte[] imageToBytes(BufferedImage bImage, String format) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            ImageIO.write(bImage, format, out);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return out.toByteArray();
    }

}