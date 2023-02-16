package o2.o2web.dto.request.board;

import lombok.Data;
import o2.o2web.entity.Board;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class UpdateBoardReq {
    @NotNull
    private String boardId;
    @NotBlank
    private String boardTitle;
    @NotNull
    private Object boardContent;

    public Board toEntity(UpdateBoardReq updateBoardReq) {
        Board board = new Board();
        board.setBoardId(updateBoardReq.getBoardId());
        board.setBoardContent(updateBoardReq.getBoardContent());
        board.setBoardTitle(updateBoardReq.getBoardTitle());
        return board;
    }
}
