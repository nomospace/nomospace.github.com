(function() {
  var param = $.url().param(),
    code = param.code, url;
  if (type && code) {
    if (type == 'qq') {
      url = 'http://localhost:3002/api/' + type + '/code/' + location.search.slice(1);
    } else if (type == 'sina') {
      url = 'http://localhost:3002/api/' + type + '/code/' + code;
    }
    location.replace(url);
  }
})();
