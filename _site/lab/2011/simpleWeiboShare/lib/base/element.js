/**
 * ==========================================================================================
 * 页面节点元素接口实现文件<br/>
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
var __hc,                // 31 css hack
    __tp = {},           // node template cache
    __sp = /\s+/g,       // space regexp
    __hk = '__hvrkey__', // hover event attr key
    __ha = '__hatkey__', // hover action attr key
    __ec = document.createDocumentFragment();
/*
 * 根据Tag名称初始化模板节点
 * @param  {Node} _element 模板节点对象
 * @return {Void}
 */
var __initElementByTag = function(_element){
    if (!_element) return;
    switch(_element.tagName.toLowerCase()){
        case 'a'      : _element.href = '#';
                        _element.hideFocus = true; break;
        case 'iframe' : _element.frameBorder = 0; 
                        _element.src  = 'about:blank'; return;
        case 'script' : _element.defer= 'defer';
                        _element.type = 'text/javascript'; return;
        case 'style'  : _element.type = 'text/css'; return;
        case 'link'   : _element.type = 'text/css';
                        _element.rel  = 'stylesheet'; return;
    }
    __ec.appendChild(_element);
};
/*
 * 获取用来匹配样式名称的正则字串
 * @param  {String} _class 样式名称
 * @return {String}        正则字串
 */
var __getRegClassName = function(_class){
    _class = U._$trim(_class);
    return !_class?'':'(\\s|^)(?:'+_class.replace(__sp,'|')+')(?=\\s|$)';
};
/*
 * 执行Hover操作
 * @param  {String|Node} _element 节点ID或者对象
 * @param  {Boolean}     _hovered 是否hover
 * @return {Void}
 */
var __hoverElement = function(_element,_hovered){
    _element = E._$getElement(_element);
    if (!_element) return;
    _hovered = !!_hovered;
    if (_element[__ha]==_hovered) return;
    var _class = _element[__hk];
    if (!_class) return;
    _element[__ha] = _hovered;
    _hovered ? E._$addClassName(_element,_class)
             : E._$delClassName(_element,_class);
};
/*
 * 设置最大值
 * @param  {String|Node} _element 节点ID或者对象
 * @return {Void}
 */
var __maxElement = function(_element){
    _element = E._$getElement(_element);
    if (!_element) return;
    var _type = _element.mt,_value = _element.mv,
        _attr = _type=='width'?'scrollWidth':'scrollHeight';
    _element.style[_type] = _element[_attr]<_value?'auto':(_value+'px');
};
/*
 * 设置最大值,等比例
 * @param  {String|Node} _element 节点ID或者对象
 * @return {Void}
 */
var __adjElement = function(_element){
    _element = E._$getElement(_element);
    if (!_element) return;
    var _type  = _element.mt, _value = _element.mv,
        _ratio = _element.mr, _st = _element.style,
        _rd =(_element.scrollWidth/_element.scrollHeight)||1,
        _mw = _type=='width'?_value:Math.floor(_value*_ratio),
        _mh = _type=='width'?Math.floor(_value/_ratio):_value;
    if (_rd>=_ratio&&_element.scrollWidth>_mw){
        _st.width = _mw+'px'; _st.height = 'auto'; return;
    }
    if (_rd<=_ratio&&_element.scrollHeight>_mh){
        _st.width = 'auto'; _st.height = _mh+'px'; return;
    }
    _st.width = 'auto'; _st.height = 'auto';
};
/*
 * 计算节点相对于给定元素的偏移
 * @param  {String|Node} _element 给定节点ID或者对象
 * @param  {String}      _type    偏移方式,offsetLeft/offsetTop
 * @param  {Function}    _filter  节点过滤接口，用来判断遍历停止
 * @return {Number}               偏移量
 */
