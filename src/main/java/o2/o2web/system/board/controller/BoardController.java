package o2.o2web.system.board.controller;

import com.azul.tooling.in.Model;
import o2.o2web.dto.Board;
import o2.o2web.dto.Search;
import o2.o2web.system.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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

        String userId = (String) request.getSession().getAttribute("USER_ID");
        String boardId = UUID.randomUUID().toString();

        board.setRegistrationUser(userId);
        board.setBoardId(boardId);

        byte[] convertedBoardContent = board.getBoardContent().toString().getBytes();
        board.setConvertedBoardContent(convertedBoardContent);

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

}
