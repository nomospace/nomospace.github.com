/**
 * ==========================================================================================
 * 工具类接口实现文件<br/>
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
 * ==========================================================================================
 */
(function(window,document){
// private
var __trim  = /(?:^\s+)|(?:\s+$)/g, // space at start or end of string
    __empty = /^\s*$/,              // content is empty
    __remap = {a:{r:/\<|\>|\&|\r|\n|\s|\'|\"/g,'<':'&lt;','>':'&gt;','&':'&amp;',' ':'&nbsp;','"':'&quot;',"'":'&#39;','\n':'<br/>','\r':''}
              ,b:{r:/\&(?:lt|gt|amp|nbsp|#39|quot)\;|\<br\/\>/gi,'&lt;':'<','&gt;':'>','&amp;':'&','&nbsp;':' ','&#39;':"'",'&quot;':'"','<br/>':'\n'}
              ,c:{i:true,r:/\byyyy|yy|MM|M|dd|d|HH|H|mm|ms|ss|m|s\b/g}
              ,d:{r:/\'|\"/g,"'":"\\'",'"':'\\"'}}; // encode map
// interface
P('U');
/*
 * 资源销毁接口
 * @return {Void}
 */
U.__destroy = F;
/**
 * 格式化数字，<10的数字加0前缀
 * @param  {Number} _number 待格式化数字
 * @return {String}         格式化后的数字串
 */
U._$number = function(_number){
    _number = parseInt(_number)||0;
    return (_number<10?'0':'')+_number;
};
/**
 * 清除字符串两端的空格，原字符串内容不变
 * @param  {String} _content 待清除的字符串
 * @return {String}         清除两端空格的字符串
 */
U._$trim = function(_content){
    return !!_content&&!!_content.replace
           &&_content.replace(__trim,'')||'';
};
/**
 * 截取指定长度的字符串,中文长度为两个字符
 * @return {String} _content 待处理文字内容
 * @param  {Number} _length  截取长度
 */
U._$subString = function(_content,_length){
    _content = _content||'';
    if (!_length) return _content;
    for(var i=0,k=0,l=_content.length;i<l;i++){
        k += _content.charCodeAt(i)>255?2:1;
        if (k>=_length) 
            return _content.substr(0,i+(k==_length?1:0));
    }
    return _content;
};
/**
 * 判断内容是否只包含空或者回车
 * @param  {String} _content 检测内容
 * @return {Boolean}         是否为空
 */
U._$isEmpty = function(_content){
    return __empty.test(_content||'');
};
/**
 * 随机生成一个指定范围的数字
 * @param  {Number} _min  随机数下限【包含】
 * @param  {Number} _max  随机数上限【不包含】
 * @return {Number}       随机生成的数字
 */
U._$rand = function(_min,_max){
    return Math.floor(Math.random()*(_max-_min)+_min);
};
/**
 * 随机生成一个全部为数字的字符串
 * @param  {Number} _length 随机字符串的长度
 * @return {String}         随机生成的字符串
 */
U._$randNumberString = function(_length){
    _length = Math.max(0,Math.min(_length||10,100));
    var _min = Math.pow(10,_length-1), _max = _min * 10;
    return U._$rand(_min,_max).toString();
};
/**
 * 判断数据是否为指定类型
 * @param  {Variable} _data 待判断数据
 * @param  {String}   _type 数据类型
 * @return {Boolean}        是否指定类型
 */
U._$isType = function(_data,_type){
    return Object.prototype.toString.
           call(_data).toLowerCase()==
           ('[object '+_type.toLowerCase()+']');
};
/**
 * 查找给定项在列表中的索引值
 * @param  {Array}    _list 待搜索列表
 * @param  {Variable} _item 指定项，如果为function则表示过滤接口
 * @return {Number}         给定项所在的位置索引，以0开始，没有项返回-1
 */
U._$indexOf = function(_list,_item){
    var _isfunc = U._$isType(_item,'function');
    if (!!_list&&_list.length>0)
        for(var i=0,l=_list.length;i<l;i++)
            if (_isfunc?!!_item(_list[i]):_list[i]==_item)
                return i;
    return -1;
};
/**
 * 编码字符串
 * @param  {Object} _map     编码规则
 * @param  {String} _content 待编码的字串
 * @return {String}          编码后的字串
 */
U._$encode = function(_map,_content){
    if (!_map||!_content||!_content.replace) return _content||'';
    return _content.replace(_map.r,function($1){
               var _result = _map[!_map.i?$1.toLowerCase():$1];
               return _result!=null?_result:$1;
           });
};
/**
 * 编码html代码，'<' -> '&lt;'
 * @param  {String} _content 待编码串
 * @return {String}          编码后的串
 */
U._$escape = function(_content){
    return U._$encode(__remap.a,_content);
};
/**
 * 反编码html代码，'&lt;' -> '<'
 * @param  {String} _content 待编码串
 * @return {String}          编码后的串
 */
U._$unescape = function(_content){
    return U._$encode(__remap.b,_content);
};
/**
 * 编码字符串，将',"加转义符号
 * @param  {String} _content 待编码串
 * @return {String}          编码后的串
 */
U._$string = function(_content){
    return U._$encode(__remap.d,_content);
};
/**
 * 格式化时间，yyyy|yy|MM|M|dd|d|HH|H|mm|ms|ss|m|s
 * @param  {Number|String|Date} _time   时间
 * @param  {String}             _format 格式
 * @return {String}                     指定格式的时间串
 */
U._$format = function(_time,_format){
    if (!_time||!_format) return '';
    if (U._$isType(_time,'string'))
        _time = new Date(Date.parse(_time));
    if (!U._$isType(_time,'date'))
        _time = new Date(_time);
    var _map = __remap.c;
    _map['yyyy'] = _time.getFullYear();
    _map['yy']   = (''+_map['yyyy']).substr(2);
    _map['M']    = _time.getMonth()+1;
    _map['MM']   = U._$number(_map['M']);
    _map['d']    = _time.getDate();
    _map['dd']   = U._$number(_map['d']);
    _map['H']    = _time.getHours();
    _map['HH']   = U._$number(_map['H']);
    _map['m']    = _time.getMinutes();
    _map['mm']   = U._$number(_map['m']);
    _map['s']    = _time.getSeconds();
    _map['ss']   = U._$number(_map['s']);
    _map['ms']   = _time.getMilliseconds();
    return U._$encode(_map,_format);
};
/**
 * 序列化
 * @param  {Variable} _data 待序列化数据
 * @return {Variable}       序列化后数据
 */
U._$serialize = function(_data){
    if (U._$isType(_data,'number'))  return _data;
    if (U._$isType(_data,'date'))    return _data.getTime();
    if (U._$isType(_data,'boolean')) return !!_data?'true':'false';
    if (U._$isType(_data,'string'))  return "'"+U._$string(_data)+"'";
    if (!_data) return 'null';
    if (U._$isType(_data,'array')){
        var _arr = [];
        for(var i=0,l=_data.length;i<l;
            _arr.push(U._$serialize(_data[i])),i++);
        return '['+_arr.join(',')+']';
    }
    if (U._$isType(_data,'object')){
        var _arr = [];
        for(var p in _data)
            _arr.push(U._$serialize(p)+':'+
                      U._$serialize(_data[p]));
        return '{'+_arr.join(',')+'}';
    }
    return 'null';
};
/**
 * 反序列化串
 * @param  {String}  _content 待反序列化串
 * @return {Variable}         反序列化后的数据
 */
U._$deserialize = function(_content){
    try{return !_content?null:(new Function('return '+_content))();}catch(e){return null;}
};
/**
 * 将json串解析为对象
 * @param  {String}  _content 待反序列化串
 * @return {Variable}         反序列化后的数据
 */
U._$parseJSON = !!window.JSON?JSON.parse:U._$deserialize;
/**
 * 解析为json串
 * @param  {Variable} _data 待序列化数据
 * @return {Variable}       序列化后数据
 */
U._$toJSONString = !!window.JSON?JSON.stringify:U._$serialize;
/**
 * 获取全局属性，取到属性后删除全局引用，后续代码如需重复利用需保存引用
 * @param  {String} _key 属性名称
 * @return {Variable}    属性值
 */
U._$getGValue = function(_key){
    var _value = window[_key];
    try{if (!delete window[_key])throw '';}catch(e){window[_key]=undefined;}
    return _value;
};
/**
 * 把相册userName转化成完整用户名， 即完整email地址
 * 相册username    <-->     fullName
 * mmlhorse2@163.com				   qatest@163.com            
 * qatest@126			   qatest@126.com		
 * qatest@188 			   qatest@188.com 	 
 * qatest.popo             qatest@popo.163.com
 * qatest.vip              qatest@vip.163.com
 * qatest@yeah			   qatest@yeah.net
 * qatest@game             qatest@game.163.com
 * test60@vip.126.com      test60@vip.126.com （当做外域邮箱处理）
 * qatest@gmail.com 	   qatest@gmail.com	(外域邮箱)   	
 * @param  {String} _userName 相册userName
 * @return {Variable}    属性值
 */
U._$getFullName = function(_userName){
	if (_userName.substr(-4) === "@126")
		return _userName.replace("@126", "@126.com");
	else if (_userName.substr(-4) === "@188")
		return _userName.replace("@188", "@188.com");
	else if (_userName.substr(-5) === "@popo")
		return _userName.replace(".popo", "@popo.163.com");
	else if (_userName.substr(-4) === ".vip")
		return _userName.replace(".vip", "@vip.163.com");
	else if (_userName.substr(-5) === "@yeah")
		return _userName.replace("@yeah", "@yeah.net");
	else if (_userName.substr(-5) === "@game")
		return _userName;
	else if (_userName.indexOf('@') >= 0) {
		return _userName;// 外域邮箱 和 vip.126.com
	} else {
		return _userName + "@163.com";
	}
};
})(this,document);
