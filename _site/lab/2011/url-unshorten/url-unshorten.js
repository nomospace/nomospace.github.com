var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    events = require("events"),
	emitter = new events.EventEmitter();
// unshorten url
function _unshorten(){
	var _body = '',
		_host = "api.unshort.me",
		_client = http.createClient(80, _host),
    	_request = _client.request("GET", api, {"host": _host});
    _request.on("response", function(_response){
        _response.on("data", function(_data){
            _body += _data;
        });
        _response.on("end", function(){
			console.log(_body);
            var _data = JSON.parse(_body);
            emitter.emit("urldata", _data);
        });
    });
    _request.end();
};
// 创建http服务器实例
http.createServer(function(_request, _response){
    var _url = url.parse(_request.url), 
		_uri = _url.pathname;
    if (_uri === "/") {
        var _search = _url.search || '?r=';
        api = _search + '&t=json';
        emitter.once("urldata", function(_data){
            _response.writeHead(200, {"Content-Type":"text/html"});
			_response.write(''+
				'<h2>' + 
				(_data['success'] == 'true' ? 
				('解析后的URL — ' + _data['resolvedURL']) : 
				('URL无法解析 - ' + (_data['requestedURL']||'（空）'))) + 
				'</h2>');
            _response.end();
        });
        _unshorten();
    }
}).listen(8080);

process.on('uncaughtException', function(_error){
    console.log('Caught exception: ' + _error);
});

// 打印启动信息
sys.puts("Server running at http://localhost:8080/");