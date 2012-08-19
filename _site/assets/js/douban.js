$(function() {
	var $body = $('body'),
		pageName = $body.data('name');

	if (pageName === 'douban') {
		// http://www.douban.com/js/api.js?v=2
		// http://developers.douban.com/
		// http://book.douban.com/mine
		DOUBAN.apikey = '066fe3d230272c0e134fab769075842a';
		DOUBAN.getUserCollection({
			uid: 'nomospace',
			cat: 'book',
			maxresults: '100',
			callback: function(books) {
				console.log(books);
			}
		});
	}
});