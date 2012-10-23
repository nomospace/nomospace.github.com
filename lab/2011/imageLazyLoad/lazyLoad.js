/**
 * 图片资源延迟加载对象类文件
 * @version 1.3
 * @author nomospace(jinlu_hz@163.com)
 */
(function() {
  // private
  var p = P('np.w'),
    __pro;
  /**
   * 图片资源延迟加载对象类（目前只支持垂直方向）
   * @constructor
   * @class   图片资源延迟加载对象类
   * @extends P(N.ut)._$$Singleton
   * @param   {Object}      _options 可选配置参数，已处理的参数如下：
   *                                 delay             [Number]       - 滚动延时时间，默认为0
   *                                 threshold         [Number]       - 加载范围阈值，默认为0
   *                                 failurelimit    [Number]       - 图片未找到时的重试次数，默认为0
   *                                 container         [HTML|Element]  - 图片所在的容器，默认为window对象
   *                                 images      [Array]      - 图片队列，默认为所有的image对象
   *                                 attribute    [String]    - 图片资源地址的自定义属性，默认为data-lazyload-src
   *                                 onbeforedataload [Function]    - 图片加载前的回调函数，默认为F
   *                                 onafterdataload   [Function]     - 图片加载后的回调函数，默认为F
   */
  p._$$ImageLazyLoad = C();
  __pro = p._$$ImageLazyLoad._$extend(P(N.ut)._$$Singleton, true);
  /**
   * 对象初始化函数
   * @return {Void}
   */
  __pro.__initialize = function() {
    this.__bindEvent();
  };
  /**
   * 初始化相关事件函数
   * @return {Void}
   */
  __pro.__bindEvent = function() {
    var _function = this.__beginLoad._$bind(this);
    this._$addEvent('appear', _function);
    V._$addEvent(window, 'scroll', this.__delayLoad._$bind(this, _function));
    V._$addEvent(window, 'resize', this.__delayResize._$bind(this, _function));
  };
  /**
   * 清除相关事件函数
   * @return {Void}
   */
  __pro.__clearEvent = function() {
    V._$delEvent(window, 'scroll', this.__delayLoad._$bind(this)); //	bug unfixed:scroll事件无法正常清除
    V._$delEvent(window, 'resize', this.__delayResize._$bind(this));
  };
  /**
   * 重置可选配置参数
   * @param  {Object} _options 可选配置参数
   * @return {Void}
   */
  __pro._$resetOption = function(_options) {
    _options = _options || O;
    this.__delay = _options.delay || 0;
    this.__threshold = _options.threshold || 0;
//    this.__failureLimit = _options.failurelimit || 0;
    this.__container = _options.container || window;
    this.__imgs = _options.images || this.__container.getElementsByTagName('img');
    this.__placeholder = _options.placeholder || location.snf;
    this.__attribute = _options.attribute || 'data-lazyload-src';
    this._$batEvent({
      onbeforedataload: _options.onbeforedataload || F,
      onafterdataload: _options.onafterdataload || F
    });
    this.__setPlaceHolder();
    this.__width = 0; 	//container clientWidth temp value
    this.__height = 0; //container clientHeight temp value
    this._$dispatchEvent('appear');
//        V._$dispatchEvent(window, 'scroll');	//bug unfixed: all browsers suck?how to trigger scroll event
  };
  /**
   * 设置图片默认占位符
   * @return {Void}
   */
  __pro.__setPlaceHolder = function() {
    for (var i = 0, j = this.__imgs.length, _img, _tmp = []; i < j; i++) {
      _img = this.__imgs[i];
      _img.loaded = false;
      if (this.__hasAttribute(_img) && this.__placeholder) {
        _img.src = this.__placeholder;
        _tmp.push(_img);
      }
    }
    this.__imgs = _tmp;
  };
  /**
   * 延时操作
   * @param {Function} _function
   */
  __pro.__delayLoad = function(_function) {
    clearTimeout(this.__timer);
    if (this.__pause || this.__isFinish())
      return;
    var _that = this;
    if (this.__lock) {
      //	防止连续触发
      this.__timer = setTimeout(function() {
        _that.__delayLoad(_function);
      }, this.__delay);
    }
    else {
      this.__lock = true;
      _function();
      setTimeout(function() {
        _that.__lock = false;
      }, this.__delay);
    }
  };
  /**
   * 开始加载元素
   * @return {Void}
   */
  __pro.__beginLoad = function() {
    for (var i = 0, j = this.__imgs.length, _img; i < j; i++) {
      _img = this.__imgs[i];
      if (this.__isInViewport(_img)) {
        this.__onLoadData(_img);
        _img.loaded = true;
      }
      //	todo add failurelimit
//			else 
//				if (this.__aboveTheTop(_img) && ++_count > this.__failureLimit) {
//					console.log(_img);
//					break;
//				}
    }
    /* Remove image from array so it is not looped next time. thanks to jQuery */
    this.__imgs = U.arr._$filter(this.__imgs, function(_img) {
      return !_img.loaded;
    });
  };
  /**
   * 元素是否在可视区域
   * @param {HTML|Element} _element  目标元素
   * @return {Boolean}
   */
  __pro.__isInViewport = function(_element) {
    return !this.__aboveTheTop(_element) && !this.__belowTheBottom(_element);
  };
  /**
   * 判断元素是否位于当前可视区域的上部
   * @param {HTML|Element} _element  目标元素
   * @return {Boolean}
   */
  __pro.__aboveTheTop = function(_element) {
    var _top = this.__getClient().top;
    return _top >= this.__offset(_element).top + this.__offset(_element).height + this.__threshold;
  };
  /**
   * 判断元素是否位于当前可视区域的下部
   * @param {HTML|Element} _element
   * @return {Boolean}
   */
  __pro.__belowTheBottom = function(_element) {
    var _bottom = this.__getClient().bottom;
    return _bottom <= this.__offset(_element).top + this.__offset(_element).height - this.__threshold;
  };
  /**
   * 获取目标元素距离顶级元素的高
   * @param {HTML|Element} _element  目标元素
   * @return {Object}
   */
  __pro.__offset = function(_element) {
    var _left = 0, _top = 0, _width = _element.offsetWidth, _height = _element.offsetHeight;
    while (_element.offsetParent) {
      _left += _element.offsetLeft;
      _top += _element.offsetTop;
      _element = _element.offsetParent;
    }
    return {
      top: _top, //	元素顶部距离顶级元素的高
      left: _left, //	元素左部距离顶级元素左部的宽
      width: _width, //	元素宽
      height: _height  //	元素高
    };
  };
  /**
   * 返回浏览器当前可视区域的位置
   * @return {Object}
   */
  __pro.__getClient = function() {
    var _top = U.dom._$scrollTop(), //	可视区域顶部距离顶级元素的高
      _height = U.dom._$clientHeight(), //	可视区域高
      _bottom = _top + _height, //	可视区域底部距离顶级元素的高
      _left = U.dom._$scrollLeft(), //	可视区域左部距离顶级元素左部的宽
      _width = U.dom._$clientWidth();		//	可视区域宽
    return {
      top: _top, left: _left, width: _width, height: _height, bottom: _bottom
    };
  };
  /**
   * 加载图片
   * @param {HTML|Element} _img  目标元素
   * @return {Void}
   */
  __pro.__onLoadData = function(_img) {
    if (this.__hasAttribute(_img)) {
      this._$dispatchEvent('onbeforedataload', _img);
      _img.src = _img.getAttribute(this.__attribute);
      _img.removeAttribute(this.__attribute);
      this._$dispatchEvent('onafterdataload', _img);
    }
  };
  /**
   * 判断属性是否已经加载的方法
   * @param {HTML|Element} _img  目标元素
   * @return {Boolean}
   */
  __pro.__hasAttribute = function(_img) {
    return B._$ISIE && B._$VERSION <= 8 ? (this.__attribute in _img) : _img.hasAttribute(this.__attribute);
  };
  /**
   * 浏览器发生resize时重新计算范围
   * @param {Object} _function
   * @return {void}
   */
  __pro.__delayResize = function(_function) {
    var _width = this.__getClient().width,
      _height = this.__getClient().height;
    if (_width != this.__width || _height != this.__height) {
      this.__width = _width;
      this.__height = _height;
      this.__delayLoad(_function);
    }
  };
  /**
   * 是否完成加载
   * @return {Boolean}
   */
  __pro.__isFinish = function() {
    if (!this.__imgs || !this.__imgs.length) {
      this.__destroy();
      return true;
    }
    else
      return false;
  };
  /**
   * 销毁操作
   * @param {Boolean} _load  是否手动销毁
   * @return {Boolean}
   */
  __pro.__destroy = function(_load) {
    clearTimeout(this.__timer);
    //	是否加载剩余图片元素
    if (_load && this.__imgs) {
      U.arr._$forEach(this.__imgs, function(_img) {
        this.__onLoadData(_img);
      }._$bind(this));
      this.__imgs = null;
    }
    this.__clearEvent();	//	bug unfixed:scroll事件无法清除
  };
  /**
   * 重新获取元素（用于在指定容器中动态生成新节点时）
   * @return {Void}
   */
  __pro._$reset = function() {
    this.__destroy();
    this.__pause = false;
    this.__imgs = this.__container.getElementsByTagName('img');
    this.__bindEvent();
    this.__setPlaceHolder();
    this._$dispatchEvent('appear');
  };
  /**
   * 暂停延迟加载
   * @return {Void}
   */
  __pro._$pauseLoad = function() {
    this.__pause = true;
  };
})();
