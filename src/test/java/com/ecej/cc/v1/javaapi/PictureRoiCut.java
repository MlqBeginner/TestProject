package com.ecej.cc.v1.javaapi;

import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Iterator;

import javax.imageio.ImageIO;
import javax.imageio.ImageReadParam;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;

public class PictureRoiCut {

    public static void main(String[] args) throws IOException {
        String imPath = "E:\\MaLQ-TestProject\\MaLQ-TestProject-Trunk\\MaLQ-TestProject\\libs\\123.jpg";
        String outPath = "E:\\MaLQ-TestProject\\demo.jpg";

        PictureRoiCut roi = new PictureRoiCut();
        roi.cut(imPath, outPath, 384, 155, 432, 64);
    }

    public void cut(String imPath, String outPath, int x, int y, int width, int height) throws IOException {
        FileInputStream is = null;
        ImageInputStream iis = null;
        try {

            //批量读取图片文件
            is = new FileInputStream(imPath);
            Iterator<ImageReader> it = ImageIO.getImageReadersByFormatName("jpg");
            ImageReader reader = it.next();

            //image stream
            iis = ImageIO.createImageInputStream(is);
            reader.setInput(iis, true);
            ImageReadParam param = reader.getDefaultReadParam();
            Rectangle rect = new Rectangle(x, y, width, height);
            param.setSourceRegion(rect);
            BufferedImage bi = reader.read(0, param);
            ImageIO.write(bi, "jpg", new File(outPath));

            System.out.println("Saved!");

        } finally {
            if (is != null) {
                is.close();
            }
            if (iis != null) {
                iis.close();
            }
        }
    }

}
