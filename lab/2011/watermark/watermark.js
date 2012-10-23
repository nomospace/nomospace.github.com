/**
 * watermark.js for NodeJS inspired by Patrick Wied
 * @version 0.2
 */

var fs = require('fs');
var Canvas = require('canvas');
var jsdom = require('jsdom');
var parser = require('htmlparser');
var browser = jsdom.windowAugmentation(jsdom.defaultLevel, {parser: parser});
var window = browser.window;
var Image = Canvas.Image;

(function(w) {
  var wm = (function(w) {
    var watermarkPath,
      watermarkPosition,
      opacity,
      targets,
      gcanvas,
      gctx,
      /**
       * 初始化系统参数
       * @param {Object}    config
       *         path        [String]    watermark图片所在路径（可选） Default: 'bottom-right'
       *         position    [String]    watermark打印在图片上的位置'top-left'|'top-right'|'bottom-right'|'bottom-left'（可选） Default: 'bottom-right'
       *         opacity        [Number]    watermark透明度[0-100]（可选） Default: 50
       *         targets        [Array|String]    目标图片的路径列表
       */
        configure = function(config) {
        watermarkPath || (watermarkPath = config['path']);
        watermarkPosition || (watermarkPosition = config['position'] || 'bottom-right');
        opacity || (opacity = (255 / (100 / config['opacity'])) || (255 / (100 / 50)));	// 50%
        targets || (targets = config['targets']);

        initCanvas();
        initWatermark();
      },
      /**
       * 初始化Canvas
       */
        initCanvas = function() {
        gcanvas = new Canvas;
        gctx = gcanvas.getContext('2d');
      },
      /**
       * 初始化watermark
       */
        initWatermark = function() {
        watermark = new Image;
        if (opacity != 255)
          watermark.onload = applyTransparency;
        else
          applyWatermarks();
        watermark.src = watermarkPath;
      },
      /**
       * 设置watermark透明度
       */
        applyTransparency = function() {
        var w = watermark.width,
          h = watermark.height;
        setCanvasSize(w, h);
        gctx.drawImage(watermark, 0, 0);
        //	设置透明度
//			var image = gctx.getImageData(0, 0, w, h),
//				imageData = image.data,
//				length = imageData.length;
//			for ( var i = 3; i < length; i += 4) {
//				imageData[i] = (imageData[i] < opacity) ? imageData[i] : opacity;
//			}
//			image.data = imageData;
//			gctx.putImageData(image, 0, 0);

        //	TODO:NodeJS环境下，将toDataURL转换后的base64值作为src赋给watermark，并不会触发watermark的onload（猜测src加载失败）
//			watermark.src = gcanvas.toDataURL();
        applyWatermarks();
      },
      /**
       * 调整Canvas的尺寸
       * @param {Number} w    宽
       * @param {Number} h    高
       */
        setCanvasSize = function(w, h) {
        gcanvas.width = w;
        gcanvas.height = h;
      },
      /**
       * 将watermark印在目标图片上
       * @param {Object} img    目标图片对象
       * @param {String} imagePath    目标图片所在路径
       */
        applyWatermark = function(img, imagePath) {
        initCanvas();
        gcanvas.width = img.width;
        gcanvas.height = img.height;
        gctx.drawImage(img, 0, 0);

        var position = watermarkPosition, x = 0, y = 0;
        if (position.indexOf('top') != -1)
          y = 10;
        else
          y = gcanvas.height - watermark.height - 10;
        if (position.indexOf('left') != -1)
          x = 10;
        else
          x = gcanvas.width - watermark.width - 10;
//			watermark.src = gcanvas.toDataURL();
        gctx.drawImage(watermark, x, y);

        //	保存新图片至当前目录
        var out = fs.createWriteStream(imagePath + '.watermark.png'),
          stream = gcanvas.createSyncPNGStream();
        stream.on('data', function(chunk) {
          out.write(chunk);
        });
        stream.on('end', function() {
          out.end();
        });
      },
      applyWatermarks = function() {
        var len = targets.length;
        while (len--) {
          var img = new Image;
          img.onload = function() {
            applyWatermark(img, targets[len]);
          }
          img.src = targets[len];
        }
      };
    return {
      init: function(config) {
        configure(config);
      }
    };
  })(w);
  w.wmark = wm;
})(window);

module.exports = window.wmark;
