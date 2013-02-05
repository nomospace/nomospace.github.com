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
        function transform(object) {
          for (var i in object) {
            if (!i) continue;

            var key;
            if (i.indexOf('@') != -1) {
              key = i.split('@').join('');
            } else if (i.indexOf(':') != -1) {
              key = i.split(':').join('');
            } else if (i.indexOf('$') != -1) {
              key = i.split('$').join('');
            }

            if (key && i) {
              if (!object[key] && object[i]) object[key] = object[i];
            }

            if ($.isPlainObject(object[i]) || $.isArray(object[i])) {
              transform(object[i]);
            }

          }
        }

        transform(books);

        // console.log(books);
        var template = Handlebars.compile(tpl);

        Handlebars.registerHelper('image', function() {
          var result = '';
          $.each(this.link, function(i, r) {
            if (r.rel == 'image') {
              result = r.href;
              return false;
            }
          });
          return result;
        });

        Handlebars.registerHelper('href', function() {
          var result = '';
          $.each(this.link, function(i, r) {
            if (r.rel == 'alternate') {
              result = r.href;
              return false;
            }
          });
          return result;
        });

        Handlebars.registerHelper('publisher', function() {
          var result = '';
          $.each(this.dbattribute, function(i, r) {
            if (r.name == 'publisher') {
              result = r.t;
              return false;
            }
          });
          return result;
        });

        Handlebars.registerHelper('price', function() {
          var result = '';
          $.each(this.dbattribute, function(i, r) {
            if (r.name == 'price') {
              result = r.t;
              return false;
            }
          });
          return result;
        });

        Handlebars.registerHelper('pubdate', function() {
          var result = '';
          $.each(this.dbattribute, function(i, r) {
            if (r.name == 'pubdate') {
              result = r.t;
              return false;
            }
          });
          return result;
        });

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