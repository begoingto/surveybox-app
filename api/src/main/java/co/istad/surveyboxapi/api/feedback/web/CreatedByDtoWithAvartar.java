package co.istad.surveyboxapi.api.feedback.web;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatedByDtoWithAvartar {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String avatar;
    private String company;

    public CreatedByDtoWithAvartar(Long id, String firstName, String avatar) {
        this.id=id;
        this.firstName=firstName;
        this.avatar=avatar;

    }
}
