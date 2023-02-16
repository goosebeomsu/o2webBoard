package o2.o2web.dto.request.board;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class GetBoardsReq {
    @NotNull
    private String boardType;
    @NotNull
    private String searchType;
    private String searchValue;
    @NotNull
    private Integer pageNumber;
    @NotNull
    private Integer rowSize;

}
