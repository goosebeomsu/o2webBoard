package o2.o2web.dto.request.board;

import lombok.Data;

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

}
