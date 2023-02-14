package o2.o2web.system.board.service;

import o2.o2web.dto.Board;
import o2.o2web.dto.Search;
import o2.o2web.system.board.dao.BoardDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

@Service
public class BoardService {

    private final BoardDAO boardDAO;

    @Autowired
    public BoardService(BoardDAO boardDAO) {
        this.boardDAO = boardDAO;
    }

    public Integer addBoard(Board board) {
        return boardDAO.addBoard(getConvertedBoard(board));
    }

    public List getBoardListRes(Search search) {
        return boardDAO.getBoardResList(search);
    }

    public Board getBoard(String boardId) throws SQLException {

        Board board = boardDAO.getBoardById(boardId);

        if(board != null){
            Blob blobBoardContent = (Blob) board.getBoardContent();
            byte[] byteArrBoardContent = blobBoardContent.getBytes(1, (int) blobBoardContent.length());
            board.setBoardContent(new String(byteArrBoardContent));
        }

        return board;
    }

    public Integer updateBoard(Board board) {
        return boardDAO.updateBoard(getConvertedBoard(board));
    }

    @Transactional
    public void deleteBoard(String boardId) throws Exception {
        Integer rs = boardDAO.deleteBoardById(boardId);
        System.out.println("rs = " + rs);

        if(rs != 1) {
            throw new RuntimeException("정상삭제 X");
        }
    }

    @Transactional
    public void deleteCheckedBoards(List<String> boardIdList) throws Exception {

        Integer rs = boardDAO.deleteBoardsByIdList(boardIdList);

        if(rs != boardIdList.size()) {
            throw new RuntimeException("정상삭제 X");
        }
    }

    public boolean plusViewCount(String boardId) {
        Integer rs = boardDAO.updateViewCount(boardId);

        if(rs != 1) {
            return false;
        }
        return true;
    }

    private Board getConvertedBoard(Board board) {
        byte[] byteArrayBoardContent = board.getBoardContent().toString().getBytes();
        board.setByteArrayBoardContent(byteArrayBoardContent);
        return board;
    }

    public Integer getListTotalCount(Search search) {
        return boardDAO.getListTotalCount(search);
    }

}
