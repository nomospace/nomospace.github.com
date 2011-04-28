/**
 * 简易鼠标/键盘取词并分享到新浪微博
 * @version 0.2
 * @author	nomospace(jinlu_hz@163.com)
 * @depends nts-js
 */
(function(){
    /**
     * 主模块类
     * @constructor
     * @class   主模块类
     */
    _$$SimpleWeiboShareModule = C();
    var __proModule = _$$SimpleWeiboShareModule.prototype;
    /**
     * 默认初始化函数
     * @return {Void}
     */
    __proModule._$initialize = function(){
		this.__tipNode = E._$getElement('nm_tip');
        var _handler = this.__triggerTip._$bind(this);
        V._$addEvent(document, 'click', _handler);
        V._$addEvent(document, 'keyup', _handler);
        V._$addEvent(document, 'mouseup', _handler);
        V._$addEvent(this.__tipNode, 'click', this.__clickTip._$bind(this));
    };
	/**
	 * 获取选区文本对象
	 * @see Document Object Model Range http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html
	 * @return {String} 
	 */
    __proModule.__getSelectText = function(){
        var _txt;
        if (document.selection) {
            _txt = document.selection.createRange().text;
        }
        else 
            if (window.getSelection) {
                _txt = window.getSelection()
            }
            else 
                if (document.getSelection) {
                    _txt = document.getSelection();
                }
        return _txt.toString();
    };
	/**
	 * 弹出微薄图标
	 * @param {Object} _event	click event
	 * @return {Void}
	 */
    __proModule.__triggerTip = function(_event){
        var _style = this.__tipNode.style;
        if (this.__getSelectText()) {
            var _delta = 20;
            _style.display = 'block';
            _style.top = V._$pointerY(_event) + _delta + 'px';
            _style.left = V._$pointerX(_event) + _delta + 'px';
        }
        else 
            _style.display = 'none';
    };
    /**
     * 点击微薄图标的操作函数
	 * @param {Object} _event	click event
     * @return {Void}
     */
    __proModule.__clickTip = function(_event){
		V._$stopDefault(_event);
        var _txt = this.__getSelectText();
        if (_txt) {
			open('http://v.t.sina.com.cn/share/share.php?title=' + _txt + '&url=' + location.href);
		}
    };
	/**
	 * 主模块类入口
	 */
    new _$$SimpleWeiboShareModule();
})();