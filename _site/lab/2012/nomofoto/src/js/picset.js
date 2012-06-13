/**
 * User: nomospace
 * Date: 5/6/12
 * Time: 11:06 PM
 */
define(function(require, exports, module) {
    $ = require('$');

    $.ajax({
        'type': 'post',
        'url': 'http://photo.163.com/share/jinlu_hz/dwr/call/plaincall/PicSetInteractionBean.getShareLikeList.dwr',
        'data': {
            'callCount': 1,
            'scriptSessionId': '${scriptSessionId}187',
            'c0-scriptName': 'PicSetInteractionBean',
            'c0-methodName': 'getShareLikeList',
            'c0-id': 0,
            'c0-param0': 11394261,
            'c0-param1': 0,
            'c0-param2': 25,
            'c0-param3': 0,
            'batchId': 760042
        }
    }).done(function(result) {
            debugger;
            try {
                !result || result.search('//#DWR') < 0
                    ? console.log('返回数据不合法!')
                    : (new Function(result))();
            } catch (e) {
                console.log(e.message);
            }
        });
});
