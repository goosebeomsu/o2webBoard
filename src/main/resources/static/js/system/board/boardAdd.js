window.onload = function (){

    let $DLG_UI = $("#o2-dialog-01");


    document.querySelector("#add").addEventListener("click", renderBoardPopup);

    function renderBoardPopup() {

        let htmlURL = "http://localhost:8888/design/system/board/boardAdd.html"
        //http://localhost:8888안붙였을때 경로에 system 추가하는 이유??

        o2web.utils.UIUtil.load($DLG_UI.selector, htmlURL).done(function() {
            $DLG_UI.dialog({

                title : '공지사항',
                modal : true,
                width : 800,
                resizable : false,
                buttons :[{
                    text : "취소",
                    "class" : "btn",
                    click : function() {
                        $(this).dialog("close");
                    }
                }, {
                    text : "추가",
                    "class":"btn blue",
                    click : function () {
                        _$selfdig = $(this);
                        //유효성 추가예정
                        addNotice().then(value => {
                            o2web.system.board.BrdMain();
                            _$selfdig.dialog("close");
                        })
                    }
                }],
                open : function (){
                    editData();
                },
                close : function(){
                    tinymce.execCommand("mceRemoveEditor", false, "detail_cont");
                    $(this).dialog("destroy").empty();
                }

            });
        });

    }

    function editData() {
        tinymce.init({ // editor 실행
            selector : '#detail_cont',
            height : 300,
            max_height : 300,
            resize : false,
            menubar : false,
            toolbar : [ 'undo redo | bold italic underline | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify' ],
            branding : false,
            statusbar : false,
            forced_root_block : ''
        });
    }

    function addNotice() {

        const requestURL = "http://localhost:8888/system/board/add";

        let param = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                boardTitle : $("#Title").val(),
                boardContent : tinymce.get("detail_cont").getContent(),
                boardType : 'NOTICE',
            })
        }

        return fetch(requestURL, param).then((resolve) => {return resolve.json()});
    }

}