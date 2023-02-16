package o2.o2web.system.board.dao;

import o2.o2web.entity.Board;
import o2.o2web.entity.BoardFile;
import o2.o2web.dto.request.board.GetBoardsReq;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardDAO {

    Integer addBoard(Board board);

    List<Board> getBoardResList(GetBoardsReq getBoardsReq);

    Board getBoardById(String boardId);

    Integer updateBoard(Board board);

    Integer deleteBoardById(String boardId);

    Integer deleteBoardsByIdList(List<String> boardIdList);

    Integer updateViewCount(String boardId);

    Integer getListTotalCount(GetBoardsReq getBoardsReq);

    Integer uploadBoardFile(BoardFile boardFile);

    List<BoardFile> getFileListByBoardId(String boardId);

    Integer deleteFilesByIds(List<String> fileIds);

    List<String> getFileNamesByIds(List<String> fileIds);

    List<String> getFileIdsByBoardId(String boardId);
}
