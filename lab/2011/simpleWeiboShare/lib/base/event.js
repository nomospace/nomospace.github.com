/**
 * ==========================================================================================
 * 页面事件接口实现文件<br/>
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
(function(window,document){
// private
var __akey = '__'+new Date().getTime()+'__'; // cache sn attr in element
/*
 * 事件缓存对象，结构大致如下所示：<br/>
 * <pre>
 * { '1232344232':{elm:element0,
 *                 evn:{mouseover:function1,
 *                      click:function0}},
 *   '1232344233':{elm:element1,
 *                 evn:{mouseover:function2,
 *                      click:[function3,function4]}}
 * }
 * </pre>
 */
var __events = {};
/*
 * 新增一个全新的缓存事件，同时会在传入的节点上增加标识属性。
 * @param  {Node}     _element 事件源对象
 * @param  {String}   _type    事件类型
 * @param  {Function} _handler 事件处理过程
 * @return {Void}
 */
var __cacheEventWithoutCached = function(_element,_type,_handler){
    var _sn = 'ev_'+U._$randNumberString(),_object = {evn:{}};
    _object.evn[_type] = _handler; _object.elm = _element;
    __events[_sn] = _object; _element[__akey] = _sn;
};
/*
 * 在原有缓存基础上增加一个指定类型的事件
 * @param  {String}   _sn      缓存的键值
 * @param  {String}   _type    事件类型
 * @param  {Function} _handler 事件处理过程
 * @return {Void}
 */
var __cacheEventWithCached = function(_sn,_type,_handler){
    var _object = __events[_sn].evn,_function = _object[_type];
    if (!_function){_object[_type]=_handler;return;}
    if (!U._$isType(_function,'array')){
        _object[_type]=[_function,_handler];return;
    }
    _function.push(_handler);
};
/*
 * 缓存对象监听的事件，忽略对window和document对象上的事件缓存
 * @param  {HTMLElement} _element  事件源对象
 * @param  {String}      _type     事件类型
 * @param  {Function}    _handler  事件处理过程
 * @return {Void}
 */
var __cacheEvent = function(_element,_type,_handler){
    if (_element==window||_element==document||
        _element==top||_element==parent) return;
    var _sn = _element[__akey];
    _sn ? __cacheEventWithCached(_sn,_type,_handler)
        : __cacheEventWithoutCached(_element,_type,_handler);
};
/*
 * 根据缓存序列号清除元素指定类型的事件，
 * 没有事件类型则清除所有事件
 * @param  {String} _sn   缓存序列号
 * @param  {String} _type 事件类型
 * @return {Void}
 */
var __clearEventInCache = function(_sn,_type){try{
    var _cache = __events[_sn];
    if (!_cache) return;
    if (!!_type){
        var _handler = _cache.evn[_type];
        if (!_handler) return;
        if (!U._$isType(_handler,'array'))
            V._$delEvent(_cache.elm,_type,_handler);
        else
            for(var h;h=_handler.pop();
                V._$delEvent(_cache.elm,_type,h));
        delete _cache.evn[_type]; return;
    }
    // clear all event added in element
    __clearCacheWithSN(_sn);
}catch(e){}};
/*
 * 清除所有事件，在页面卸载之前清除所有对象上的事件，以便系统能及时回收内存。
 * @return {Void}
 */
var __clearEventsInCache = function(){
    for (var _sn in __events) try{__clearCacheWithSN(_sn);}catch(e){}
};
/*
 * 清除指定序列号的缓存
 * @param  {String} _sn 缓存序列号
 * @return {Void}
 */
var __clearCacheWithSN = function(_sn){
    var _cache = __events[_sn];
    if (!_cache) return;
    for(var _type in _cache.evn)
        !!_type && __clearEventInCache(_sn,_type);
    _cache.elm[__akey] = '';
    delete _cache.elm;
    delete _cache.evn;
    delete __events[_sn];
};
/*
 * IE下IFrame onload事件触发回调
 * @param  {Function} _callback onload回调
 * @param  {Event}    _event    触发事件对象
 * @return {Void}
 */
var __onReadyStateChange = function(_callback,_event){
    var _element = V._$getElement(_event)||document;
    if (!_element||
       (_element.readyState!='loaded'&&
        _element.readyState!='complete'))
        return;
    _callback(_event);
};
/*
 * 判断是否用onreadystatechange以下情况使用：
 *  iframe/script  onload
 *  document       onDOMContentLoaded
 * @param  {Node}   _element 节点对象
 * @param  {String} _type    事件类型
 * @return {Void}
 */
var __isOnReadyStateChange = function(_element,_type){
    var _tag = (_element.tagName||'').toLowerCase();
	return B._$ISIE&&((_element==document&&_type=='DOMContentLoaded')
	               ||((_tag=='iframe'||_tag=='script')&&_type=='load'));
};
// 添加、删除事件接口
var __addEvent,__delEvent;
if (!!document.addEventListener) {
__addEvent = function(_element,_type,_handler,_capture){
    _element.addEventListener(_type,_handler,!!_capture);
};
__delEvent = function(_element,_type,_handler,_capture){
    _element.removeEventListener(_type,_handler,!!_capture);
};
}else{
__addEvent = function(_element,_type,_handler){
    _element.attachEvent('on'+_type,_handler);
};
__delEvent = function(_element,_type,_handler){
    _element.detachEvent('on'+_type,_handler);
};}
// interface
P('V');
/*
 * 资源销毁接口
 * @return {Void}
 */
