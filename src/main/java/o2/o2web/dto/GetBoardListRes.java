package o2.o2web.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class GetBoardListRes {
    private String boardId;
    private String boardTitle;
    private Integer viewCount;
    private String registrationUser;
    private Date registrationDate;
    private String boardType;

}
