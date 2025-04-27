package co.istad.surveyboxapi.api.file;

import co.istad.surveyboxapi.api.file.web.FileDto;
import co.istad.surveyboxapi.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileServiceImpl implements FileService {

    private FileUtil fileUtil;

    @Autowired
    public void setFileUtil(FileUtil fileUtil) {
        this.fileUtil = fileUtil;
    }


    @Override
    public FileDto uploadSingle(MultipartFile file) {

        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        String extension = fileUtil.getExtension(file.getOriginalFilename());
        if (!fileUtil.isExtensionAllowed(extension)) {
            throw new IllegalArgumentException("File extension not allowed");
        }

        return fileUtil.upload(file);

    }

    @Override
    public List<FileDto> uploadMultiple(List<MultipartFile> files) {
        List<FileDto> filesDto = new ArrayList<>();
        if (files.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        if (files.size() > 20) {
            throw new IllegalArgumentException("Exceeded the maximum limit of 20 images");
        }
        System.out.println(files.size());
        for (MultipartFile file : files) {
            String extension = fileUtil.getExtension(file.getOriginalFilename());
            if (!fileUtil.isExtensionAllowed(extension)) {
                throw new IllegalArgumentException("File extension not allowed");
            }
            // create isExtensionAllowed to allow only jpg and png handle exception
            if (file.getContentType().startsWith("image/")) {
                FileDto fileDto = fileUtil.upload(file);
                filesDto.add(fileDto);
            } else {
                throw new IllegalArgumentException("Only image files are allowed");
            }
        }
        return filesDto;
    }

    @Override
    public FileDto findByName(String name) throws IOException {
        //create load in fileUtil
        Resource resource = fileUtil.load(name);
        if (resource.exists()) {
            return FileDto.builder()
                    .name(resource.getFilename())
                    .extension(fileUtil.getExtension(resource.getFilename()))
                    .size(resource.contentLength())
                    .url(fileUtil.getUrl(resource.getFilename()))
                    //create in fileUtil getDownloadUrl
                    .downloadUrl(fileUtil.getDownloadUrl(resource.getFilename()))
                    .build();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "file is not found");
    }

    @Override
    public void delete(String name) {
        try {
            FileDto fileDto = findByName(name);
            if (fileDto != null) {
                fileUtil.delete(name);
            }
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    e.getMessage());
        }
    }

    @Override
    public Resource download(String name) {
        return fileUtil.load(name);
    }


}
