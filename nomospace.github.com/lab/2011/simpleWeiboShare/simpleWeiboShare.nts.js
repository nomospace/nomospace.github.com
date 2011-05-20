/**
 * 简易鼠标/键盘取词并分享到新浪微博
 * @version 0.3
 * @author	nomospace(jinlu_hz@163.com)
 * @depends nts-js
 */
(function(){
    /**
     * 主模块类
     * @constructor
     * @class   主模块类
     */
    SimpleWeiboShareModule = C();
    SimpleWeiboShareModule.prototype = {
        /**
         * 默认初始化函数
         * @return {Void}
         */
        _$initialize: function(){
            this._doc = document;
            this._tipNode = this._doc.getElementById('nm_tip');
            var _handler = this._triggerTip._$bind(this);
            V._$addEvent(this._doc, 'click', _handler);
            V._$addEvent(this._doc, 'keyup', _handler);
            V._$addEvent(this._doc, 'mouseup', _handler);
            V._$addEvent(this._tipNode, 'click', this._clickTip._$bind(this));
        },
        /**
         * 获取选区文本对象
         * @see this._doc Object Model Range http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html
         * @return {String}
         */
        _getSelectText: function(){
            var _txt;
            if (this._doc.selection) {
                _txt = this._doc.selection.createRange().text;
            }
            else 
                if (window.getSelection) {
                    _txt = window.getSelection()
                }
                else 
                    if (this._doc.getSelection) {
                        _txt = this._doc.getSelection();
                    }
            return _txt.toString();
        },
        /**
         * 弹出微薄图标
         * @param {Object} _event	click event
         * @return {Void}
         */
        _triggerTip: function(_event){
            var _style = this._tipNode.style;
            if (this._getSelectText()) {
                var _delta = 20;
                _style.display = 'block';
                _style.top = V._$pointerY(_event) + _delta + 'px';
                _style.left = V._$pointerX(_event) + _delta + 'px';
            }
            else 
                _style.display = 'none';
        },
        /**
         * 点击微薄图标的操作函数
         * @param {Object} _event	click event
         * @return {Void}
         */
        _clickTip: function(_event){
            V._$stopDefault(_event);
            var _txt = this._getSelectText();
            if (_txt) {
                window.open('http://v.t.sina.com.cn/share/share.php?title=' + _txt + '&url=' + location.href);
            }
        }
    };
    /**
     * 主模块类入口
     */
    new SimpleWeiboShareModule();
})();
