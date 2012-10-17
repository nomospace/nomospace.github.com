/**
 * 连连看实现文件
 * @version 0.3
 * @depends nts-amd https://github.com/nomospace/nts-amd
 */
define(function(require) {
  'use strict';

  var Class = require('class');
  var Item = require('item');
  var $ = require('$');

  /**
   * 连连看主模块类
   * @constructor
   * @class   连连看主模块类
   */
  var MatchGameModule = {
    /**
     * 默认初始化函数
     * @return {Void}
     */
    init: function() {
      this._intXnode();
      this._intModule();
    },

    /**
     * 初始化节点
     * @return {Void}
     */
    _intXnode: function() {
      this.totalCount = $('#mg_total_count');
      this.imageTypeCount = $('#mg_image_type_count');
      this.container = $('#mg_container');
      $('#mg_start_botton').click(this._startGame.bind(this));
    },

    /**
     * 初始化模块（目前算法只支持m*m的矩阵，默认为8行8列）
     * @return {Void}
     */
    _intModule: function() {
      this.defaultLineCount = 8;
      this.defaultColumnCount = 8;
      this.defaultTotalCount = this.defaultLineCount * this.defaultColumnCount;
      this._startGame();
    },

    /**
     * 开始游戏
     * @return {Void}
     */
    _startGame: function() {
      this._matrix = this._getDefaultMatrix();
      for (var i = 0, l = this.totalCount.val(); i < l; i++) {
        this._initMatrixData();
      }
      this.matchGameData = this._getMatchData();
      this._draw();
    },

    /**
     * 获取游戏所有格子的一维数组数据
     * @return {Array}
     */
    _getMatchData: function() {
      for (var i = 0, m = this._matrix.length, _tmpArray = []; i < m; i++) {
        for (var j = 0, n = this._matrix[i].length; j < n; j++) {
          _tmpArray.push(this._matrix[i][j]);
        }
      }
      return _tmpArray;
    },

    /**
     * 生成默认值都为{}的二维数组
     * @return {Array}
     */
    _getDefaultMatrix: function() {
      //	临时二位数组
      for (var i = 0, x = this.defaultLineCount, _matrix = []; i < x; i++) {
        _matrix[i] = [];
        for (var j = 0, y = this.defaultColumnCount; j < y; j++) {
          _matrix[i][j] = {};
        }
      }
      return _matrix;
    },

    /**
     * 绘制格子
     * @return {Void}
     */
    _draw: function() {
      var _class = MatchGamePoint;
      this.matchGamePoints && _class.recycle(this.matchGamePoints);
      this.matchGamePoints =
        _class.allocate(this.matchGameData, this.container, {onselect: this._onPointSelected.bind(this)});
    },

    /**
     * 随机生成两两配对的矩阵
     * @param {Object} _value    元素值
     * @param {Object} _color    元素样式值
     * @param {Object} _done    是否已分配两两配对的元素
     * @return {Void}
     */
    _initMatrixData: function(_value, _color, _done) {
      var _position = this._getRandomPosition(),
        _value = _value || this._getRandomImageValue(),
        _color = _color || this._getRandomImageColor();

      if (!this._matrix[_position.x][_position.y].value) {
        this._setPointValue(_position, _value, _color);
        if (_done) {
          return null;
        }
        _position = this._getRandomPosition();
        if (!this._matrix[_position.x][_position.y].value) {
          this._setPointValue(_position, _value, _color);
        }
        else {
          this._initMatrixData(_value, _color, true);
        }
      }
      else {
        this._initMatrixData(_value, _color);
      }
    },

    /**
     * 设置格子对象（分配元素值并设定坐标值）
     * @param {Object} _position    元素坐标
     * @param {Object} _value    元素值
     * @param {Object} _color    元素样式值
     */
    _setPointValue: function(_position, _value, _color) {
      this._matrix[_position.x][_position.y] = {
        value: _value,
        color: _color,
        position: {
          x: _position.x,
          y: _position.y,
          index: _position.x * this.defaultColumnCount + _position.y
        }
      };
    },

    /**
     * 随机获取格子位置
     * @return {Object}
     */
    _getRandomPosition: function() {
      return {
        x: Math.floor(Math.random() * this.defaultLineCount),
        y: Math.floor(Math.random() * this.defaultColumnCount)
      };
    },

    /**
     * 随机获取图片元素值（以文字来代替传统的图片）
     * @return {String}    元素值
     */
    _getRandomImageValue: function() {
//        var _value = String.fromCharCode(Math.floor(Math.random() * this.imageTypeCount.value + 1) +
//			(Math.floor(Math.random() * 127)));
      //	ascii码的值33~126的值都不为空，可用作有效图片
      //	todo:指定图标类型数量
      var _value = String.fromCharCode(Math.floor(Math.random() * (126 - 33 + 1) + 33));
      return _value;
    },

    /**
     * 随机获取图片元素字体色值（方便辨认）
     * @return {String}    元素字体色值
     */
    _getRandomImageColor: function() {
      return Math.floor(
        0xffff00 * Math.floor(Math.random() * this.imageTypeCount.val() + 1) / this.totalCount.val()
      ).toString(16);
    },

    /**
     * 选择格子
     * @param {Object} _data
     * @param {Boolean} _selected
     */
    _onPointSelected: function(_data, _selected) {
      for (var i = 0, l = this.matchGamePoints.length, _item, _selectedPoints = []; i < l; i++) {
        _item = this.matchGamePoints[i];
        if (_item.isSelected()) {
          _selectedPoints.push(_item);
          if (_selectedPoints.length == 2) {
            this._checkMatch(_selectedPoints);
            break;
          }
        }
      }
    },
    /**
     * 检测格子匹配情况
     * @param {Array} _points
     * @return {Void}
     */
    _checkMatch: function(_points) {
      if (!$.isArray(_points) || _points.length != 2) {
        this._draw();
        return null;
      }

      var _pointA = _points[0],
        _pointB = _points[1],
        _dataA = _pointA.getData(),
        _dataB = _pointB.getData(),
        _positionA = _dataA.position,
        _positionB = _dataB.position;

      if (!this._checkValue(_dataA, _dataB)) {
        setTimeout(this._draw.bind(this), 200);
        return null;
      }

      if (_positionA.x == _positionB.x && this._checkHorizon(_positionA, _positionB) || //元素在同一水平方向
        _positionA.y == _positionB.y && this._checkVertical(_positionA, _positionB) || //元素在同一垂直方向
        this._hasOneCorner(_positionA, _positionB) || //有一个拐角
        this._hasTwoCorner(_positionA, _positionB)) {                                 //有两个拐角
        this._removeMatrix(_positionA, _positionB);
      }
      setTimeout(this._draw.bind(this), 200);

//        /*
//         * 条件一：元素相邻
//         */
//        if (this.__isNeighbour(_positionA, _positionB, 1)) {
//            console.log('match!');
//            this._removeMatrix(_positionA, _positionB);
//        }
//        /*
//         * 条件二：元素在同一水平方向或者垂直方向
//         */
//        else 
//            //	水平方向
//            if (_positionA.x == _positionB.x) {
//                var _distance = Math.abs(_positionA.y - _positionB.y) - 1, _index = _positionA.y < _positionB.y ? (_positionA.index + 1) : (_positionB.index + 1);
//                for (var i = 0; i < _distance; i++) {
//                    if (this.matchGameData[_index + i].value) 
//                        break;
//                    if (i == _distance - 1) {
//                        console.log('match!');
//                        this._removeMatrix(_positionA, _positionB);
//                    }
//                }
//            }
//            else 
//                //	垂直方向
//                if (_positionA.y == _positionB.y) {
//                    var _distance = Math.abs(_positionA.x - _positionB.x) - 1, _index = _positionA.x < _positionB.x ? (_positionA.index + 1) : (_positionB.index + 1);
//                    for (var i = 0; i < _distance; i++) {
//                        if (this.matchGameData[_index + this.defaultLineCount * (i + 1) + i].value) 
//                            break;
//                        if (i == _distance - 1) {
//                            console.log('match!');
//                            this._removeMatrix(_positionA, _positionB);
//                        }
//                    }
//                }
//                else {
//                //	有拐角的情况 TODO
//                }
    },
    /**
     * 检测格子值是否匹配
     * @param {Object} _dataA
     * @param {Object} _dataB
     * @return {Boolean}
     */
    _checkValue: function(_dataA, _dataB) {
      return _dataA.value == _dataB.value && _dataA.color == _dataB.color;
    },

    /**
     * 判断元素是否相邻（即水平或垂直方向距离为1）
     * @param {Object} a
     * @param {Object} b
     * @param {Object} _distance
     */
//	__isNeighbour : function(a, b, _distance){
//        return ((a.x == b.x) && (Math.abs(a.y - b.y) == _distance)) ||
//        		((a.y == b.y) && (Math.abs(a.x - b.x) == _distance));
//	},
    /**
     * 水平方向检测
     * @param {Object} a
     * @param {Object} b
     */
    _checkHorizon: function(a, b) {
      var _startX = a.y <= b.y ? a.y : b.y, _endX = a.y <= b.y ? b.y : a.y;
      for (var x = _startX + 1; x < _endX; x++) {
        if (this._matrix[a.x][x].value) {
          return false;
        }
      }
      return true;
    },

    /**
     * 垂直方向检测
     * @param {Object} a
     * @param {Object} b
     */
    _checkVertical: function(a, b) {
      var _startY = a.x <= b.x ? a.x : b.x, _endY = a.x <= b.x ? b.x : a.x;
      for (var y = _startY + 1; y < _endY; y++) {
        if (this._matrix[y][a.y].value) {
          return false;
        }
      }
      return true;
    },

    /**
     * 一个拐角的检测
     * @param {Object} a
     * @param {Object} b
     */
    _hasOneCorner: function(a, b) {
      var c = {x: a.x, y: b.y}, d = {x: b.x, y: a.y};
      if (!this._matrix[c.x][c.y].value) {
        return this._checkHorizon(a, c) && this._checkVertical(b, c);
      }
      if (!this._matrix[d.x][d.y].value) {
        return this._checkVertical(a, d) && this._checkHorizon(b, d);
      }
      else {
        return false;
      }
    },

    /**
     * 两个拐角的检测
     * @param {Object} a
     * @param {Object} b
     */
    _hasTwoCorner: function(a, b) {
      var _tmpList = this._scanTheRoute(a, b);
      if (_tmpList.length == 0)
        return false;
      for (var index = 0; index < _tmpList.length; index++) {
        var _line = _tmpList[index];
        if (_line.direct == 1) {
          if (this._checkVertical(a, _line.a) && this._checkVertical(b, _line.b))
            return true;
        }
        else if (this._checkHorizon(a, _line.a) && this._checkHorizon(b, _line.b))
          return true;
      }
      return false;
    },

    /**
     * 检测水平/垂直两个方向的连通情况
     * @param {Object} a
     * @param {Object} b
     */
    _scanTheRoute: function(a, b) {
      var _tmpList = [], _function = function() {
        if (!this._matrix[a.x][y].value && !this._matrix[b.x][y].value && this._checkVertical(this._getPoint(a.x, y), this._getPoint(b.x, y)))
          _tmpList.push(this._setLine(0, this._getPoint(a.x, y), this._getPoint(b.x, y)));
      }.bind(this);
      for (var y = a.y; y >= 0; y--)
        _function();
      for (var y = a.y; y < this.defaultLineCount; y++)
        _function();

      _function = function() {
        if (!this._matrix[x][a.y].value && !this._matrix[x][b.y].value && this._checkHorizon(this._getPoint(x, a.y), this._getPoint(x, b.y)))
          _tmpList.push(this._setLine(1, this._getPoint(x, a.y), this._getPoint(x, b.y)));
      }.bind(this);
      for (var x = a.x; x >= 0; x--)
        _function();
      for (var x = a.x; x < this.defaultColumnCount; x++)
        _function();

      return _tmpList;
    },

    /**
     * 获取目标元素坐标
     * @param {Object} a
     * @param {Object} b
     */
    _getPoint: function(a, b) {
      return {x: a, y: b};
    },

    /**
     * 设置坐标
     * @param {Object} _direct
     * @param {Object} a
     * @param {Object} b
     */
    _setLine: function(_direct, a, b) {
      //	todo:绘制最短路径
      return {direct: _direct, a: a, b: b}
    },

    /**
     * 删除矩阵中某对格子的数据
     * @param {Object} a
     * @param {Object} b
     * @return {Void}
     */
    _removeMatrix: function(a, b) {
      this.matchGameData[a.index].value = this.matchGameData[b.index].value = '';
    },

    /**
     * 检测当前游戏是否无解/死锁
     * @return {Boolean}
     */
    _checkDeadlock: function() {
    }
  }

  /**
   * 连连看单个格子项对象
   * @constructor 连连看单个格子项对象
   * @base    Item
   * @extends Item
   */
  var MatchGamePoint = Class();
  var protoPoint = MatchGamePoint.extend(Item, true);

  protoPoint.initialize = function() {
    this.superClass('<li><a></a></li>');
    this._initXnode();
  }

  /**
   * 项重置
   * @param  {Object} _options 可选配置参数
   * @return {Void}
   */
  protoPoint.reset = function(_options) {
    this.addEvent('onselect', _options.onselect);
  }

  /**
   * 初始化节点
   * @return {Void}
   */
  protoPoint._initXnode = function() {
    this.point = this.body.children().eq(0);
    this.point.click(this._onClickPoint.bind(this));
  }

  /**
   * 设置数据
   * @param {Object} _data    格子数据对象
   *
   * @return {Void}
   */
  protoPoint.setData = function(_data) {
    this.data = _data;
    if (!_data.value) {
      this.point.text('');
      this.point.css('backgroundColor', '#fff');
      this.point[0].className = 'text';
    }
    else {
      this.point.text(_data.value || '');
      try {
        this.point.css('color', '#' + _data.color);
      }
      catch (e) {
        //	ie下偶尔出现类似#00000五位值或者七位值无效的异常
        _data.color = _data.color.substring(0, 4) + '00';
        this.point.css('color', '#' + _data.color);
      }
      this.point.css('fontFamily', 'webdings');
    }
  }

  /**
   * 格子项点击的处理函数
   * @return {Void}
   */
  protoPoint._onClickPoint = function() {
    if (!this.data.value) {
      return null;
    }
    var _selected = this.selected ? false : true;
    this.toggle(this.point, 'on');
    this.dispatchEvent('onselect', this.data, this.selected = _selected);
  }

  /**
   * 切换节点样式
   * @param  {String|Node}    _element 触发切换的节点
   * @param  {String}     _class    触发切换的样式
   * @return {Void}
   */
  protoPoint.toggle = function(_elm, _class) {
    _elm.hasClass(_class) ? _elm.removeClass(_class) : _elm.addClass(_class)
  }

  /**
   * 返回格子项当前的选择状态
   * @return {Boolean}
   */
  protoPoint.isSelected = function() {
    return this.selected;
  }

  /**
   * 格子项销毁的处理函数（清理格子项的临时状态）
   * @return {Void}
   */
  protoPoint.destroy = function() {
    MatchGamePoint.supro.destroy.call(this);
    this.point.prop('class', '');
    this.point.removeAttr('style');
    this.selected = false;
  }

  /**
   * 连连看主模块类入口
   */
  MatchGameModule.init();

});
