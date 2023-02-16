package o2.o2web.dto;

import lombok.Data;

import java.sql.Date;


@Data
public class Board {
    private String boardId;
    private String boardTitle;
    private Object boardContent;
    private byte[] byteArrayBoardContent;
    private String boardType;
    private Integer viewCount;
    private String registrationUser;
    private Date registrationDate;

    public void updateBoardIdAndRegUser(String boardId, String registrationUser) {
        this.boardId = boardId;
        this.registrationUser = registrationUser;
    }

}
