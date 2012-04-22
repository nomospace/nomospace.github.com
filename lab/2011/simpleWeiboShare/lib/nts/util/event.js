/**
 * ==========================================================================================
 * 事件管理接口实现文件<br/>
 * 代码书写规范简述：<br/>
 * <pre>
 *    变量/接口前缀        描述                                           发布时是否混淆
 * ------------------------------------------------------------------------------------------
 *    _                  接口内局部变量或者传递的参数                            Y
 *    _$                 对象外可访问的接口或者属性                             Y/N
 *                       此类接口不允许以字符串形式出现
 *                       如果项目所有js文件一起混淆可以考虑混淆
 *    _$$                类对象，同_$前缀的处理                                Y/N
 *    __                 对象外不可访问的接口或者属性                            Y
 *    无                 没有前缀的接口或者属性可以在对象外访问                     N
 *                       代码中可以以字符串的形式出现
 *    X                  单个大写字母命名表示集合了一些通用的属性和接口的对象
 *                       代码中禁止出现单个大写字母命名的变量                      N
 * ------------------------------------------------------------------------------------------
 * </pre>
 * @version  1.0
 * @author   genify(caijf@163.org)
 * ==========================================================================================
 */
(function(){
// private
var p = P(N.ut), // util namespace
    __proEvent;  // class prototype
// interface
/**
 * 事件管理对象
 * @constructor
 * @class 事件管理对象
 */
p._$$Event = C();
__proEvent = p._$$Event.prototype;
/**
 * 事件管理对象初始化函数
 * @return {Void}
 */
__proEvent._$initialize = function(){
    this.__events = {};
};
/**
 * 添加事件
 * @param  {String}   _type  事件类型，不区分大小写
 * @param  {Function} _event 事件处理过程
 * @return {Void}
 */
__proEvent._$addEvent = function(_type,_event){
    if (!_type || !_event || 
        !U._$isType(_event,'Function')) return;
    this.__events[_type.toLowerCase()] = _event;
};
/**
 * 批量添加事件
 * @param  {Object} _event 事件集合
 * @return {Void}
 */
__proEvent._$batEvent = function(_event){
    if (!_event) return;
    for(var p in _event)
        this._$addEvent(p,_event[p]);
};
/**
 * 删除事件
 * @param  {String} _type 事件类型，不区分大小写
 * @return {Void}
 */
__proEvent._$delEvent = function(_type){
    if (!_type) return;
    delete this.__events[_type.toLowerCase()];
};
/**
 * 获取指定类型的事件对象
 * @param  {String} _type 事件类型，不区分大小写
 * @return {Function}     事件函数
 */
__proEvent._$getEvent = function(_type){
    return this.__events[_type.toLowerCase()] || null;
};
/**
 * 调用事件
 * @param  {String}   _type 事件类型，不区分大小写
 * @param  {Variable} [arg0[,arg1...]] 事件可接受参数
 * @return {Void}
 */
__proEvent._$dispatchEvent = function(){
    if (!arguments.length) return;
    var _type  = Array.prototype.shift.apply(arguments),
        _event = this.__events[_type.toLowerCase()];
    if (!!_event) return _event.apply(window,arguments);
};
})();
