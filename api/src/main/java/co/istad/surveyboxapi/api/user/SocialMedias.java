package co.istad.surveyboxapi.api.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SocialMedias implements Serializable {
    private String facebook;
    private String twitter;
    private String instagram;
    private String linkedin;
    private String youtube;
    private String tiktok;
    private String pinterest;
    private String snapchat;
    private String whatsapp;
    private String telegram;
    private String line;
    private String other;
}
