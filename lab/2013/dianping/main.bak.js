var CryptoJS = require('./sha');
var db = require('./db');
var fs = require('fs');
var http = require('http');
var async = require('async');
var _ = require('underscore');
var serverUrl = 'http://api.dianping.com/';
var apiPath = 'v1/business/find_businesses';
var appkey = '42148474';
var secret = 'ddfbaf53588f414b985cc935cad57bc5';
var regName = process.argv[2] || '';
var catJson = require('./json/category.json');
var regJson = require('./json/region.json')['上海'];

var catArray = ['本帮菜'];
//catJson.forEach(function(c) {
//  catArray.push(c);
//});

var regArray = [];
for (var i in regJson) {
  if (regJson[i].length) {
    regJson[i].forEach(function(r) {
      regArray.push(r);
    });
  }
}
//regJson.forEach(function(r) {
//  regArray.push(r);
//});

var count = 0, allUrls = [], tasks = [];
//catArray.forEach(function(c) {
regArray.forEach(function(r) {
  console.log(r);
  count++;
  var url = generateUrl({'category': catArray[0], 'region': r});
  tasks.push(function(callback) {
    fetch({'url': url, 'callback': callback});
  });
});
//});

//allUrls.forEach(function(url) {
//  console.log(url);
//});

async.parallel(tasks, function(err, results) {
  if (err) throw err;
  console.log('Done!');
//  var tmp = [];
  db.connect();
  _.flatten(resultArray).forEach(function(data) {
//    tmp.push(JSON.stringify(data));
    if (!data || !data.business_id) return;
    db.executeSql('INSERT INTO jam_dp ' +
      '(business_id, name, branch_name, address, telephone, city, regions, categories, avg_rating, rating_img_url, rating_s_img_url, ' +
      'product_grade, decoration_grade, service_grade, review_count, distance, business_url, photo_url, has_coupon) VALUES (' +
      data.business_id +
      ',"' + data.name +
      '","' + data.branch_name +
      '","' + data.address +
      '","' + data.telephone +
      '","' + data.city +
      '","' + data.regions +
      '","' + data.categories +
      '",' + data.avg_rating +
      ',"' + data.rating_img_url +
      '","' + data.rating_s_img_url +
      '",' + data.product_grade +
      ',' + data.decoration_grade +
      ',' + data.service_grade +
      ',' + data.review_count +
      ',' + data.distance +
      ',"' + data.business_url +
      '","' + data.photo_url +
      '",' + data.has_coupon + ')'
    );
  });
//  fs.writeFile('list_' + regName + '.txt', tmp.join('\n'), function(e) {
//    if (e) throw e;
//  });
  db.end();
});

console.log(count);

function generateUrl(options) {
  var param = {};
  param['format'] = 'json';
  param['city'] = '上海';
  param['category'] = options.category;
  param['region'] = options.region;
  param['limit'] = '20';
  param['has_coupon'] = '0';
  param['has_deal'] = '0';
//  param['radius'] = '2000';
//  param['offset_type'] = '2';
//  param['keyword'] = '泰国菜';
//  param['sort'] = '7';
//  param['latitude'] = '31.21524';
//  param['longitude'] = '121.420033';

  var array = [], key;
  for (key in param) {
    array.push(key);
  }
  array.sort();

  var paramArray = [];
  paramArray.push(appkey);
  for (var i in array) {
    key = array[i];
    paramArray.push(key + param[key]);
  }
  paramArray.push(secret);

  var shaSource = paramArray.join('');
  var sign = ('' + CryptoJS.SHA1(shaSource)).toUpperCase();
  var queryArray = [];
  queryArray.push('appkey=' + appkey);
  queryArray.push('sign=' + sign);
  for (key in param) {
    queryArray.push(key + '=' + param[key]);
  }

  var queryString = queryArray.join('&');
  return serverUrl + apiPath + '?' + queryString;
}

//http.ClientRequest.prototype.setTimeout = function(timeout, callback) {
//  var self = this;
//  if (callback) {
//    self.on('timeout', callback);
//  }
//  self.connection.setTimeout(timeout, function() {
//    self.abort();
//    self.emit('timeout');
//  });
//};

var /*request_timer = null, */req = null;
// 请求 5 秒超时
//request_timer = setTimeout(function() {
//  req.abort();
//  console.log('Request Timeout.');
//}, 5000);

//var options = {
//  host: 'www.google.com',
//  port: 80,
//  path: '/'
//};

var resultArray = [];

function fetch(options) {
  var url = options.url, callback = options.callback;
  req = http.get(encodeURI(url),function(res) {
    console.log(url);
//    clearTimeout(request_timer);
    // 等待响应 60 秒超时
//    var response_timer = setTimeout(function() {
//      res.destroy();
//      console.log('Response Timeout.');
//    }, 60000);

    console.log("Got response: " + res.statusCode);
    var chunks = [], length = 0;
    res.on('data', function(chunk) {
      length += chunk.length;
      chunks.push(chunk);
    });
    res.on('end', function() {
//      clearTimeout(response_timer);
      var data = new Buffer(length);
      // 延后 copy
      for (var i = 0, pos = 0, size = chunks.length; i < size; i++) {
        chunks[i].copy(data, pos);
        pos += chunks[i].length;
      }
      resultArray.push(JSON.parse(data.toString()).businesses);
//      callback(JSON.parse(data.toString()));
      callback();
    });
  }).on('error', function(e) {
      // 响应头有错误
//      clearTimeout(request_timer);
      console.log("Got error: " + e.message);
    });
}
