/**
 * @author: nomospace
 * @date: 2012-6-1
 */
define(function(require, exports) {

    $ = require('$');

    $.ajax({
        'type': 'post',
        'url': 'http://photo.163.com/photo/qatest10/dwr/call/plaincall/UserSpaceBean.getUserSpace.dwr',
        'data': {
            'callCount': 1,
            'scriptSessionId': '${scriptSessionId}187',
            'c0-scriptName': 'UserSpaceBean',
            'c0-methodName': 'getUserSpace',
            'c0-id': 0,
            'c0-param0': 'qatest10',
            'batchId': 470676
        }
    }).done(function(result) {
            try {
                !result || result.search('//#DWR') < 0
                    ? console.log('返回数据不合法!')
                    : (new Function(result))();
            } catch (e) {
                console.log(e.message);
            }
        });

    function _ajaxCallback(bid, cid, data) {
//        $.getScript('src/js/data.js', function() {
//            debugger;
//        })
        $.getScript(('http://' + data.cacheFileUrl), function() {
            debugger;
        })
//        $('<iframe src="' + 'http://' + data.cacheFileUrl + '">').appendTo('body');
    }

    dwr = {};
    dwr.engine = {};
    dwr.engine['_remoteHandleCallback'] = _ajaxCallback;

});
