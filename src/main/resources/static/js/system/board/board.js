(function (){
    let _class = function (boardType = 'NOTICE'){

        let $DLG_UI = $("#sysBrdMng_page");

        let selectedBoardType = boardType;
        let _rowSize = null;
        let _param = null;
        let totalCount = null;

        function initialize() {
            _rowSize = 10;
            _param = {
                boardType : selectedBoardType,
                searchType : 'BRD_TITLE',
                searchValue : null,
                pageNumber : null,
                rowSize : null,
            }

            initEvent();
            drawList()
        }

        function drawList (pageNum) {
            if(!o2.defined(pageNum)) { pageNum = 1; }
            $DLG_UI.find("#DataTablelist").html('');

            _param.pageNumber	= pageNum
            _param.rowSize		= _rowSize

            getBoardList(_param).then((response) => {
                drawBoardList(response.boardList, pageNum);
            })
        }

        function drawBoardList(boardList, pageNum) {
            let boardListHtml = getBoardListHtml(boardList);
            document.querySelector('#DataTablelist').innerHTML = boardListHtml;
            document.querySelector('.strTotalCnt').innerHTML = totalCount;

            o2web.common.CmmnEvent.DrawPageNum(_rowSize, pageNum, totalCount, drawList); // 페이징 출력

            addEvent();
        }

        function getBoardListHtml(boardList) {

            return boardList.map((v, i) => {

                let {boardId, boardTitle, registrationUser, registrationDate, viewCount} = v;

                return `<tr id=${boardId}>
                    <td>
                        <input type="checkbox" name="ckbrdVal" title="선택" id=${'chk' + boardId}>
                        <label for=${'chk' + boardId}></label>
                    </td>
                    <td>${i + 1}</td>
                    <td id="title">${boardTitle}</td>
                    <td id="usr">${registrationUser}</td>
                    <td id="regdt">${registrationDate}</td>
                    <td id="cnt">${viewCount}</td>
                    <td>
                    <button type="button" class="btn btnSysCdEdit" id="edit">편집</button>
                    </td>
               </tr>`
            }).join('');
        }

        //전송할때 form데이터 or JSON? 정해진거 따르기?
        async function getBoardList(searchOption) {

            let requestURL = o2.config.O2Properties.CONTEXTPATH + '/system/board/getBoardList';

            //구조분해할당 써보기
            let {boardType, searchType, searchValue, pageNumber, rowSize} = searchOption;

            //조회는 무조건 get?
            let param = {
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

            let responseData = await fetch(requestURL, param).then((response) => response.json());

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

        }

        function addEvent() {

            // 클릭시 편집팝업
            //화살표함수 사용시 가르키는 this가 달라짐?
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

                deleteCheckedBoard(checkedIdArr).then(r => o2web.system.board.BrdMain());
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
            let requestURL = o2.config.O2Properties.CONTEXTPATH + "/system/board/delete"

            let param = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    checkedIdArr: checkedIdArr,
                })
            }

            await fetch(requestURL, param).then((response) => {
                if (response.ok) {
                    return response.json();
                }
            });
        }

        async function plusViewCount(boardId) {
            let requestURL = o2.config.O2Properties.CONTEXTPATH + '/system/board/plusViewCount/' + boardId;

            await fetch(requestURL, {method: 'POST'}).then((response) => {return response.json()})
        }

        initialize();

    }

    o2web.system.board = Object.assign(o2web.system.board || {}, {
        BrdMain : _class
    })
})()