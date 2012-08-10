<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta http-equiv="expires" content="-1" />
<meta http-equiv="cache-control" content="no-cache" />
<meta name="author" content="nomospace" />
<meta name="keywords" content="{{ page.tags | join: ',' }}" />
<title>挪墨的空间{% if page.title %} / {{ page.title }}{% endif %}</title>
<link href="http://nomospace.github.com/feed.xml" rel="alternate" title="挪墨的空间" type="application/atom+xml" />
<link rel="stylesheet" type="text/css" href="/assets/css/site.css" />
{% for style in page.styles %}<link rel="stylesheet" type="text/css" href="{{ style }}" />
{% endfor %}
<!--[if IE]>
<script src="/assets/js/html5.js"></script>
<![endif]-->
</head>

<body class="{{ page.pageClass }}">

<div class="main">
	{{ content }}

	<footer>
		<p>&copy; Since 2012 <a href="http://github.com/nomospace" target="_blank">github.com/nomospace</a></p>
	</footer>
</div>

<aside>
	<h2><a href="/">挪墨的空间</a><a href="/feed.xml" class="feed-link" title="RSS订阅"><img src="http://blog.rexsong.com/wp-content/themes/rexsong/icon_feed.gif" alt="RSS feed" /></a></h2>

	<nav class="block">
		<ul>
		{% for category in site.custom.categories %}<li class="{{ category.name }}"><a href="/category/{{ category.name }}/">{{ category.title }}</a></li>
		{% endfor %}
		</ul>
	</nav>

	<form action="/search/" class="block block-search">
		<h3>搜索</h3>
		<p><input type="search" name="q" placeholder="输入关键词按回车搜索" /></p>
	</form>

	<div class="block block-about">
		<h3>关于</h3>
		<figure>
			<img src="http://www.gravatar.com/avatar/d6e8639fcaea0c7c0fab106033f05de0?s=80" />
			<figcaption><strong>nomospace</strong></figcaption>
		</figure>
	</div>

	<a href="http://github.com/nomospace" class="forkme"><img src="/assets/images/forkmeongithub.png" alt="Fork me on GitHub"></a>

    <div class="block block-license">
        <h3>版权申明</h3>
        <p><a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/2.5/cn/" target="_blank" class="hide-target-icon" title="Copyright declaration of site content"><img alt="知识共享许可协议" src="http://i.creativecommons.org/l/by-nc-nd/2.5/cn/88x31.png" /></a></p>
    </div>

	<div class="block block-thank">
        <h3>Powered by</h3>
        <p>
            <a href="http://disqus.com/" target="_blank">Disqus</a>,
            <a href="http://www.google.com/cse/" target="_blank">Google Custom Search</a>,
            <a href="https://github.com/" target="_blank">GitHub</a>,
            <a href="http://en.gravatar.com/" target="_blank">Gravatar</a>,
            <a href="http://softwaremaniacs.org/soft/highlight/en/">HighlightJS</a>,
            <a href="https://github.com/mojombo/jekyll" target="_blank">jekyll</a>,
            <a href="https://github.com/mytharcher/SimpleGray" target="_blank">SimpleGray</a>
        </p>
    </div>

</aside>

<script src="/assets/js/site.js"></script>
{% for script in page.scripts %}<script src="{{ script }}"></script>
{% endfor %}
<script>
    var _errs=["4fcf6a84a57ce4043f00032a"];(function(a,b){a.onerror=function(){_errs.push(arguments)};
    var d=function(){var a=b.createElement("script"),c=b.getElementsByTagName("script")[0];
    a.src="//d15qhc0lu1ghnk.cloudfront.net/beacon.js";a.async=!0;
    c.parentNode.insertBefore(a,c)};a.addEventListener?a.addEventListener("load",d,!1):
    a.attachEvent("onload",d)})(window,document);
</script>
<script>
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-31926992-1']);
  _gaq.push(['_trackPageview']);
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
</body>
</html>
