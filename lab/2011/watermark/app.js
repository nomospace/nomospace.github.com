var util = require("util");
var fs = require('fs');
var path = require('path');
var wmark = require('./watermark');

process.on('uncaughtException', function(_error) {
  console.log('Caught exception: ' + _error);
});

fs.readdir('img', function(err, f) {
  if (err) {
    console.log('error!');
  }
  else {
    var arr = [], extname;
    for (var i = 0, l = f.length; i < l; i++) {
      extname = path.extname(f[i]);
      if (extname && (extname.slice(1) == 'png')) {
        arr.push('./img/' + f[i]);
      }
    }
    wmark.init({
      'position': 'top-left',
//				'opacity' : 10,
      'path': './demo.png',
      'targets': arr
    });
  }
});

console.log('Server running...');
