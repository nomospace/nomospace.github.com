/**
 * @author: nomospace
 * @date: 2012-6-1
 */
define(function(require, exports, module) {
    var $ = require('$');

    function Request(url, options, success, error) {
        if (!url) {
            return;
        }
        $.ajax({
            type: 'post',
            url: url,
            data: $.extend(options, {
                callCount: 1,
                scriptSessionId: '${scriptSessionId}187'
            }),
            success: function(object, status, xhr) {
                if (object.success) {
                    success && success(object.data, status, xhr);
                } else {
                    error && error();
                }
            },
            error: function() {
                error && error();
            }
        })
    }

    module.exports = Request;
});
