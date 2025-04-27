package co.istad.surveyboxapi.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageConfig;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Hashtable;
import java.util.UUID;

@Component
@Slf4j
public class QRCodeGenerator {
    @Value("${file.server-qrcode-path}")
    private  String fileServerPath;

    @Value("${file.base-url}")
    private String fileBaseUrl;

    @Value("${frontend.base-url}")
    private String frontendUrl;

    @Value("${file.center.url}")
    private String fileCenterUrl;
    public String generateQRCode(String uuid) throws WriterException, IOException {
        Hashtable<EncodeHintType, Object> hintMap = new Hashtable<>();
        hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
        hintMap.put(EncodeHintType.MARGIN, 1);
        hintMap.put(EncodeHintType.CHARACTER_SET, "UTF-8");

        String name = UUID.randomUUID() + "-qrcode.png";
        String surveyUrl = frontendUrl + "/survey/response/" + uuid;
        var qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(surveyUrl, BarcodeFormat.QR_CODE, 400, 400, hintMap);
        Path path = Paths.get(fileServerPath + name);

        // Save the QR code image to the file server
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);

        // Load the overlay image
        BufferedImage overlayImage = ImageIO.read(new URL(fileCenterUrl));

        // Create a combined image with the QR code, overlay image, and text
        int combinedWidth = Math.max(bitMatrix.getWidth(), overlayImage.getWidth());
        int combinedHeight = bitMatrix.getHeight() + overlayImage.getHeight(); // Additional height for text

        // Set custom colors for position detection patterns
//        Color positionDetectionPatternColor = Color.BLUE; // Change this to your desired color
//        Color backgroundColor = Color.WHITE;

        // Define custom colors for the QR code

        Color startColor = Color.decode("#0154B6"); // Start color of the gradient
        Color endColor = Color.WHITE;


        MatrixToImageConfig config = new MatrixToImageConfig(startColor.getRGB(), endColor.getRGB());

        // Draw the QR code with custom colors
        BufferedImage qrCodeImage = MatrixToImageWriter.toBufferedImage(bitMatrix, config);


        BufferedImage combinedImage = new BufferedImage(combinedWidth, combinedHeight, BufferedImage.TYPE_INT_ARGB);
        Graphics2D graphics = combinedImage.createGraphics();

        // Draw the QR code
        int qrCodeXPos = (combinedWidth - bitMatrix.getWidth()) / 2;
        int qrCodeYPos = (combinedHeight - bitMatrix.getHeight()) / 2;
        graphics.drawImage(qrCodeImage, qrCodeXPos, qrCodeYPos, null);

        // Draw the overlay image
        int overlayImageXPos = (combinedWidth - overlayImage.getWidth()) / 2;
        int overlayImageYPos = qrCodeYPos + bitMatrix.getHeight() - 230;
        graphics.drawImage(overlayImage, overlayImageXPos, overlayImageYPos, null);

        graphics.dispose();


        // Save the combined image to the file server
        ImageIO.write(combinedImage, "png", new File(fileServerPath + name));

        return fileBaseUrl + "/" + name;
    }
    public String generateQRCodePathVote(String uuid) throws WriterException, IOException {
        Hashtable<EncodeHintType, Object> hintMap = new Hashtable<>();
        hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
        hintMap.put(EncodeHintType.MARGIN, 1);
        hintMap.put(EncodeHintType.CHARACTER_SET, "UTF-8");

        String name = UUID.randomUUID() + "-qrcode.png";
        String surveyUrl = frontendUrl + "/vote/response/" + uuid;
        var qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(surveyUrl, BarcodeFormat.QR_CODE, 400, 400, hintMap);
        Path path = Paths.get(fileServerPath + name);

        // Save the QR code image to the file server
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);

        // Load the overlay image
        BufferedImage overlayImage = ImageIO.read(new URL(fileCenterUrl));

        // Create a combined image with the QR code, overlay image, and text
        int combinedWidth = Math.max(bitMatrix.getWidth(), overlayImage.getWidth());
        int combinedHeight = bitMatrix.getHeight() + overlayImage.getHeight(); // Additional height for text

        // Set custom colors for position detection patterns
//        Color positionDetectionPatternColor = Color.BLUE; // Change this to your desired color
//        Color backgroundColor = Color.WHITE;

        // Define custom colors for the QR code

        Color startColor = Color.decode("#0154B6"); // Start color of the gradient
        Color endColor = Color.WHITE;


        MatrixToImageConfig config = new MatrixToImageConfig(startColor.getRGB(), endColor.getRGB());

        // Draw the QR code with custom colors
        BufferedImage qrCodeImage = MatrixToImageWriter.toBufferedImage(bitMatrix, config);


        BufferedImage combinedImage = new BufferedImage(combinedWidth, combinedHeight, BufferedImage.TYPE_INT_ARGB);
        Graphics2D graphics = combinedImage.createGraphics();

        // Draw the QR code
        int qrCodeXPos = (combinedWidth - bitMatrix.getWidth()) / 2;
        int qrCodeYPos = (combinedHeight - bitMatrix.getHeight()) / 2;
        graphics.drawImage(qrCodeImage, qrCodeXPos, qrCodeYPos, null);

        // Draw the overlay image
        int overlayImageXPos = (combinedWidth - overlayImage.getWidth()) / 2;
        int overlayImageYPos = qrCodeYPos + bitMatrix.getHeight() - 230;
        graphics.drawImage(overlayImage, overlayImageXPos, overlayImageYPos, null);

        graphics.dispose();


        // Save the combined image to the file server
        ImageIO.write(combinedImage, "png", new File(fileServerPath + name));

        return fileBaseUrl + "/" + name;
    }
}
