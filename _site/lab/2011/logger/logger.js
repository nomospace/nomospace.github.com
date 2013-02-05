(function() {
  var root = this,
    instance,
  //	日志工具ui命名空间
    uispace = 'ui-' + Math.floor(Math.random() * 1000),
  //	日志工具样式
    style = '\
      #<uispace>{visibility:hidden;position:absolute;top:10px;right:10px;overflow:auto;z-index:100;width:400px;border:1px solid #97abc9;background-color:#fff;font-family:"courier new";}\
      #<uispace> .ttl{line-height:25px;height:25px;padding:0 5px;border-bottom:1px solid #97abc9;}\
      #<uispace> .cnt{height:400px;line-height:22px;overflow-y:auto;font-size:12px;}\
      #<uispace> .cnt .line{border-bottom:1px dashed #97abc9;}\
      #<uispace> .btm{line-height:28px;height:28px;border-top:1px solid #97abc9;text-align:center}',
  //	日志工具结构
    xhtml = '\
			<div class="ttl"></div>\
			<div class="cnt"></div>\
			<div class="btm">\
				<input type="button" value="clear"/><input type="button" value="close"/>\
			</div>';
  /**
   * 日志工具类
   * @constructor
   * @class   日志工具类
   * @param   {String|Node} parent  日志工具所在的父节点ID或者节点对象
   */
  var Logger = function(parent) {
    this._initialize(parent);
  };
  Logger.prototype = {
    _initialize: function(parent) {
      parent = parent || document.body;
      this._parent = parent == document.documentElement ? document.body : parent;
      this._pushStyle(style, uispace);
      this._body = document.createElement('div');
      this._body.className = this._getSpace();
      this._body.innerHTML = this._getXhtml();
      this._intXnode();
      this._parent.appendChild(this._body);
    },
    /**
     * 添加控件样式
     * @param  {String} _style 样式
     * @param  {String} _space 样式空间
     */
    _pushStyle: function(_style, _space) {
      if (!_style || !_style.replace)
        return null;
      if (!!_space)
        _style = _style.replace(/\#\<.*?\>/gi, '.' + _space);
      this._parseStyle(_style, '');
    },
    /**
     * 通过css增加样式
     * @param  {String} _css   样式内容
     * @param  {Object} _style 样式节点
     * @return {Object}       新增的样式节点对象
     */
    _parseStyle: function(_css, _style) {
      if (!_css)
        return null;
      // ignore element if not ie
      var _isIE = !-[1, ];
      if (!_isIE || document.getElementsByTagName('style').length < 30) {
        if (!_style) {
          _style = document.createElement('style');
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
    _getXhtml: function() {
      return xhtml;
    },
    /**
     * 获取控件样式的命名空间
     * @return {String} 控件样式的命名空间
     */
    _getSpace: function() {
      return uispace;
    },
    /**
     * 初始化控件节点
     */
    _intXnode: function() {
      var _ntmp = this._body.getElementsByTagName('div');
      this._cntCase = _ntmp[1];
      _ntmp = _ntmp[2].getElementsByTagName('input');
      var _me = this;
      _ntmp[0].onclick = function() {
        _me._cntCase.innerHTML = '';
      };
      _ntmp[1].onclick = function() {
        _me._body.style.visibility = 'hidden';
      }
    },
    /**
     * 打印日志
     * @param {Object} _message    日志内容
     */
    _append: function(_message) {
      var _div = document.createElement('div');
      _div.innerHTML = _message + '';
      this._cntCase.appendChild(_div);
    },
    /**
     * 显示日志
     */
    _show: function() {
      this._body.style.visibility = 'visible';
    },
    /**
     * 判断数据是否为指定类型
     * @param  {Object} _data 待判断数据
     * @param  {String}   _type 数据类型
     * @return {Boolean}        是否指定类型
     */
    isType: function(_data, _type) {
      return Object.prototype.toString.call(_data).toLowerCase() == ('[object ' + _type.toLowerCase() + ']');
    }
  };

  // 绑定接口及参数，使其的调用对象保持一致
  if (!Function.prototype.bind) {
    Function.prototype.bind = function() {
      var _function = this,
        _args = arguments,
        _object = Array.prototype.shift.call(arguments);
      return function() {
        var _argc = Array.prototype.slice.call(_args, 0);
        Array.prototype.push.apply(_argc, arguments);
        return _function.apply(_object || window, _argc);
      };
    };
  }
  /**
   * 取日志工具实例
   * @return {Logger} 日志工具实例
   */
  var _getInstance = function() {
    if (!instance)
      instance = new Logger(document.body);
    return instance;
  };
  /**
   * 供外部调用的日志输出接口
   * @param {Object} _message    日志信息
   */
  Logger.show = function(_message) {
    var _instance = _getInstance();
    if (_instance.isType(_message, 'object')) {
      var _pros = [];
      for (var pro in _message) {
        _pros.push(pro + '=' + _message['' + pro]);
      }
      _instance._append(_pros.join(','));
    }
    else {
      _instance._append(_message);
    }
    _instance._show();
  };

  // Expose Logger as an AMD module, but only for AMD loaders that
  // understand the issues with loading multiple versions of Logger
  // in a page that all might call define().
  if (typeof define === 'function') {
    define('logger', [], function() {
      return Logger;
    });
  } else {
    root.Logger = Logger;
  }

})();
