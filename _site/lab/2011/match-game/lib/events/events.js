/**
 * 事件管理接口实现文件
 */
define(function(require, exports, module) {
    var Class = require('class');
    var proto;  // class prototype
    // interface
    /**
     * 事件管理对象
     * @constructor
     * @class 事件管理对象
     */
    var Events = Class();
    proto = Events.prototype;
    /**
     * 事件管理对象初始化函数
     * @return {Void}
     */
    proto.initialize = function() {
        this.events = {};
    }
    /**
     * 添加事件
     * @param  {String}   _type  事件类型，不区分大小写
     * @param  {Function} _event 事件处理过程
     * @return {Void}
     */
    proto.addEvent = function(_type, _event) {
        if (!_type || !_event ||
            !isFunction(_event)) return null;
        this.events[_type.toLowerCase()] = _event;
    }
    /**
     * 批量添加事件
     * @param  {Object} _event 事件集合
     * @return {Void}
     */
    proto.batEvent = function(_event) {
        if (!_event) return null;
        for (var p in _event)
            this.addEvent(p, _event[p]);
    }
    /**
     * 删除事件
     * @param  {String} _type 事件类型，不区分大小写
     * @return {Void}
     */
    proto.delEvent = function(_type) {
        if (!_type) return null;
        delete this.events[_type.toLowerCase()];
    }
    /**
     * 获取指定类型的事件对象
     * @param  {String} _type 事件类型，不区分大小写
     * @return {Function}     事件函数
     */
    proto.getEvent = function(_type) {
        return this.events[_type.toLowerCase()] || null;
    }
    /**
     * 调用事件
     * @param  {String}   _type 事件类型，不区分大小写
     * @param  {Variable} [arg0[,arg1...]] 事件可接受参数
     * @return {Void}
     */
    proto.dispatchEvent = function() {
        if (!arguments.length) return null;
        var _type = Array.prototype.shift.apply(arguments);
        var _event = this.events[_type.toLowerCase()];
        if (!!_event) return _event.apply(window, arguments);
    }

    function isFunction(val) {
        return Object.prototype.toString.call(val) === '[object Function]';
    }

    module.exports = Events;
});
