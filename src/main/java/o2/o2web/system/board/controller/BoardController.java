package o2.o2web.system.board.controller;

import com.azul.tooling.in.Model;
import o2.o2web.dto.Board;
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
    public String addBoard(@RequestBody Board board, HttpServletRequest request) {

        //세션관련설정 추가하기
        String userId = (String) request.getSession().getAttribute("USER_ID");
        String boardId = UUID.randomUUID().toString();

        board.setRegistrationUser(userId);
        board.setBoardId(boardId);

        boardService.addBoard(board);

        return "success";
    }

    //조회는 무조건 get? 검색조건등이 많을때
    @PostMapping("/getBoardList")
    @ResponseBody
    public Map getBoardList(@RequestBody Search search) {

        List boardList = boardService.getBoardListRes(search);

        Map<String, Object> resultMap = new HashMap<>();

        resultMap.put("boardList", boardList);

        return resultMap;
    }

//    @GetMapping("/{boardId}")
//    @ResponseBody
//    public Board getBoardDetail(@PathVariable String boardId) throws SQLException {
//        return boardService.getBoard(boardId);
//    }

    @GetMapping("/{boardId}")
    @ResponseBody
    public ResponseEntity<Board> getBoard(@PathVariable String boardId) throws SQLException {

        return new ResponseEntity<>(boardService.getBoard(boardId), HttpStatus.OK);
    }

    @PostMapping("/update/{boardId}")
    @ResponseBody
    public ResponseEntity<Board> updateBoard(@RequestBody Board board) {

        boardService.updateBoard(board);
        //수정예정, add update 는 어떤식으로 응답주는게 좋을까
        return new ResponseEntity<>(board, HttpStatus.OK);
    }

}
