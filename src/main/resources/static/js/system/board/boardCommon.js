(function () {
    let _class = {
        getTitle : function (boardType) {
            if (boardType === 'NOTICE') {
                return '공지사항';
            }
            if (boardType === 'DATA_ROOM') {
                return '자료실';
            }
        },

        hasFile : function (boardType) {
            if (boardType === 'DATA_ROOM') {
                return true;
            }
            return false;
        },

        fileNameRefresh : function (fileNameContainPath) {
            let fileFullName = fileNameContainPath.slice(fileNameContainPath.lastIndexOf('\\')+1);
            let fileName = fileFullName.slice(0,fileFullName.lastIndexOf('.'));
            let ext = fileFullName.slice(fileFullName.lastIndexOf('.'));

            let fileArr = [];
            $(".fileNamebox").each(function (i,el) {
                fileArr.push($(el).val());
            });

            let refreshCnt = 0;
            while(fileFullName != '' && fileArr.indexOf(fileFullName) >= 0 ){
                //변경 시작해야됨.
                refreshCnt++;

                if(refreshCnt >1){
                    fileName = fileName.substr(0,fileName.length-3);
                }
                fileName = fileName+'('+refreshCnt +')';
                fileFullName = fileName + ext;
            }

            return fileFullName;
        },

    }

    o2web.system.board = Object.assign(o2web.system.board || {}, {
        CmmnEvent : _class
    })
})()