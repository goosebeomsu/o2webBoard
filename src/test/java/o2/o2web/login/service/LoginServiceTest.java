package o2.o2web.login.service;

import o2.o2web.entity.User;
import o2.o2web.login.dao.LoginDAO;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class LoginServiceTest {

    private final LoginDAO loginDAO;

    @Autowired
    LoginServiceTest(LoginDAO loginDAO) {
        this.loginDAO = loginDAO;
    }

    @Test
    void loginTest() {
        String userId = "ADMIN";
        String userPwd = "a12345";

        User dbUser = loginDAO.getUserById(userId);

        Assertions.assertThat(userId).isEqualTo(dbUser.getUserId());
        Assertions.assertThat(userPwd).isEqualTo(dbUser.getUserPwd());
    }

}