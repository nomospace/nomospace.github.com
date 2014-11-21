---
layout: page

pageClass: page-type-post

scripts:
  - http://nomospace.disqus.com/embed.js

---

<div class="trace">/ <a href="/">昌里大金猪的空间</a> / {{ page.title }}</div>

<article>
	<h1><a href="{{ page.url }}">{{ page.title }}</a></h1>
	{% assign post = page %}
	{% include meta.tpl %}
	{{ content }}
	{% capture permaurl %}http://{{site.host}}{{ page.url }}{% endcapture %}
	<!--<p class="permalink">永久链接：<a href="{{ permaurl }}">{{ permaurl }}</a></p>-->
</article>
<div id="disqus_thread" class="comments"></div>
