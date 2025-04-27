package co.istad.surveyboxapi.util;

import co.istad.surveyboxapi.api.file.web.FileDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Component
public class FileUtil {
    private static final List<String> ALLOWED_EXTENSIONS = List.of("jpg", "png", "webp","jpeg");

    @Value("${file.base-url}")
    private String fileBaseUrl;

    @Value("${file.download-url}")
    private String fileDownloadUrl;

    @Value("${file.server-path}")
    private String fileServerPath;


    public FileDto upload(MultipartFile file) {

        String extension = getExtension(Objects.requireNonNull(file.getOriginalFilename()));
        String name = String.format("%s.%s", UUID.randomUUID(), extension);
        Long size = file.getSize();
        String url = getUrl(name);

        Path path = Paths.get(fileServerPath + name);

        try {
            Files.copy(file.getInputStream(), path);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    e.getMessage());

        }

        return FileDto.builder()
                .name(name)
                .extension(extension)
                .size(size)
                .url(url)
                .downloadUrl(fileDownloadUrl + name)
                .build();
    }

    public String getExtension(String name) {
        int dotLastIndex = name.lastIndexOf(".");
        return name.substring(dotLastIndex + 1);
    }

    public String getUrl(String name) {
        return fileBaseUrl +"/"+ name;
    }


    public boolean isExtensionAllowed(String extension) {
        return ALLOWED_EXTENSIONS.contains(extension.toLowerCase());
    }

    public Resource load(String name) {
        Path path = Paths.get(fileServerPath + name);
        return UrlResource.from(path.toUri());
    }

    public String getDownloadUrl(String name) {
        return fileDownloadUrl + name;
    }

    public void delete(String name) throws IOException {
        Path path = Paths.get(fileServerPath + name);
        Files.deleteIfExists(path);
    }

}
