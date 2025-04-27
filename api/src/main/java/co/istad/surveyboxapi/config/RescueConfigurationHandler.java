package co.istad.surveyboxapi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class RescueConfigurationHandler implements WebMvcConfigurer {
    @Value("${file.server-path}")
    private String fileServerPath;

    @Value("${file.client-path}")
    private String fileClientPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("classpath:/static/");
        registry.addResourceHandler(fileClientPath).addResourceLocations("file:"+fileServerPath);
    }
}
