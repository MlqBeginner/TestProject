package com.ecej.cc.v1.javaapi;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URL;
import java.util.Date;

import javax.imageio.ImageIO;


public class ImageCutTools {

    private final Logger LOGGER = LoggerFactory.getLogger(ImageCutTools.class);

    private static final Integer FIXED_HEIGHT = 800;

    private static final String outPath = "E:\\MaLQ-TestProject\\";


    public static void cut(String srcPath) throws IOException {
       // URL url = new URL(srcPath);
        InputStream inputStream = null;
        try {
            //inputStream = url.openConnection().getInputStream();
            inputStream = new FileInputStream(srcPath);
            BufferedImage image = ImageIO.read(inputStream);
            int height = image.getHeight();
            int width = image.getWidth();
            int x = 0;
            int y = 0;
            int cutOutHeight = (height <= FIXED_HEIGHT) ? height : FIXED_HEIGHT;
            int count = (height / FIXED_HEIGHT) == 0 ? 1 : height / FIXED_HEIGHT;
            boolean flag = false;
            for (int i = 1; i <= count; i++) {
                BufferedImage result = image.getSubimage(x, y, width, cutOutHeight);
                String postfix = getPostfix(srcPath);
                ImageIO.write(result, postfix, new File(outPath + "_" + new Date().getTime() + "." + postfix));
                y += FIXED_HEIGHT;
                cutOutHeight = FIXED_HEIGHT;
                if (height - (i * FIXED_HEIGHT) < FIXED_HEIGHT && height - (i * FIXED_HEIGHT) > 0) {
                    cutOutHeight = height - (i * FIXED_HEIGHT);
                    count++;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (inputStream != null)
                inputStream.close();
        }


    }

    /**
     * 获取文件后缀名
     *
     * @param inputFilePath 文件路径
     * @return
     */
    private static String getPostfix(String inputFilePath) {
        return inputFilePath.substring(inputFilePath.lastIndexOf(".") + 1);
    }


    public static void main(String[] args) throws Exception {

        cut("E:\\MaLQ-TestProject\\MaLQ-TestProject-Trunk\\MaLQ-TestProject\\libs\\see.png");

        //cut("https://static.yzhlink.cn/2721173019543424552.jpg");

    }


}
