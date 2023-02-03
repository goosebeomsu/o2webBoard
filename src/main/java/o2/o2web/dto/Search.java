package o2.o2web.dto;

import lombok.Data;

@Data
public class Search {

    private String boardType;
    private String searchType;
    private String searchValue;
    private Integer pageNumber;
    private Integer rowSize;

}
