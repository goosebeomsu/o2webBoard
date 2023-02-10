package o2.o2web.system.board.controller;

import o2.o2web.dto.Board;
import o2.o2web.dto.DeleteBoardReq;
import o2.o2web.dto.Message;
import o2.o2web.dto.Search;
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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
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
    public String getBoardMain() {

        return "board/boardMain";
    }

    @PostMapping("/add")
    @ResponseBody
    public Map addBoard(@ModelAttribute Board board, HttpSession session) {

        Map<String, Object> resultMap = new HashMap<>();

        try {
            String userId = loginService.getSessionId(session);
            String boardId = UUID.randomUUID().toString();

            board.setRegistrationUser(userId);
            board.setBoardId(boardId);

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
    public Map getBoardList(@RequestBody Search search) {

        List boardList = boardService.getBoardListRes(search);
        Integer listTotalCount = boardService.getListTotalCount(search);
        Map<String, Object> resultMap = new HashMap<>();

        resultMap.put("boardList", boardList);
        resultMap.put("listTotalCount", listTotalCount);

        return resultMap;
    }

    @GetMapping("/{boardId}")
    @ResponseBody
    public Map getBoard(@PathVariable String boardId)  {
        Map<String, Object> resultMap = new HashMap<>();

        try {
            Board board = boardService.getBoard(boardId);
            List files = boardService.getFileList(boardId);

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
    public Map updateBoard(@PathVariable String boardId, @ModelAttribute Board board) {

        Map<String, Object> resultMap = new HashMap<>();

        try {
            Integer rs = boardService.updateBoard(board);

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

    @PostMapping("/delete/{boardId}")
    @ResponseBody
    public ResponseEntity<Message> deleteBoard(@PathVariable String boardId) {

        Integer rs = boardService.deleteBoard(boardId);
        List<String> fileIds = fileUtil.getFileIds(boardId);

        if (fileIds.size() > 0) {
            fileUtil.deleteFiles(fileIds);
        }

        if (rs == null) {
            return new ResponseEntity<>(new Message("삭제에 실패했습니다."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new Message("success"), HttpStatus.OK);
    }

    @PostMapping("/delete")
    @ResponseBody
    public ResponseEntity<Message> deleteCheckedBoards(@RequestBody DeleteBoardReq deleteBoardReq) {

        List<String> checkedIds = deleteBoardReq.getCheckedIdList();

        boolean isSuccess = boardService.deleteCheckedBoards(checkedIds);

        for (String checkedId : checkedIds) {
            List<String> fileIds = fileUtil.getFileIds(checkedId);

            if (fileIds.size() > 0) {
                fileUtil.deleteFiles(fileIds);
            }
        }

        if (isSuccess) {
            return new ResponseEntity<>(new Message("success"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Message("삭제에 실패했습니다."), HttpStatus.INTERNAL_SERVER_ERROR);
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
    public Map uploadFiles(@RequestParam(required = false) List<MultipartFile> uploadFile, @RequestParam String boardId, HttpSession session) {

        Map<String, Object> resultMap = new HashMap<>();

        if(uploadFile == null) {
            resultMap.put("SUCCESS", true);
            return resultMap;
        }

        try {
            String userId = loginService.getSessionId(session);
            Boolean isSuccess = fileUtil.uploadFiles(uploadFile, boardId, userId);

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
    public ResponseEntity downLoadFile(@RequestParam String fileName) {

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
    public Map updateFiles(@RequestParam(required = false) List<MultipartFile> uploadFile,
                           @RequestParam String boardId,
                           @RequestParam(required = false) List<String> fileIds,
                           HttpSession session) {

        Map<String, Object> resultMap = new HashMap<>();

        if(uploadFile == null && fileIds.size() == 0) {
            resultMap.put("SUCCESS", true);
            return resultMap;
        }

        try {
            String userId = loginService.getSessionId(session);

            if(fileIds.size() > 0) {
                fileUtil.deleteFiles(fileIds);
            }

            fileUtil.uploadFiles(uploadFile, boardId, userId);

            resultMap.put("SUCCESS", true);

        } catch (Throwable t) {
            resultMap.put("SUCCESS", false);
            resultMap.put("MESSAGE", "파일 수정에 실패하였습니다.");
        }

        return resultMap;
    }
}
