package o2.o2web.utils;

import o2.o2web.dto.BoardFile;
import o2.o2web.system.board.dao.BoardDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Component
public class FileUtil {

    @Value("${file.path}")
    private String filePath;
    @Autowired
    private BoardDAO boardDAO;
    @Autowired
    ResourceLoader resourceLoader;


    public boolean uploadFiles(List<MultipartFile> uploadFiles, String boardId, String userId) {

        for (MultipartFile uploadFile : uploadFiles) {
            String originalFilename = uploadFile.getOriginalFilename();

            BoardFile boardFile = createBoardFile(boardId, originalFilename, filePath, userId);
            Integer rs = boardDAO.uploadBoardFile(boardFile);

            //롤백관련해서 고려해보기
            if(rs == null) {
                return false;
            }

            try {
                File file = new File(filePath, boardFile.getFileName());
                uploadFile.transferTo(file);

            } catch (IOException e) {
                e.printStackTrace();
                return false;
            }

        }

        return true;
    }

    @Transactional
    public void deleteFiles(List<String> fileIds) throws Exception{
        //삭제할때 삭제갯수가 달라도 예외가 아님
        //롤백하려면 try catch 사용안하고 throws??
        //리턴타입 void? 예외를 던져줘야하니까
        //Transactional은 런타임에러만 잡아줘서 RuntimeException를 던져줌
        //throws Exception해줘야 해당메서드를 사용하는곳에서 컴파일에러를 내줌 그래서쓰는건가


            List<String> fileNames = boardDAO.getFileNamesByIds(fileIds);

            Integer rs = boardDAO.deleteFilesByIds(fileIds);
            //롤백도 적용해보자
            if (rs != fileIds.size()) {
                throw new RuntimeException("id와 삭제된 파일 갯수가 다름");
            }

            boolean isSuccess = deleteFilesInPath(fileNames);

            if(!isSuccess) {
                throw new RuntimeException("경로의 파일을 삭제 못함");
            }

    }

    private boolean deleteFilesInPath(List<String> fileNames) {

        for (String fileName : fileNames) {
            File file = new File(filePath, fileName);
            boolean isSuccess = file.delete();

            if(!isSuccess) {
                return false;
            }
        }
        return true;
    }


    private BoardFile createBoardFile(String boardId, String originalFilename, String filePath, String userId) {
        BoardFile boardFile = new BoardFile();
        boardFile.setFileId(UUID.randomUUID().toString());
        boardFile.setBoardId(boardId);
        boardFile.setFileName(convertFileName(originalFilename));
        boardFile.setOriginalFileName(removeSpaces(originalFilename));
        boardFile.setFilePath(filePath);
        boardFile.setRegistrationUser(userId);
        return boardFile;
    }

    public String convertFileName(String originalFileName) {
        String extension = getFileExtension(originalFileName);
        return UUID.randomUUID().toString() + "." + extension;
    }

    public String getFileExtension(String fileName) {
        int lastIndexOf = fileName.lastIndexOf(".");

        if(lastIndexOf == -1) {
            return "";
        } else {
            return fileName.substring(lastIndexOf + 1);
        }
    }

    public String removeSpaces(String originalFileName) {
        return originalFileName.replace(" ", "_");
    }

    public Resource getFileResource(String fileName) throws IOException {
        Path path = Paths.get(filePath + fileName);
        return new InputStreamResource(Files.newInputStream(path));
    }

    public List<String> getFileIds(String boardId) {
        return boardDAO.getFileIdsByBoardId(boardId);
    }

    public List getFileList(String boardId) {
        return boardDAO.getFileListByBoardId(boardId);
    }




}
