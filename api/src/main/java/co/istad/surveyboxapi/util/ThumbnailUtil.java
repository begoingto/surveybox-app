package co.istad.surveyboxapi.util;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.filters.Caption;
import net.coobird.thumbnailator.geometry.Positions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.UUID;
@Component
public class ThumbnailUtil {
    @Value("${file.server-qrcode-path}")
    public String fileServerPath;


    public String createThumbnailImage(String textOverlay) throws IOException {
        UUID name = UUID.randomUUID();
        String originalFileName = "X:\\Wallpapers\\register.png";
        String outputFileName = "X:\\" + name + "-thumbnail.jpg"; // Specify the output file name with extension

        // Create a text overlay image using the provided text
        Font font = new Font("Courier", Font.PLAIN, 60);


        Caption caption = new Caption(
                textOverlay,
                font,
                Color.white,
                1.0f,
                Positions.CENTER,
                100
        );

        String text = "This is a long line of text that is too long to fit on a single line, so it should wrap to a new line instead.";







        BufferedImage overlay = new BufferedImage(1200, 630, BufferedImage.TYPE_INT_ARGB);

        BufferedImage watermark=Thumbnails.of(overlay)
                        .size(1200,630)
                .addFilter(caption).asBufferedImage();
        // Generate the thumbnail with the text overlay
        Thumbnails.of(new File(originalFileName))
                .size(1200, 630)
                .watermark(Positions.CENTER,watermark,1,0)
                .outputFormat("jpg") // Specify the output format
                .toFile(new File(outputFileName));

        return outputFileName;
    }

//    private static BufferedImage getBufferedImage(String text, int width, int height) {
//
//        BufferedImage overlay = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
//        Graphics2D g2d = overlay.createGraphics();
//        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
//        g2d.setColor(Color.BLACK);
//        g2d.setFont(new Font("Tahoma", Font.ITALIC, 60)); // You can adjust the font and size
//        FontMetrics fontMetrics = g2d.getFontMetrics();
//        int textWidth = fontMetrics.stringWidth(text);
//        int textHeight = fontMetrics.getHeight();
//        int x = (width - textWidth) / 2;
//        int y = (height - textHeight) / 2 + fontMetrics.getAscent();
//        g2d.drawString(text, x, y);
//        g2d.dispose();
//        return overlay;
//    }



}
