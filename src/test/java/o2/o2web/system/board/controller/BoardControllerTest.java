package o2.o2web.system.board.controller;

import o2.o2web.login.service.LoginService;
import o2.o2web.system.board.service.BoardService;
import o2.o2web.utils.FileUtil;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class BoardControllerTest {

    @Autowired
    private  FileUtil fileUtil;

    @Test
    void transactionTest()  {
        List<String> testFileIds = new ArrayList<>();
        testFileIds.add("d1203b1e-20a3-452f-b115-5670c3376e6c");
        testFileIds.add("2");

        try {
            fileUtil.deleteFiles(testFileIds);
        } catch (Exception e) {
            System.out.println("예외처리됨");
        }

    }

}