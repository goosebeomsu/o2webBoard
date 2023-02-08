package o2.o2web.system.board.dao;

import o2.o2web.dto.Board;
import o2.o2web.dto.BoardFile;
import o2.o2web.dto.Search;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardDAO {

    Integer addBoard(Board board);

    List getBoardResList(Search search);

    Board getBoardById(String boardId);

    Integer updateBoard(Board board);

    Integer deleteBoardById(String boardId);

    Integer updateViewCount(String boardId);

    Integer getListTotalCount(Search search);

    Integer uploadBoardFile(BoardFile boardFile);

    List getFileListByBoardId(String boardId);
}
