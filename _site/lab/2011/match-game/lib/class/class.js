/**
 * 全局通用接口实现文件
 */
define(function() {
    var extflag = {};  // extend flag for avoid init when extending

    /**
     * 创建类对象，initialize作为所有类的初始化函数，如果类继承自其他类，
     * 则初始化函数中可以使用this.superClass([arg0[,arg1...]])调用父类的初始化函数
     * @return {Function} 返回创建的类对象实体
     */
    function Class() {
        var _class = function() {
            // avoid call initialize when extending
            if (arguments[0] != extflag && !!this.initialize)
                return this.initialize.apply(this, arguments);
        };
        _class.extend = extend;
        _class.implement = implement;
        return _class;
    }

    /*
     * 默认初始化函数
     * @return {Void}
     */
    function initialize() {
        this.superClass.apply(this, arguments);
    }

    /*
     * 模拟实现继承策略，提供子类构造函数调用父类构造函数的接口
     * @param  {Function} _super  父类对象
     * @param  {Boolean}  _static 是否继承静态接口
     * @return {Object}           类的原型对象
     */
    function extend(_super, _static) {
        if (!_super || !isFunction(_super) || !isFunction(this)) return null;
        // extend static methods
        if (!!_static)
            for (var _method in _super)
                if (isFunction(_super[_method]))
                    this[_method] = _super[_method];
        // extend instance properties and methods
        this.superClass = _super;
        this.supro = _super.prototype;
        this.prototype = new _super(extflag);
        this.prototype.constructor = this;
        this.prototype.initialize = initialize;
        // for super initialize
        var _superp = _super;
        this.prototype.superClass = function() {
            var _init = _superp.prototype.initialize;
            _superp = _superp.superClass || _super;
            return !!_init && _init.apply(this, arguments);
        };
        return this.prototype;
    }

    /*
     * 模拟实现多继承，将其他类对接口的实现拷贝到当前类
     * @param  {Function} _args 其他类，参数前面类的实现优先级高
     * @return {Object}
     */
    function implement() {
        var _this = this.prototype;
        for (var i = 0, l = arguments.length, _class, _prototype; i < l; i++) {
            _class = arguments[i];
            if (!isFunction(_class)) continue;
            _prototype = _class.prototype;
            for (var x in _prototype)
                if (isFunction(_prototype[x]))
                    _this[x] = _prototype[x];
        }
        return _this;
    }

    function isFunction(val) {
        return Object.prototype.toString.call(val) === '[object Function]';
    }

    // BAD SMELL
    if (!Function.prototype.bind) {
        Function.prototype.bind = function() {
            var _function = this, _args = arguments, _object = Array.prototype.shift.call(arguments);
            return function() {
                Array.prototype.push.apply(arguments, _args);
                return _function.apply(_object || window, arguments);
            }
        }
    }

    return Class;
});

