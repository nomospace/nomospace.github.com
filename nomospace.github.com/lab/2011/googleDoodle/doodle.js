/**
 * google doodle 舞蹈者
 * @version 0.1
 * @author	nomospace(jinlu_hz@163.com)
 * @depends seajs
 */
define(function(require){
    var _tmp, 
		_html, 
		_style,
		_node = document.getElementById('doodle'),
		_data = require('./data').getDoodleMapData(), 
		_func = function(){
	        if (_style = _data.shift()) {
	            _html = '<div style="' + 'position:absolute;' +
		            'left:' + _style[0] + 'px;top:' + _style[1] + 'px;width:' + _style[2] + 'px;height:' + _style[3] +
		            'px;background:url(sprite.png) no-repeat ' + _style[4] + 'px ' + _style[5] + 'px;"></div>';
	            _tmp = document.createElement('div');
	            _tmp.innerHTML = _html;
	            _node.appendChild(_tmp.childNodes[0]);
				setTimeout(_func, 85)
	        }
		}
	_func();
});