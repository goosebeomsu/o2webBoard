package o2.o2web.system.board.controller;

import com.azul.tooling.in.Model;
import o2.o2web.dto.Board;
import o2.o2web.dto.DeleteBoardReq;
import o2.o2web.dto.Message;
import o2.o2web.dto.Search;
import o2.o2web.system.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("/system/board")
public class BoardController {

    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping
    public String getBoardMain() {

        return "board/boardMain";
    }

    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<Message> addBoard(@RequestBody Board board, HttpServletRequest request) {

        String userId = (String) request.getSession().getAttribute("USER_ID");
        String boardId = UUID.randomUUID().toString();

        board.setRegistrationUser(userId);
        board.setBoardId(boardId);

        Integer rs = boardService.addBoard(board);

        if (rs == null) {
            return new ResponseEntity<>(new Message("게시글 등록에 실패하였습니다."), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(new Message("success"), HttpStatus.OK);
    }

    //조회는 무조건 get? 검색조건등이 많을때
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
    public ResponseEntity<Board> getBoard(@PathVariable String boardId) throws SQLException {

        return new ResponseEntity<>(boardService.getBoard(boardId), HttpStatus.OK);
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
}