var __getOffset = function(_element,_type,_filter){
    _element = E._$getElement(_element);
    if (!_element) return 0;
    _filter = _filter||F;
    var _offset = 0;
    while(!!_element&&!_filter(_element)){
        _offset += _element[_type];
        _element = _element.offsetParent;
    }
    return _offset;
};
/*
 * 获取样式值
 * @param  {String|Node} _element 节点ID或者对象
 * @param  {String}      _style   样式名称
 * @return {String}               样式值
 */
var __getStyle;
if (!!document.defaultView&&!!document.defaultView.getComputedStyle){
__getStyle = function(_element,_style){
    var _css = document.defaultView.getComputedStyle(_element,null);
    return !_css?'':_css[_style];
};
}else{
__getStyle = function(_element,_style){
    return _element.currentStyle[_style];
};}
// interface
P('E');
/*
 * 资源销毁接口
 * @return {Void}
 */
E.__destroy = function(){
    var _element = document.createElement('div');
    _element.style.display = 'none';
    document.body.appendChild(_element);
    _element.appendChild(__ec);
};
/**
 * 根据ID或者节点对象获取节点对象，确保返回的是个节点对象
 * @param  {String|Node} 节点ID或者节点对象
 * @return {Node}        节点对象
 */
E._$getElement = function(_element){
    if (arguments.length<=1)
        return U._$isType(_element,'string')||
               U._$isType(_element,'number')?
               document.getElementById(_element):_element;
    var _result = [];
    for(var i=0,l=arguments.length;i<l;
        _result.push(E._$getElement(arguments[i])),i++);
    return _result;
};
/**
 * 获取节点的element子节点，不计算非ELEMENT_NODE的节点
 * @param  {String|Node} _element 节点ID或者对象
 * @param  {String}      _class   筛选节点的样式名称
 * @return {Array} 子节点列表
 */
E._$getChildElements = function(_element,_class){
    _element = E._$getElement(_element);
    if (!_element) return null;
    var _result = [];
    for(var _node=_element.children||
        _element.childNodes,i=0,l=_node.length;i<l;i++){
        if (_node[i].nodeType!=Node.ELEMENT_NODE||
           (_class&&!E._$hasClassName(_node[i],_class))) continue;
        _result.push(_node[i]);
    }
    return _result;
};
/**
 * 根据样式名获取节点集合，如果使用此接口取节点集合尽量一次取出需要的所有节点
 * @param  {String} _class 样式名称
 * @return {Array}         节点集合
 */
