package co.istad.surveyboxapi.util;

import co.istad.surveyboxapi.api.user.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Component
@RequiredArgsConstructor
public class MailUtil {
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    @Value("${frontend.base-url}")
    private String frontendUrl;

    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class Meta <T>{
        private String to;
        private String from;
        private String subject;
        private String templateUrl;
        private T data;
    }

    public void send(Meta<?> meta, User user) throws MessagingException {
        /*
         * 1. prepare template
         * 2. Prepare email information
         * 3. send mail
         *
         */

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

        // Set template engin
        Context context = new Context();
        context.setVariable("data", meta.data);
        context.setVariable("frontendUrl", frontendUrl);
        context.setVariable("urlVerify",frontendUrl + "/auth/verify?email="+ user.getEmail()+ "&verifyCode=" + user.getVerifiedCode() );
        context.setVariable("urlForgotPassword",frontendUrl+"/auth/new-password?email="+user.getEmail());
        String htmlTemplate = templateEngine.process(meta.templateUrl,context);

        //  prepare template
        helper.setText(htmlTemplate,true);

        // prepare mail information
        helper.setTo(meta.to);
        helper.setFrom(meta.from);
        helper.setSubject(meta.subject);

        // Send mail
        javaMailSender.send(mimeMessage);
    }

}
