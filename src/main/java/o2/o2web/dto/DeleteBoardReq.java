package o2.o2web.dto;

import lombok.Data;

import java.util.List;

@Data
public class DeleteBoardReq {
    private List<String> checkedIdList;

}
