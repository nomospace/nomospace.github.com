var sys = require("sys"),
	fs = require('fs'),
	path = require('path'),
	wmark = require('./watermark');
	
process.on('uncaughtException', function(_error){
    console.log('Caught exception: ' + _error);
});

sys.puts("Server running...");

fs.readdir('img', function(err, f){
	if (err) 
		console.log('error!');
	else {
		var arr = [], 
			extname;
        for (var i = 0, l = f.length; i < l; i++) {
            extname = path.extname(f[i]);
            if (extname && (extname.slice(1) == 'png')) {
                arr.push(__dirname + '/img/' + f[i]);
            }
        }
		wmark.init({
			"position" : "top-left",
//				"opacity" : 10,
			"path" : __dirname + "/watermark.png",
			"targets" : arr
		});
	}
});
