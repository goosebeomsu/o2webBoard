package o2.o2web.dto.request.board;

import lombok.Data;
import o2.o2web.entity.Board;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class AddBoardReq {

    @NotBlank
    private String boardTitle;
    @NotNull
    private Object boardContent;
    @NotBlank
    private String boardType;

    public Board toEntity(AddBoardReq addBoardReq) {
        Board board = new Board();

        board.setBoardTitle(addBoardReq.getBoardTitle());
        board.setBoardContent(addBoardReq.getBoardContent());
        board.setBoardType(addBoardReq.getBoardType());

        return board;
    }

}
