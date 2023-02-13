package o2.o2web.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class GroupCode {

    private String dataCode;
    private String dataCodeName;
    private String dataCodeExp;
    private String dataCodeGroup;
    private Date registrationDate;
    private String updateId;
    private Date updateDate;
}
