package o2.o2web.data.groupcode.controller;

import o2.o2web.data.groupcode.service.GroupCodeService;
import o2.o2web.dto.Search;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequestMapping("/data/groupCode")
public class GroupCodeController {

    private GroupCodeService groupCodeService;

    @Autowired
    public GroupCodeController(GroupCodeService groupCodeService) {
        this.groupCodeService = groupCodeService;
    }

    @GetMapping()
    public String groupCodeMain() {
        return "data/groupcode/groupCode";
    }

    @PostMapping("/getGroupCodeList")
    public Map getGroupCodeList(@ModelAttribute Search search) {
        return null;
    }
}
