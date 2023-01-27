package o2.o2web.system.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/system/board")
public class BoardController {

    @GetMapping
    public String getBoardMain() {

        return "board/boardMain";
    }
}
