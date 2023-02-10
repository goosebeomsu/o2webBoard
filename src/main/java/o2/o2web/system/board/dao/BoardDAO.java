package o2.o2web.system.board.dao;

import o2.o2web.dto.Board;
import o2.o2web.dto.BoardFile;
import o2.o2web.dto.Search;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BoardDAO {

    Integer addBoard(Board board);

    List getBoardResList(Search search);

    Board getBoardById(String boardId);

    Integer updateBoard(Board board);

    Integer deleteBoardById(String boardId);

    Integer deleteBoardsByIdList(List<String> boardIdList);

    Integer updateViewCount(String boardId);

    Integer getListTotalCount(Search search);

    Integer uploadBoardFile(BoardFile boardFile);

    List getFileListByBoardId(String boardId);

    Integer deleteFilesByIds(List<String> fileIds);

    List getFileNamesByIds(List<String> fileIds);

    List getFileIdsByBoardId(String boardId);
}
