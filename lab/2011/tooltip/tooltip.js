/**
 * 简易工具条提示
 * @version  1.0
 * @author   nomospace(jinlu_hz@163.com)
 */
(function(){
    /**
     * 简易工具条提示
     * @constructor
     * @class   简易工具条提示
     */
    Tooltip = function(){
        this.__defaultOptions = {
            delay: 200,	//	todo
            track: false,
            top: 15,	//	offset
            left: 15,	//	offset
            id: "tooltip"
        };
        this._$initialize();
    };
    Tooltip.prototype = {
        /**
         * 初始化控件节点
         * @return {Void}
         */
        _$initialize: function(){
            this.__body = this.__parseElement('<div class="' + this.__defaultOptions.id + '"><div style="position:relative;"></div></div>');
            this.__inner = this.__body.childNodes[0];
            document.body.appendChild(this.__body);
        },
        /**
         * 将XHTML代码转换成DOM节点对象，如果转换出来的节点数量超过【包含】2个，
         * 则最外面增加一个div节点，即返回的始终是一个节点
         * @param  {String} _xhtml XHTML代码，没有代码返回一个空的div节点
         * @return {Node}          DOM节点对象
         */
        __parseElement: function(_xhtml){
            if (!_xhtml) 
                return null;
            var _element = document.createElement('div');
            _element.innerHTML = _xhtml;
            return _element.childNodes.length == 1 ? _element.childNodes[0] : _element;
        },
        /**
         * 重置可选配置参数
         * @param  {Object} _options 可选配置参数
         * @return {Void}
         */
        _$resetOption: function(_options){
            extend(this.__defaultOptions, _options||{});
            var _target = _options.target;
            if (!_target) 
                return;
            for (var i = 0, l = _target.length; i < l; i++) {
                _target[i].onmouseover = this._$show.bind(this);
                _target[i].onmouseout = this._$hide.bind(this);
                if (this.__defaultOptions.track) 
                    _target[i].onmousemove = this._$show.bind(this);
            }
            this.__setContent(_options.content || '');
        },
        /**
         * 设置位置
         * @param  {Object}  _event    鼠标移动事件
         * @return {Void}
         */
        __setPosition: function(_event){
            var _left = this.__pointerX(_event), 
				_top = this.__pointerY(_event), 
				_isdelta = false;
            if (_left == null || _top == null) 
                return;
            var _style = this.__body.style;
            _top += _isdelta ? (parseInt(_style.top) || 0) : 0;
            _left += _isdelta ? (parseInt(_style.left) || 0) : 0;
            _style.top = _top + this.__defaultOptions.top + 'px';
            _style.left = _left + this.__defaultOptions.left + 'px';
        },
        /**
         * 计算当前事件触发时，鼠标距离页面左侧的位置
         * @param  {Event} _event 触发事件对象
         * @return {Number}       鼠标距离页面左侧的位置
         */
        __pointerX: function(_event){
            if (!_event) 
                return 0;
            return _event.pageX ||
            (_event.clientX +
            (document.documentElement.scrollLeft || document.body.scrollLeft));
        },
        /**
         * 计算当前事件触发时，鼠标距离页面顶部的位置
         * @param  {Event} _event 触发事件对象
         * @return {Number}       鼠标距离页面顶部的位置
         */
        __pointerY: function(_event){
            if (!_event) 
                return 0;
            return _event.pageY ||
            (_event.clientY +
            (document.documentElement.scrollTop || document.body.scrollTop));
        },
        /**
         * 显示工具条提示浮层
         * @param  {Object} _event 鼠标移动事件
         * @return {Void}
         */
        _$show: function(_event){
            this.__setPosition(_event);
            this.__body.style.display = 'block';
        },
        /**
         * 隐藏工具条提示浮层
         * @return {Void}
         */
        _$hide: function(){
			//todo
//            if (this.__defaultOptions.track) 
//                document.body.onmousemove = null;
            this.__body.style.display = 'none';
        },
        /**
         * 设置内容
         * @param  {String|Node} _content 内容HTML代码或节点对象
         * @return {Void}
         */
        __setContent: function(_content){
            typeof(_content) == 'string' ? this.__inner.innerHTML = _content : this.__inner.appendChild(_content);
        }
    };
	// 绑定接口及参数，使其的调用对象保持一致
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(){
            var _function = this, _args = arguments, _object = Array.prototype.shift.call(arguments);
            return function(){
                var _argc = Array.prototype.slice.call(_args, 0);
                Array.prototype.push.apply(_argc, arguments);
                return _function.apply(_object || window, _argc);
            };
        };
    }
    /**
     * 用一个对象的属性扩展另一个对象
     * @param {Object} 	 _des		目的对象
     * @param {Object} 	 _src		源对象
     * @param {Function} _factor	扩展条件
     */
    function extend(_des, _src, _factor){
        _des = _des || {}
        if (_src) {
            for (var _p in _src) {
                if (!_factor || _factor && _factor(_src[_p])) {
                    _des[_p] = _src[_p];
                }
            }
        }
        return _des;
    };
    var __instance, 
	/**
     * 取日志工具实例
     * @return {Logger} 日志工具实例
     */
    __getInstance = function(){
        if (!__instance) 
            __instance = new Tooltip();
        return __instance;
    };
    /**
     * 供外部调用的日志输出接口
     * @param {Object} _options		日志可选参数
     * @return {Void}
     */
    Tooltip._$show = function(_options){
        var _instance = __getInstance();
        _instance._$resetOption(_options);
    };
})();
