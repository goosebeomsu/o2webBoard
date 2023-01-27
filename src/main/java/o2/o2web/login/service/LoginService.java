package o2.o2web.login.service;

import o2.o2web.dto.User;
import o2.o2web.login.dao.LoginDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final LoginDAO loginDAO;

    @Autowired
    public LoginService(LoginDAO loginDAO) {
        this.loginDAO = loginDAO;
    }

    public User login(String userId, String userPwd) {
        User dbUser = loginDAO.getUserById(userId);

        if(dbUser.getUserId().equals(userId) && dbUser.getUserPwd().equals(userPwd)) {
            return dbUser;
        }

        return null;
    }
}
