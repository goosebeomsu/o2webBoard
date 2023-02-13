(function (){
    let _class = {
        getGroupCodeList : function (param) {
            const deferred = $.Deferred();
            const requestURL = 'data/groupCode/getGroupCodeList'

            o2.utils.Http.requestData(requestURL, param).done(result => {
                if (result.SUCCESS) {
                    deferred.resolve(result.RESULT);
                } else {
                    deferred.resolve(false);
                }
            })

            return deferred.promise();

        },
    }

    o2web.data.groupCode = Object.assign(o2web.data.groupCode || {}, {
        CmmnEvent : _class
    })
})()