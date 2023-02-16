package o2.o2web.system.board.controller;

import o2.o2web.entity.Board;
import o2.o2web.entity.BoardFile;
import o2.o2web.dto.request.board.*;
import o2.o2web.dto.response.Message;
import o2.o2web.login.service.LoginService;
import o2.o2web.system.board.service.BoardService;
import o2.o2web.utils.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("/system/board")
public class BoardController {

    private final BoardService boardService;
    private final FileUtil fileUtil;
    private final LoginService loginService;

    @Autowired
    public BoardController(BoardService boardService, FileUtil fileUtil, LoginService loginService) {
        this.boardService = boardService;
        this.fileUtil = fileUtil;
        this.loginService = loginService;
    }

    @GetMapping
    public String boardMain() {

        return "system/board/boardMain";
    }

    @PostMapping("/add")
    @ResponseBody
    public Map<String, Object> addBoard(@Validated @ModelAttribute AddBoardReq addBoardReq, BindingResult bindingResult, HttpSession session) {

        Map<String, Object> resultMap = new HashMap<>();

        if(bindingResult.hasErrors()) {
            resultMap.put("SUCCESS", false);
            resultMap.put("MESSAGE", "게시글 등록에 실패하였습니다.");
            return resultMap;
        }

        try {
            String userId = loginService.getSessionId(session);
            String boardId = UUID.randomUUID().toString();

            Board board = addBoardReq.toEntity(addBoardReq);
            board.updateBoardIdAndRegUser(boardId, userId);

            Integer rs = boardService.addBoard(board);

            if(rs == null) {
                resultMap.put("SUCCESS", false);
            }

            resultMap.put("SUCCESS", true);
            resultMap.put("boardId", boardId);

        } catch (Throwable t) {
            resultMap.put("SUCCESS", false);
            resultMap.put("MESSAGE", "게시글 등록에 실패하였습니다.");
        }

        return resultMap;
    }

    @PostMapping("/getBoardList")
    @ResponseBody
    public Map<String, Object> getBoardList(@Validated @RequestBody GetBoardsReq getBoardsReq, BindingResult bindingResult) {

        Map<String, Object> resultMap = new HashMap<>();

        if(bindingResult.hasErrors()) {
            resultMap.put("SUCCESS", false);
            resultMap.put("MESSAGE", "리스트 불러오기 실패");
            return resultMap;
        }
        List<Board> boardList = boardService.getBoardListRes(getBoardsReq);
        Integer listTotalCount = boardService.getListTotalCount(getBoardsReq);

        resultMap.put("boardList", boardList);
        resultMap.put("listTotalCount", listTotalCount);

        return resultMap;
    }

    @GetMapping("/{boardId}")
    @ResponseBody
    public Map<String, Object> getBoard(@PathVariable String boardId)  {
        Map<String, Object> resultMap = new HashMap<>();

        try {
            Board board = boardService.getBoard(boardId);
            List<BoardFile> files = fileUtil.getFileList(boardId);

            resultMap.put("SUCCESS", true);
            resultMap.put("board", board);
            resultMap.put("files", files);

        } catch (Throwable t) {
            resultMap.put("SUCCESS", false);
        }

        return resultMap;
    }

    @PostMapping("/update/{boardId}")
    @ResponseBody
    public Map<String, Object> updateBoard(@Validated @ModelAttribute UpdateBoardReq updateBoardReq, BindingResult bindingResult) {

        Map<String, Object> resultMap = new HashMap<>();

        if(bindingResult.hasErrors()) {
            resultMap.put("SUCCESS", false);
            resultMap.put("MESSAGE", "게시글 등록에 실패하였습니다.");
            return resultMap;
        }

        try {
            Board board = updateBoardReq.toEntity(updateBoardReq);
            Integer rs = boardService.updateBoard(board);

            if(rs == null) {
                resultMap.put("SUCCESS", false);
            }

            resultMap.put("SUCCESS", true);
            resultMap.put("boardId", updateBoardReq.getBoardId());

        } catch (Throwable t) {
            resultMap.put("SUCCESS", false);
            resultMap.put("MESSAGE", "게시글 등록에 실패하였습니다.");
        }


        return resultMap;
    }

