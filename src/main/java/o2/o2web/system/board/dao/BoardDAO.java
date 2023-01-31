package o2.o2web.system.board.dao;

import o2.o2web.dto.Board;
import o2.o2web.dto.Search;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardDAO {

    Integer addBoard(Board board);

    List getBoardResList(Search search);
}
