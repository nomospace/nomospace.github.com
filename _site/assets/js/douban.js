$(function() {
  var $body = $('body'),
    $books = $('#J_books'),
    pageName = $body.data('name');

  var tpl = $('#book_template').html();

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
        var template = Handlebars.compile(tpl);
        $books.html(template(books));

        // var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " + "{{kids.length}} kids:</p>" + "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
        // var template = Handlebars.compile(source);
        // var data = {
        //   "name": "Alan",
        //   "hometown": "Somewhere, TX",
        //   "kids": [{
        //     "name": "Jimmy",
        //     "age": "12"
        //   }, {
        //     "name": "Sally",
        //     "age": "4"
        //   }]
        // };
        // var result = template(data);
        // console.log(result);
      }
    });
  }
});