let AppLibFiles = {

    JS: {
        Ref: [
            "lib/o2map/o2map.src.js",
            "lib/tinymce/tinymce.min.js",
            "lib/download/download.js"
        ],

        Core: [
            "js/o2web.js",
            "js/common/commonEvent.js",

            "js/utils/uiUtil.js",
            "js/utils/pageRenderer.js",

            "js/system/board/boardCommon.js",
            "js/system/board/board.js",
            "js/system/board/boardAdd.js",
            "js/system/board/boardDetail.js",
        ]
    },

    CSS: {
        Ref: [

        ],

        Core: [
            "css/custom.css",
            "css/common.css",
            "css/o2udp.css",
            "css/style.css",
            "css/style_setting.css",
            "css/colormap-style.css",
            "css/linepattern-style.css",
            "css/style_override.css",
        ]
    }

}

if (typeof exports !== "undefined") {
    exports.AppLibFiles = AppLibFiles;
}