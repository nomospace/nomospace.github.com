---
layout: post
title: IE6 下的多类选择符
category: frontend
---
<div class="bct fc05 fc11 nbw-blog ztag js-fs2"><br>某天发现一个小bug：在IE6下，鼠标移过顶部导航，由于标签宽度被意外撑大，直接导致下边的次导航错位：<br>

    <div><img alt="2011年03月30日 - nomospace（挪墨） - Nomospace" style="margin: 0pt 10px 0pt 0pt;"
              src="/assets/images/887209126593989188.jpg"></div>
    <br>其他页面都正常，唯独每日专题这个页面有问题，经验告诉我应该是样式被覆盖了。<br><br>于是定位到对应样式，顶部导航模块的实现：<br>

    <div><img alt="2011年03月30日 - nomospace（挪墨） - Nomospace" style="margin: 0pt 10px 0pt 0pt;"
              src="/assets/images/624874448298966043.jpg"></div>
    &nbsp;<br>专题页面的实现：<br>

    <div><img alt="2011年03月30日 - nomospace（挪墨） - Nomospace" style="margin: 0pt 10px 0pt 0pt;"
              src="/assets/images/2590977160622779315.jpg"></div>
    &nbsp;<br>.此处的.js-hover是专为IE6而写的，通过js使a支持非a标签的hover，具体代码实现不是本文的重点故不赘述。<br><br>为简化模拟bug触发环境，在此我写了一个多类选择符测试页面：<br><span
            style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Helvetica; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; font-size: medium;"><span
            style="font-family: Monaco,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Consolas,'Courier New',monospace; font-size: 12px; line-height: 18px; text-align: left;"><ol
            start="1"
            style="font-size: 1em; line-height: 1.4em; margin: 0px 0px 1px; padding: 2px 0px; border: 1px solid rgb(209, 215, 220); list-style-type: decimal; background-color: rgb(255, 255, 255); color: rgb(43, 145, 175);">
        <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
            <span style="color: black;"><span style="color: black;">&lt;!DOCTYPE&nbsp;HTML</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&gt;</span><span style="color: black;">&nbsp;&nbsp;</span></span>
        </li>
        <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
            <span style="color: black;"><span style="color: rgb(0, 102, 153); font-weight: bold;">&lt;</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">html</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&gt;</span><span style="color: black;">&nbsp;&nbsp;</span></span>
        </li>
        <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
            <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;<span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&lt;</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">head</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&gt;</span><span style="color: black;">&nbsp;&nbsp;</span></span>
        </li>
        <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
            <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&lt;</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">title</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&gt;</span><span
                    style="color: black;">多类选择符测试</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&lt;/</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">title</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&gt;</span><span style="color: black;">&nbsp;&nbsp;</span></span>
        </li>
        <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
            <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&lt;</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">style</span><span
                    style="color: black;">&nbsp;</span><span style="color: red;">type</span><span style="color: black;">=</span><span
                    style="color: blue;">"text/css"</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&gt;</span><span style="color: black;">&nbsp;&nbsp;</span></span>
        </li>
        <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
            <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;body&nbsp;.link{display:block;width:100px;height:100px;background-color:black;}&nbsp;&nbsp;</span>
        </li>
        <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
            <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;body&nbsp;.content.link:hover{background-color:blue;}&nbsp;&nbsp;</span>
        </li>
        <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
            <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;body&nbsp;.link:hover{background-color:red;}&nbsp;&nbsp;</span>
        </li>
        <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
            <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&lt;/</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">style</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&gt;</span><span style="color: black;">&nbsp;&nbsp;</span></span>
        </li>
        <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
            <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;<span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&lt;/</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">head</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&gt;</span><span style="color: black;">&nbsp;&nbsp;</span></span>
        </li>
        <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
            <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;<span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&lt;</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">body</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&gt;</span><span style="color: black;">&nbsp;&nbsp;</span></span>
        </li>
        <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
            <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&lt;</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">div</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&gt;</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&lt;</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">a</span><span
                    style="color: black;">&nbsp;</span><span style="color: red;">href</span><span style="color: black;">=</span><span
                    style="color: blue;">"#"</span><span style="color: black;">&nbsp;</span><span style="color: red;">class</span><span
                    style="color: black;">=</span><span style="color: blue;">"content&nbsp;link"</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&gt;</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&lt;/</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">a</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&gt;</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&lt;/</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">div</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&gt;</span><span style="color: black;">&nbsp;&nbsp;</span></span>
        </li>
        <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
            <span style="color: black;">&nbsp;&nbsp;&nbsp;&nbsp;<span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&lt;/</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">body</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&gt;</span><span style="color: black;">&nbsp;&nbsp;</span></span>
        </li>
        <li style="font-size: 1em; margin: 0px 0px 0px 38px; padding: 0px 0px 0px 10px; border-left: 1px solid rgb(209, 215, 220); background-color: rgb(250, 250, 250); line-height: 18px;">
            <span style="color: black;"><span style="color: rgb(0, 102, 153); font-weight: bold;">&lt;/</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">html</span><span
                    style="color: rgb(0, 102, 153); font-weight: bold;">&gt;</span><span
                    style="color: black;">&nbsp; <br></span></span></li>
    </ol></span></span><br>在IE6下，鼠标移过a元素后背景色为red，而在其他浏览器中则为blue。这是为什么呢？<br><br>先看一下官方是怎么说的：<br><span
            style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Helvetica; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;"><span
            style="font-family: sans-serif;"><p style="background-color: rgb(255, 255, 204);">A selector's specificity
        is calculated as follows:</p><ul style="background-color: rgb(255, 255, 204);">
        <li>count 1 if the declaration is from is a 'style' attribute rather than a rule with a selector, 0 otherwise (=
            a) (In HTML, values of an element's "style" attribute are style sheet rules. These rules have no selectors,
            so a=1, b=0, c=0, and d=0.)
        </li>
        <li>count the number of ID attributes in the selector (= b)</li>
        <li>count the number of other attributes and pseudo-classes in the selector (= c)</li>
        <li>count the number of element names and pseudo-elements in the selector (= d)</li>
    </ul><p style="background-color: rgb(255, 255, 204);">The specificity is based only on the form of the selector. In
        particular, a selector of the form "[id=p33]" is counted as an attribute selector (a=0, b=0, c=1, d=0), even if
        the id attribute is defined as an "ID" in the source document's DTD.</p><p
            style="background-color: rgb(255, 255, 204);">Concatenating the four numbers a-b-c-d (in a number system
        with a large base) gives the specificity.</p><div style="color: maroon; background-color: rgb(255, 255, 204);">
        <p>Some examples:</p>
        <pre style="font-family: monospace; margin-left: 2em; font-size: 11px;"> *             {}  /* a=0 b=0 c=0 d=0 -&gt; specificity = 0,0,0,0 */<br> li            {}  /* a=0 b=0 c=0 d=1 -&gt; specificity = 0,0,0,1 */<br> li:first-line {}  /* a=0 b=0 c=0 d=2 -&gt; specificity = 0,0,0,2 */<br> ul li         {}  /* a=0 b=0 c=0 d=2 -&gt; specificity = 0,0,0,2 */<br> ul ol+li      {}  /* a=0 b=0 c=0 d=3 -&gt; specificity = 0,0,0,3 */<br> h1 + *[rel=up]{}  /* a=0 b=0 c=1 d=1 -&gt; specificity = 0,0,1,1 */<br> ul ol li.red  {}  /* a=0 b=0 c=1 d=3 -&gt; specificity = 0,0,1,3 */<br> li.red.level  {}  /* a=0 b=0 c=2 d=1 -&gt; specificity = 0,0,2,1 */<br> #x34y         {}  /* a=0 b=1 c=0 d=0 -&gt; specificity = 0,1,0,0 */<br> style=""          /* a=1 b=0 c=0 d=0 -&gt; specificity = 1,0,0,0 */<br></pre>
    </div><div style="color: maroon;">
        <pre style="font-family: monospace; margin-left: 2em; font-size: 11px; background-color: rgb(255, 255, 204);">&lt;HEAD&gt;<br>&lt;STYLE type="text/css"&gt;<br>  #x97z { color: red }<br>&lt;/STYLE&gt;<br>&lt;/HEAD&gt;<br>&lt;BODY&gt;<br>&lt;P ID=x97z style="color: green"&gt;<br>&lt;/BODY&gt;<br></pre>
        <p style="background-color: rgb(255, 255, 204);">In the above example, the color of the P element would be
            green. The declaration in the "style" attribute will override the one in the STYLE element because of
            cascading rule 3, since it has a higher specificity.</p>

        <p><font color="#000000">来源出自</font><a target="_blank" rel="nofollow"
                                               href="http://www.w3.org/TR/CSS21/cascade.html#specificity">http://www.w3.org/TR/CSS21/cascade.html#specificity</a>
        </p>

        <p><span
                style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Helvetica; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;"><span
                style="font-family: sans-serif;">上文大致是说，css选择符有个权重，比如0,0,0,0。style标签的内联样式a=1，ID选择符b=1，class选择符c=1，标签选择符d=1等等，具体可以参考此文</span></span><span
                style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Helvetica; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;"><span
                style="font-family: sans-serif;"></span></span><a target="_blank" rel="nofollow"
                                                                  href="http://www.smashingmagazine.com/2007/07/27/css-specificity-things-you-should-know/">CSS
            Specificity: Things You Should Know</a><a target="_blank" rel="nofollow"
                                                      href="http://www.obird.net/web-standards/%E5%A6%82%E4%BD%95%E7%90%86%E8%A7%A3css-specificity/">(如何理解Css
            Specificity)</a></p>

        <p><font color="#000000">再来看看之前的测试页面，a元素的specificity</font><span style="color: black;"><br></span></p>
        <blockquote>
            <ol>
                <li><span style="color: black;">body&nbsp;.link{display:block;width:100px;height:100px;background-color:black;}&nbsp; </span><span
                        style="color: black;">--&gt;0,0,1,0<br></span></li>
                <li><span style="color: black;">body&nbsp;.content.link:hover{background-color:blue;}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; --&gt;</span><span
                        style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Helvetica; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;"><span
                        style="font-family: sans-serif;"><span style="color: black;">0,0,2,2</span></span></span></li>
                <li><span style="color: black;">body&nbsp;.link:hover{background-color:red;}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span
                        style="color: black;">--&gt;</span><span
                        style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Helvetica; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;"><span
                        style="font-family: sans-serif;"><span style="color: black;">0,0,1,2</span></span></span><span
                        style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Helvetica; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;"><span
                        style="font-family: sans-serif;"></span></span></li>
            </ol>
        </blockquote>
        <p><span
                style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Helvetica; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;"><span
                style="font-family: sans-serif;"> </span></span></p>

        <p><span
                style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Helvetica; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;"><span
                style="font-family: sans-serif;"><font
                color="#000000">照理说，第二条的权重最大，为什么IE6仍旧显示第三条的样式呢。其实IE6不支持.a.b的css写法</font>（未找到出处），后一个类名会覆盖前一个类名，也就是说，.a.b在IE6上实际会被解析成.b，于是，第二条样式在IE6下实际为body .link:hover，与第三条一致了。后者覆盖前者，于是bug就出现了。</span></span>
        </p>

        <p><br><span
                style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Helvetica; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;"><span
                style="font-family: sans-serif;"></span></span></p>

        <p><span
                style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Helvetica; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;"><span
                style="font-family: sans-serif;">参考资料：</span></span></p>

        <p><a target="_blank" rel="nofollow"
              href="http://www.smashingmagazine.com/2007/07/27/css-specificity-things-you-should-know/">CSS Specificity:
            Things You Should Know</a></p>

        <p><a target="_blank" rel="nofollow"
              href="http://www.obird.net/web-standards/%E5%A6%82%E4%BD%95%E7%90%86%E8%A7%A3css-specificity/">如何理解Css
            Specificity</a></p>

        <p><a target="_blank" rel="nofollow" href="http://www.cssass.com/blog/index.php/2009/73.html">CSS多类选择符测试</a></p>

        <p><a target="_blank" rel="nofollow" href="http://www.cssass.com/blog/index.php/2009/73.html"><span
                style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Helvetica; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;"><span
                style="font-family: sans-serif;"></span></span></a><a rel="nofollow"
                                                                      href="http://www.w3.org/TR/CSS21/cascade.html#specificity"><span
                style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Helvetica; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;"><span
                style="font-family: sans-serif;"></span></span></a><a target="_blank" rel="nofollow"
                                                                      href="http://www.w3.org/TR/CSS21/cascade.html#specificity">http://www.w3.org/TR/CSS21/cascade.html#specificity</a>
        </p></div></span></span></div>

