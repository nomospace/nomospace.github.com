/**
 * ==========================================================================================
 * 浏览器检测接口实现文件<br/>
 * 代码书写规范简述：<br/>
 * <pre>
 *    变量/接口前缀        描述                                           发布时是否混淆
 * ------------------------------------------------------------------------------------------
 *    _                  接口内局部变量或者传递的参数                            Y
 *    _$                 对象外可访问的接口或者属性                             Y/N
 *                       此类接口不允许以字符串形式出现
 *                       如果项目所有js文件一起混淆可以考虑混淆
 *    _$$                类对象，同_$前缀的处理                                Y/N
 *    __                 对象外不可访问的接口或者属性                            Y
 *    无                 没有前缀的接口或者属性可以在对象外访问                     N
 *                       代码中可以以字符串的形式出现
 *    X                  单个大写字母命名表示集合了一些通用的属性和接口的对象
 *                       代码中禁止出现单个大写字母命名的变量                      N
 * ------------------------------------------------------------------------------------------
 * </pre>
 * @version  1.0
 * @author   genify(caijf@163.org)
 * ==========================================================================================
 */
(function(window,document){
// private
var __userAgent = window.navigator.userAgent;
// interface
P('B');
B.__destroy = F;
B._$ISIE = /msie\s+(.*?)\;/i.test(__userAgent); // Trident(JScript)
B._$ISFF = !B._$ISIE&&/rv\:(.*?)\)\s+gecko\//i.test(__userAgent); // Gecko()
B._$ISOP = !B._$ISIE&&!B._$ISFF&&/opera\/(.*?)\s/i.test(__userAgent); // Presto
B._$ISSF = !B._$ISIE&&!B._$ISFF&&!B._$ISOP&&/applewebkit\/(.*?)\s/i.test(__userAgent); // WebKit
B._$ISKQ = !B._$ISIE&&!B._$ISFF&&!B._$ISOP&&!B._$ISSF&&/konqueror\/(.*?)\;/i.test(__userAgent); // KHtml
B._$VERSION = RegExp.$1;
B._$ISOLDIE = B._$ISIE&&B._$VERSION<'7.0'; // don't use <='6.0' for 6.0b and so on
B._$ISMT = B._$ISIE&&__userAgent.indexOf('Maxthon')>=0; // for maxthon with ie core
B._$ISTT = B._$ISIE&&__userAgent.indexOf('TencentTraveler')>=0; // for tencenttraveler
// init
if (B._$ISIE) try{document.execCommand('BackgroundImageCache',false,true);}catch(e){}
})(this,document);
