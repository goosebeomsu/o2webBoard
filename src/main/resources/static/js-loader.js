(function() {
    "use strict";

    var jsPath = getScriptLocation("js-loader.js");
    var files;

    // css include
    files = AppLibFiles.CSS;
    for (var key in files) {
        var srcs = files[key];
        for (var idx=0; idx<srcs.length; idx++) {
            document.write("<link rel='stylesheet' type='text/css' href='" + jsPath + srcs[idx] + "'>");
        }
    }

    // js include
    files = AppLibFiles.JS;
    var VERSION = new Date().getTime();
    for (var key in files) {
        var srcs = files[key];
        for (var idx=0; idx<srcs.length; idx++) {
//			document.write("<script src='" + jsPath + srcs[idx] + '?v=' + VERSION + "'></script>");
            document.write("<script src='" + jsPath + srcs[idx] + "'></script>");
        }
    }

    function getScriptLocation(scriptName) {
        var regExp = new RegExp("(^|(.*?\\/))(" + scriptName + ")(\\?|$)");
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            var src = scripts[i].getAttribute("src");
            if (src) {
                var match = src.match(regExp);
                if (match) {
                    return match[1];
                }
            }
        }
        return null;
    }

})();
