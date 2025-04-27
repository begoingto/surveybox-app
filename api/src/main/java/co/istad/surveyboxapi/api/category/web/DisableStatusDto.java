package co.istad.surveyboxapi.api.category.web;

import lombok.Data;

@Data
public class DisableStatusDto {
    Boolean status;
    public Boolean isStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
