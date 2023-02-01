(function (){

    let _class = function (boardType) {

        let $DLG_UI = $("#o2-dialog-01");

        function renderBoardAddPopup() {

            let htmlURL = o2.config.O2Properties.CONTEXTPATH + '/popup/system/board/boardAdd.html';

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
                            addBoard().then(value => {
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

        function addBoard() {

            let requestURL = o2.config.O2Properties.CONTEXTPATH + '/system/board/add';

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

        renderBoardAddPopup();
    }

    o2web.system.board = Object.assign(o2web.system.board || {}, {
        BrdAdd : _class
    })

}) ()