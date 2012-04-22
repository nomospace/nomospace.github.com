/**
 * ==========================================================================================
 * 全局通用接口实现文件<br/>
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
var p = P('N');
p.rc = p.rc||{};               // root config
p.xd = p.xd||[];               // crossdomain list
p.tm = p.tm||O;                // ui theme config
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
})(this,document);
