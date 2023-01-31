(function (){

    const _class = {
        DefaultEvent : function () {

            //로그아웃 이벤트
            document.querySelector('#btnLogout').addEventListener("click", function (){
                location.href = '/login/logout'
            })

            //리스트 불러오기
            o2web.system.board.BrdMain();
        }




    }

    o2web.common = Object.assign(o2web.common || {}, {
        CmmnEvent : _class
    })

})()