(function () {
    let _class = function (boardType, boardId){
        let $DLG_UI = $("#o2-dialog-01");

        function renderBoardEditPopup() {

            let htmlURL = o2.config.O2Properties.CONTEXTPATH + '/popup/system/board/boardDetail.html';

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
                            o2web.system.board.BrdMain();
                            $(this).dialog("close");
                        }
                    }, {
                        text : "수정",
                        "class":"btn blue",
                        click : function () {
                            _$selfdig = $(this);
                            //유효성 추가예정
                            updateBoard(boardId).then(value => {
                                o2web.system.board.BrdMain();
                                _$selfdig.dialog("close");
                            })
                        }
                    }, {
                        text : "삭제",
                        "class" : "btn float-left",
                        click : function(){
                            _$selfdig = $(this);
                            //유효성 추가예정
                            deleteBoard(boardId).then(value => {
                                o2web.system.board.BrdMain();
                                _$selfdig.dialog("close");
                            })
                        }
                    }],
                    open : function () {
                        //데이터 넣고 그 다음 에딧데이터
                        getBoardDetail(boardId).then(boardDetail => drawBoardDetail(boardDetail));
                    },
                    close : function(){
                        tinymce.execCommand("mceRemoveEditor", false, "detail_cont");
                        $(this).dialog("destroy").empty();
                    }

                });
            });



        }

        async function updateBoard(boardId) {
            let requestURL = o2.config.O2Properties.CONTEXTPATH + '/system/board/update/' + boardId

            let param = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(getBoardParam())
            }

            await fetch(requestURL, param).then((response) => {
                if(response.ok){
                    return response.json()
                }
            });

        }

        async function deleteBoard(boardId) {
            let requestURL = o2.config.O2Properties.CONTEXTPATH + '/system/board/delete/' + boardId

            await fetch(requestURL, {method: 'POST'}).then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })

        }

        async function getBoardDetail(boardId) {
            let requestURL = o2.config.O2Properties.CONTEXTPATH + '/system/board/' + boardId

            let boardDetail = await fetch(requestURL).then((response) => {
                if(response.ok){
                    return response.json();
                }});

            return boardDetail;
        }

        function drawBoardDetail(boardDetail) {
            $DLG_UI.find("#Title").val(boardDetail.boardTitle);
            $DLG_UI.find("#cnt").text(boardDetail.viewCount);
            $DLG_UI.find("#regUsr").text(boardDetail.registrationUser);
            $DLG_UI.find("#regDt").text(boardDetail.registrationDate);

            editData();

            let contentText = boardDetail.boardContent == null ? '' : boardDetail.boardContent;
            tinymce.get("detail_cont").off().on('init',function(){
                this.setContent(contentText);
                return false;
            });
        }

        function getBoardParam() {
            let param = {
                boardTitle : $DLG_UI.find("#Title").val(),
                boardContent :tinymce.get("detail_cont").getContent(),
                boardId : boardId,
            }

            return param;
        }

        function editData(){
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

        renderBoardEditPopup();
    }

    o2web.system.board = Object.assign(o2web.system.board || {}, {
        BrdDetail : _class
    })
})()