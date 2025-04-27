package co.istad.surveyboxapi.api.theme;

import co.istad.surveyboxapi.api.theme.web.ThemeDto;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
public interface ThemeRepository extends JpaRepository<Theme, Long> {

    // Create a new theme

  //  @Modifying
    @Transactional
    @Query(value = "INSERT INTO themes (created_at,name, theme, created_by) VALUES (:created_at,:name, CAST(:themeJson AS jsonb), :userId) RETURNING *", nativeQuery = true)
    Theme createTheme(@Param("created_at") LocalDateTime createdAt,@Param("name") String name, @Param("themeJson") String themeJson, @Param("userId") Long userId);

  @Transactional
  @Query(value = "UPDATE themes SET name = :name, theme = CAST(:themeJson AS jsonb), updated_at = :updatedAt, created_by = :userId WHERE id = :themeId RETURNING *", nativeQuery = true)
  Theme updateThemeById(@Param("themeId") Long themeId, @Param("name") String name, @Param("themeJson") String themeJson, @Param("updatedAt") LocalDateTime updatedAt, @Param("userId") Long userId);
}
