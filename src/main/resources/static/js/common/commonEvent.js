(function (){

    const _class = {
        DefaultEvent : function () {

            //로그아웃 이벤트
            document.querySelector('#btnLogout').addEventListener("click", function (){
                location.href = '/login/logout'
            })

            //리스트 불러오기
            o2web.system.board.BrdMain();
        },

        DrawPageNum : function(rSize, cNum, tCnt, callback, domId) {
            if( ! o2.defined(domId) ) {domId = ".paging.o2udp-paging"; }

            let param = {
                DOM_ID : domId,
                TOTAL_CNT : tCnt,
                ROW_SIZE : rSize,
                pageNo : cNum,
                pageCountOfGroup : 5
            }

            o2web.utils.PageRenderer.rendererPageInfo(param, callback);
        },




    }

    o2web.common = Object.assign(o2web.common || {}, {
        CmmnEvent : _class
    })

})()