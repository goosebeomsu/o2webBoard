package o2.o2web.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class BoardFile {
    private String fileId;
    private String boardId;
    private String fileName;
    private String originalFileName;
    private String filePath;
    private String registrationUser;
    private Date registrationDate;
}