    @PostMapping("/delete/{boardId}")
    @ResponseBody
    public ResponseEntity<Message> deleteBoard(@PathVariable String boardId)  {

        List<String> fileIds = fileUtil.getFileIds(boardId);

        try{
            boardService.deleteBoard(boardId);

            if (fileIds.size() > 0) {
                fileUtil.deleteFiles(fileIds);
            }

            return new ResponseEntity<>(new Message("success"), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(new Message("삭제에 실패했습니다."), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/delete")
    @ResponseBody
    public ResponseEntity<Message> deleteCheckedBoards(@RequestBody DeleteBoardReq deleteBoardReq) {

        List<String> checkedIds = deleteBoardReq.getCheckedIdList();

        try {

            boardService.deleteCheckedBoards(checkedIds);

            for (String checkedId : checkedIds) {
                List<String> fileIds = fileUtil.getFileIds(checkedId);

                if (fileIds.size() > 0) {
                    fileUtil.deleteFiles(fileIds);
                }
            }

            return new ResponseEntity<>(new Message("success"), HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<>(new Message("삭제에 실패했습니다."), HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @PostMapping("/plusViewCount/{boardId}")
    @ResponseBody
    public ResponseEntity<Message> plusViewCount(@PathVariable String boardId) {

        boolean isSuccess = boardService.plusViewCount(boardId);

        if (isSuccess){
            return new ResponseEntity<>(new Message("success"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new Message("삭제에 실패했습니다."), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/uploadFiles")
    @ResponseBody
    public Map<String, Object> uploadFiles(@Validated @ModelAttribute UploadFilesReq uploadFilesReq, BindingResult bindingResult, HttpSession session) {

        Map<String, Object> resultMap = new HashMap<>();

        if (bindingResult.hasErrors()) {
            resultMap.put("SUCCESS", false);
            resultMap.put("MESSAGE", "파일 업로드에 실패하였습니다");
            return resultMap;
        }

        List<MultipartFile> uploadFiles = uploadFilesReq.getUploadFile();
        String boardId = uploadFilesReq.getBoardId();

        if(uploadFiles == null) {
            resultMap.put("SUCCESS", true);
            return resultMap;
        }

        try {
            String userId = loginService.getSessionId(session);
            boolean isSuccess = fileUtil.uploadFiles(uploadFiles, boardId, userId);

            if(!isSuccess) {
                resultMap.put("SUCCESS", false);
            }

            resultMap.put("SUCCESS", true);

        } catch (Throwable t) {
            resultMap.put("SUCCESS", false);
            resultMap.put("MESSAGE", "파일 업로드에 실패하였습니다");
        }

        return resultMap;
    }

    @PostMapping("/download")
    @ResponseBody
    public ResponseEntity<Object> downLoadFile(@RequestParam String fileName) {

        HttpHeaders headers = new HttpHeaders();

        try {
            Resource fileResource = fileUtil.getFileResource(fileName);

            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"");
            headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE);

            return new ResponseEntity<>(fileResource, headers, HttpStatus.OK);

        } catch (IOException e) {
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("SUCCESS", false);
            return new ResponseEntity<>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/updateFiles")
    @ResponseBody
    public Map<String, Object> updateFiles(@Validated @ModelAttribute UpdateFilesReq updateFilesReq, BindingResult bindingResult, HttpSession session) {

        Map<String, Object> resultMap = new HashMap<>();

        if (bindingResult.hasErrors()) {
            resultMap.put("SUCCESS", false);
            resultMap.put("MESSAGE", "파일 업로드에 실패하였습니다");
            return resultMap;
        }

        List<MultipartFile> uploadFile = updateFilesReq.getUploadFile();
        List<String> fileIds = updateFilesReq.getDeleteFileIds();
        String boardId = updateFilesReq.getBoardId();

        if(uploadFile == null && fileIds.size() == 0) {
            resultMap.put("SUCCESS", true);
            return resultMap;
        }

        try {
            String userId = loginService.getSessionId(session);

            if(fileIds.size() > 0) {
                fileUtil.deleteFiles(fileIds);
            }

            if(uploadFile != null) {
                fileUtil.uploadFiles(uploadFile, boardId, userId);
            }

            resultMap.put("SUCCESS", true);

        } catch (Throwable t) {
            resultMap.put("SUCCESS", false);
            resultMap.put("MESSAGE", "파일 수정에 실패하였습니다.");
        }

        return resultMap;
    }

}
