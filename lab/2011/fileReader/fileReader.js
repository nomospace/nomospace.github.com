/**
 * html5文件拖放demo
 * @version 0.3
 * @author  nomospace(jinlu_hz@163.com)
 * @depends nts-js
 */
(function() {
  var p = P('nomospace'), //	module namespace
    __proModule, //	module class prototype
    __proItem, //	module class prototype
    __xhtml = // 	module item html
      '<li>' +
        '<div class="prv">' +
        '<div class="thumb"><img class="t"/></div>' +
        '</div>' +
        '<div class="info">' +
        '<strong class="t"></strong><span class="t"></span>' +
        '</div>' +
        '</li>';
  // html5文件拖放模块
  p._$$FileReaderModule = C();
  __proModule = p._$$FileReaderModule.prototype;
  /**
   * 模块初始化函数
   * @return {Void}
   */
  __proModule._$initialize = function() {
    var _doc = document;
    this.__listCon = E._$getElement('list_con');
    V._$addEvent(_doc, 'dragover', V._$stop);
    V._$addEvent(_doc, 'drop', this.__onSelect._$bind(this));
//       V._$addEvent(_doc, 'dragenter', this.__onEnter._$bind(this))
//       V._$addEvent(_doc, 'dragleave', this.__onLeave._$bind(this))
  };
  /**
   * 处理拖放文件列表
   * @param {Object} _event
   * @return {Void}
   */
  __proModule.__onSelect = function(_event) {
    V._$stop(_event);
    var _class = p._$$FileItem,
      _files = _event.dataTransfer.files,
      _fileList = [];
    for (var i in _files) {
      if (_files[i].constructor == File)
        if (this.__isImage(_files[i].type)) {
          _fileList.push(_files[i]);
        }
        else {
          alert('只可以拖拽jpg/png/gif/bmp格式的文件哦^_^');
        }
    }
//            this._FileItems && _class._$recycle(this._FileItems);
    /*this._FileItems = */
    _class._$allocate(_fileList, this.__listCon, {});
  };
  /**
   * 判断是否图片
   * @param {String} _type  文件类型
   * @return {Void}
   */
  __proModule.__isImage = function(_type) {
    switch (_type) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
      case 'image/bmp':
      case 'image/jpg':
        return true;
      default:
        return false;
    }
  };
  // 文件项模块
  p._$$FileItem = C();
  __proItem = p._$$FileItem._$extend(P(N.ut)._$$Item, true);
  /**
   * 初始化函数
   * @return {Void}
   */
  __proItem._$initialize = function() {
    this._$super(E._$addNodeTemplate(__xhtml));
    this.__initXnode();
  };
  /**
   * 初始化文件项节点
   * @return {Void}
   */
  __proItem.__initXnode = function() {
    this.__eoriginSrc = E._$getElement('origin_src');
    var _tmp = E._$getElementsByClassName(this.__body, 't')
    this.__eimg = _tmp[0];
    this.__ename = _tmp[1];
    this.__einfo = _tmp[2];
    this.__reader = new FileReader();
//		按此绑定事件会抛异常：Uncaught TypeError: Object #<FileReader> has no method 'addEventListener'
//        V._$addEvent(this.__reader, 'load', this.__onFileLoad._$bind(this));
//        V._$addEvent(this.__reader, 'loadstart', this.__onFileLoadStart._$bind(this));
    this.__reader.onload = this.__onFileLoad._$bind(this);
    this.__reader.onloadstart = this.__onFileLoadStart._$bind(this);
    V._$addEvent(this.__eimg, 'mouseover', this.__imageHover._$bind(this, true));
    V._$addEvent(this.__eoriginSrc, 'mouseover', this.__imageHover._$bind(this, false));
    V._$addEvent(this.__eimg, 'mouseout', this.__imageOut._$bind(this));
    V._$addEvent(this.__eoriginSrc, 'mouseout', this.__imageOut._$bind(this));
  };
  /**
   * 设置数据
   * @param {Object} _file  文件数据对象
   * @return {Void}
   */
  __proItem._$setData = function(_file) {
    this.__fileData = _file;
    this.__reader.readAsDataURL(_file);
  };
  /**
   * 文件加载完毕的处理函数
   * @param {Object} _event
   * @return {Void}
   */
  __proItem.__onFileLoad = function(_event) {
    this.__fileData.src = _event.target.result;
    this.__eimg.src = this.__fileData.src;
    this.__ename.innerHTML = this.__fileData.name;
    this.__einfo.innerHTML = '(' + this.__fileData.type + ') - ' + parseFloat(this.__fileData.size / 1024, 1).toFixed(1) + 'kb';
  };
  /**
   * 文件开始加载的处理函数
   * @return {Void}
   */
  __proItem.__onFileLoadStart = function() {
    this.__ename.innerHTML = '相片加载中...';
  };
  /**
   * 鼠标移过图片对象
   * @param {Boolean} _needLoadSrc  是否需要设置图片src
   * @param {Object} _event
   * @return {Void}
   */
  __proItem.__imageHover = function(_needLoadSrc, _event) {
    if (this.__hovering)
      return null;
    var _target = _event.target,
      _style = this.__eoriginSrc.style;
    _style.display = 'block';
    _style.left = _target.offsetLeft + 'px';
    _style.top = _target.offsetTop + 'px';
    if (_needLoadSrc)
      this.__eoriginSrc.src = this.__fileData.src;
    this.__hovering = true;
  };
  /**
   * 鼠标移出图片对象
   * @return {Void}
   */
  __proItem.__imageOut = function() {
    this.__hovering = false;
    this.__eoriginSrc.style.display = 'none'
  };
  /**
   * 初始化入口
   */
  if (window.FileReader) {
    new p._$$FileReaderModule();
  }
  else {
    alert('当前浏览器不支持html5文件拖放：(')
  }
})();
