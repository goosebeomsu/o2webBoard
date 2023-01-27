(function (){

    const _class = {
        DefaultEvent : function () {

            //로그아웃 이벤트
            document.querySelector('#btnLogout').addEventListener("click", function (){
                location.href = '/login/logout'
            })
        }
    }

    o2web.common = Object.assign(o2web.common || {}, {
        CmmnEvent : _class
    })

})()