E._$getElementsByClassName = function(_element,_class){
    _class = U._$trim(_class);
    _element = E._$getElement(_element);
    if (!_element||!_class) return null;
    // native
    if (!!_element.getElementsByClassName){
        return Array.prototype.slice.call(
              _element.getElementsByClassName(_class),0);
    }
    // xpath
    if (!!document.evaluate){
        // get elements
        var _result = [],
            _xrsult = document.evaluate('.//*'+__getExpByClassName(_class),
                      _element,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        for(var i=0,l=_xrsult.snapshotLength;i<l;
            _result.push(_xrsult.snapshotItem(i)),i++);
        return _result;
    }
    // pure dom implementation(ie)
    var _result = [],
        _regexp = new RegExp(__getRegClassName(_class),'g'),
        _xrsult = _element.getElementsByTagName('*');
    for(var i=0,l=_xrsult.length;i<l;i++)
        if (E._$hasClassName(_xrsult[i],_regexp))
            _result.push(_xrsult[i]);
    return _result;
};
/**
 * 是否含有给定样式名称，多个样式用空格隔开，存在其中之一就表示有该样式
 * @param  {String|Node}   _element 要操作的节点ID或者节点对象
 * @param  {String|RegExp} _class   样式名称
 * @return {Boolean}                是否含有给定样式名称
 */
E._$hasClassName = function(_element,_class){
    _element = E._$getElement(_element);
    if (!_element || !_class) return false;
    _class = U._$isType(_class,'string')
           ? __getRegClassName(_class):_class;
    return (_element.className||'').search(_class)>=0;
};
/**
 * 替换节点的样式类名称，多个样式用空格分隔
 * @param  {String|Node} _element 要操作的节点ID或者节点对象
 * @param  {String}      _del     要删除的样式类名称
 * @param  {String}      _add     要新增的样式类名称
 * @return {Void}
 */
E._$replaceClassName = function(_element,_del,_add){
    _element = E._$getElement(_element);
    if (!_element||(!_del&&!_add)) return;
    var _class = _element.className||'';
    // replace class
    _add = ' '+(_add||'');
    _del = __getRegClassName(_del+_add);
    !!_del&&(_class=_class.replace(new RegExp(_del,'g'),'$1'));
    _element.className = U._$trim(_class+_add).replace(__sp,' ');
};
/**
 * 新增样式类，多个样式用空格分开
 * @param  {String|Node} _element 要操作的节点ID或者节点对象
 * @param  {String}      _add     要新增的样式类名称
 * @return {Void}
 */
E._$addClassName = function(_element,_add){
    E._$replaceClassName(_element,'',_add);
};
/**
 * 删除样式类，多个样式用空格分开
 * @param  {String|Node} _element 要操作的节点ID或者节点对象
 * @param  {String}      _del     要删除的样式类名称
 * @return {Void}
 */
E._$delClassName = function(_element,_del){
    E._$replaceClassName(_element,_del,'');
};
/**
 * 添加节点模板，供后续克隆使用，
 * 对于页面中频繁使用的复杂节点采用此方式可提高效率
 * @param  {Node|String} _element 节点ID或者对象或者HTML代码
 * @param  {String}      _key     模板键值，不传随机生成
 * @return {String}               模板序列号
 */
E._$addNodeTemplate = function(_element,_key){
    var _nd = E._$getElement(_element),
        _sn = _key||('tp_'+U._$randNumberString(6));
    if (!!_nd){
        // node as template
        __tp[_sn] = _nd;
        __ec.appendChild(_nd);
    }else if(U._$isType(_element,'string')){
        // html as template
        __tp[_sn] = _element;
    }
    return _sn;
};
/**
 * 根据模板序列号获取节点对象，模板序列号在添加模板时返回
 * @param  {String} _sn 模板序列号
 * @return {Node}       新克隆出来的节点对象
 */
E._$getNodeTemplate = function(_sn){
    var _ntmp = __tp[_sn];
    if (!!_ntmp&&U._$isType(_ntmp,'string'))
        E._$addNodeTemplate(E._$parseElement(_ntmp),_sn);
    return !__tp[_sn]?null:__tp[_sn].cloneNode(true);
};
/**
 * 将XHTML代码转换成DOM节点对象，如果转换出来的节点数量超过【包含】2个，
 * 则最外面增加一个div节点，即返回的始终是一个节点
 * @param  {String} _xhtml XHTML代码，没有代码返回一个空的div节点
 * @return {Node}          DOM节点对象
 */
E._$parseElement = function(_xhtml){
    if (!U._$isType(_xhtml,'string'))
        return _xhtml;
    _xhtml = U._$trim(_xhtml);
    if (!_xhtml) return null;
    var _element = document.cloneElement('div');
    _element.innerHTML = _xhtml;
    return _element.childNodes.length==1?
           _element.childNodes[0]:_element;
};
/**
 * 通过css增加样式
 * @param  {String} _css   样式内容
 * @param  {Node}   _style 样式节点
 * @return {Node}          新增的样式节点对象
 */
E._$parseStyle = function(_css,_style){
    if (!_css) return null;
    // ignore element if not ie
    if (!B._$ISIE||document.getElementsByTagName('style').length<30){
        if (!_style){
            var _style = document.cloneElement('style');
            document.head.appendChild(_style);
        }
        !B._$ISIE ? _style.innerText = _css
                  : _style.styleSheet.cssText = _css;
        return _style;
    }
    // ie has 31 css style limit  -  bad performance
    __hc.styleSheet.cssText += _css;
    return __hc;
};
/**
 * 取节点的样式
 * @param  {String|Node} _element 节点ID或者对象
 * @param  {String}      _style   样式名称
 * @return {String}               样式值
 */
E._$getStyle = function(_element,_style){
    _element = E._$getElement(_element);
    return !_element?'':_element.style[_style]||
                        __getStyle(_element,_style);
};
/**
 * 计算节点相对于给定元素的水平偏移
 * @param  {String|Node} _element 给定节点ID或者对象
 * @param  {Function}    _filter  节点过滤接口，用来判断遍历停止
 * @return {Number}               水平偏移
 */
E._$offsetX = function(_element,_filter){
    return __getOffset(_element,'offsetLeft',_filter);
};
/**
 * 计算节点相对于给定元素的垂直偏移
 * @param  {String|Node} _element 给定节点ID或者对象
 * @param  {Function}    _filter  节点过滤接口，用来判断遍历停止
 * @return {Number}               垂直偏移
 */
E._$offsetY = function(_element,_filter){
    return __getOffset(_element,'offsetTop',_filter);
};
/**
 * 从页面删除节点并回收内存空间
 * @param  {String|Node} _element 节点ID或者对象
 * @return {Void}
 */
E._$removeElement = function(_element){
    _element = E._$getElement(_element);
    if (!_element||!_element.parentNode) return;
    _element.parentNode.removeChild(_element);
    if(B._$ISIE&&!!_element.outerHTML) _element.outerHTML = '';
    // ie: mem leak if any child has event listener not detach
};
/**
 * 从页面删除节点，放至内存空间，防止节点被回收
 * @param  {String|Node} _element 要删除的节点ID或者对象
 * @return {Void}
 */
E._$removeElementByEC = function(){
    for(var i=0,l=arguments.length,_element;i<l;i++){
        _element=E._$getElement(arguments[i]);
        _element&&__ec.appendChild(_element);
    }
};
/**
 * 设置元素禁止文本选择
 * @param  {String|Node} _element  节点元素ID或者对象
 * @param  {Boolean}     _selected 是否可选择
 * @return {Void}
 */
E._$noSelect = function(_element,_selected){
    if (!B._$ISIE) return; // use css user-select
    _element = E._$getElement(_element);
    if (!_element) return;
    _element.onselectstart = !_selected?F:null;
};
/**
 * IE6下节点鼠标移入动作
 * @param  {String|Node} _element 节点ID或者对象
 * @param  {String}      _class   动作样式
 * @param  {Boolean}     _force   是否强制使用脚本处理HOVER
 * @return {Void}
 */
E._$hoverElement = function(_element,_class,_force){
    if (!B._$ISOLDIE&&!_force) return; // use css :hover
    _element = E._$getElement(_element);
    if (!_element||!_class||!!_element[__hk]) return;
    _element[__hk] = _class;
    var _id = _element.id = _element.id||'xnd_'+U._$randNumberString(10);
    V._$addEvent(_element,B._$ISIE?'mouseleave':'mouseout',__hoverElement._$bind(E,_id,false));
    V._$addEvent(_element,B._$ISIE?'mouseenter':'mouseover',__hoverElement._$bind(E,_id,true));
};
/**
 * IE6下设置元素的最大高度或者宽度
 * @param  {String|Node} _element 节点元素ID或者对象
 * @param  {String}      _type    高度-height 宽度-width
 * @param  {Number}      _value   值
 */
E._$maxBoxElement = function(_element,_type,_value,_ratio){
    if (!B._$ISOLDIE) return; // use css max-width or max-height
    _element = E._$getElement(_element);
    if (!_element) return;
    var _id = _element.id||('mnd_'+U._$randNumberString(10));
    _element.id = _id; _element.mt = _type;
    _element.mv = _value; _element.mr = _ratio;
    if (!!_element.maxkey) return; _element.maxkey = true;
    var _type = _element.tagName.toLowerCase()=='img'?'load':'resize';
    !!_ratio ? V._$addEvent(_element,_type,__adjElement._$bind(E,_id))
             : V._$addEvent(_element,_type,__maxElement._$bind(E,_id));
};
/**
 * 设置元素的最大宽度
 * @param  {String|Node} _element 节点元素ID或者对象
 * @param  {Number}      _width   宽度
 * @return {Void}
 */
E._$maxWidthElement = function(_element,_width,_ratio){
    E._$maxBoxElement(_element,'width',_width,_ratio);
};
/**
 * 设置元素的最大高度
 * @param  {String|Node} _element 节点元素ID或者对象
 * @param  {Number}      _height  高度
 * @return {Void}
 */
E._$maxHeightElement = function(_element,_height,_ratio){
    E._$maxBoxElement(_element,'height',_height,_ratio);
};
/**
 * 取Flash对象，用于JS交互 object.id/embed.name
 * @param  {String} _key Flash ID
 * @return {Node}        Flash对象
 */
E._$getFlashObject = function(_key){
    return B._$ISIE?window[_key]:document[_key];
};
// init
var __getExpByClassName;
if (!!document.evaluate)
     __getExpByClassName = function(_class){
        if (!_class) return null;
        if (!__sp.test(_class))
            return "[contains(concat(' ',@class,' '),' "+_class+" ')]";
        var _arr = _class.split(__sp),_result = '';
        for(var i=0,l=_arr.length,_tmp;i<l;i++){
            _tmp = __getExpByClassName(_arr[i]);
            _result += !_tmp?'':_tmp;
        }
        return _result;
     };
if (!window.Node)
    window.Node = {ELEMENT_NODE:1
//                  ,ATTRIBUTE_NODE:2
//                  ,TEXT_NODE:3
//                  ,CDATA_SECTION_NODE:4
//                  ,ENTITY_REFERENCE_NODE:5
//                  ,ENTITY_NODE:6
//                  ,PROCESSING_INSTRUCTION_NODE:7
//                  ,COMMENT_NODE:8
//                  ,DOCUMENT_NODE:9
//                  ,DOCUMENT_TYPE_NODE:10
//                  ,DOCUMENT_FRAGMENT_NODE:11
//                  ,NOTATION_NODE:12
    };
if (B._$ISFF){
HTMLElement.prototype['__defineGetter__']("innerText",function(){return this.textContent;});
HTMLElement.prototype['__defineSetter__']("innerText",function(_content){this.textContent = _content;});
HTMLElement.prototype.insertAdjacentElement = function(_where,_element){
    if (!_where||!_element) return;
    switch(_where){
        case 'beforeEnd'  : this.appendChild(_element); return;
        case 'beforeBegin': this.parentNode.insertBefore(_element,this); return;
        case 'afterBegin' :
             !this.firstChild
             ?this.appendChild(_element)
             :this.insertBefore(_element,this.firstChild); return;
        case 'afterEnd'   :
             !this.nextSibling 
             ?this.parentNode.appendChild(_element)
             :this.parentNode.insertBefore(_element,this.nextSibling); return;
    }
};
HTMLElement.prototype.insertAdjacentHTML = function(_where,_html){
    if (!_where||!_html) return;
    this.insertAdjacentElement(_where,
         document.createRange().
         createContextualFragment(_html));
};}
document.head = document.getElementsByTagName('head')[0]||document.body;
/**
 * 创建节点，document.cteateElement的替代方法
 * @param  {String} _tag   节点标签
 * @param  {String} _class 节点的样式类名称
 * @return {Node}          创建的节点对象
 */
document.cloneElement = function(_tag,_class){
    var _element = document.createElement(_tag);
    __initElementByTag(_element);
    !!_class && (_element.className=_class);
    return _element;
};
// ie prepare for hack 31 css style limit
if (B._$ISIE){
    __hc = document.cloneElement('style');
    document.head.appendChild(__hc);
}
})(this,document);
