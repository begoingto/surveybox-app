package co.istad.surveyboxapi.welcome;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class WelcomeController {

    @Value("${frontend.base-url}")
    private String frontendUrl;

    @GetMapping
    public String welcome(Model model) {
        model.addAttribute("clientSide",this.frontendUrl);
        return "index";
    }
}
