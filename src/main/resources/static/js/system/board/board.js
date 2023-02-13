(function (){
    let _class = function (boardType = 'NOTICE'){

        const _rowSize = o2web.system.config.rowSize;

        let $DLG_UI = $("#sysBrdMng_page");
        let selectedBoardType = boardType;
        let _param = null;
        let totalCount = null;

        function initialize() {
            _param = {
                boardType : boardType,
                searchType : 'BRD_TITLE',
                searchValue : null,
                pageNumber : null,
                rowSize : null,
            }

            initEvent();
            drawList()
        }

        function drawList (pageNum = 1) {

            drawTable(selectedBoardType)
            _param.pageNumber = pageNum
            _param.rowSize = _rowSize
            _param.boardType = selectedBoardType

            getBoardList(_param).then((response) => {
                drawBoardList(response.boardList, response.listTotalCount, pageNum);
            })
        }

        function drawBoardList(boardList, totalCount, pageNum) {
            const boardListHtml = getBoardListHtml(boardList, totalCount, pageNum);
            document.querySelector('#DataTablelist').innerHTML = boardListHtml;
            document.querySelector('.strTotalCnt').innerHTML = totalCount;

            o2web.common.CmmnEvent.DrawPageNum(_rowSize, pageNum, totalCount, drawList); // 페이징 출력

            addEvent();
        }

        function getBoardListHtml(boardList, totalCount, currentPage) {

            return boardList.map((v, i) => {

                let {boardId, boardTitle, registrationUser, registrationDate, viewCount, boardType, boardIdHasFile} = v;

                return `<tr id=${boardId}>
                    <td>
                        <input type="checkbox" name="ckbrdVal" title="선택" id=${'chk' + boardId}>
                        <label for=${'chk' + boardId}></label>
                    </td>
                    <td>${totalCount - _rowSize * (currentPage -1) - i}</td>
                    <td id="title">${boardTitle}</td>
                    ${(boardType === 'DATA_ROOM' &&  boardIdHasFile != null) ? `<td id="file"><i class="i_info" id=${boardIdHasFile}></i></td>` 
                    : (boardType === 'DATA_ROOM' &&  boardIdHasFile == null) ? `<td id="file"></td>` : ``}
                    <td id="usr">${registrationUser}</td>
                    <td id="regdt">${registrationDate}</td>
                    <td id="cnt">${viewCount}</td>
                    <td>
                    <button type="button" class="btn btnSysCdEdit" id="edit">편집</button>
                    </td>
               </tr>`
            }).join('');
        }

        async function getBoardList({boardType, searchType, searchValue, pageNumber, rowSize}) {
            const requestURL = o2.config.O2Properties.CONTEXTPATH + '/system/board/getBoardList';

            const param = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    boardType : boardType,
                    searchType : searchType,
                    searchValue : searchValue,
                    pageNumber : pageNumber,
                    rowSize : rowSize,
                })
            }

            const responseData = await fetch(requestURL, param).then((response) => response.json());

            totalCount = responseData.listTotalCount;

            return responseData;
        }

        function initEvent() {

            $DLG_UI.find("#add").off("click").on("click", () => {
                o2web.system.board.BrdAdd(selectedBoardType);
            });

            $DLG_UI.find(".btnGrpCdSearch").off("click").on("click", () => {
                setSearchParam();
                drawList();
            });

            $DLG_UI.find("#SEARCH_VAL").off("keyup").keyup((event) => {
                if(event.keyCode === 13){
                    setSearchParam();
                    drawList();
                }
            });

            $DLG_UI.find(".btnGrpCdReset").off("click").on("click", () => {
                initKeywordOptionParam();
                drawList();
            })

            $DLG_UI.find("ul.tabs li").off("click").on("click", function (){
                if ($(this).hasClass("On")){
                    return false;
                }

                $DLG_UI.find("ul.tabs li").removeClass("On");
                $(this).addClass("On");

                selectedBoardType = $(this).prop("id");

                initKeywordOptionParam();
                drawList();
            })

        }

        function addEvent() {

            // 클릭시 편집팝업
            $DLG_UI.find(".btnSysCdEdit").off("click").on("click", function () {
                let boardId = $(this).closest("tr").prop("id");

                plusViewCount(boardId).then(() => o2web.system.board.BrdDetail(selectedBoardType, boardId));
            });

            // 클릭시 선택삭제
            $DLG_UI.find(".btnGrpCdDel").off("click").on("click", () => {

                let checkedIdArr = [];

                $("input[name=ckbrdVal]:checked").each(function(){
                    let boardId = $(this).closest('tr').prop("id");
                    checkedIdArr.push(boardId);
                })

                deleteCheckedBoard(checkedIdArr).then(r => o2web.system.board.BrdMain(selectedBoardType));
            })
            
            //전체 체크박스 이벤트
            $DLG_UI.find("#ckbrdValAll").off().on("click",function(){
                if ($DLG_UI.find("#ckbrdValAll").is(":checked")) $("input[name=ckbrdVal]").prop("checked",true);
                else $("input[name=ckbrdVal]").prop("checked", false);
            });

            //개별 체크박스 이벤트
            $DLG_UI.find("input[name=ckbrdVal]").off("click").on("click",function(){
                let total = $("input[name=ckbrdVal]").length;
                let checked = $("input[name=ckbrdVal]:checked").length;

                if(total != checked) $DLG_UI.find("#ckbrdValAll").prop("checked", false);
                else $DLG_UI.find("#ckbrdValAll").prop("checked", true);
            });


        }

        function setSearchParam() {
            _param.searchType = document.querySelector('#SEARCH_TYPE').value;
            _param.searchValue = document.querySelector('#SEARCH_VAL').value;
        }

        function initKeywordOptionParam() {
            document.querySelector('#SEARCH_TYPE').value = 'BRD_TITLE';
            document.querySelector('#SEARCH_VAL').value = null;

            setSearchParam();
        }

        async function deleteCheckedBoard(checkedIdArr) {
            const requestURL = o2.config.O2Properties.CONTEXTPATH + "/system/board/delete"

            const param = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    checkedIdList: checkedIdArr,
                })
            }

            await fetch(requestURL, param).then((response) => {
                if (response.ok) {
                    return response.json();
                }
            });
        }

        async function plusViewCount(boardId) {
            const requestURL = o2.config.O2Properties.CONTEXTPATH + '/system/board/plusViewCount/' + boardId;

            await fetch(requestURL, {method: 'POST'}).then((response) => {return response.json()})
        }

        //drawTable 파라미터로 boardType
        function drawTable(boardType) {

            const containFile = o2web.system.board.CmmnEvent.hasFile(boardType)

            if(containFile) {
                const dataRoomTableHTML = getDataRoomTableHTML();
                document.querySelector('#tblSysbrdList').innerHTML = dataRoomTableHTML;
            } else {
                const NoticeTableHTML = getNoticeTableHTML();
                document.querySelector('#tblSysbrdList').innerHTML = NoticeTableHTML;
            }

        }

        function getDataRoomTableHTML() {
            return `<caption>검색결과</caption>
                            <colgroup>
                                <col width="5%">
                                <col width="5%">
                                <col width="35%">
                                <col width="10%">
                                <col width="10%">
                                <col width="15%">
                                <col width="10%">
                                <col width="10%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th><input type="checkbox" title="선택" id="ckbrdValAll" >
                                    <label for="ckbrdValAll"></label></th>
                                <th>번호</th>
                                <th>제목</th>
                                <th>첨부파일</th>
                                <th>작성자</th>
                                <th>등록일</th>
                                <th>조회수</th>
                                <th>편집</th>
                            </tr>
                            </thead>
                            <tbody id="DataTablelist">
                            <!-- // group code list content -->
                            </tbody>`
        }

        function getNoticeTableHTML() {
            return `<caption>검색결과</caption>
                            <colgroup>
                                <col width="5%">
                                <col width="5%">
                                <col width="45%">
                                <col width="10%">
                                <col width="15%">
                                <col width="10%">
                                <col width="10%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th><input type="checkbox" title="선택" id="ckbrdValAll" >
                                    <label for="ckbrdValAll"></label></th>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>등록일</th>
                                <th>조회수</th>
                                <th>편집</th>
                            </tr>
                            </thead>
                            <tbody id="DataTablelist">
                            <!-- // group code list content -->
                            </tbody>`
        }

        initialize();

    }

    o2web.system.board = Object.assign(o2web.system.board || {}, {
        BrdMain : _class
    })
})()