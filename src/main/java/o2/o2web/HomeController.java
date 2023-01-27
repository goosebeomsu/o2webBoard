package o2.o2web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/")
public class HomeController {

    @GetMapping
    public String homeController(HttpSession session){

        if(session.getAttribute("USER_ID") == null) {
            return "redirect:/login";
        }

        return "redirect:/system/board";
    }
}
