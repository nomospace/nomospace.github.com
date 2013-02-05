---
layout: post
title: 弱小版 ImageLazyLoad
category: frontend
---
<div class="bct fc05 fc11 nbw-blog ztag js-fs2">
    延迟加载无非就是在需要时才加载资源，节省系统开销与网络带宽，目的是加快浏览速度。实现思路是将image的实际src值保存到一个自定义属性中，然后通过监听scroll事件判断image元素是否在当前可视区域内，如果是则将这个值设为src。在参考一些代码实现后，尝试实现了一个弱小版的图片延迟加载。所谓弱小版就是说扩展性一般、兼容性一般、代码复杂程度一般，只保证基本功能的代码实现，<a
        target="_blank" rel="nofollow"
        href="https://github.com/nomospace/nomospace.github.com/tree/master/lab/2011/imageLazyLoad/lazyLoad.js">查看完整实现</a>。这套代码目前运用在<a
        target="_blank" href="http://photo.163.com/?from=nav">相册</a>的评论模块中，只支持垂直方向的延迟加载。<br><br><b>如何调用模块？</b><br><span
        style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Monaco; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; font-size: medium;"><span
        style="font-family: Monaco,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Consolas,'Courier New',monospace; font-size: 12px; line-height: 18px; text-align: left;"><ol
        start="1"
        style="font-size: 1em; line-height: 1.4em; margin: 0px 0px 1px; padding: 2px 0px; border: 1px solid rgb(209, 215, 220); list-style-type: decimal; background-color: rgb(255, 255, 255); color: rgb(43, 145, 175);">
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span
                style="color: black;">.__lazyModule&nbsp;=&nbsp;np.w._$$ImageLazyLoad._$getInstance({&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;delay:&nbsp;200,&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;threshold:&nbsp;200,&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;container:&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__pnode,&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;attribute:&nbsp;<span style="color: blue;">'data-lazyload-src'</span><span
                style="color: black;">&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">});&nbsp; <br></span></li>
</ol></span></span><br><b>可以传入哪些参数？</b><br> <span
        style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Monaco; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; font-size: medium;"><span
        style="font-family: Monaco,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Consolas,'Courier New',monospace; font-size: 12px; line-height: 18px; text-align: left;"><ol
        start="1"
        style="font-size: 1em; line-height: 1.4em; margin: 0px 0px 1px; padding: 2px 0px; border: 1px solid rgb(209, 215, 220); list-style-type: decimal; background-color: rgb(255, 255, 255); color: rgb(43, 145, 175);">
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp; <span style="color: rgb(0, 130, 0);">/**</span>&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;图片资源延迟加载对象类（目前只支持垂直方向）</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@constructor</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@class&nbsp;&nbsp;&nbsp;图片资源延迟加载对象类</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@extends&nbsp;P(N.ut)._$$Singleton</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@param&nbsp;&nbsp;&nbsp;{Object}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_options&nbsp;可选配置参数，已处理的参数如下：</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delay&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Number]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;滚动延时时间，默认为0</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;threshold&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Number]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;加载范围阈值，默认为0</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;failurelimit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Number]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;图片未找到时的重试次数，默认为0</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[HTML|Element]&nbsp;&nbsp;-&nbsp;图片所在的容器，默认为window对象</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;images&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Array]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;图片队列，默认为容器内所有的image对象</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;attribute&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[String]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;图片资源地址的自定义属性，默认为data-lazyload-src</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onbeforedataload&nbsp;[Function]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;图片加载前的回调函数，默认为F</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onafterdataload&nbsp;&nbsp;[Function]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;图片加载后的回调函数，默认为F</span> <br> </span>
    </li>
</ol></span></span><br><b>绑定哪些事件？</b><br><span
        style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Monaco; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; font-size: medium;"><span
        style="font-family: Monaco,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Consolas,'Courier New',monospace; font-size: 12px; line-height: 18px; text-align: left;"><ol
        start="1"
        style="font-size: 1em; line-height: 1.4em; margin: 0px 0px 1px; padding: 2px 0px; border: 1px solid rgb(209, 215, 220); list-style-type: decimal; background-color: rgb(255, 255, 255); color: rgb(43, 145, 175);">
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp; <span style="color: rgb(0, 130, 0);">/**</span>&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span
                style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;初始化相关事件函数</span>&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@return&nbsp;{Void}</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/</span><span
                style="color: black;">&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;__pro.__bindEvent&nbsp;=&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span style="color: black;">(){&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">var</span><span style="color: black;">&nbsp;_function&nbsp;=&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__beginLoad._$bind(</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span
                style="color: black;">);&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span
                style="color: black;">._$addEvent(</span><span style="color: blue;">'appear'</span><span
                style="color: black;">,&nbsp;_function);&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V._$addEvent(window,&nbsp;<span
                style="color: blue;">'scroll'</span><span style="color: black;">,&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__delayLoad._$bind(</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">,&nbsp;_function));&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V._$addEvent(window,&nbsp;<span
                style="color: blue;">'resize'</span><span style="color: black;">,&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__delayResize._$bind(</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">,&nbsp;_function));&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;};</span></li>
</ol></span></span>这段代码为window对象绑定scroll事件与resize事件。当拖动滚动条或者鼠标滚动一下时，scroll事件会连续触发，所以在此做个delay。在此绑定resize事件目的是浏览器在resize后需要重新计算images的位置。appear为自定义事件，目的是在页面载入时手动触发一次scroll事件。<font
        color="#ffffff">对此有个疑问，页面动态生成节点导致页面滚动会不会触发scroll事件？</font><br><br><b>如何判断image元素是否在当前可视区域内？</b><br><span
        style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Monaco; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; font-size: medium;"><span
        style="font-family: Monaco,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Consolas,'Courier New',monospace; font-size: 12px; line-height: 18px; text-align: left;"><ol
        start="1"
        style="font-size: 1em; line-height: 1.4em; margin: 0px 0px 1px; padding: 2px 0px; border: 1px solid rgb(209, 215, 220); list-style-type: decimal; background-color: rgb(255, 255, 255); color: rgb(43, 145, 175);">
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp; <span style="color: rgb(0, 130, 0);">/**</span>&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span
                style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;元素是否在可视区域</span>&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@param&nbsp;{HTML|Element}&nbsp;_element&nbsp;&nbsp;&nbsp;目标元素</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@return&nbsp;{Boolean}</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/</span><span
                style="color: black;">&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;__pro.__isInViewport&nbsp;=&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span style="color: black;">(_element){&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">return</span><span
                style="color: black;">&nbsp;!</span><span style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span
                style="color: black;">.__aboveTheTop(_element)&nbsp;&amp;&amp;&nbsp;!</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__belowTheBottom(_element);&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;};&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: rgb(0, 130, 0);">/**</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;判断元素是否位于当前可视区域的上部</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@param&nbsp;{HTML|Element}&nbsp;_element&nbsp;&nbsp;&nbsp;目标元素</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@return&nbsp;{Boolean}</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/</span><span
                style="color: black;">&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;__pro.__aboveTheTop&nbsp;=&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span style="color: black;">(_element){&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">var</span><span style="color: black;">&nbsp;_top&nbsp;=&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__getClient().top;&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">return</span><span style="color: black;">&nbsp;_top&nbsp;&gt;=&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__offset(_element).top&nbsp;+&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__offset(_element).height&nbsp;+&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__threshold;&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;};&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: rgb(0, 130, 0);">/**</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;判断元素是否位于当前可视区域的下部</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@param&nbsp;{HTML|Element}&nbsp;_element</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@return&nbsp;{Boolean}</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/</span><span
                style="color: black;">&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;__pro.__belowTheBottom&nbsp;=&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span style="color: black;">(_element){&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">var</span><span style="color: black;">&nbsp;_bottom&nbsp;=&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__getClient().bottom;&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">return</span><span style="color: black;">&nbsp;_bottom&nbsp;&lt;=&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__offset(_element).top&nbsp;+&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__offset(_element).height&nbsp;-&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__threshold;&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;}; <br></span></li>
</ol></span></span>在命名上参考了<a target="_blank" rel="nofollow"
                             href="http://www.appelsiini.net/projects/lazyload">jQuery</a>。当然了，是否在可视区域内，还可以通过<a
        target="_blank" rel="nofollow" href="http://hi.baidu.com/jiyeqian/blog/item/c14e52c24794b4170ff47715.html">判断两个矩形是否相交</a>来实现。<br><br><b>如何加载元素？</b><br><span
        style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Monaco; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; font-size: medium;"><span
        style="font-family: Monaco,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Consolas,'Courier New',monospace; font-size: 12px; line-height: 18px; text-align: left;"><ol
        start="1"
        style="font-size: 1em; line-height: 1.4em; margin: 0px 0px 1px; padding: 2px 0px; border: 1px solid rgb(209, 215, 220); list-style-type: decimal; background-color: rgb(255, 255, 255); color: rgb(43, 145, 175);">
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp; <span style="color: rgb(0, 130, 0);">/**</span>&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span
                style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;开始加载元素</span>&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@return&nbsp;{Void}</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/</span><span
                style="color: black;">&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;__pro.__beginLoad&nbsp;=&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span style="color: black;">(){&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">for</span><span
                style="color: black;">&nbsp;(</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">var</span><span style="color: black;">&nbsp;i&nbsp;=&nbsp;0,&nbsp;j&nbsp;=&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__imgs.length,&nbsp;_img;&nbsp;i&nbsp;&lt;&nbsp;j;&nbsp;i++)&nbsp;{&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_img&nbsp;=&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__imgs[i];&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">if</span><span
                style="color: black;">&nbsp;(</span><span style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span
                style="color: black;">.__isInViewport(_img))&nbsp;{&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__onLoadData(_img);&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_img.loaded&nbsp;=&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">true</span><span
                style="color: black;">;&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(0, 130, 0);">//&nbsp;&nbsp;todo&nbsp;add&nbsp;failurelimit</span><span
                style="color: black;">&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(0, 130, 0);">/*&nbsp;Remove&nbsp;image&nbsp;from&nbsp;array&nbsp;so&nbsp;it&nbsp;is&nbsp;not&nbsp;looped&nbsp;next&nbsp;time.&nbsp;thanks&nbsp;to&nbsp;jQuery&nbsp;*/</span><span
                style="color: black;">&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__imgs&nbsp;=&nbsp;U.arr._$filter(</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span
                style="color: black;">.__imgs,&nbsp;</span><span style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span
                style="color: black;">(_img){</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">return</span><span style="color: black;">&nbsp;!_img.loaded;});&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;};&nbsp; <br></span></li>
</ol></span></span>把加载完毕的元素过滤掉，不再对其进行遍历。<br><br><b>如果不需要模块支持了，如何销毁？</b><br><span
        style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Monaco; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; font-size: medium;"><span
        style="font-family: Monaco,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Consolas,'Courier New',monospace; font-size: 12px; line-height: 18px; text-align: left;"><ol
        start="1"
        style="font-size: 1em; line-height: 1.4em; margin: 0px 0px 1px; padding: 2px 0px; border: 1px solid rgb(209, 215, 220); list-style-type: decimal; background-color: rgb(255, 255, 255); color: rgb(43, 145, 175);">
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp; <span style="color: rgb(0, 130, 0);">/**</span>&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span
                style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;销毁操作</span>&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@param&nbsp;{Boolean}&nbsp;_load&nbsp;&nbsp;&nbsp;是否手动销毁</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@return&nbsp;{Boolean}</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/</span><span
                style="color: black;">&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;__pro.__destroy&nbsp;=&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span style="color: black;">(_load){&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;clearTimeout(<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__timer);&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(0, 130, 0);">//&nbsp;&nbsp;是否加载剩余图片元素</span><span
                style="color: black;">&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">if</span><span style="color: black;">&nbsp;(_load&nbsp;&amp;&amp;&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__imgs)&nbsp;{&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;U.arr._$forEach(<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span
                style="color: black;">.__imgs,&nbsp;</span><span style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span
                style="color: black;">(_img){&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__onLoadData(_img);&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}._$bind(<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">));&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__imgs&nbsp;=&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">null</span><span
                style="color: black;">;&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__clearEvent();&nbsp;&nbsp;&nbsp;&nbsp;</span><span
                style="color: rgb(0, 130, 0);">//&nbsp;&nbsp;bug&nbsp;unfixed:scroll事件无法清除</span><span
                style="color: black;">&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;};&nbsp; <br></span></li>
</ol></span></span>在此可以做一些清理操作，比如清除scroll和resize事件等。<br><br><b>系统如果动态生成了若干新image节点，怎么办？</b><br><span
        style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Monaco; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; font-size: medium;"><span
        style="font-family: Monaco,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Consolas,'Courier New',monospace; font-size: 12px; line-height: 18px; text-align: left;"><span
        style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Monaco; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; font-size: medium;"><span
        style="font-family: Monaco,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Consolas,'Courier New',monospace; font-size: 12px; line-height: 18px; text-align: left;"><ol
        start="1"
        style="font-size: 1em; line-height: 1.4em; margin: 0px 0px 1px; padding: 2px 0px; border: 1px solid rgb(209, 215, 220); list-style-type: decimal; background-color: rgb(255, 255, 255); color: rgb(43, 145, 175);">
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: rgb(0, 130, 0);">/**</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;重新获取元素（用于在指定容器中动态生成新节点时）</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@return&nbsp;{Void}</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/</span><span
                style="color: black;">&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;__pro._$reset&nbsp;=&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span style="color: black;">(){&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__destroy();&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__pause&nbsp;=&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">false</span><span
                style="color: black;">;&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__imgs&nbsp;=&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__container.getElementsByTagName(</span><span
                style="color: blue;">'img'</span><span style="color: black;">);&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__bindEvent();&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__setPlaceHolder();&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">._$dispatchEvent(</span><span
                style="color: blue;">'appear'</span><span style="color: black;">);&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;};&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: rgb(0, 130, 0);">/**</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span
                style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;暂停延迟加载</span>&nbsp;</span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@return&nbsp;{Void}&nbsp;</span>&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/</span><span
                style="color: black;">&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;__pro._$pauseLoad&nbsp;=&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span style="color: black;">(){&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">this</span><span style="color: black;">.__pause&nbsp;=&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">true</span><span
                style="color: black;">;&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;};&nbsp; </span></li>
</ol></span></span></span></span>评论模块具有一定的交互特性，用户可以发表评论回复评论，一旦这么做了，就必须重新获取一遍相应容器内的image节点（很直接很粗暴么，也没想到什么更好的解决方案）。_$pauseLoad由调用者手动调用，目的是在动态生成节点浏览器重新渲染时暂停图片的延迟加载进程。this.__setPlaceHolder()给image对象一个1px*1px占位用的图片。不给image设定src的话，ie下会很杯具。<br><br>时间精力有限，并没有在移动设备上进行过测试，目前只支持pc下的主流浏览器。<br><br>参考资料<br><a
        target="_blank" rel="nofollow" href="http://www.howtocreate.co.uk/tutorials/javascript/browserwindow">Finding
    the size of the browser window</a><br><a target="_blank" rel="nofollow"
                                             href="http://www.cnblogs.com/cloudgamer/archive/2010/03/03/ImagesLazyLoad.html">ImagesLazyLoad
    图片延迟加载效果</a><br><a target="_blank" rel="nofollow"
                       href="http://www.neoease.com/lazy-load-jquery-plugin-delay-load-image/">Lazy Load, 延迟加载图片的 jQuery
    插件</a></div>

