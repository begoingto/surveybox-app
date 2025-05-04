package co.istad.surveyboxapi;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import co.istad.surveyboxapi.api.user.UserRepository;
import co.istad.surveyboxapi.api.user.User;

@Configuration
public class DatabaseInitializer {

    @Bean
    CommandLineRunner initDatabase(JdbcTemplate jdbcTemplate, UserRepository userRepository) {
        return args -> {
            String[] roles = {"ADMIN", "SURVEY_CREATOR"};
            for (String role : roles) {
                String sql = "INSERT INTO roles (name) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = ?)";
                jdbcTemplate.update(sql, role, role);
            }
            
            // Create users if they don't exist
            boolean adminExists = userRepository.existsByEmail("admin@surveybox.com");
            if (!adminExists) {
                User adminUser = new User();
                adminUser.setFirstName("admin");
                adminUser.setGender("M");
                adminUser.setEmail("admin@surveybox.com");
                adminUser.setPassword("$2a$10$IqGd6xZt2E21JRDAUMEbGegRhdye78b6D0sxa57jrXvPa3CoHDLLO"); // Password: Admin@12345
                adminUser.setActive(true);
                adminUser.setVerified(true);
                adminUser.setFirstLogin(false);
                userRepository.save(adminUser);
            }

            boolean creatorExists = userRepository.existsByEmail("creator@surveybox.com");
            if (!creatorExists) {
                User createUser = new User();
                createUser.setFirstName("creator");
                createUser.setGender("M");
                createUser.setEmail("creator@surveybox.com");
                createUser.setPassword("$2a$10$IqGd6xZt2E21JRDAUMEbGegRhdye78b6D0sxa57jrXvPa3CoHDLLO"); // Password: Admin@12345
                createUser.setActive(true);
                createUser.setVerified(true);
                createUser.setFirstLogin(false);
                userRepository.save(createUser);
            }

            // Assign roles to users if they don't exist
            String sql = """
                INSERT INTO users_roles (user_id, role_id) 
                SELECT ?, r.id FROM roles r WHERE r.name = ? 
                AND NOT EXISTS(SELECT 1 FROM users_roles ur WHERE ur.user_id = ? AND ur.role_id = r.id)
                """;
            jdbcTemplate.update(sql, 1, "ADMIN", 1); // Assuming user_id 1 is for
            // creator
            jdbcTemplate.update(sql, 2, "SURVEY_CREATOR", 2); // Assuming user_id 2 is for creator

        };
    }
}
