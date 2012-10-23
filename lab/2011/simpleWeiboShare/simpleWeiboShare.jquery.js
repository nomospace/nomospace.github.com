$(function() {
  $.SimpleWeiboShareModule = function() {
    $(document).bind('click keyup mouseup', function(_event) {
      if (_getSelectText()) {
        var _delta = 20;
        $('#nm_tip').css({
          display: 'block',
          top: _event.pageY + _delta + 'px',
          left: _event.pageX + _delta + 'px'
        });
      }
      else
        $('#nm_tip').hide();
    });
    $('#nm_tip').bind('click', function(_event) {
      _event.stopPropagation();
      var _txt = _getSelectText();
      if (_txt) {
        open('http://v.t.sina.com.cn/share/share.php?title=' + _txt + '&url=' + location.href);
      }
    });
    /**
     * 获取选区文本对象
     * @see Document Object Model Range http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html
     * @return {String}
     */
    var _getSelectText = function() {
      var _txt;
      if (document.selection) {
        _txt = document.selection.createRange().text;
      }
      else if (window.getSelection) {
        _txt = window.getSelection()
      }
      else if (document.getSelection) {
        _txt = document.getSelection();
      }
      return _txt.toString();
    };
  };
  /**
   * 主模块类入口
   */
  new $.SimpleWeiboShareModule();
});
