package co.istad.surveyboxapi.api.theme;

import co.istad.surveyboxapi.api.user.User;
import co.istad.surveyboxapi.base.AuditEntity;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "themes")
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false,columnDefinition = "json")
    @Convert(converter = JsonNodeHandler.class)
    private JsonNode theme;
   // private String theme;
    @Column(name = "name")
    private String name;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User user;
    @Column(name = "created_at", insertable = true)
    private LocalDateTime createdAt;
    @Column(name = "updated_at", insertable = true)
    private LocalDateTime updatedAt;
}
