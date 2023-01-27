var AppLibFiles = {

    JS: {
        Ref: [
        ],

        Core: [
            "js/o2web.js",
            "js/common/commonEvent.js",
            "js/utils/uiUtil.js",
            "js/system/board/boardAdd.js",
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
            "css/style_override.css" // 이게 항상 제일 밑이 있도록 유지
        ]
    }

}

if (typeof exports !== "undefined") {
    exports.AppLibFiles = AppLibFiles;
}