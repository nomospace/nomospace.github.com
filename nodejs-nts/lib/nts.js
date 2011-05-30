var sys = require('sys'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
 	jsdom = require("jsdom"),
	parser = require("htmlparser");

browser = jsdom.windowAugmentation(jsdom.defaultLevel, {parser: parser});
browser.window.eval = eval;
window = browser.window;
document = browser.window.document;
location = window.location;
navigator = window.navigator;
(function(window,document){
// private
var __extflag = {};  // extend flag for avoid init when extending
/*
 * 默认初始化函数
 * @return {Void}
 */
var __initialize = function(){
    this._$super.apply(this,arguments);
};
/*
 * 模拟实现继承策略，提供子类构造函数调用父类构造函数的接口
 * @param  {Function} _super  父类对象
 * @param  {Boolean}  _static 是否继承静态接口
 * @return {Object}           类的原型对象
 */
var __extend = function(_super,_static){
    if (!_super||!U._$isType(_super,'function')
               ||!U._$isType(this,'function')) return;
    // extend static methods
    if (!!_static)
        for(var _method in _super)
            if (U._$isType(_super[_method],'function'))
                this[_method] = _super[_method];
    // extend instance properties and methods
    this._$super = _super;
    this._$supro = _super.prototype;
    this.prototype = new _super(__extflag);
    this.prototype.constructor = this;
    this.prototype._$initialize = __initialize;
    // for super initialize
    var _superp = _super;
    this.prototype._$super = function(){
        var _init = _superp.prototype._$initialize;
        _superp = _superp._$super||_super;
        return !!_init&&_init.apply(this,arguments);
    };
    return this.prototype;
};
/*
 * 模拟实现多继承，将其他类对接口的实现拷贝到当前类
 * @param  {Function} _args 其他类，参数前面类的实现优先级高
 * @return {Object}
 */
var __implement = function(){
	var _this = this.prototype;
	for(var i=0,l=arguments.length,_class,_prototype;i<l;i++){
		_class = arguments[i];
		if (!U._$isType(_class,'function')) continue;
		_prototype = _class.prototype;
		for(var x in _prototype)
			if (U._$isType(_prototype[x],'function'))
			    _this[x] = _prototype[x];
	}
	return _this;
};
/*
 * 接口绑定
 * @param  {Object}   _object 需要保持一致的对象，null表示window对象
 * @param  {Variable} [argument0[,argument1 ...]] 函数调用时需要的参数
 * @return {Function} 返回绑定后的事件函数
 */
var __bind = function() {
    var _function = this, _args = arguments,
        _object = Array.prototype.shift.call(arguments);
    return function(){
        Array.prototype.push.apply(arguments,_args);
        return _function.apply(_object||window,arguments);
    }
};
// interface
/**
 * 只读空对象实例
 * @type Object
 */
window.O = {};
/**
 * 空函数实例
 * @return {Void}
 */
window.F = function(){return false;};
/**
 * 返回指定的命名空间，如果不存在则新建一个命名空间<br/>
 * <pre>
 *   P("ui.package");
 *   P("window.ui.package");
 *   // 以上两者都将建立 window.ui, 然后返回 window.ui.package
 * </pre>
 * 注意：命名空间不要使用浏览器保留的关键字
 * @param  {String} _namespace 命名空间的名称
 * @return {Object}            生成的命名空间对象    
 */
window.P = function(_namespace){
    if (!_namespace||!_namespace.length) return null;
    var _package = window;
    for(var a=_namespace.split('.'),
            l=a.length,i=(a[0]=='window')?1:0;i<l;
            _package=_package[a[i]]=_package[a[i]]||{},i++);
    return  _package;
};
/**
 * 创建类对象，_$initialize作为所有类的初始化函数，如果类继承自其他类，
 * 则初始化函数中可以使用this._$super([arg0[,arg1...]])调用父类的初始化函数
 * @return {Function} 返回创建的类对象实体
 */
window.C = function(){
    var _class = function(){
        // avoid call initialize when extending
        if (arguments[0]!=__extflag&&!!this._$initialize)
            return this._$initialize.apply(this,arguments);
    };
    _class._$extend = __extend;
	_class._$implement = __implement;
    return _class;
};
/**
 * 绑定接口及参数，使其的调用对象保持一致
 * @param  {Object}   _object 需要保持一致的对象，null表示window对象
 * @param  {Variable} [argument0[,argument1 ...]] 函数调用时需要的参数
 * @return {Function} 返回绑定后的函数
 */
Function.prototype._$bind = function() {
    var _function = this, _args = arguments,
        _object = Array.prototype.shift.call(arguments);
    return function(){
        var _argc = Array.prototype.slice.call(_args,0);
        Array.prototype.push.apply(_argc,arguments);
        return _function.apply(_object||window,_argc);
    };
};
/**
 * 绑定接口及参数，使其的调用对象保持一致，
 * 该接口与_$bind接口的差别在于绑定时参数和调用时参数的顺序不一样，
 * _$bind优先传入绑定时参数
 * _$bind2优先传入调用时参数
 * @param  {Object}   _object 需要保持一致的对象，null表示window对象
 * @param  {Variable} [argument0[,argument1 ...]] 函数调用时需要的参数
 * @return {Function} 返回绑定后的事件函数
 */
Function.prototype._$bind2 = __bind;
/**
 * 作为事件接口绑定，使得事件触发的时候能保持接口调用对象的一致，事件对象为第一个参数。
 * 不建议调用此接口，建议使用_$bind2接口
 * @deprecated
 * @param  {Object}   _object 需要保持一致的对象，null表示window对象
 * @param  {Variable} [argument0[,argument1 ...]] 函数调用时需要的参数
 * @return {Function} 返回绑定后的事件函数
 */
Function.prototype._$bindAsEventListener = __bind;
// init config
var p = window.P('N');
p.rc = p.rc||{};               // root config
p.xd = p.xd||[];               // crossdomain list
p.tm = p.tm||{};                // ui theme config
p.ui = p.ui||'ntes.ui';        // ui namespace
p.ut = p.ut||'ntes.util';      // util namespace
p.gb = p.gb||'ntes.global';    // global namespace
p.gw = p.gw||'ntes.widget';    // global widget namespace
p.fw = p.fw||'ntes.framework'; // framework namespace
// init root config
p.rc.r = p.rc.r||'http://b.bst.126.net/common/'; // resource base url
p.rc.s = p.rc.s||'/common/storage.swf';          // flash storage url (relative path)
p.rc.u = p.rc.u||'/common/upload.swf';           // flash uploader url (relative path)
if (p.rc.s.indexOf('?')<0) p.rc.s += '?t='+new Date().getTime();
})(window,document);
(function(window,document){
// private
var __userAgent = window.navigator.userAgent;
// interface
window.P('B');
B = window.B;
B.__destroy = window.F;
B._$ISIE = /msie\s+(.*?)\;/i.test(__userAgent); // Trident(JScript)
B._$ISFF = !B._$ISIE&&/rv\:(.*?)\)\s+gecko\//i.test(__userAgent); // Gecko()
B._$ISOP = !B._$ISIE&&!B._$ISFF&&/opera\/(.*?)\s/i.test(__userAgent); // Presto
B._$ISSF = !B._$ISIE&&!B._$ISFF&&!B._$ISOP&&/applewebkit\/(.*?)\s/i.test(__userAgent); // WebKit
B._$ISKQ = !B._$ISIE&&!B._$ISFF&&!B._$ISOP&&!B._$ISSF&&/konqueror\/(.*?)\;/i.test(__userAgent); // KHtml
B._$VERSION = RegExp.$1;
B._$ISOLDIE = B._$ISIE&&B._$VERSION<'7.0'; // don't use <='6.0' for 6.0b and so on
B._$ISMT = B._$ISIE&&__userAgent.indexOf('Maxthon')>=0; // for maxthon with ie core
B._$ISTT = B._$ISIE&&__userAgent.indexOf('TencentTraveler')>=0; // for tencenttraveler
// init
if (B._$ISIE) try{document.execCommand('BackgroundImageCache',false,true);}catch(e){}
})(window,document);
(function(window,document){
// private
var __trim  = /(?:^\s+)|(?:\s+$)/g, // space at start or end of string
    __empty = /^\s*$/,              // content is empty
    __remap = {a:{r:/\<|\>|\&|\r|\n|\s|\'|\"/g,'<':'&lt;','>':'&gt;','&':'&amp;',' ':'&nbsp;','"':'&quot;',"'":'&#39;','\n':'<br/>','\r':''}
              ,b:{r:/\&(?:lt|gt|amp|nbsp|#39|quot)\;|\<br\/\>/gi,'&lt;':'<','&gt;':'>','&amp;':'&','&nbsp;':' ','&#39;':"'",'&quot;':'"','<br/>':'\n'}
              ,c:{i:true,r:/\byyyy|yy|MM|M|dd|d|HH|H|mm|ms|ss|m|s\b/g}
              ,d:{r:/\'|\"/g,"'":"\\'",'"':'\\"'}}; // encode map
// interface
window.P('U');
U = window.U;
/*
 * 资源销毁接口
 * @return {Void}
 */
U.__destroy = window.F;
/**
 * 格式化数字，<10的数字加0前缀
 * @param  {Number} _number 待格式化数字
 * @return {String}         格式化后的数字串
 */
U._$number = function(_number){
    _number = parseInt(_number)||0;
    return (_number<10?'0':'')+_number;
};
/**
 * 清除字符串两端的空格，原字符串内容不变
 * @param  {String} _content 待清除的字符串
 * @return {String}         清除两端空格的字符串
 */
U._$trim = function(_content){
    return !!_content&&!!_content.replace
           &&_content.replace(__trim,'')||'';
};
/**
 * 截取指定长度的字符串,中文长度为两个字符
 * @return {String} _content 待处理文字内容
 * @param  {Number} _length  截取长度
 */
U._$subString = function(_content,_length){
    _content = _content||'';
    if (!_length) return _content;
    for(var i=0,k=0,l=_content.length;i<l;i++){
        k += _content.charCodeAt(i)>255?2:1;
        if (k>=_length) 
            return _content.substr(0,i+(k==_length?1:0));
    }
    return _content;
};
/**
 * 判断内容是否只包含空或者回车
 * @param  {String} _content 检测内容
 * @return {Boolean}         是否为空
 */
U._$isEmpty = function(_content){
    return __empty.test(_content||'');
};
/**
 * 随机生成一个指定范围的数字
 * @param  {Number} _min  随机数下限【包含】
 * @param  {Number} _max  随机数上限【不包含】
 * @return {Number}       随机生成的数字
 */
U._$rand = function(_min,_max){
    return Math.floor(Math.random()*(_max-_min)+_min);
};
/**
 * 随机生成一个全部为数字的字符串
 * @param  {Number} _length 随机字符串的长度
 * @return {String}         随机生成的字符串
 */
U._$randNumberString = function(_length){
    _length = Math.max(0,Math.min(_length||10,100));
    var _min = Math.pow(10,_length-1), _max = _min * 10;
    return U._$rand(_min,_max).toString();
};
/**
 * 判断数据是否为指定类型
 * @param  {Variable} _data 待判断数据
 * @param  {String}   _type 数据类型
 * @return {Boolean}        是否指定类型
 */
U._$isType = function(_data,_type){
    return Object.prototype.toString.
           call(_data).toLowerCase()==
           ('[object '+_type.toLowerCase()+']');
};
/**
 * 查找给定项在列表中的索引值
 * @param  {Array}    _list 待搜索列表
 * @param  {Variable} _item 指定项，如果为function则表示过滤接口
 * @return {Number}         给定项所在的位置索引，以0开始，没有项返回-1
 */
U._$indexOf = function(_list,_item){
    var _isfunc = U._$isType(_item,'function');
    if (!!_list&&_list.length>0)
        for(var i=0,l=_list.length;i<l;i++)
            if (_isfunc?!!_item(_list[i]):_list[i]==_item)
                return i;
    return -1;
};
/**
 * 编码字符串
 * @param  {Object} _map     编码规则
 * @param  {String} _content 待编码的字串
 * @return {String}          编码后的字串
 */
U._$encode = function(_map,_content){
    if (!_map||!_content||!_content.replace) return _content||'';
    return _content.replace(_map.r,function($1){
               var _result = _map[!_map.i?$1.toLowerCase():$1];
               return _result!=null?_result:$1;
           });
};
/**
 * 编码html代码，'<' -> '&lt;'
 * @param  {String} _content 待编码串
 * @return {String}          编码后的串
 */
U._$escape = function(_content){
    return U._$encode(__remap.a,_content);
};
/**
 * 反编码html代码，'&lt;' -> '<'
 * @param  {String} _content 待编码串
 * @return {String}          编码后的串
 */
U._$unescape = function(_content){
    return U._$encode(__remap.b,_content);
};
/**
 * 编码字符串，将',"加转义符号
 * @param  {String} _content 待编码串
 * @return {String}          编码后的串
 */
U._$string = function(_content){
    return U._$encode(__remap.d,_content);
};
/**
 * 格式化时间，yyyy|yy|MM|M|dd|d|HH|H|mm|ms|ss|m|s
 * @param  {Number|String|Date} _time   时间
 * @param  {String}             _format 格式
 * @return {String}                     指定格式的时间串
 */
U._$format = function(_time,_format){
    if (!_time||!_format) return '';
    if (U._$isType(_time,'string'))
        _time = new Date(Date.parse(_time));
    if (!U._$isType(_time,'date'))
        _time = new Date(_time);
    var _map = __remap.c;
    _map['yyyy'] = _time.getFullYear();
    _map['yy']   = (''+_map['yyyy']).substr(2);
    _map['M']    = _time.getMonth()+1;
    _map['MM']   = U._$number(_map['M']);
    _map['d']    = _time.getDate();
    _map['dd']   = U._$number(_map['d']);
    _map['H']    = _time.getHours();
    _map['HH']   = U._$number(_map['H']);
    _map['m']    = _time.getMinutes();
    _map['mm']   = U._$number(_map['m']);
    _map['s']    = _time.getSeconds();
    _map['ss']   = U._$number(_map['s']);
    _map['ms']   = _time.getMilliseconds();
    return U._$encode(_map,_format);
};
/**
 * 序列化
 * @param  {Variable} _data 待序列化数据
 * @return {Variable}       序列化后数据
 */
U._$serialize = function(_data){
    if (U._$isType(_data,'number'))  return _data;
    if (U._$isType(_data,'date'))    return _data.getTime();
    if (U._$isType(_data,'boolean')) return !!_data?'true':'false';
    if (U._$isType(_data,'string'))  return "'"+U._$string(_data)+"'";
    if (!_data) return 'null';
    if (U._$isType(_data,'array')){
        var _arr = [];
        for(var i=0,l=_data.length;i<l;
            _arr.push(U._$serialize(_data[i])),i++);
        return '['+_arr.join(',')+']';
    }
    if (U._$isType(_data,'object')){
        var _arr = [];
        for(var p in _data)
            _arr.push(U._$serialize(p)+':'+
                      U._$serialize(_data[p]));
        return '{'+_arr.join(',')+'}';
    }
    return 'null';
};
/**
 * 反序列化串
 * @param  {String}  _content 待反序列化串
 * @return {Variable}         反序列化后的数据
 */
U._$deserialize = function(_content){
    try{return !_content?null:(new Function('return '+_content))();}catch(e){return null;}
};
/**
 * 将json串解析为对象
 * @param  {String}  _content 待反序列化串
 * @return {Variable}         反序列化后的数据
 */
U._$parseJSON = !!window.JSON?JSON.parse:U._$deserialize;
/**
 * 解析为json串
 * @param  {Variable} _data 待序列化数据
 * @return {Variable}       序列化后数据
 */
U._$toJSONString = !!window.JSON?JSON.stringify:U._$serialize;
/**
 * 获取全局属性，取到属性后删除全局引用，后续代码如需重复利用需保存引用
 * @param  {String} _key 属性名称
 * @return {Variable}    属性值
 */
U._$getGValue = function(_key){
    var _value = window[_key];
    try{if (!delete window[_key])throw '';}catch(e){window[_key]=undefined;}
    return _value;
};
/**
 * 把相册userName转化成完整用户名， 即完整email地址
 * 相册username    <-->     fullName
 * mmlhorse2@163.com				   qatest@163.com            
 * qatest@126			   qatest@126.com		
 * qatest@188 			   qatest@188.com 	 
 * qatest.popo             qatest@popo.163.com
 * qatest.vip              qatest@vip.163.com
 * qatest@yeah			   qatest@yeah.net
 * qatest@game             qatest@game.163.com
 * test60@vip.126.com      test60@vip.126.com （当做外域邮箱处理）
 * qatest@gmail.com 	   qatest@gmail.com	(外域邮箱)   	
 * @param  {String} _userName 相册userName
 * @return {Variable}    属性值
 */
U._$getFullName = function(_userName){
	if (_userName.substr(-4) === "@126")
		return _userName.replace("@126", "@126.com");
	else if (_userName.substr(-4) === "@188")
		return _userName.replace("@188", "@188.com");
	else if (_userName.substr(-5) === "@popo")
		return _userName.replace(".popo", "@popo.163.com");
	else if (_userName.substr(-4) === ".vip")
		return _userName.replace(".vip", "@vip.163.com");
	else if (_userName.substr(-5) === "@yeah")
		return _userName.replace("@yeah", "@yeah.net");
	else if (_userName.substr(-5) === "@game")
		return _userName;
	else if (_userName.indexOf('@') >= 0) {
		return _userName;// 外域邮箱 和 vip.126.com
	} else {
		return _userName + "@163.com";
	}
};
})(window,document);
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
return;
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
window.P('V');
V = window.V;
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
})(window,document);
(function(window,document){
// private
var __hc,                // 31 css hack
    __tp = {},           // node template cache
    __sp = /\s+/g,       // space regexp
    __hk = '__hvrkey__', // hover event attr key
    __ha = '__hatkey__', // hover action attr key
    __ec = document.createDocumentFragment();
/*
 * 根据Tag名称初始化模板节点
 * @param  {Node} _element 模板节点对象
 * @return {Void}
 */
var __initElementByTag = function(_element){
    if (!_element) return;
    switch(_element.tagName.toLowerCase()){
        case 'a'      : _element.href = '#';
                        _element.hideFocus = true; break;
        case 'iframe' : _element.frameBorder = 0; 
                        _element.src  = 'about:blank'; return;
        case 'script' : _element.defer= 'defer';
                        _element.type = 'text/javascript'; return;
        case 'style'  : _element.type = 'text/css'; return;
        case 'link'   : _element.type = 'text/css';
                        _element.rel  = 'stylesheet'; return;
    }
    __ec.appendChild(_element);
};
/*
 * 获取用来匹配样式名称的正则字串
 * @param  {String} _class 样式名称
 * @return {String}        正则字串
 */
var __getRegClassName = function(_class){
    _class = U._$trim(_class);
    return !_class?'':'(\\s|^)(?:'+_class.replace(__sp,'|')+')(?=\\s|$)';
};
/*
 * 执行Hover操作
 * @param  {String|Node} _element 节点ID或者对象
 * @param  {Boolean}     _hovered 是否hover
 * @return {Void}
 */
var __hoverElement = function(_element,_hovered){
    _element = E._$getElement(_element);
    if (!_element) return;
    _hovered = !!_hovered;
    if (_element[__ha]==_hovered) return;
    var _class = _element[__hk];
    if (!_class) return;
    _element[__ha] = _hovered;
    _hovered ? E._$addClassName(_element,_class)
             : E._$delClassName(_element,_class);
};
/*
 * 设置最大值
 * @param  {String|Node} _element 节点ID或者对象
 * @return {Void}
 */
var __maxElement = function(_element){
    _element = E._$getElement(_element);
    if (!_element) return;
    var _type = _element.mt,_value = _element.mv,
        _attr = _type=='width'?'scrollWidth':'scrollHeight';
    _element.style[_type] = _element[_attr]<_value?'auto':(_value+'px');
};
/*
 * 设置最大值,等比例
 * @param  {String|Node} _element 节点ID或者对象
 * @return {Void}
 */
var __adjElement = function(_element){
    _element = E._$getElement(_element);
    if (!_element) return;
    var _type  = _element.mt, _value = _element.mv,
        _ratio = _element.mr, _st = _element.style,
        _rd =(_element.scrollWidth/_element.scrollHeight)||1,
        _mw = _type=='width'?_value:Math.floor(_value*_ratio),
        _mh = _type=='width'?Math.floor(_value/_ratio):_value;
    if (_rd>=_ratio&&_element.scrollWidth>_mw){
        _st.width = _mw+'px'; _st.height = 'auto'; return;
    }
    if (_rd<=_ratio&&_element.scrollHeight>_mh){
        _st.width = 'auto'; _st.height = _mh+'px'; return;
    }
    _st.width = 'auto'; _st.height = 'auto';
};
/*
 * 计算节点相对于给定元素的偏移
 * @param  {String|Node} _element 给定节点ID或者对象
 * @param  {String}      _type    偏移方式,offsetLeft/offsetTop
 * @param  {Function}    _filter  节点过滤接口，用来判断遍历停止
 * @return {Number}               偏移量
 */
var __getOffset = function(_element,_type,_filter){
    _element = E._$getElement(_element);
    if (!_element) return 0;
    _filter = _filter||F;
    var _offset = 0;
    while(!!_element&&!_filter(_element)){
        _offset += _element[_type];
        _element = _element.offsetParent;
    }
    return _offset;
};
/*
 * 获取样式值
 * @param  {String|Node} _element 节点ID或者对象
 * @param  {String}      _style   样式名称
 * @return {String}               样式值
 */
var __getStyle;
if (!!document.defaultView&&!!document.defaultView.getComputedStyle){
__getStyle = function(_element,_style){
    var _css = document.defaultView.getComputedStyle(_element,null);
    return !_css?'':_css[_style];
};
}else{
__getStyle = function(_element,_style){
    return _element.currentStyle[_style];
};}
// interface
window.P('E');
E = window.E;
/*
 * 资源销毁接口
 * @return {Void}
 */
E.__destroy = function(){
    var _element = document.createElement('div');
    _element.style.display = 'none';
    document.body.appendChild(_element);
    _element.appendChild(__ec);
};
/**
 * 根据ID或者节点对象获取节点对象，确保返回的是个节点对象
 * @param  {String|Node} 节点ID或者节点对象
 * @return {Node}        节点对象
 */
E._$getElement = function(_element){
    if (arguments.length<=1)
        return U._$isType(_element,'string')||
               U._$isType(_element,'number')?
               document.getElementById(_element):_element;
    var _result = [];
    for(var i=0,l=arguments.length;i<l;
        _result.push(E._$getElement(arguments[i])),i++);
    return _result;
};
/**
 * 获取节点的element子节点，不计算非ELEMENT_NODE的节点
 * @param  {String|Node} _element 节点ID或者对象
 * @param  {String}      _class   筛选节点的样式名称
 * @return {Array} 子节点列表
 */
E._$getChildElements = function(_element,_class){
    _element = E._$getElement(_element);
    if (!_element) return null;
    var _result = [];
    for(var _node=_element.children||
        _element.childNodes,i=0,l=_node.length;i<l;i++){
        if (_node[i].nodeType!=window.Node.ELEMENT_NODE||
           (_class&&!E._$hasClassName(_node[i],_class))) continue;
        _result.push(_node[i]);
    }
    return _result;
};
/**
 * 根据样式名获取节点集合，如果使用此接口取节点集合尽量一次取出需要的所有节点
 * @param  {String} _class 样式名称
 * @return {Array}         节点集合
 */
E._$getElementsByClassName = function(_element,_class){
    _class = U._$trim(_class);
    _element = E._$getElement(_element);
    if (!_element||!_class) return null;
    // native
    if (!!_element.getElementsByClassName){
        return Array.prototype.slice.call(
              _element.getElementsByClassName(_class),0);
    }
    // xpath
    if (!!document.evaluate){
        // get elements
        var _result = [],
            _xrsult = document.evaluate('.//*'+__getExpByClassName(_class),
                      _element,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        for(var i=0,l=_xrsult.snapshotLength;i<l;
            _result.push(_xrsult.snapshotItem(i)),i++);
        return _result;
    }
    // pure dom implementation(ie)
    var _result = [],
        _regexp = new RegExp(__getRegClassName(_class),'g'),
        _xrsult = _element.getElementsByTagName('*');
    for(var i=0,l=_xrsult.length;i<l;i++)
        if (E._$hasClassName(_xrsult[i],_regexp))
            _result.push(_xrsult[i]);
    return _result;
};
/**
 * 是否含有给定样式名称，多个样式用空格隔开，存在其中之一就表示有该样式
 * @param  {String|Node}   _element 要操作的节点ID或者节点对象
 * @param  {String|RegExp} _class   样式名称
 * @return {Boolean}                是否含有给定样式名称
 */
E._$hasClassName = function(_element,_class){
    _element = E._$getElement(_element);
    if (!_element || !_class) return false;
    _class = U._$isType(_class,'string')
           ? __getRegClassName(_class):_class;
    return (_element.className||'').search(_class)>=0;
};
/**
 * 替换节点的样式类名称，多个样式用空格分隔
 * @param  {String|Node} _element 要操作的节点ID或者节点对象
 * @param  {String}      _del     要删除的样式类名称
 * @param  {String}      _add     要新增的样式类名称
 * @return {Void}
 */
E._$replaceClassName = function(_element,_del,_add){
    _element = E._$getElement(_element);
    if (!_element||(!_del&&!_add)) return;
    var _class = _element.className||'';
    // replace class
    _add = ' '+(_add||'');
    _del = __getRegClassName(_del+_add);
    !!_del&&(_class=_class.replace(new RegExp(_del,'g'),'$1'));
    _element.className = U._$trim(_class+_add).replace(__sp,' ');
};
/**
 * 新增样式类，多个样式用空格分开
 * @param  {String|Node} _element 要操作的节点ID或者节点对象
 * @param  {String}      _add     要新增的样式类名称
 * @return {Void}
 */
E._$addClassName = function(_element,_add){
    E._$replaceClassName(_element,'',_add);
};
/**
 * 删除样式类，多个样式用空格分开
 * @param  {String|Node} _element 要操作的节点ID或者节点对象
 * @param  {String}      _del     要删除的样式类名称
 * @return {Void}
 */
E._$delClassName = function(_element,_del){
    E._$replaceClassName(_element,_del,'');
};
/**
 * 添加节点模板，供后续克隆使用，
 * 对于页面中频繁使用的复杂节点采用此方式可提高效率
 * @param  {Node|String} _element 节点ID或者对象或者HTML代码
 * @param  {String}      _key     模板键值，不传随机生成
 * @return {String}               模板序列号
 */
E._$addNodeTemplate = function(_element,_key){
    var _nd = E._$getElement(_element),
        _sn = _key||('tp_'+U._$randNumberString(6));
    if (!!_nd){
        // node as template
        __tp[_sn] = _nd;
        __ec.appendChild(_nd);
    }else if(U._$isType(_element,'string')){
        // html as template
        __tp[_sn] = _element;
    }
    return _sn;
};
/**
 * 根据模板序列号获取节点对象，模板序列号在添加模板时返回
 * @param  {String} _sn 模板序列号
 * @return {Node}       新克隆出来的节点对象
 */
E._$getNodeTemplate = function(_sn){
    var _ntmp = __tp[_sn];
    if (!!_ntmp&&U._$isType(_ntmp,'string'))
        E._$addNodeTemplate(E._$parseElement(_ntmp),_sn);
    return !__tp[_sn]?null:__tp[_sn].cloneNode(true);
};
/**
 * 将XHTML代码转换成DOM节点对象，如果转换出来的节点数量超过【包含】2个，
 * 则最外面增加一个div节点，即返回的始终是一个节点
 * @param  {String} _xhtml XHTML代码，没有代码返回一个空的div节点
 * @return {Node}          DOM节点对象
 */
E._$parseElement = function(_xhtml){
    if (!U._$isType(_xhtml,'string'))
        return _xhtml;
    _xhtml = U._$trim(_xhtml);
    if (!_xhtml) return null;
    var _element = document.cloneElement('div');
    _element.innerHTML = _xhtml;
    return _element.childNodes.length==1?
           _element.childNodes[0]:_element;
};
/**
 * 通过css增加样式
 * @param  {String} _css   样式内容
 * @param  {Node}   _style 样式节点
 * @return {Node}          新增的样式节点对象
 */
E._$parseStyle = function(_css,_style){
    if (!_css) return null;
    // ignore element if not ie
    if (!B._$ISIE||document.getElementsByTagName('style').length<30){
        if (!_style){
            var _style = document.cloneElement('style');
            document.head.appendChild(_style);
        }
        !B._$ISIE ? _style.innerText = _css
                  : _style.styleSheet.cssText = _css;
        return _style;
    }
    // ie has 31 css style limit  -  bad performance
    __hc.styleSheet.cssText += _css;
    return __hc;
};
/**
 * 取节点的样式
 * @param  {String|Node} _element 节点ID或者对象
 * @param  {String}      _style   样式名称
 * @return {String}               样式值
 */
E._$getStyle = function(_element,_style){
    _element = E._$getElement(_element);
    return !_element?'':_element.style[_style]||
                        __getStyle(_element,_style);
};
/**
 * 计算节点相对于给定元素的水平偏移
 * @param  {String|Node} _element 给定节点ID或者对象
 * @param  {Function}    _filter  节点过滤接口，用来判断遍历停止
 * @return {Number}               水平偏移
 */
E._$offsetX = function(_element,_filter){
    return __getOffset(_element,'offsetLeft',_filter);
};
/**
 * 计算节点相对于给定元素的垂直偏移
 * @param  {String|Node} _element 给定节点ID或者对象
 * @param  {Function}    _filter  节点过滤接口，用来判断遍历停止
 * @return {Number}               垂直偏移
 */
E._$offsetY = function(_element,_filter){
    return __getOffset(_element,'offsetTop',_filter);
};
/**
 * 从页面删除节点并回收内存空间
 * @param  {String|Node} _element 节点ID或者对象
 * @return {Void}
 */
E._$removeElement = function(_element){
    _element = E._$getElement(_element);
    if (!_element||!_element.parentNode) return;
    _element.parentNode.removeChild(_element);
    if(B._$ISIE&&!!_element.outerHTML) _element.outerHTML = '';
    // ie: mem leak if any child has event listener not detach
};
/**
 * 从页面删除节点，放至内存空间，防止节点被回收
 * @param  {String|Node} _element 要删除的节点ID或者对象
 * @return {Void}
 */
E._$removeElementByEC = function(){
    for(var i=0,l=arguments.length,_element;i<l;i++){
        _element=E._$getElement(arguments[i]);
        _element&&__ec.appendChild(_element);
    }
};
/**
 * 设置元素禁止文本选择
 * @param  {String|Node} _element  节点元素ID或者对象
 * @param  {Boolean}     _selected 是否可选择
 * @return {Void}
 */
E._$noSelect = function(_element,_selected){
    if (!B._$ISIE) return; // use css user-select
    _element = E._$getElement(_element);
    if (!_element) return;
    _element.onselectstart = !_selected?F:null;
};
/**
 * IE6下节点鼠标移入动作
 * @param  {String|Node} _element 节点ID或者对象
 * @param  {String}      _class   动作样式
 * @param  {Boolean}     _force   是否强制使用脚本处理HOVER
 * @return {Void}
 */
E._$hoverElement = function(_element,_class,_force){
    if (!B._$ISOLDIE&&!_force) return; // use css :hover
    _element = E._$getElement(_element);
    if (!_element||!_class||!!_element[__hk]) return;
    _element[__hk] = _class;
    var _id = _element.id = _element.id||'xnd_'+U._$randNumberString(10);
    V._$addEvent(_element,B._$ISIE?'mouseleave':'mouseout',__hoverElement._$bind(E,_id,false));
    V._$addEvent(_element,B._$ISIE?'mouseenter':'mouseover',__hoverElement._$bind(E,_id,true));
};
/**
 * IE6下设置元素的最大高度或者宽度
 * @param  {String|Node} _element 节点元素ID或者对象
 * @param  {String}      _type    高度-height 宽度-width
 * @param  {Number}      _value   值
 */
E._$maxBoxElement = function(_element,_type,_value,_ratio){
    if (!B._$ISOLDIE) return; // use css max-width or max-height
    _element = E._$getElement(_element);
    if (!_element) return;
    var _id = _element.id||('mnd_'+U._$randNumberString(10));
    _element.id = _id; _element.mt = _type;
    _element.mv = _value; _element.mr = _ratio;
    if (!!_element.maxkey) return; _element.maxkey = true;
    var _type = _element.tagName.toLowerCase()=='img'?'load':'resize';
    !!_ratio ? V._$addEvent(_element,_type,__adjElement._$bind(E,_id))
             : V._$addEvent(_element,_type,__maxElement._$bind(E,_id));
};
/**
 * 设置元素的最大宽度
 * @param  {String|Node} _element 节点元素ID或者对象
 * @param  {Number}      _width   宽度
 * @return {Void}
 */
E._$maxWidthElement = function(_element,_width,_ratio){
    E._$maxBoxElement(_element,'width',_width,_ratio);
};
/**
 * 设置元素的最大高度
 * @param  {String|Node} _element 节点元素ID或者对象
 * @param  {Number}      _height  高度
 * @return {Void}
 */
E._$maxHeightElement = function(_element,_height,_ratio){
    E._$maxBoxElement(_element,'height',_height,_ratio);
};
/**
 * 取Flash对象，用于JS交互 object.id/embed.name
 * @param  {String} _key Flash ID
 * @return {Node}        Flash对象
 */
E._$getFlashObject = function(_key){
    return B._$ISIE?window[_key]:document[_key];
};
// init
var __getExpByClassName;
if (!!document.evaluate)
     __getExpByClassName = function(_class){
        if (!_class) return null;
        if (!__sp.test(_class))
            return "[contains(concat(' ',@class,' '),' "+_class+" ')]";
        var _arr = _class.split(__sp),_result = '';
        for(var i=0,l=_arr.length,_tmp;i<l;i++){
            _tmp = __getExpByClassName(_arr[i]);
            _result += !_tmp?'':_tmp;
        }
        return _result;
     };
if (!window.Node)
    window.Node = {ELEMENT_NODE:1
//                  ,ATTRIBUTE_NODE:2
//                  ,TEXT_NODE:3
//                  ,CDATA_SECTION_NODE:4
//                  ,ENTITY_REFERENCE_NODE:5
//                  ,ENTITY_NODE:6
//                  ,PROCESSING_INSTRUCTION_NODE:7
//                  ,COMMENT_NODE:8
//                  ,DOCUMENT_NODE:9
//                  ,DOCUMENT_TYPE_NODE:10
//                  ,DOCUMENT_FRAGMENT_NODE:11
//                  ,NOTATION_NODE:12
};
document.head = document.getElementsByTagName('head')[0]||document.body;
/**
 * 创建节点，document.cteateElement的替代方法
 * @param  {String} _tag   节点标签
 * @param  {String} _class 节点的样式类名称
 * @return {Node}          创建的节点对象
 */
document.cloneElement = function(_tag,_class){
    var _element = document.createElement(_tag);
    __initElementByTag(_element);
    !!_class && (_element.className=_class);
    return _element;
};
})(window,document);

module.exports = window;