var sys = require("sys"),
  http = require("http"),
  url = require("url"),
  path = require("path"),
  fs = require("fs"),
  events = require("events"),
  twitterHost = "api.twitter.com",
  twitterClient = http.createClient(80, twitterHost),
  twitterApi = '/statuses/user_timeline.json?user_id=196004991',
  tweetEmitter = new events.EventEmitter();

/**
 * 伪404或者500的出错处理
 * @param {Object} _uri
 * @param {Object} _response
 */
function _loadStatisFile(_uri, _response) {
  var _fileName = path.join(process.cwd(), _uri);
  path.exists(_fileName, function(_exists) {
    if (!_exists) {
      _response.writeHead(404, {"Content-Type": "text/html"});
      _response.write("404 Not Found\n");
      _response.write("<a href='http://localhost:8080/hello-nodejs.html'>http://localhost:8080/hello-nodejs.html</a>");
      _response.end();
      return;
    }
    fs.readFile(_fileName, "binary", function(_error, _file) {
      if (_error) {
        _response.writeHead(500, {"Content-Type": "text/plain"});
        _response.write(_error + "\n");
        _response.end();
        return;
      }
      _response.writeHead(200);
      _response.write(_file, "binary");
      _response.end();
    });
  });
}

/**
 * 加载tweet数据列表
 */
function _loadTweets() {
  var _tweetRequest = twitterClient.request("GET", twitterApi, {"host": twitterHost});
  _tweetRequest.addListener("response", function(_response) {
    var _body = '';
    _response.addListener("data", function(_data) {
      _body += _data;
    });
    _response.addListener("end", function() {
      var _tweets = JSON.parse(_body);
      (_tweets && _tweets.length > 0) && tweetEmitter.emit("tweets", _tweets);
    });
  });
  _tweetRequest.end();
}

/**
 * 创建http服务器实例
 * @param {Object} _request
 * @param {Object} _response
 */
http.createServer(function(_request, _response) {
  var _uri = url.parse(_request.url).pathname;
  if (_uri === "/nomospace") {
    tweetEmitter.addListener("tweets", function(tweets) {
      _response.writeHead(200, {"Content-Type": "text/plain"});
      _response.write(JSON.stringify(tweets));
      _response.end();
    });
  }
  else {
    _loadStatisFile(_uri, _response);
  }
}).listen(8080);

// 打印启动信息
sys.puts("Server running at http://localhost:8080/");
// 加载tweet数据
_loadTweets();
