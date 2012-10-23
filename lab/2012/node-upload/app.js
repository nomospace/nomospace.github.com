var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');
var routes = require('./routes');

var appRoot = __dirname || './';
var host = '127.0.0.1';
var port = 3005;
var app = express();

app.configure(function() {
//  app.use(express.logger({format: ':method :url :status'}));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
  app.use(express.bodyParser());
//  app.use(express.methodOverride());
  app.use(app.router);
  app.set('views engine', 'ejs');
  app.set('views', path.join(appRoot, 'views'));
});

app.get('/', routes.index);
app.post('/upload', function(req, res) {
  // 获得文件的临时路径
  res.send(req.files);
  var tmp_path = req.files.thumbnail.path;
  // 指定 images 目录为文件上传后的目录
  var target_path = __dirname + '/images/' + req.files.thumbnail.name;
  // 移动文件
  fs.rename(tmp_path, target_path);
});

app.listen(port);

console.log(host + ':' + port);
