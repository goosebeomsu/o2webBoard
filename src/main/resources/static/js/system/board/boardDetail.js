(function () {
    let _class = function (boardType, boardId){
        let $DLG_UI = $("#o2-dialog-01");
        let selectedBoard = boardType;

        const BOARD = o2web.utils.BOARD;
        const boardTitle = BOARD.getTitle(boardType);
        const containFile = BOARD.hasFile(boardType);


        function renderBoardEditPopup() {
            const htmlURL = o2.config.O2Properties.CONTEXTPATH + '/popup/system/board/boardDetail.html';

            o2web.utils.UIUtil.load($DLG_UI.selector, htmlURL).done(function() {
                $DLG_UI.dialog({

                    title : boardTitle,
                    modal : true,
                    width : 800,
                    resizable : false,
                    buttons :[{
                        text : "취소",
                        "class" : "btn",
                        click : function() {
                            o2web.system.board.BrdMain(selectedBoard);
                            $(this).dialog("close");
                        }
                    }, {
                        text : "수정",
                        "class":"btn blue",
                        click : function () {
                            _$selfdig = $(this);
                            //유효성 추가예정
                            updateBoard(boardId).then(value => {
                                o2web.system.board.BrdMain(selectedBoard);
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
                                o2web.system.board.BrdMain(selectedBoard);
                                _$selfdig.dialog("close");
                            })
                        }
                    }],
                    open : function () {
                        getBoardDetail(boardId).then(result => {
                            if(containFile) {
                               o2web.utils.UIUtil.drawFileTransfer();
                               drawFileList(result.files);
                            }
                            drawBoardDetail(result.board)});
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
            const requestURL = o2.config.O2Properties.CONTEXTPATH + '/system/board/delete/' + boardId

            await fetch(requestURL, {method: 'POST'}).then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })

        }

        async function getBoardDetail(boardId) {
            const requestURL = o2.config.O2Properties.CONTEXTPATH + '/system/board/' + boardId

            const result = await fetch(requestURL).then((response) => {
                if(response.ok){
                    return response.json();
                }});

            return result;
        }

        function drawBoardDetail(boardDetail) {
            $DLG_UI.find("#Title").val(boardDetail.boardTitle);
            $DLG_UI.find("#cnt").text(boardDetail.viewCount);
            $DLG_UI.find("#regUsr").text(boardDetail.registrationUser);
            $DLG_UI.find("#regDt").text(boardDetail.registrationDate);

            editData();

            const contentText = boardDetail.boardContent == null ? '' : boardDetail.boardContent;
            tinymce.get("detail_cont").off().on('init',function(){
                this.setContent(contentText);
                return false;
            });
        }

        function drawFileList(fileList) {

            for(let i=0; i<fileList.length; i++) {
                const html = `<div class="h23pop" id=${fileList[i].fileId}>
                            <input title ="첨부파일" id= "fileNmbox" class="fileNamebox" value=${fileList[i].originalFileName} readonly >
                            <input type="hidden" class="fileSvNm" value=${fileList[i].fileName}/>
                            <input type="button" class="addinputFile" id="removeFile" value="x">
                            <i class="fileDownbtn" ></i>
                        </div>`;

                $DLG_UI.find("#file").append(html);

                $(".fileDownbtn").off('click').on('click',function(){
                    downLoadFile(this);
                });

            }

        }

        function downLoadFile(el) {
            const originalFileName = $(el).siblings("#fileNmbox").val();
            const fileName =  $(el).siblings(".fileSvNm").val();

            let formData = new FormData();
            formData.append("fileName", fileName);

            const requestURL = o2.config.O2Properties.CONTEXTPATH + "/system/board/download" + fileName;


            debugger;

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

        renderBoardEditPopup(selectedBoard);
    }

    o2web.system.board = Object.assign(o2web.system.board || {}, {
        BrdDetail : _class
    })
})()