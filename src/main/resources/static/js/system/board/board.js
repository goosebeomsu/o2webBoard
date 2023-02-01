(function (){
    let _class = function (boardType = 'NOTICE'){

        let $DLG_UI = $("#sysBrdMng_page");

        let selectedBoardType = boardType;
        let searchType = 'BRD_TITLE';
        let searchValue = null;

        function initialize() {
            initEvent();
            renderBoardList(selectedBoardType, searchType, searchValue);
        }

        async function renderBoardList(selectedBoardType, searchType, searchValue) {
            //getBoardList 안에서 boardType이 왜 언디파인드??
            let boardList = await getBoardList(selectedBoardType, searchType, searchValue);
            let boardListHTML = getBoardListHTML(boardList);

            document.querySelector('#DataTablelist').innerHTML = boardListHTML;
            document.querySelector('.strTotalCnt').innerHTML = boardList.length;

            addEvent();
        }

        //전송할때 form데이터 or JSON? 정해진거 따르기?
        async function getBoardList(selectedBoardType, searchType, searchValue) {

            let requestURL = o2.config.O2Properties.CONTEXTPATH + '/system/board/getBoardList';

            //조회는 무조건 get?
            let param = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    boardType : selectedBoardType,
                    searchType : searchType,
                    searchValue : searchValue,
                })
            }

            let responseData = await fetch(requestURL, param).then((response) => response.json());
            return responseData.boardList;
        }

        function getBoardListHTML(boardList) {

            //필요한 값만 담은 객체를 따로 생성하는 방법 생각
            return boardList.map((v, i) => {

               return `<tr id=${v['boardId']}>
                    <td>
                        <input type="checkbox" name="ckbrdVal" title="선택" id=${'chk' + v['boardId']}>
                        <label for=${'chk' + v['boardId']}></label>
                    </td>
                    <td>${i + 1}</td>
                    <td id="title">${v['boardTitle']}</td>
                    <td id="usr">${v['registrationUser']}</td>
                    <td id="regdt">${v['registrationDate']}</td>
                    <td id="cnt">${v['viewCount']}</td>
                    <td>
                    <button type="button" class="btn btnSysCdEdit" id="edit">편집</button>
                    </td>
               </tr>`
            }).join('');

        }

        function initEvent() {

            //클릭시 게시글 추가 팝업
            document.querySelector("#add").addEventListener("click", () => {
                o2web.system.board.BrdAdd(selectedBoardType);
            });

            //클릭시 검색조건에 따라 리스트출력
            document.querySelector('.btnGrpCdSearch').addEventListener('click', () => {
                setSearchParam();
                renderBoardList(selectedBoardType, searchType, searchValue);
            })

            //엔터
            document.querySelector('#SEARCH_VAL').addEventListener('keydown', (event) => {
                if(event.keyCode == 13){
                    setSearchParam();
                    renderBoardList(selectedBoardType, searchType, searchValue);
                }
            })

            // 클릭시 리스트 초기화
            document.querySelector('.btnGrpCdReset').addEventListener('click', () => {
                initKeywordOptionParam();
                renderBoardList(selectedBoardType, searchType, searchValue);
            })

        }

        function addEvent() {

            // // 클릭시 편집팝업
            // document.querySelector('.btnSysCdEdit').addEventListener('click', () => {
            //     o2web.system.board.BrdDetail(selectedBoardType, $(this).closest("tr").prop("id"))
            // })

            $DLG_UI.find(".btnSysCdEdit").off("click").on("click",function(){
                o2web.system.board.BrdDetail(selectedBoardType, $(this).closest("tr").prop("id"));
            });
        }

        function setSearchParam() {
            searchType = document.querySelector('#SEARCH_TYPE').value;
            searchValue = document.querySelector('#SEARCH_VAL').value;
        }

        function initKeywordOptionParam() {
            document.querySelector('#SEARCH_TYPE').value = 'BRD_TITLE';
            document.querySelector('#SEARCH_VAL').value = null;

            setSearchParam();
        }

        initialize();

    }

    o2web.system.board = Object.assign(o2web.system.board || {}, {
        BrdMain : _class
    })
})()