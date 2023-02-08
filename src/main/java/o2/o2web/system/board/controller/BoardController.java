package o2.o2web.system.board.controller;

import o2.o2web.dto.Board;
import o2.o2web.dto.DeleteBoardReq;
import o2.o2web.dto.Message;
import o2.o2web.dto.Search;
import o2.o2web.system.board.service.BoardService;
import o2.o2web.utils.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("/system/board")
public class BoardController {

    private final BoardService boardService;
    private final FileUtil fileUtil;

    @Autowired
    public BoardController(BoardService boardService, FileUtil fileUtil) {
        this.boardService = boardService;
        this.fileUtil = fileUtil;
    }

    @GetMapping
    public String getBoardMain() {

        return "board/boardMain";
    }

    @PostMapping("/add")
    @ResponseBody
    public Map addBoard(@ModelAttribute Board board, HttpServletRequest request) {

        Map<String, Object> resultMap = new HashMap<>();

        try {
            String userId = (String) request.getSession().getAttribute("USER_ID");
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

        System.out.println("search = " + search);

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
    public ResponseEntity<Message> updateBoard(@RequestBody Board board) {

        Integer rs = boardService.updateBoard(board);

        if (rs == null) {
            return new ResponseEntity<>(new Message("업데이트에 실패하였습니다."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new Message("success"), HttpStatus.OK);
    }

    @PostMapping("/delete/{boardId}")
    @ResponseBody
    public ResponseEntity<Message> deleteBoard(@PathVariable String boardId) {

        Integer rs = boardService.deleteBoard(boardId);

        if (rs == null) {
            return new ResponseEntity<>(new Message("삭제에 실패했습니다."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new Message("success"), HttpStatus.OK);
    }

    @PostMapping("/delete")
    @ResponseBody
    public ResponseEntity<Message> deleteCheckedBoard(@RequestBody DeleteBoardReq deleteBoardReq) {

        boolean isSuccess = boardService.deleteCheckedBoard(deleteBoardReq.getCheckedIdArr());

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
    public Map uploadFiles(@RequestParam List<MultipartFile> uploadFile, @RequestParam String boardId, HttpSession session) {

        Map<String, Object> resultMap = new HashMap<>();

        try {
            String userId = (String) session.getAttribute("USER_ID");
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

    @PostMapping
    @ResponseBody
    public Map downLoadFile(@RequestParam String fileName) {
        Resource resource = fileUtil.getFileResource(fileName);
        return null;

    }
}
