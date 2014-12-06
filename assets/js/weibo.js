(function() {
  var param = $.url().param(),
    code = param.code, url;
  var referrer = document.referrer.slice(0, -6);
  if (type && code) {
    if (type == 'qq') {
      url = referrer + 'api/' + type + '/code/' + location.search.slice(1);
    } else if (type == 'sina') {
      url = referrer + 'api/' + type + '/code/' + code;
    }
    location.replace(url);
  }
})();
