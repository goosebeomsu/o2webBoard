package o2.o2web.system.board.service;

import o2.o2web.entity.Board;
import o2.o2web.system.board.dao.BoardDAO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BoardServiceTest {

    private final BoardDAO boardDAO;

    @Autowired
    public BoardServiceTest(BoardDAO boardDAO) {
        this.boardDAO = boardDAO;
    }

    @Test
    void addBoardTest() {
        Board boardTest = new Board();
        boardTest.setBoardId("test1");
        boardTest.setBoardTitle("aaaa");
        boardTest.setBoardContent("ccccc");
        boardTest.setBoardType("NOTICE");
        boardTest.setRegistrationUser("user1");

        boardDAO.addBoard(boardTest);
    }
}