---
layout: post
title: node.js 下的短网址还原
category: node
---
<div class="bct fc05 fc11 nbw-blog ztag js-fs2"><a target="_blank" rel="nofollow" href="http://twitter.com/#%21/ruanyf">阮一峰</a>在他的个人博客中提供了<a
        target="_blank" rel="nofollow"
        href="http://www.ruanyifeng.com/blog/2011/05/bookmarklet_of_unshortening_url.html">短网址还原的Bookmarklet</a>，文中提及的<a
        target="_blank" rel="nofollow" href="http://unshort.me/">unshort.me</a>提供了短网址还原的<a target="_blank"
                                                                                           rel="nofollow"
                                                                                           href="http://unshort.me/api.html">API</a>，目前支持三种返回格式：XML/JSON/JSONP。在此我选择JSON，具体实现如下：<br><br><span
        style="border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium;"><span
        style="font-family: Monaco, 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Consolas, 'Courier New', monospace; font-size: 12px; line-height: 18px; text-align: left;"><ol
        start="1"
        style="font-size: 1em; line-height: 1.4em; margin-top: 0px; margin-right: 0px; margin-bottom: 1px; margin-left: 0px; padding-top: 2px; padding-right: 0px; padding-bottom: 2px; padding-left: 0px; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(209, 215, 220); border-right-color: rgb(209, 215, 220); border-bottom-color: rgb(209, 215, 220); border-left-color: rgb(209, 215, 220); list-style-type: decimal; list-style-position: initial; list-style-image: initial; background-color: rgb(255, 255, 255); color: rgb(43, 145, 175);">
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(127, 0, 85); font-weight: bold;">var</span><span
                style="color: black;">&nbsp;sys&nbsp;=&nbsp;require(</span><span style="color: blue;">"sys"</span><span
                style="color: black;">),&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;http&nbsp;=&nbsp;require(<span
                style="color: blue;">"http"</span><span style="color: black;">),&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;url&nbsp;=&nbsp;require(<span
                style="color: blue;">"url"</span><span style="color: black;">),&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;events&nbsp;=&nbsp;require(<span style="color: blue;">"events"</span><span
                style="color: black;">),&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;emitter&nbsp;=&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">new</span><span style="color: black;">&nbsp;events.EventEmitter();&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">//&nbsp;unshorten&nbsp;url</span><span
                style="color: black;">&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span
                style="color: black;">&nbsp;_unshorten(){&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">var</span><span style="color: black;">&nbsp;_body&nbsp;=&nbsp;</span><span
                style="color: blue;">''</span><span style="color: black;">,&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_host&nbsp;=&nbsp;<span
                style="color: blue;">"api.unshort.me"</span><span style="color: black;">,&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_client&nbsp;=&nbsp;http.createClient(80,&nbsp;_host),&nbsp;&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_request&nbsp;=&nbsp;_client.request(<span
                style="color: blue;">"GET"</span><span style="color: black;">,&nbsp;api,&nbsp;{</span><span
                style="color: blue;">"host"</span><span style="color: black;">:&nbsp;_host});&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;_request.on(<span
                style="color: blue;">"response"</span><span style="color: black;">,&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span style="color: black;">(_response){&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_response.on(<span
                style="color: blue;">"data"</span><span style="color: black;">,&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span style="color: black;">(_data){&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_body&nbsp;+=&nbsp;_data;&nbsp;&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_response.on(<span
                style="color: blue;">"end"</span><span style="color: black;">,&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span style="color: black;">(){&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(_body);&nbsp;&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">var</span><span style="color: black;">&nbsp;_data&nbsp;=&nbsp;JSON.parse(_body);&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;emitter.emit(<span
                style="color: blue;">"urldata"</span><span
                style="color: black;">,&nbsp;_data);&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;});&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;_request.end();&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">};&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">//&nbsp;创建http服务器实例</span><span
                style="color: black;">&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">http.createServer(<span
                style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span style="color: black;">(_request,&nbsp;_response){&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">var</span><span style="color: black;">&nbsp;_url&nbsp;=&nbsp;url.parse(_request.url),&nbsp;&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_uri&nbsp;=&nbsp;_url.pathname;&nbsp;&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">if</span><span style="color: black;">&nbsp;(_uri&nbsp;===&nbsp;</span><span
                style="color: blue;">"/"</span><span style="color: black;">)&nbsp;{&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: rgb(127, 0, 85); font-weight: bold;">var</span><span style="color: black;">&nbsp;_search&nbsp;=&nbsp;_url.search&nbsp;||&nbsp;</span><span
                style="color: blue;">'?r='</span><span style="color: black;">;&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;api&nbsp;=&nbsp;_search&nbsp;+&nbsp;<span
                style="color: blue;">'&amp;t=json'</span><span style="color: black;">;&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;emitter.once(<span
                style="color: blue;">"urldata"</span><span style="color: black;">,&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span style="color: black;">(_data){&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_response.writeHead(200,&nbsp;{<span
                style="color: blue;">"Content-Type"</span><span style="color: black;">:</span><span
                style="color: blue;">"text/html"</span><span style="color: black;">});&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_response.write(<span
                style="color: blue;">''</span><span style="color: black;">+&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: blue;">'&lt;h2&gt;'</span><span
                style="color: black;">&nbsp;+&nbsp;&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(_data[<span
                style="color: blue;">'success'</span><span style="color: black;">]&nbsp;==&nbsp;</span><span
                style="color: blue;">'true'</span><span style="color: black;">&nbsp;?&nbsp;&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(<span
                style="color: blue;">'解析后的URL&nbsp;—&nbsp;'</span><span style="color: black;">&nbsp;+&nbsp;_data[</span><span
                style="color: blue;">'resolvedURL'</span><span style="color: black;">])&nbsp;:&nbsp;&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(<span
                style="color: blue;">'URL无法解析&nbsp;-&nbsp;'</span><span
                style="color: black;">&nbsp;+&nbsp;(_data[</span><span style="color: blue;">'requestedURL'</span><span
                style="color: black;">]||</span><span style="color: blue;">'（空）'</span><span style="color: black;">)))&nbsp;+&nbsp;&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: blue;">'&lt;/h2&gt;'</span><span style="color: black;">);&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_response.end();&nbsp;&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_unshorten();&nbsp;&nbsp;</span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">}).listen(8080);&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">process.on(<span style="color: blue;">'uncaughtException'</span><span
                style="color: black;">,&nbsp;</span><span
                style="color: rgb(127, 0, 85); font-weight: bold;">function</span><span style="color: black;">(_error){&nbsp;&nbsp;</span></span>
    </li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;console.log(<span style="color: blue;">'Caught&nbsp;exception:&nbsp;'</span><span
                style="color: black;">&nbsp;+&nbsp;_error);&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">});&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">&nbsp;&nbsp;</span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;"><span style="color: rgb(0, 130, 0);">//&nbsp;打印启动信息</span><span
                style="color: black;">&nbsp;&nbsp;</span></span></li>
    <li style="font-size: 1em; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 38px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
        <span style="color: black;">sys.puts(<span style="color: blue;">"Server&nbsp;running&nbsp;at&nbsp;http://localhost:8080/"</span><span
                style="color: black;">);&nbsp; <br></span></span></li>
</ol></span></span><a target="_blank" rel="nofollow"
                      href="https://github.com/nomospace/nomospace.github.com/tree/master/lab/2011/url-unshorten">源代码@github</a><br><br>解析成功：<br>

    <div>
        <div>
            <blockquote><img alt="node.js下的短网址还原 - nomospace（挪墨） - Nomospace" style="margin:0 10px 0 0;"
                             src="/assets/images/3674655820958590231.png"><br>
            </blockquote>
            <br></div>
        &nbsp;解析失败：
        <blockquote>
            <div><img alt="node.js下的短网址还原 - nomospace（挪墨） - Nomospace" style="margin:0 10px 0 0;"
                      src="/assets/images/3678877945609246727.png"></div>
        </blockquote>
        &nbsp;<br></div>
    <div></div>
    推荐<a target="_blank" rel="nofollow" href="http://t.sina.com.cn/imk2">fengmk2</a>的<a target="_blank" rel="nofollow"
                                                                                        href="http://www.cnblogs.com/fengmk2/archive/2010/12/27/nodejs-urlexpand.html">缩址还原</a>一文，实现原理是通过httpclient递归请求短网址。<br><br>参考资料：<br><a
            target="_blank" rel="nofollow" href="http://www.imoldman.com/2011/05/30/build-your-simple-url-unshorter/">构建简易unshorter</a><br><a
            target="_blank" rel="nofollow"
            href="http://www.ruanyifeng.com/blog/2011/01/api_for_google_s_url_shortener.html">Google短网址的API</a><br><a
            target="_blank" rel="nofollow" href="http://www.searchenginejournal.com/how-to-unshorten-any-url/16662/9/">How
        to UNshorten Any URL</a><br><a target="_blank" rel="nofollow" href="http://grails.org/plugin/unshorten">Unshorten
        - URL Expander</a></div>
