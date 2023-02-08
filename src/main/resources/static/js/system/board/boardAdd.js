(function (){

    let _class = function (boardType = 'NOTICE') {

        let $DLG_UI = $("#o2-dialog-01");
        let selectedBoard = boardType;
        let _fileInputNum = 0;

        const BOARD = o2web.utils.BOARD;
        const boardTitle = BOARD.getTitle(boardType);
        const containFile = BOARD.hasFile(boardType);

        function renderBoardAddPopup() {

            const htmlURL = o2.config.O2Properties.CONTEXTPATH + '/popup/system/board/boardAdd.html';

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
                            $(this).dialog("close");
                        }
                    }, {
                        text : "추가",
                        "class":"btn blue",
                        click : function () {
                            _$selfdig = $(this);
                            //유효성 추가예정
                            addBoard().then(value => {
                                o2web.system.board.BrdMain(selectedBoard);
                                _$selfdig.dialog("close");
                            })
                        }
                    }],
                    open : function (){
                        if(containFile) {
                            o2web.utils.UIUtil.drawFileTransfer()
                        }
                        editData();
                        addEvent();
                        removeFileInput();
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
            let deferred = $.Deferred();

            const param = {
                boardTitle : $("#Title").val(),
                boardContent : tinymce.get("detail_cont").getContent(),
                boardType : selectedBoard,
            }

            o2.utils.Http.requestData('/system/board/add', param).done(function(result) {
                if (result.SUCCESS) {
                    if(containFile){
                        uploadFile(result.boardId).done(function(result){
                            if(result == "success"){
                                deferred.resolve(result.boardId);
                            }
                        });
                    } else {
                        deferred.resolve(result.boardId);
                    }
                } else {
                    deferred.reject("fail");
                }
            });

            return deferred.promise();
        }

        function addEvent() {
            $DLG_UI.find("#addinputFile").off("click").on("click",function(){
                let i = _fileInputNum++;
                let html = `<div class="h23pop newFile" > 
                            <input class="fileNamebox"  readonly > 
                            <input type="button" class="addinputFile" id="removeFile" value="x">
                             <label for=${"brdFile" + i}> <i class="searchfile"></i> 
                             </label>
                             <input type="file" class="inputfile" id=${"brdFile" + i}>
                            </div>`
                $DLG_UI.find("#file").append(html);

                //유효성검사 추가하기

                $(".inputfile").off('change').on('change',function(){
                    let fileName = $(this).val();
                    $(this).siblings(".fileNamebox").val(BOARD.fileNameRefresh(fileName));
                })

            })

        }

        function removeFileInput(){
            $(document).on("click","#removeFile",function(){
                $(this).closest("div").remove();

            });
        }

        function uploadFile(boardId) {
            let deferred = $.Deferred();

            let formData = new FormData();
            let inputFile = $(".inputfile");

            inputFile.each(function (e,item){
                //파일 없으면 패스
                if(item.files.length > 0){
                    formData.append("uploadFile",item.files[0]); //해당 파일 추가
                }
            });

            formData.append("boardId", boardId);

            o2.utils.Http.requestMultipart("/system/board/uploadFiles", formData).done(function (result) {
                if (result.SUCCESS) {
                    deferred.resolve("success");
                } else {
                    deferred.reject("fail");
                }
            });
            return deferred.promise();
        }

        renderBoardAddPopup(selectedBoard);
    }

    o2web.system.board = Object.assign(o2web.system.board || {}, {
        BrdAdd : _class
    })

}) ()