package co.istad.surveyboxapi;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class DatabaseInitializer {

    @Bean
    CommandLineRunner initDatabase(JdbcTemplate jdbcTemplate) {
        return args -> {
            String[] roles = {"ADMIN", "SURVEY_CREATOR"};
            for (String role : roles) {
                String sql = "INSERT INTO roles (name) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = ?)";
                jdbcTemplate.update(sql, role, role);
            }
        };
    }
}
