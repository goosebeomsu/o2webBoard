package o2.o2web.system.board.service;

import o2.o2web.dto.Board;
import o2.o2web.dto.Search;
import o2.o2web.system.board.dao.BoardDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

    private final BoardDAO boardDAO;

    @Autowired
    public BoardService(BoardDAO boardDAO) {
        this.boardDAO = boardDAO;
    }

    public void addBoard(Board board) {
         boardDAO.addBoard(board);
    }

    public List getBoardList(Search search) {
        return boardDAO.getBoardList(search);
    }
}
