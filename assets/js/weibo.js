(function() {
  var param = $.url().param(),
    type = param.type,
    code = param.code;
  if (type && code) {
    console.log('http://localhost:3002/api/' + type + '/' + code);
    location.replace('http://localhost:3002/api/' + type + '/' + code);
  }
})();
