(function () {
    let _class = function () {
        const _rowSize = o2web.data.config

        let _param = null;

        function initialize() {
            _param = {
                searchType : null,
                searchValue : null,
                pageNumber : null,
                rowSize : null,
            }

            drawList();
        }

        function drawList(pageNum = 1) {
            _param = {
                searchType : null,
                searchValue : null,
                pageNumber : pageNum,
                rowSize : _rowSize,
            }

            o2web.data.groupCode.CmmnEvent.getGroupCodeList(_param).done((result) => drawGroupCodeList(result))

        }

        function drawGroupCodeList({}) {

        }
    }
})()