<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta name="author" content="nomospace" />
<meta name="keywords" content="{{ page.tags | join: ',' }}" />
<title>挪墨的空间{% if page.title %} / {{ page.title }}{% endif %}</title>
<link href="http://nomospace.github.com/feed.xml" rel="alternate" title="挪墨的空间" type="application/atom+xml" />
<link rel="stylesheet" type="text/css" href="/assets/css/site.css" />
{% for style in page.styles %}<link rel="stylesheet" type="text/css" href="{{ style }}" />
{% endfor %}
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
			<img src="http://en.gravatar.com/userimage/22832302/e8daaf8d9b2036fb9f46fcc694f617de.jpeg" />
			<figcaption><strong>nomospace</strong></figcaption>
		</figure>
		<p></p>
	</div>

	<a href="http://github.com/nomospace"><img style="position: absolute; top: 0; right: 0; border: 0;" src="/assets/images/forkmeongithub.png" alt="Fork me on GitHub"></a>
</aside>
{% for script in page.scripts %}<script src="{{ script }}"></script>
{% endfor %}

</body>
</html>
