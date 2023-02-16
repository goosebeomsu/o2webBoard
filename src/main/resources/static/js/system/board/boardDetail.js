(function () {
    let _class = function (boardType, boardId){
        let $DLG_UI = $("#o2-dialog-01");
        let selectedBoard = boardType;
        let _fileInputNum = 0;
        let _deleteFileIdArr=[];


        const BOARD = o2web.system.board.CmmnEvent;
        const boardTitle = BOARD.getTitle(boardType);
        const isHasFile = BOARD.hasFile(boardType);


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
                            updateBoard(boardId).done(function(data){
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
                            if(isHasFile) {
                               o2web.utils.UIUtil.drawFileTransfer();
                               drawFileList(result.files);
                            }
                            drawBoardDetail(result.board)});
                        dynamicEvent();

                    },
                    close : function(){
                        tinymce.execCommand("mceRemoveEditor", false, "detail_cont");
                        $(this).dialog("destroy").empty();
                    }

                });
            });



        }

        function updateBoard(boardId) {
            const deferred = $.Deferred();
            const requestURL = '/system/board/update/' + boardId

            o2.utils.Http.requestData(requestURL, getBoardParam()).done(function (result) {
                if (result.SUCCESS) {
                    if (isHasFile) {
                        updateFiles(result.boardId).done(function (result) {
                            if (result === "success") {
                                deferred.resolve("success");
                            }
                        })
                    } else {
                        deferred.resolve("success");
                    }
                } else {
                    alert(result.MESSAGE)
                    deferred.reject('fail');
                }
            })
            return deferred.promise();
        }

        function updateFiles(boardId) {
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
            formData.append("deleteFileIds", _deleteFileIdArr);

            o2.utils.Http.requestMultipart("/system/board/updateFiles", formData).done(function (result) {
                if (result.SUCCESS) {
                    deferred.resolve("success");
                } else {
                    alert(result.MESSAGE);
                    deferred.reject("fail");
                }
            });

            return deferred.promise();

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
            addEvent();

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
                    downloadFile(this);
                });

            }

        }

        function downloadFile(el) {

            try {
                const originalFileName = $(el).siblings("#fileNmbox").val();
                const fileName = $(el).siblings(".fileSvNm").val();

                let formData = new FormData();
                formData.append("fileName", fileName); // 파일명

                const requestURL = o2.config.O2Properties.CONTEXTPATH + "/system/board/download";

                let xhr = new XMLHttpRequest();

                addListeners(xhr);

                xhr.open("POST", requestURL, true);
                xhr.responseType = "blob";
                xhr.onload = function(e) {
                    if (xhr.status === 200) {
                        if (xhr.response.size === 0) {
                            alert("파일이 존재하지 않습니다")
                        } else {
                            download(xhr.response, originalFileName, "application/octet-stream;charset=UTF-8");
                        }
                    }
                }
                xhr.send(formData);
            } catch (e) {
                alert("실패");
            }

        }

        function addListeners(xhr) {
            xhr.addEventListener('loadstart', function(){o2.utils.Http.showLoading(true);});
            xhr.addEventListener('loadend', function(){o2.utils.Http.showLoading(false);});
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

        function dynamicEvent(){
            $(document).on("click","#removeFile",function(e){
                e.preventDefault();
                e.stopPropagation();

                const fileId = $(this).closest("div").prop("id");

                _deleteFileIdArr.push(fileId);
                $(this).closest("div").remove();
            });
        }

        function addEvent() {
            $DLG_UI.find("#addinputFile").off("click").on("click",function(){
                let i = _fileInputNum++;
                let html = `<div class="h23pop newFile" >
                            <input id= "fileNmbox" class="fileNamebox" value="" readonly >
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

        renderBoardEditPopup(selectedBoard);
    }

    o2web.system.board = Object.assign(o2web.system.board || {}, {
        BrdDetail : _class
    })
})()