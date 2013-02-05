(function() {
  var param = $.url().param(),
    code = param.code;
  if (type && code) {
//    console.log('http://localhost:3002/api/' + type + '/code/' + code);
    location.replace('http://localhost:3002/api/' + type + '/code/' + code);
  }
})();
