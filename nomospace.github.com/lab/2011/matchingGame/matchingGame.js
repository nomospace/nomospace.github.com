/**
 * 连连看实现文件
 * @version 0.1
 * @author	nomospace(jinlu_hz@163.com)
 * @depends nts-js
 */
(function(){
    var p = P('nomospace.mg'),	//	module namespace
		__proModule,			//	module class prototype
		__proPoint;				//	module class prototype
    /**
     * 连连看主模块类
     * @constructor
     * @class   连连看主模块类
     */
    p._$$MatchingGameModule = C();
    __proModule = p._$$MatchingGameModule.prototype;
    /**
     * 默认初始化函数
     * @return {Void}
     */
    __proModule._$initialize = function(){
        this.__intXnode();
        this.__intModule();
    };
    /**
     * 初始化节点
     * @return {Void}
     */
    __proModule.__intXnode = function(){
        this.__totalCount = E._$getElement('mg_total_count');
        this.__imageTypeCount = E._$getElement('mg_image_type_count');
        this.__container = E._$getElement('mg_container');
        V._$addEvent('mg_start_botton', 'click', this.__startGame._$bind(this));
    };
    /**
     * 初始化模块（目前算法只支持m*m的矩阵，默认为8行8列）
     * @return {Void}
     */
    __proModule.__intModule = function(){
        this.__defaultLineCount = 8;
        this.__defaultColumnCount = 8;
        this.__defaultTotalCount = this.__defaultLineCount * this.__defaultColumnCount;
        this.__startGame();
    };
    /**
     * 开始游戏
     * @return {Void}
     */
    __proModule.__startGame = function(){
        this.__matrix = this.__getDefaultMatrix();
        for (var i = 0, l = this.__totalCount.value; i < l; i++) {
            this.__initMatrixData();
        }
        this.__matchingGameData = this.__getMatchingData();
        this.__draw();
    };
	/**
	 * 获取游戏所有格子的一维数组数据
     * @return {Array}
	 */
    __proModule.__getMatchingData = function(){
        for (var i = 0, m = this.__matrix.length, _tmpArray = []; i < m; i++) {
            for (var j = 0, n = this.__matrix[i].length; j < n; j++) {
                _tmpArray.push(this.__matrix[i][j]);
            }
        }
        return _tmpArray;
    };
	/**
	 * 生成默认值都为{}的二维数组
	 * @return {Array}
	 */
    __proModule.__getDefaultMatrix = function(){
        //	临时二位数组
        for (var i = 0, x = this.__defaultLineCount, _matrix = []; i < x; i++) {
            _matrix[i] = [];
            for (var j = 0, y = this.__defaultColumnCount; j < y; j++) {
                _matrix[i][j] = {};
            }
        }
        return _matrix;
    };
	/**
	 * 绘制格子
	 * @return {Void}
	 */
    __proModule.__draw = function(){
        var _class = p._$$MatchingGamePoint;
        this.__matchingGamePoints && _class._$recycle(this.__matchingGamePoints);
        this.__matchingGamePoints = 
			_class._$allocate(this.__matchingGameData, this.__container, {onselect: this.__onPointSelected._$bind(this) || F});
    };
	/**
	 * 随机生成两两配对的矩阵
	 * @param {Object} _value	元素值
	 * @param {Object} _color	元素样式值
	 * @param {Object} _done	是否已分配两两配对的元素
	 * @return {Void}
	 */
    __proModule.__initMatrixData = function(_value, _color, _done){
        var _position = this.__getRandomPosition(), 
        	_value = _value || this.__getRandomImageValue(),
            _color = _color || this.__getRandomImageColor();
            
        if (!this.__matrix[_position.x][_position.y].value) {
            this.__setPointValue(_position, _value, _color);
            if (_done) {
                return;
            }
            _position = this.__getRandomPosition();
            if (!this.__matrix[_position.x][_position.y].value) {
	            this.__setPointValue(_position, _value, _color);
            }
            else {
                this.__initMatrixData(_value, _color, true);
            }
        }
        else {
            this.__initMatrixData(_value, _color);
        }
    };
	/**
	 * 设置格子对象（分配元素值并设定坐标值）
	 * @param {Object} _position	元素坐标
	 * @param {Object} _value	元素值
	 * @param {Object} _color	元素样式值
	 */
    __proModule.__setPointValue = function(_position, _value, _color){
        this.__matrix[_position.x][_position.y] = {
            value: _value,
            color: _color,
            position: {
                x: _position.x,
                y: _position.y,
                index: _position.x * this.__defaultColumnCount + _position.y
            }
        };
    };
	/**
	 * 随机获取格子位置
     * @return {Object}
	 */
    __proModule.__getRandomPosition = function(){
        return {
            x: Math.floor(Math.random() * this.__defaultLineCount),
            y: Math.floor(Math.random() * this.__defaultColumnCount)
        };
    };
	/**
	 * 随机获取图片元素值（以文字来代替传统的图片）
	 * @return {String}	元素值
	 */
    __proModule.__getRandomImageValue = function(){
//        var _value = String.fromCharCode(Math.floor(Math.random() * this.__imageTypeCount.value + 1) + 
//			(Math.floor(Math.random() * 127)));
        //	ascii码的值33~126的值都不为空，可用作有效图片	
		//	todo:指定图标类型数量
		var _value = String.fromCharCode(Math.floor(Math.random() * (126 - 33 + 1) + 33));
        return _value;
    };
	/**
	 * 随机获取图片元素字体色值（方便辨认）
	 * @return {String}	元素字体色值
	 */
    __proModule.__getRandomImageColor = function(){
        return Math.floor(0xffff00 * Math.floor(Math.random() * this.__imageTypeCount.value + 1) / this.__totalCount.value).toString(16);
    };
	/**
	 * 选择格子
	 * @param {Object} _data
	 * @param {Boolean} _selected
	 */
    __proModule.__onPointSelected = function(_data, _selected){
        for (var i = 0, l = this.__matchingGamePoints.length, _item, _selectedPoints = []; i < l; i++) {
            _item = this.__matchingGamePoints[i];
            if (_item._$isSelected()) {
                _selectedPoints.push(_item);
                if (_selectedPoints.length == 2) {
                    this.__checkMatch(_selectedPoints);
                    break;
                }
            }
        }
    };
	/**
	 * 检测格子匹配情况
	 * @param {Array} _points
	 * @return {Void}
	 */
    __proModule.__checkMatch = function(_points){
        if (!U._$isType(_points, 'Array') || _points.length != 2) {
            this.__draw();
            return;
        }
		var _pointA = _points[0], 
			_pointB = _points[1],
			_dataA = _pointA._$getData(),
			_dataB = _pointB._$getData(), 
			_positionA = _dataA.position, 
			_positionB = _dataB.position;
        
		if (!this.__checkValue(_dataA, _dataB)) {
			setTimeout(this.__draw._$bind(this), 200);
			return;
		}
		
        if (_positionA.x == _positionB.x && this.__checkHorizon(_positionA, _positionB) 		||	//元素在同一水平方向
		        _positionA.y == _positionB.y && this.__checkVertical(_positionA, _positionB) 	||	//元素在同一垂直方向
		        this.__hasOneCorner(_positionA, _positionB) 								||	//有一个拐角
		        this.__hasTwoCorner(_positionA, _positionB)) { 								//有两个拐角
        	this.__removeMatrix(_positionA, _positionB);
        }
		setTimeout(this.__draw._$bind(this), 200);
        
//        /*
//         * 条件一：元素相邻
//         */
//        if (this.__isNeighbour(_positionA, _positionB, 1)) {
//            console.log('match!');
//            this.__removeMatrix(_positionA, _positionB);
//        }
//        /*
//         * 条件二：元素在同一水平方向或者垂直方向
//         */
//        else 
//            //	水平方向
//            if (_positionA.x == _positionB.x) {
//                var _distance = Math.abs(_positionA.y - _positionB.y) - 1, _index = _positionA.y < _positionB.y ? (_positionA.index + 1) : (_positionB.index + 1);
//                for (var i = 0; i < _distance; i++) {
//                    if (this.__matchingGameData[_index + i].value) 
//                        break;
//                    if (i == _distance - 1) {
//                        console.log('match!');
//                        this.__removeMatrix(_positionA, _positionB);
//                    }
//                }
//            }
//            else 
//                //	垂直方向
//                if (_positionA.y == _positionB.y) {
//                    var _distance = Math.abs(_positionA.x - _positionB.x) - 1, _index = _positionA.x < _positionB.x ? (_positionA.index + 1) : (_positionB.index + 1);
//                    for (var i = 0; i < _distance; i++) {
//                        if (this.__matchingGameData[_index + this.__defaultLineCount * (i + 1) + i].value) 
//                            break;
//                        if (i == _distance - 1) {
//                            console.log('match!');
//                            this.__removeMatrix(_positionA, _positionB);
//                        }
//                    }
//                }
//                else {
//                //	有拐角的情况 TODO
//                }
    };
	/**
	 * 检测格子值是否匹配
	 * @param {Object} _dataA
	 * @param {Object} _dataB
	 * @return {Boolean}
	 */
    __proModule.__checkValue = function(_dataA, _dataB){
        return _dataA.value == _dataB.value && _dataA.color == _dataB.color;
    };
	/**
	 * 判断元素是否相邻（即水平或垂直方向距离为1）
	 * @param {Object} a
	 * @param {Object} b
	 * @param {Object} _distance
	 */
//	__proModule.__isNeighbour = function(a, b, _distance){
//        return ((a.x == b.x) && (Math.abs(a.y - b.y) == _distance)) ||
//        		((a.y == b.y) && (Math.abs(a.x - b.x) == _distance));
//	};
	/**
	 * 水平方向检测
	 * @param {Object} a
	 * @param {Object} b
	 */
    __proModule.__checkHorizon = function(a, b){
        var _startX = a.y <= b.y ? a.y : b.y,
			_endX = a.y <= b.y ? b.y : a.y;
        for (var x = _startX + 1; x < _endX; x++) {
			if (this.__matrix[a.x][x].value) {
				return false;
			}
		}
        return true;
    };
	/**
	 * 垂直方向检测
	 * @param {Object} a
	 * @param {Object} b
	 */
    __proModule.__checkVertical = function(a, b){
        var _startY = a.x <= b.x ? a.x : b.x, 
			_endY = a.x <= b.x ? b.x : a.x;
        for (var y = _startY + 1; y < _endY; y++) {
			if (this.__matrix[y][a.y].value) {
				return false;
			}
		}
        return true;
    };
	/**
	 * 一个拐角的检测
	 * @param {Object} a
	 * @param {Object} b
	 */
    __proModule.__hasOneCorner = function(a, b){
        var c = {x:a.x,y:b.y}, d = {x:b.x,y:a.y};
        if (!this.__matrix[c.x][c.y].value) {
            return this.__checkHorizon(a, c) && this.__checkVertical(b, c);
        }
        if (!this.__matrix[d.x][d.y].value) {
			return this.__checkVertical(a, d) && this.__checkHorizon(b, d);
		}
		else {
			return false;
		}
    };
	/**
	 * 两个拐角的检测
	 * @param {Object} a
	 * @param {Object} b
	 */
    __proModule.__hasTwoCorner = function(a, b){
        var _tmpList = this.__scanTheRoute(a, b);
        if (_tmpList.length == 0) 
            return false;
        for (var index = 0; index < _tmpList.length; index++) {
            var _line = _tmpList[index];
            if (_line.direct == 1) {
                if (this.__checkVertical(a, _line.a) && this.__checkVertical(b, _line.b)) 
                    return true;
            }
            else 
                if (this.__checkHorizon(a, _line.a) && this.__checkHorizon(b, _line.b)) 
                    return true;
        }
        return false;
    };
	/**
	 * 检测水平/垂直两个方向的连通情况
	 * @param {Object} a
	 * @param {Object} b
	 */
    __proModule.__scanTheRoute = function(a, b){
        var _tmpList = [],
			_function = function(){
	            if (!this.__matrix[a.x][y].value && !this.__matrix[b.x][y].value && this.__checkVertical(this.__getPoint(a.x, y), this.__getPoint(b.x, y))) 
	                _tmpList.push(this.__setLine(0, this.__getPoint(a.x, y), this.__getPoint(b.x, y)));
	        }._$bind(this);
        for (var y = a.y; y >= 0; y--) 
			_function();
        for (var y = a.y; y < this.__defaultLineCount; y++) 
			_function();
        
        _function = function(){
            if (!this.__matrix[x][a.y].value && !this.__matrix[x][b.y].value && this.__checkHorizon(this.__getPoint(x, a.y), this.__getPoint(x, b.y))) 
                _tmpList.push(this.__setLine(1, this.__getPoint(x, a.y), this.__getPoint(x, b.y)));
        }._$bind(this);
        for (var x = a.x; x >= 0; x--) 
        	_function();
        for (var x = a.x; x < this.__defaultColumnCount; x++) 
        	_function();
		
        return _tmpList;
    };
	/**
	 * 获取目标元素坐标
	 * @param {Object} a
	 * @param {Object} b
	 */
    __proModule.__getPoint = function(a, b){
        return {x:a,y:b};
    };
	/**
	 * 设置坐标
	 * @param {Object} _direct
	 * @param {Object} a
	 * @param {Object} b
	 */
    __proModule.__setLine = function(_direct, a, b){
		//	todo:绘制最短路径
        return {direct:_direct,a:a,b:b}
    };
	/**
	 * 删除矩阵中某对格子的数据
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Void}
	 */
    __proModule.__removeMatrix = function(a, b){
        this.__matchingGameData[a.index].value = this.__matchingGameData[b.index].value = '';
    };
	/**
	 * 检测当前游戏是否无解/死锁
	 * @return {Boolean}
	 */
    __proModule.__checkDeadlock = F;
    /**
     * 连连看单个格子项对象
     * @constructor 连连看单个格子项对象
     * @base    P(N.ut)._$$Item
     * @extends P(N.ut)._$$Item
     */
    p._$$MatchingGamePoint = C();
    __proPoint = p._$$MatchingGamePoint._$extend(P(N.ut)._$$Item, true);
    __proPoint._$initialize = function(){
        this._$super(E._$addNodeTemplate('<li><a></a></li>'));
        this.__initXnode();
    };
    /**
     * 项重置
     * @param  {Object} _options 可选配置参数
     * @return {Void}
     */
    __proPoint._$reset = function(_options){
        this._$addEvent('onselect', _options.onselect || F);
    };
	/**
     * 初始化节点
     * @return {Void}
     */
    __proPoint.__initXnode = function(){
        this.__point = this.__body.childNodes[0];
        V._$addEvent(this.__point, 'click', this.__onClickPoint._$bind(this));
    };
    /**
     * 设置数据
     * @param {Object} _data	格子数据对象
     * 
     * @return {Void}
     */
    __proPoint._$setData = function(_data){
        this.__data = _data;
        if (!_data.value) {
            this.__point.innerText = '';
            this.__point.style.backgroundColor = '#fff';
            this.__point.className = 'text';
        }
        else {
            this.__point.innerText = _data.value || '';
            try {
                this.__point.style.color = '#' + _data.color;
            } 
            catch (e) {
                //	ie下偶尔出现类似#00000五位值或者七位值无效的异常
                _data.color = _data.color.substring(0, 4) + '00';
                this.__point.style.color = '#' + _data.color;
            }
            this.__point.style.fontFamily = 'webdings';
        }
    };
    /**
     * 格子项点击的处理函数
     * @return {Void}
     */
    __proPoint.__onClickPoint = function(){
        if (!this.__data.value) {
            return;
        }
        var _selected = this.__selected ? false : true;
        this._$toggle(this.__point, 'on');
        this._$dispatchEvent('onselect', this.__data, this.__selected = _selected);
    };
    /**
     * 切换节点样式
     * @param  {String|Node}	_element 触发切换的节点
     * @param  {String} 	_class	触发切换的样式
     * @return {Void}
     */
    __proPoint._$toggle = function(_elm, _class){
        E._$hasClassName(_elm, _class) ? E._$delClassName(_elm, _class) : E._$addClassName(_elm, _class);
    };
    /**
     * 返回格子项当前的选择状态
     * @return {Boolean}
     */
    __proPoint._$isSelected = function(){
        return this.__selected;
    };
    /**
     * 格子项销毁的处理函数（清理格子项的临时状态）
     * @return {Void}
     */
    __proPoint._$destroy = function(){
        p._$$MatchingGamePoint._$supro._$destroy.call(this);
        this.__point.className = '';
        this.__point.removeAttribute('style');
        this.__selected = false;
    };
    /**
     * 连连看主模块类入口
     */
    new p._$$MatchingGameModule();
})();
/**
 * TODO:
 * 		最短路径提示
 * 		无解/死锁处理
 * 		对n*m矩阵的支持
 * 		计时/音效
 */