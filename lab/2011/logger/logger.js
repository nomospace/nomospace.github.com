/**
 * 日志工具实现文件
 * @version 0.1
 * @author	nomospace(jinlu_hz@163.com)
 */
(function(){
    var __instance, 
		//	日志工具ui命名空间
		__uispace = 'ui-' + Math.floor(Math.random() * 1000),
		//	日志工具样式
		__style = '\
	        #<uispace>{visibility:hidden;position:absolute;top:10px;right:10px;overflow:auto;z-index:100;width:400px;border:1px solid #97abc9;background-color:#fff;font-family:"courier new";}\
	        #<uispace> .ttl{line-height:25px;height:25px;padding:0 5px;border-bottom:1px solid #97abc9;}\
	        #<uispace> .cnt{height:400px;line-height:22px;overflow-y:auto;font-size:12px;}\
	        #<uispace> .cnt .line{border-bottom:1px dashed #97abc9;}\
	        #<uispace> .btm{line-height:28px;height:28px;border-top:1px solid #97abc9;text-align:center}',
		//	日志工具结构
		__xhtml = '\
			<div class="ttl"></div>\
			<div class="cnt"></div>\
			<div class="btm">\
				<input type="button" value="clear"/><input type="button" value="close"/>\
			</div>';
    /**
     * 日志工具类
     * @constructor
     * @class   日志工具类
     * @param   {String|Node} _parent  日志工具所在的父节点ID或者节点对象
     * @param   {Object}      _options 日志可选参数
     */
    Logger = function(_parent, _options){
        this._$initialize();
    };
    Logger.prototype = {
        _$initialize: function(_parent, _options){
			_parent = _parent || document.body;
            this.__parent = _parent == document.documentElement ? document.body : _parent;
            this.__pushStyle(__style, __uispace);
            this.__body = document.createElement('div');
            this.__body.className = this.__getSpace();
            this.__body.innerHTML = this.__getXhtml();
			this.__intXnode();
			this.__parent.appendChild(this.__body);
        },
        /**
         * 添加控件样式
         * @param  {String} _style 样式
         * @param  {String} _space 样式空间
         * @return {Void}
         */
        __pushStyle: function(_style, _space){
            if (!_style || !_style.replace) 
                return;
            if (!!_space) 
                _style = _style.replace(/\#\<.*?\>/gi, '.' + _space);
            this.__parseStyle(_style);
        },
        /**
         * 通过css增加样式
         * @param  {String} _css   样式内容
         * @param  {Node}   _style 样式节点
         * @return {Node}          新增的样式节点对象
         */
        __parseStyle: function(_css, _style){
            if (!_css) 
                return null;
            // ignore element if not ie
            var _isIE = !-[1, ];
            if (!_isIE || document.getElementsByTagName('style').length < 30) {
                if (!_style) {
                    var _style = document.createElement('style');
                    document.getElementsByTagName('head')[0].appendChild(_style);
                }
                !_isIE ? _style.innerHTML = _css : _style.styleSheet.cssText = _css;
                return _style;
            }
        },
        /**
         * 获取控件结构代码
         * @return {String} 结构代码
         */
        __getXhtml: function(){
            return __xhtml;
        },
        /**
         * 获取控件样式的命名空间
         * @return {String} 控件样式的命名空间
         */
        __getSpace: function(){
            return __uispace;
        },
        /**
         * 初始化控件节点
         * @return {Void}
         */
        __intXnode: function(){
            var _ntmp = this.__body.getElementsByTagName('div');
            this.__cntCase = _ntmp[1];
            _ntmp = _ntmp[2].getElementsByTagName('input');
            var _me = this;
            _ntmp[0].onclick = function(){_me.__cntCase.innerHTML = '';};
            _ntmp[1].onclick = function(){_me.__body.style.visibility = 'hidden';}
        },
        /**
         * 打印日志
         * @param {String} _message		日志内容
         * @return {Void}
         */
        _$append: function(_message){
            var _div = document.createElement('div');
            _div.innerHTML = _message + '';
            this.__cntCase.appendChild(_div);
        },
        /**
         * 显示日志
         * @return {Void}
         */
        _$show: function(){
            this.__body.style.visibility = 'visible';
        },
        /**
         * 判断数据是否为指定类型
         * @param  {Variable} _data 待判断数据
         * @param  {String}   _type 数据类型
         * @return {Boolean}        是否指定类型
         */
        _$isType: function(_data, _type){
            return Object.prototype.toString.call(_data).toLowerCase() == ('[object ' + _type.toLowerCase() + ']');
        }
    }
    // 绑定接口及参数，使其的调用对象保持一致
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(){
            var _function = this, 
				_args = arguments, 
				_object = Array.prototype.shift.call(arguments);
            return function(){
                var _argc = Array.prototype.slice.call(_args, 0);
                Array.prototype.push.apply(_argc, arguments);
                return _function.apply(_object || window, _argc);
            };
        };
    }
    /**
     * 取日志工具实例
     * @param {Object} _options		日志可选参数
     * @return {Logger} 日志工具实例
     */
    var __getInstance = function(_options){
        if (!__instance) 
            __instance = new Logger(document.body, _options);
        return __instance;
    };
    /**
     * 供外部调用的日志输出接口
     * @param {Object} _message		日志信息
     * @param {Object} _options		日志可选参数
     * @return {Void}
     */
    Logger._$show = function(_message, _options){
        var _instance = __getInstance(_options);
        if (_instance._$isType(_message, 'object')) {
            var _pros = [];
            for (var pro in _message) 
                _pros.push(pro + '=' + _message[pro]);
            _instance._$append(_pros.join(','));
        }
        else 
            _instance._$append(_message);
        _instance._$show();
    };
})();