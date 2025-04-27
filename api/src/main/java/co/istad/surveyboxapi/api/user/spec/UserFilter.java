package co.istad.surveyboxapi.api.user.spec;

import lombok.Data;
import org.hibernate.annotations.Formula;

@Data
public class UserFilter {
    String userId;
    String firstName;
    String lastName;
    @Formula("concat(first_name,last_name)")
    String fullName;
}
