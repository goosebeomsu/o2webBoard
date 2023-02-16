package o2.o2web.login.controller;

import o2.o2web.entity.User;
import o2.o2web.login.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @GetMapping
    public String loginForm() {
        return "login/loginForm";
    }

    @PostMapping
    public String login(@ModelAttribute User user, HttpServletRequest request) {

        User dbUser = loginService.login(user.getUserId(), user.getUserPwd());

        if(dbUser == null) {
            return "login/loginForm";
        }

        HttpSession session = request.getSession();
        session.setAttribute("USER_ID", dbUser.getUserId());
        session.setAttribute("USER_NAME", dbUser.getUserName());

        return "redirect:system/board";
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }
        return "redirect:/";
    }
}
