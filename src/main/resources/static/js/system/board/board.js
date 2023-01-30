(function (){
    let _class = function (brdtype = "NOTICE"){
        let $DLG_UI = $("#sysBrdMng_page");

        let selectedBoard = "NOTICE"

        function renderBoardList(selectedBoard) {
            //검색조건 등 추가
            document.querySelector('#DataTablelist').innerHTML = getBoardListHtml(selectedBoard);
        }

        function getBoardListHtml(selectedBoard) {
            //search 객체만드는거 고려
            const requestURL = "http://localhost:8888/system/board/getBoardList";

            let param = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    boardType : selectedBoard,
                })
            }

            let responseData = fetch(requestURL, param).then((resolve) => {return resolve.json()});
        }

    }

    o2web.system.board = Object.assign(o2web.system.board || {}, {
        BrdMain : _class
    })
})()