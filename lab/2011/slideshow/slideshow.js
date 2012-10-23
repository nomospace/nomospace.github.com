/**
 * 简易图片slideshow
 * @version 0.1
 * @author  nomospace(jinlu_hz@163.com)
 */
(function() {
  // 添加事件接口
  var addEvent = !!document.addEventListener ?
    function(_element, _type, _handler, _capture) {
      _element.addEventListener(_type, _handler, !!_capture);
    } :
    function(_element, _type, _handler) {
      _element.attachEvent('on' + _type, _handler);
    }
  // 绑定接口及参数，使其的调用对象保持一致
  if (!Function.prototype.bind) {
    Function.prototype.bind = function() {
      var _function = this, _args = arguments, _object = Array.prototype.shift.call(arguments);
      return function() {
        var _argc = Array.prototype.slice.call(_args, 0);
        Array.prototype.push.apply(_argc, arguments);
        return _function.apply(_object || window, _argc);
      };
    };
  }
  var SimpleSlideShowModule = function(_options) {
    this.__currentIndex = 0; //	默认已选择图片索引
    this.__interval = _options.interval || 3000; 						//	图片切换时间
    this.__data = _options.data;										//	图片数据列表
    var _tmp = document.getElementById('slider_left');
    this.__leftItems = _tmp.getElementsByTagName('li');				//	左侧大图父节点数组
    this.__leftImages = _tmp.getElementsByTagName('img');				//	左侧大图节点数组
    this.__mainCon = document.getElementById('slider_right'); 			//	右侧图片的容器对象
    this.__rightItems = this.__mainCon.getElementsByTagName('li'); 	//	右侧缩略图父节点数组
    this._$initialize();
  };
  SimpleSlideShowModule.prototype = {
    /**
     * 模块初始化操作
     * @return {Void}
     */
    _$initialize: function() {
      for (var i = 0, l = this.__rightItems.length; i < l; i++) {
        addEvent(this.__rightItems[i], 'mouseover', this._onPlayStop.bind(this, i));
      }
      addEvent(this.__mainCon, 'mouseout', this._onPlayStart.bind(this, this.__currentIndex));
      this._onPlayStart(0);
    },
    /**
     * 停止播放
     * @param {Number} _index  当前图片索引
     * @return {Void}
     */
    _onPlayStop: function(_index) {
      this.__tinv && clearInterval(this.__tinv);
      this._onShow(_index);
      for (var i = 0; i < 5; i++)
        this.__rightItems[i].className = i == _index ? 'on' : '';
      this.__currentIndex = _index;
    },
    /**
     * 开始播放
     * @param  {Number} _index   当前图片索引
     * @return {Void}
     */
    _onPlayStart: function(/*_index*/) {
      this.__tinv && clearInterval(this.__tinv);
//      var _index = _index || this.__currentIndex;
      //        this._onShow(_index);
      this.__tinv = setInterval(function() {
        this._onShow(this.__currentIndex);
        this.__currentIndex == 4 ? this.__currentIndex = 0 : this.__currentIndex++;
      }.bind(this), this.__interval);
    },
    /**
     * 显示当前图片索引的大图
     * @param {Number} _index  特定项
     */
    _onShow: function(_index) {
      if (!this.__leftImages[_index].src)
        this.__leftImages[_index].src = this.__data[_index].bigurl;
      for (var i = 0; i < 5; i++) {
        this.__leftItems[i].style.display = i == _index ? '' : 'none';
        this.__rightItems[i].className = i == _index ? 'on' : '';
      }
    }
  }
  /**
   * 主模块类入口
   */
  new SimpleSlideShowModule({interval: 5000, data: slideData});
})();
