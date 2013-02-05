/**
 * 节点项对象基类实现文件
 */
define(function(require, exports, module) {
    var Class = require('class');
    var Events = require('events');
    var $ = require('$');
    var proto;   // class prototype
    /**
     * 节点项对象基类
     * @constructor
     * @class   节点项对象
     * @param   {String} _tkey 节点模板序列号
     */
    var Item = Class();
    proto = Item.extend(Events);
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
     * @return {Array|Item}         返回指定数量的项对象,单个数据只返回单个对象
     */
    Item.allocate = function(_data, _parent, _options) {
        if (!_data) return null;
        var _options = _options || {};
        // single item
        if (_options._single_ || !$.isArray(_data)) {
            var _item = !!this.pool
                && this.pool.shift()
                || new this();
            _item._used_ = true;
            _item.reset(_options);         // reset item param
            _item.appendToParent(_parent); // append to parent
            _item.setData(_data);          // reset item data
            return _item;
        }
        // multiple items
        if (!_data.length) return null;
        var _arr = [];
        for (var i = Math.max(0, _options._start_ || 0), k = 0, l = Math.min(
            _options._end_ != null ? _options._end_ : _data.length, _data.length); i < l; k++, i++) {
            _options._index_ = k;
            _arr.push(this.allocate(_data[i], _parent, _options));
        }
        return _arr;
    }
    /**
     * 回收项对象
     * @param  {Array|Item} _item 项对象或者列表
     * @return {Void}
     */
    Item.recycle = function(_item) {
        if (!_item) return null;
        // single item
        if (_item._used_ && (_item instanceof this)) {
            _item._used_ = false;
            _item.destroy();
            this.pool &&
            this.pool.push(_item);
            return null;
        }
        // multiple items
        if ($.isArray(_item))
            for (var i; i = _item.pop(); this.recycle(i));
        return null;
    }
    /**
     * 节点项对象基类初始化函数
     * @param  {String} _tkey 模板序列号
     * @return {Void}
     */
    proto.initialize = function(_tkey) {
        this.superClass();
        this.body = $(_tkey);
        this.constructor.pool = this.constructor.pool || [];
    }
    /**
     * 将节点添加至指定位置
     * @param  {String|Node} _parent 父节点ID或者对象
     * @param  {Boolean}     _before 是否在父节点的第一个位置
     * @return {Void}
     */
    proto.appendToParent = function(_parent, _before) {
        this.parent = $(_parent);
        if (!this.parent || !this.body) return null;
        !_before ? this.parent.append(this.body)
            : this.parent.insertBefore(this.body);
    }
    /**
     * 销毁项
     * @return {Void}
     */
    proto.destroy = function() {
        delete this.data;
        this.body.detach();
    }
    /**
     * 获取数据对象
     * @return {Object} _data 数据对象
     */
    proto.getData = function() {
        return this.data || null;
    }
    /**
     * 设置数据，子类实现具体操作
     * @param  {Object} _data 数据
     * @return {Void}
     */
    proto.setData = function(_data) {
        this.data = _data || {};
    }
    /**
     * 项重置，子类实现具体操作
     * @param  {Object} _options 可选配置参数
     * @return {Void}
     */
    proto.reset = function() {
    }

    module.exports = Item;
});
