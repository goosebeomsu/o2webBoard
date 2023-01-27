(function(){
    let _class = {
        load : function($id, url) {
            var deferred = $.Deferred();

            if ($($id).length == 0) {
                console.log("[" + $id + "] is null");
                deferred.resolve();
            } else {
                $($id).load(url, function(a, b) {
                    deferred.resolve();
                });
            }

            return deferred.promise();
        },
    }

    o2web.utils = Object.assign(o2web.utils || {}, {
        UIUtil : _class
    });
})()