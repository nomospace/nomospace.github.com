/**
 * 简易鼠标/键盘取词并分享到新浪微博
 * @version 0.1
 * @author  nomospace(jinlu_hz@163.com)
 * @depends seajs/LABjs/nts-js
 */
define(function(require) {
  /**
   * nts-js库粒度比较细，并且存在依赖关系，在不修改库的情况下无法保证js的执行顺序，故以下语句无法保证js按顺序执行
   * @see http://seajs.com/docs/
   */
//    require('./lib/nts/base/global');
//    require('./lib/nts/base/browser');
//    require('./lib/nts/base/util');
//    require('./lib/nts/base/event');
//    require('./lib/nts/base/element');

  /**
   * 引入LABjs（Loading And Blocking JavaScript）
   * @see http://labjs.com/documentation.php
   */
  require('./lib/labjs/LAB');
  $LAB.script("lib/nts/base/global.js").wait()
    .script("lib/nts/base/browser.js").wait()
    .script("lib/nts/base/util.js").wait()
    .script("lib/nts/base/event.js").wait()
    .script("lib/nts/base/element.js").wait()
    .script("simpleWeiboShare.nts.js");
});
