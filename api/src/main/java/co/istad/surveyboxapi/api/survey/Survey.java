package co.istad.surveyboxapi.api.survey;

import co.istad.surveyboxapi.api.survey.web.SurveyQuestion;
import co.istad.surveyboxapi.api.theme.Theme;
import co.istad.surveyboxapi.base.AuditEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.UniqueElements;
import java.time.LocalDate;

@Entity
@Table(name = "surveys")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Survey extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank
    @Size(min = 5, max = 255)
    private String title;

    private String description;

    @Column(name = "display_question",length =10)
    private String displayQuestion;

    @Column(name = "survey_option" ,nullable = false,length = 20)
    private String surveyOption;

    @Column(name = "msg_welcome")
    private String msgWelcome;

    @Column(name = "msg_success")
    private String msgSuccess;

    @Column(name = "icon_welcome")
    private String iconWelcome;

    @Column(name = "start_date", columnDefinition = "date",nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @Column(name = "end_date",columnDefinition = "date",nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @Column(name = "icon_success")
    private String iconSuccess;

    @Column(name = "survey_question",columnDefinition = "json", nullable = true)
    private SurveyQuestion surveyQuestion;

    @JoinColumn(name = "created_by",referencedColumnName = "id",table = "users",nullable = true)
    private Long createdBy;

    @Column(name = "qr_code")
    private String qrCode;

    private String cover;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "them_id")
    private Theme theme;

    @Column(nullable = false,columnDefinition = "BOOLEAN DEFAULT true")
    private Boolean status=true;

    @UniqueElements
    @Column(nullable = false)
    String uuid;
}
