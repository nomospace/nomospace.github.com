/**
 * ==========================================================================================
 * 节点项对象基类实现文件<br/>
 * 代码书写规范简述：<br/>
 * <pre>
 *    变量/接口前缀        描述                                           发布时是否混淆
 * ------------------------------------------------------------------------------------------
 *    _                  接口内局部变量或者传递的参数                            Y
 *    _$                 对象外可访问的接口或者属性                             Y/N
 *                       此类接口不允许以字符串形式出现
 *                       如果项目所有js文件一起混淆可以考虑混淆
 *    _$$                类对象，同_$前缀的处理                                Y/N
 *    __                 对象外不可访问的接口或者属性                            Y
 *    无                 没有前缀的接口或者属性可以在对象外访问                     N
 *                       代码中可以以字符串的形式出现
 *    X                  单个大写字母命名表示集合了一些通用的属性和接口的对象
 *                       代码中禁止出现单个大写字母命名的变量                      N
 * ------------------------------------------------------------------------------------------
 * </pre>
 * @version  1.0
 * @author   genify(caijf@163.org)
 * @require  util/event.js
 * ==========================================================================================
 */
(function(){
// private
var p = P(N.ut), // util namespace
    __proItem;   // class prototype
// interface
/**
 * 节点项对象基类
 * @constructor
 * @class   节点项对象
 * @extends #<N.ut>._$$Event
 * @param   {String} _tkey 节点模板序列号
 */
p._$$Item = C();
__proItem = p._$$Item._$extend(p._$$Event);
/**
 * 分配项，如果缓存中有闲置的项则直接取用，否则新建。
 * @param  {Array|Object} _data    与项个数对应的数据列表
 * @param  {String|Node}  _parent  父节点ID或者对象
 * @param  {Object}       _options 可选配置参数，保留参数列表如下
 *                                 _index_  [Number]  - 如果分配的是列表则该属性用来记录项在当前列表中的索引值，从0开始
 *                                 _single_ [Boolean] - 强制指定传入的数据作为单项处理
 *                                 _start_  [Number]  - 指定数据片段的起始位置【包含】
 *                                 _end_    [Number]  - 指定数据片段的结束位置【不包含】
 *                                 以上为项分配所需参数，除此之外其他属性为该项重置所需参数
 * @return {Array|_$$Item}         返回指定数量的项对象,单个数据只返回单个对象
 */
p._$$Item._$allocate = function(_data,_parent,_options){
    if (!_data) return null;
    var _options = _options||{};
    // single item
    if (_options._single_||!U._$isType(_data,'array')){
        var _item = !!this.__pool
                    &&this.__pool.shift()
                    ||new this();
        _item._used_ = true;
        _item._$reset(_options);         // reset item param
        _item._$appendToParent(_parent); // append to parent
        _item._$setData(_data);          // reset item data
        return _item;
    }
    // multiple items
    if (!_data.length) return null;
    var _arr = [];
    for(var i=Math.max(0,_options._start_||0),k=0,l=Math.min(
        _options._end_!=null?_options._end_:_data.length,_data.length);i<l;k++,i++){
        _options._index_ = k;
        _arr.push(this._$allocate(_data[i],_parent,_options));
    }
    return _arr;
};
/**
 * 回收项对象
 * @param  {Array|_$$Item} _item 项对象或者列表
 * @return {Void}
 */
p._$$Item._$recycle = function(_item){
    if (!_item) return null;
    // single item
    if (_item._used_&&(_item instanceof this)){
        _item._used_ = false;
        _item._$destroy();
        this.__pool &&
        this.__pool.push(_item);
        return null;
    }
    // multiple items
    if (U._$isType(_item,'array'))
        for(var i;i=_item.pop();this._$recycle(i));
    return null;
};
/**
 * 节点项对象基类初始化函数
 * @param  {String} _tkey 模板序列号
 * @return {Void}
 */
__proItem._$initialize = function(_tkey){
    this._$super();
    this.__body = E._$getNodeTemplate(_tkey);
    this.constructor.__pool = this.constructor.__pool||[];
};
/**
 * 将节点添加至指定位置
 * @param  {String|Node} _parent 父节点ID或者对象
 * @param  {Boolean}     _before 是否在父节点的第一个位置
 * @return {Void}
 */
__proItem._$appendToParent = function(_parent,_before){
    this.__parent = E._$getElement(_parent);
    if (!this.__parent||!this.__body) return;
    !_before ? this.__parent.appendChild(this.__body)
             : this.__parent.insertAdjacentElement('afterBegin',this.__body);
};
/**
 * 销毁项
 * @return {Void}
 */
__proItem._$destroy = function(){
    delete this.__data;
    E._$removeElementByEC(this.__body);
};
/**
 * 获取数据对象
 * @return {Object} _data 数据对象
 */
__proItem._$getData = function(){
    return this.__data||null;
};
/**
 * 设置数据，子类实现具体操作
 * @param  {Object} _data 数据
 * @return {Void}
 */
__proItem._$setData = function(_data){
    this.__data = _data||O;
};
/**
 * 项重置，子类实现具体操作
 * @param  {Object} _options 可选配置参数
 * @return {Void}
 */
__proItem._$reset = F;
})();
