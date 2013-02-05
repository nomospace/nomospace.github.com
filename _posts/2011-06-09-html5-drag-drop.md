---
layout: post
title: html5 文件拖放的一个简单实例
category: html5
---
<div class="bct fc05 fc11 nbw-blog ztag js-fs2"><br>人人网最近推出了一个快捷上传相片功能：<br>

    <div><img alt="html5浏览器文件拖放的一个简单实例 - nomospace（挪墨） - Nomospace" style="margin:0 10px 0 0;"
              src="/assets/images/2309783658888408170.png"></div>
    <br>这种直接拖放相片至浏览器的作法让传统的表单或者flash上传黯然失色，用户体验比较好。根据<a target="_blank" rel="nofollow" href="http://twitter.com/sofish">sofish</a>的博文<a
            target="_blank" rel="nofollow" href="http://sofish.de/1545">提升用户体验：HTML5 拖放文件上传</a>以及<a target="_blank"
                                                                                                    rel="nofollow"
                                                                                                    href="http://www.jsmix.com/">小展</a>的<a
            target="_blank" rel="nofollow" href="http://www.jsmix.com/html5/html5-file-pre-test.html">HTML5中File对象初探</a>一文的指导，自己也写了一个demo。实现原理上述两位已经作了很好的总结，在此没有必要赘述。demo核心是html5
    FileReader以及拖放Drag and Drop，具体逻辑见<a target="_blank" rel="nofollow"
                                        href="https://github.com/nomospace/nomospace.github.com/tree/master/lab/2011/fileReader">我的源代码@github</a>。<br><br><a href="/lab/2011/fileReader/fileReader.html" target="_blank" rel="nofollow">demo</a>在fx4/chrome11中的效果图：<br>

    <div>
        <div>
            <div><img alt="html5文件拖放的一个简单实例 - nomospace（挪墨） - Nomospace" style="margin:0 10px 0 0;"
                      src="/assets/images/3671841071191473892.png"></div>
            &nbsp;<br>编码过程中遇到了一个问题：chrome11下的FileReader没有很好地实现EventTarget，于是当使用addEventListener时会抛出Object #&lt;FileReader&gt;
            has no method 'addEventListener'，见<a target="_blank" rel="nofollow"
                                                 href="http://code.google.com/p/chromium/issues/detail?id=48367">Issue
            48367</a>。fx4下却没有这个问题，目前的解决方案看似只能通过(new FileReader()).on事件名来实现了，最后附上<a target="_blank" rel="nofollow"
                                                                                   href="http://t.cn/aKZT2W">File
            API的Event Handler Attributes</a>。<br><br></div>
    </div>
    <font color="#c0c0c0"><i>注：本文示例代码仅完全适用于 Firefox 3.6+ ，部分适用于其他支持 HTML 5 接口的浏览器，完全不适用于 IE8 及以下版本 。</i></font><br><br>参考资料：<br><a
            target="_blank" rel="nofollow" href="http://sofish.de/1545">提升用户体验：HTML5 拖放文件上传</a><br><a target="_blank"
                                                                                                      rel="nofollow"
                                                                                                      href="http://dev.w3.org/2006/webapi/FileAPI/">W3C
        File API</a><br><a target="_blank" rel="nofollow" href="http://www.jsmix.com/html5/html5-file-pre-test.html">HTML5中File对象初探</a><br><a
            target="_blank" rel="nofollow" href="http://dev.w3.org/html5/spec/dnd.html">W3C Drag and drop</a><br><a
            class="link_external" rel="nofollow" href="https://developer.mozilla.org/en/DOM/File">MDC File</a><br><a
            target="_blank" rel="nofollow"
            href="http://blog.bingo929.com/google-enjoy-html5-drag-drop-filereaderenren.html">给力的 Google HTML5 训练营(HTML5
        Drag&amp;Drop 拖拽、FileReader实例教程)</a></div>
