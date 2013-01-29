var CryptoJS = require('./sha');
var fs = require('fs');
var serverUrl = 'http://api.dianping.com/';
var apiPath = 'v1/business/find_businesses';
var appkey = '756750406';
var secret = 'e00d8099e58245c0b996c0c367a6dbb0';
var regName = process.argv[2] || '';
var catJson = require('./json/category.json')['美食'];
var regJson = require('./json/region.json')['上海'][regName || '浦东新区'];

var catArray = [];
catJson.forEach(function(c) {
  catArray.push(c);
});

var regArray = [];
//for (var i in regJson) {
//  if (regJson[i].length) {
//    regJson[i].forEach(function(r) {
//      regArray.push(r);
//    });
//  }
//}
regJson.forEach(function(r) {
  regArray.push(r);
});

var count = 0, allUrls = [];
catArray.forEach(function(c) {
  regArray.forEach(function(r) {
    count++;
    fetch({'category': c, 'region': r});
  });
});

fs.writeFile('list_' + regName + '.txt', allUrls.join('\n'), function(e) {
  if (e) throw e;
});

console.log(count);

function fetch(options) {
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
  var url = serverUrl + apiPath + '?' + queryString;
  allUrls.push(url);
}
