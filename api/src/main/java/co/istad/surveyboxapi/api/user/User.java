package co.istad.surveyboxapi.api.user;

import co.istad.surveyboxapi.api.auth.Role;
import co.istad.surveyboxapi.base.AuditEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Formula;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User{//extends AuditEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Formula("concat(first_name,last_name)")
    String fullName;

    @Column(name = "gender",length = 7,nullable = false)
    private String gender;

    @Column(name = "email",unique = true,nullable = false)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "phone",length = 15)
    private String phone;
    @Column(name = "dob",columnDefinition = "date")
    private LocalDate dob;
    private String address;
    private String company;
    private String position;
    @Column(name = "is_verified", columnDefinition = "boolean default false", nullable = false)
    private boolean isVerified;

    private String verifiedCode;

    @Column(name = "is_active",columnDefinition = "boolean default false", nullable = false)
    private boolean isActive;

    @Column(name = "avatar")
    private String avatar;


   @Column(name = "social_media",length = 400)
    private String socialMedias;

//    @ManyToOne
//    @JoinColumn(name = "role_id",nullable = false)
//    private Role role;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private List<Role> roles;

    @Column(name = "auth_provider",length = 100)
    private String authProvider;

    @Column(name = "first_login",columnDefinition = "boolean default false", nullable = false)
    private Boolean firstLogin;

    @Column(name = "provider_account_id")
    private String providerAccountId;

    @Column(name = "provider_name")
    private String providerName;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    LocalDateTime updatedAt;
}
