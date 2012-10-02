$(function() {
  $('pre').each(function() {
    hljs && hljs.highlightBlock(this);
  });
  // weibo code
  var search = location.search,
    code = 'code';
  if (search && search.slice(1, [code].length) == code) {
    location.replace('http://localhost:3002/api' + code + '/' + search.slice(1));
  }
});