V.__destroy = __clearEventsInCache;
/**
 * 获取触发事件的节点，可以传入过滤接口来遍历父节点找到符合条件的节点
 * @param  {Event}    _event  事件对象
 * @param  {Function} _filter 过滤接口
 * @return {Node}             符合条件的节点
 */
V._$getElement = function(_event){
    if (!_event) return null;
    var _element = _event.target||_event.srcElement;
    if (!arguments[1]||!U._$isType(arguments[1],'function'))
        return _element;
    while(_element){
        if (!!arguments[1](_element))
            return _element;
        _element = _element.parentNode;
    }
    return null;
};
/**
 * 给节点添加监听事件，忽略处理给定的对象不存在或者事件类型或者事件处理过程没有指定的情况。
 * @param  {String|Node} _element 要添加事件的节点ID或者节点对象
 * @param  {String}      _type    事件类型
 * @param  {Function}    _handler 事件处理过程
 * @param  {Boolean}     _capture 是否捕获阶段
 * @return {Void}
 */
V._$addEvent = function(_element,_type,_handler,_capture){
    _element = E._$getElement(_element);
    if (!_element||!_type||!_handler) return;
    if (__isOnReadyStateChange(_element,_type)){
        _type = 'readystatechange';
        _handler = __onReadyStateChange._$bind(null,_handler);
    }
    if (B._$ISIE&&_type=='input') _type = 'propertychange';
    __addEvent(_element,_type,_handler,_capture);
    __cacheEvent(_element,_type,_handler);
};
/**
 * 批量给若干节点添加监听事件
 * @param {Array} _elements		要添加事件的节点ID或者节点对象
 * @param {Object} _type		事件类型
 * @param {Object} _handler		事件处理过程
 */
V._$batchEvent = function(_elements,_mode,_type,_handler,_capture){
	var _function;
    switch (_mode) {
        case 'add':_function = V._$addEvent;break;
        case 'del':_function = V._$delEvent;break;
        case 'clear':_function = V._$clearEvent;break;
    }
    for (var e;e=_elements.pop();
		    _function(e,_type,_handler,_capture)); 
};
/**
 * 删除节点的监听事件，不删除缓存里面的数据
 * @param  {String|Node} _element 要添加事件的节点ID或者节点对象
 * @param  {String}      _type    事件类型
 * @param  {Function}    _handler 事件处理过程
 * @param  {Boolean}     _capture 是否捕获阶段
 * @return {Void}
 */
V._$delEvent = function(_element,_type,_handler,_capture){
    _element = E._$getElement(_element);
    if (!_element||!_type||!_handler) return;
    __delEvent(_element,_type,_handler,_capture);
};
/**
 * 清除指定节点上某一类型的所有事件
 * 没有事件类型则清除该节点上的所有事件
 * @param  {String|Node} _element 节点ID或者对象
 * @param  {String}      _type    事件类型
 * @return {Void}
 */
V._$clearEvent = function(_element,_type){
    _element = E._$getElement(_element);
    if (!_element) return;
    if (__isOnReadyStateChange(_element,_type))
        _type = 'readystatechange';
    if (B._$ISIE&&_type=='input')
        _type = 'propertychange';
    __clearEventInCache(_element[__akey],_type);
};
/**
 * 触发对象的某个鼠标事件
 * @param  {String|Node} _element 节点ID或者对象
 * @param  {String}      _type    鼠标事件类型
 * @return {Void}
 */
V._$dispatchEvent = function(_element,_type){
    _element = E._$getElement(_element);
    if (!_element) return;
    if (!!document.createEvent){
        var _event = document.createEvent('MouseEvent');
        _event.initEvent(_type,false,false);
        _element.dispatchEvent(_event);
    }else if (!!document.createEventObject){
		// IFRAME下触发的事件输入当前事件对象
        _element.fireEvent('on'+_type,arguments[2]||window.event||document.createEventObject());
    }
};
/**
 * 阻止事件，包括默认事件和传递事件
 * @param  {Event} _event 要阻止的事件对象
 * @return {Void}
 */
V._$stop = function(_event){
    V._$stopBubble(_event);
    V._$stopDefault(_event);
};
/**
 * 阻止事件的冒泡传递
 * @param  {Event} _event 要阻止的事件对象
 * @return {Void}
 */
V._$stopBubble = function(_event){
    if (!_event) return;
    !!_event.stopPropagation
    ? _event.stopPropagation()
    : _event.cancelBubble = true;
};
/**
 * 阻止标签的默认事件
 * @param  {Event} _event 要阻止的事件对象
 * @return {Void}
 */
V._$stopDefault = function(_event) {
    if (!_event) return;
    !!_event.preventDefault
    ? _event.preventDefault()
    : _event.returnValue = false;
};
/**
 * 计算当前事件触发时，鼠标距离页面左侧的位置
 * @param  {Event} _event 触发事件对象
 * @return {Number}       鼠标距离页面左侧的位置
 */
V._$pointerX = function(_event){
    if (!_event) return 0;
    return _event.pageX||(_event.clientX+
           (document.documentElement.scrollLeft||document.body.scrollLeft));
};
/**
 * 计算当前事件触发时，鼠标距离页面顶部的位置
 * @param  {Event} _event 触发事件对象
 * @return {Number}       鼠标距离页面顶部的位置
 */
V._$pointerY = function(_event){
    if (!_event) return 0;
    return _event.pageY||(_event.clientY+
           (document.documentElement.scrollTop||document.body.scrollTop));
};
})(this,document);
