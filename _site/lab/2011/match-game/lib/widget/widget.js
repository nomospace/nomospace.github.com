/**
 * UI控件基类实现文件
 */
define(function(require, exports, module) {

    var Class = require('class');
    var Events = require('events');
    var $ = require('$');

    var proto;  // class prototype
    var style; // ui style pool
    var uispace = /\#\<.*?\>/gi; // RegExp of ui space holder
    var $body = $('body');

    // empty function
    var F = function() {

    }

    /**
     * UI控件基类对象
     * @constructor
     * @class   UI控件基类对象
     * @extends #<N.ut>._$$Event
     * @param   {String|Node} _parent  控件所在的父节点ID或者对象
     * @param   {Object}      _options 可选配置参数，已处理的参数如下：
     *                                 class           [String]   - 控件关联样式
     *                                 group           [String]   - 控件分组标识，同一分组仅允许存在一个实例
     *                                 before          [Boolean]  - 控件是否插入父节点的起始位置
     *                                 hackhover       [Boolean]  - 是否需要HACK HOVER效果，仅IE有效
     *                                 onbeforedestroy [Function] - 控件销毁前回调函数
     */
    var Widget = Class();
    proto = Widget.extend(Events);

    /**
     * 添加控件样式
     * @param  {String} _style 样式
     * @param  {String} _space 样式空间
     * @return {Void}
     */
    Widget.pushStyle = function(_style, _space) {
        if (!_style || !_style.replace) return null;
        if (!style) style = [];
        if (!!_space)
            _style = _style.replace(uispace, '.' + _space);
        style.push(_style);
    }

    /**
     * 激活控件样式
     * @return {Void}
     */
    Widget.dumpStyle = function() {
        if (!style) return null;
        _parseStyle(style.join(''));
        style = null;
    }

    /**
     * 分配控件实例
     * @param  {String|Node} _parent   控件所在的父节点ID或者对象
     * @param  {Object}      _options  可选配置参数
     * @return {#<N.ui>.Widget} 控件实例
     */
    Widget.allocate = function(_parent, _options) {
        _options = _options || {};
        _options.group = !!_options.singleton &&
            '__singleton__' || _options.group;
        var _instance;
        // allocate from group
        if (!!_options.group) {
            this.group = this.group || {};
            _instance = this.group[_options.group];
        }
        // allocate from pool
        if (!_instance) {
            this.pool = this.pool || [];
            _instance = this.pool.shift();
        }
        if (!!_instance) {
            _instance.destroy(true);
            _instance.reset(_parent, _options);
        } else {
            _instance = new this(_parent, _options);
        }
        if (!!_options.group)
            this.group[_options.group] = _instance;
        return _instance;
    }

    /**
     * 回收控件实例
     * @param  {#<N.ui>.Widget} _instance 控件实例
     * @return {Void}
     */
    Widget.recycle = function(_instance) {
        if (!(_instance instanceof this) ||
            _instance.destroyed()) return null;
        var _group = _instance.group();
        if (!!_group && !this.group[_group]) return null;
        _instance.destroy();
        if (!!_group) delete this.group[_group];
        this.pool = this.pool || [];
        this.pool.push(_instance);
        return null;
    }

    /**
     * UI控件基类对象初始化函数
     * @param  {String|Node} _parent  控件所在的父节点ID或者对象
     * @param  {Object}      _options 可选配置参数
     * @return {Void}
     */
    proto.initialize = function(_parent, _options) {
        this.superClass();
        Widget.dumpStyle();
        this.body = $('<div class="' + this.getSpace() + '"></div>');
        this.body.append(this.getXhtml() || '');
        this.intXnode();
        this.reset(_parent, _options);
    }

    /**
     * 销毁控件
     * @param  {Boolean} _redestroy 是否来自重回收
     * @return {Void}
     */
    proto.destroy = function(_redestroy) {
        if (!this.getEvent('onbeforedestroy')) return null;
        this.dispatchEvent('onbeforedestroy');
        this.delEvent('onbeforedestroy');
        this._recycleBody();
        this.body.removeClass(this.klass);
        delete this.klass;
    }

    /**
     * 重置控件
     * @param  {String|Node} _parent  控件所在的父节点ID或者对象
     * @param  {Object}      _options 可选配置参数
     * @return {Void}
     */
    proto.reset = function(_parent, _options) {
        _options = _options || O;
        this.group = _options.group;
        this.resetOption(_options);
        this.appendToParent(_parent, !!_options.before);
    }

    /**
     * 重置控件可选配置
     * @param  {Object} _options 控件可选配置
     * @return {Void}
     */
    proto.resetOption = function(_options) {
        _options = _options || O;
        this.klass = _options['class'] || '';
        this.body.addClass(this.klass);
        this.hhack = $.browser.msie && !!_options.hackhover;
        this.addEvent('onbeforedestroy', _options.onbeforedestroy || F);
    }

    /**
     * 获取控件节点对象
     * @return {Node} 控件节点对象
     */
    proto.getBody = function() {
        return this.body;
    }

    /**
     * 将控件节点添加到父节点中
     * @param  {String|Node} _parent 父节点ID或者对象
     * @param  {Boolean}     _before 是否在父节点的第一个位置
     * @return {Void}
     */
    proto.appendToParent = function(_parent, _before) {
        if (!this.body) return null;
        if (!_parent) return null;
        this.parent = _parent == document.documentElement ? $body : $(_parent);
        this._revertBody(_before);
    }

    /**
     * 取控件分组
     * @return {Void}
     */
    proto.group = function() {
        return this.group || null;
    }

    /**
     * 判断控件是否已经销毁
     * @return {Boolean} 是否已经销毁
     */
    proto.destroyed = function() {
        return !this.used;
    }

    /**
     * 回收控件节点
     * @return {Void}
     */
    proto._recycleBody = function() {
        this.used = false;
        this.hhack ? this.body.hide()
            : this.body.empty();
    }

    /**
     * 恢复控件节点
     * @param  {String|Node} _parent 父节点ID或者对象
     * @param  {Boolean}     _before 是否在父节点的第一个位置
     * @return {Void}
     */
    proto._revertBody = function(_before) {
        if (!this.parent || !this.body) return null;
        !_before ? this.parent.append(this.body)
            : this.parent.insertBefore(this.body);
        if (this.hhack) this.body.show();
        this.used = true;
    }

    /**
     * 获取控件样式的命名空间，子类实现具体内容
     * @return {String} 控件样式的命名空间
     */
    proto.getSpace = F;

    /**
     * 获取控件结构代码，子类实现具体内容
     * @return {String} 结构代码
     */
    proto.getXhtml = F;

    /**
     * 初始化控件节点，子类实现具体内容
     * @return {Void}
     */
    proto.intXnode = F;

    function _parseStyle(_css, _style) {
        if (!_css) return null;
        // ignore element if not ie
        if (!$.browser.msie || $('style').length < 30) {
            if (!_style) {
                var _style = document.createElement('style');
                _style.setAttribute('type', 'text/css');
                (document.head || document.getElementsByTagName('head')[0]).appendChild(_style);
            }
            !$.browser.msie ? _style.innerHTML = _css
                : _style.styleSheet.cssText = _css;
            return _style;
        }
    }

    module.exports = Widget;
});
