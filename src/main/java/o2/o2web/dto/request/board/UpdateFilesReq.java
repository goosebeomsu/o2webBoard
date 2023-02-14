package o2.o2web.dto.request.board;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class UpdateFilesReq {

    private List<MultipartFile> uploadFile;
    @NotNull
    private String boardId;
    private List<String> fileIds;
}
