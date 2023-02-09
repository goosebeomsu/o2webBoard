(function(){
    let _class = {
        load : function($id, url) {
            let deferred = $.Deferred();

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

        drawFileTransfer : function () {
            const html = `<tr>
                            <th>파일첨부<input type="button" class ="addinputFile" id="addinputFile" value="추가"></th>
                            <td id="file" colspan="3"></td>
                            </tr>`

            const $html = $(html);
            $(".brdpop").find("tbody").append($html);
        },

    }

    o2web.utils = Object.assign(o2web.utils || {}, {
        UIUtil : _class
    });
})()