(function(){
var namespace = 'DOUBAN';
if (!window[namespace]) window[namespace] = {}
var api_obj = window[namespace]; //a Temp Reference

var parseElement = function(source, target, tagName, targetTagName) {
    if (targetTagName==null) targetTagName = tagName;
    if (source[tagName]) target[targetTagName] = source[tagName].$t
}
var parseRating = function(source, target) {
    if (!source['gd:rating']) return;
    target.rating = {
        min:parseInt(source['gd:rating']['@min']),
        numRaters:parseInt(source['gd:rating']['@numRaters']),
        average:parseFloat(source['gd:rating']['@average']),
        max:parseInt(source['gd:rating']['@max']),
        value:parseInt(source['gd:rating']['@value'])
    };
}
var parseAuthor = function(source, target) {
    target.author={}
    if (!source.author || !source.author[0]) return;
    parseElement(source.author[0], target.author, 'name');
    parseLinks(source.author[0], target.author);
}
var parseLinks = function(source, target) {
    target.link = {};
    if (source.link)
        for (var i=0; i<source.link.length; ++i)
            target.link[source.link[i]['@rel']] = source.link[i]['@href'];
}
var parseId = function(source, target) {
    if (source.id) {
        target.id=source.id.$t;
        var tmp = target.id.split('/').slice(-1);
        if (tmp.length > 0) target.nid = tmp[0]
    }
}
var parseOpenSearch = function(source, target){
    parseElement(source, target, 'opensearch:startIndex', 'startIndex');
    target.startIndex = parseInt(target.startIndex)
    parseElement(source, target, 'opensearch:itemPerPage', 'itemPerPage');
    target.itemPerPage = parseInt(target.itemPerPage)
    parseElement(source, target, 'opensearch:totalResults', 'totalResults');
    target.totalResults = parseInt(target.totalResults)
}
var parseFeed = function(results, feed, entryParser){
    parseOpenSearch(results, feed)
    parseElement(results, feed, 'title')
    feed.entries = []
    for (var i=0; i<results.entry.length; ++i)
        feed.entries.push(entryParser(results.entry[i]));
}

api_obj.parseUser = function(re) {
    var user = {};
    parseId(re, user)
    parseElement(re, user, 'title');
    if (user.title) user.name = user.title
    parseElement(re, user, 'content');
    parseElement(re, user, 'db:location', 'location');
    parseLinks(re, user)
    return user;
}
api_obj.parseUsers = function(results){
    var feed = {};
    parseFeed(results, feed, api_obj.parseUser)
    return feed;
}

api_obj.parseSubject = function(re) {
    var subject = {};
    parseId(re, subject)
    parseAuthor(re, subject)
    parseElement(re, subject, 'title');
    parseElement(re, subject, 'summary');
    parseRating(re, subject);
    parseLinks(re, subject)
    if (re.category) subject.category  = re.category['@term'].match('2007#([a-z]+)')[1];
    subject.tag = [];
    if (re['db:tag'])
        for (var j=0; j<re['db:tag'].length; ++j)
            subject.tag.push({count:parseInt(re['db:tag'][j]['@count']), name:re['db:tag'][j]['@name']});
    subject.attribute = {};
    if (re['db:attribute'])
        for (var j=0; j<re['db:attribute'].length; ++j) {
            if (subject.attribute[re['db:attribute'][j]['@name']] == null)
                subject.attribute[re['db:attribute'][j]['@name']] = [];
            subject.attribute[re['db:attribute'][j]['@name']].push(re['db:attribute'][j]['$t']);
            if (re['db:attribute'][j]['@name'] == 'aka' && re['db:attribute'][j]['@lang'] == 'zh_CN')
                subject.title_cn = re['db:attribute'][j]['$t']
        }
    return subject;
}
api_obj.parseSubjects = function(results){
    var feed = {};
    parseFeed(results, feed, api_obj.parseSubject)
    return feed;
}

api_obj.parseReview = function(re) {
    var review = {};
    parseId(re, review)
    parseAuthor(re, review)
    parseElement(re, review, 'title');
    parseElement(re, review, 'summary');
    parseElement(re, review, 'published');
    parseElement(re, review, 'updated')
    parseRating(re, review);
    parseLinks(re, review)
    if (re['db:subject']) review.subject = api_obj.parseSubject(re['db:subject'])
    return review;
}
api_obj.parseReviews = function(results){
    var feed = {}
    parseAuthor(results, feed)
    if (results['db:subject']) feed.subject = api_obj.parseSubject(results['db:subject'])
    parseFeed(results, feed, api_obj.parseReview)
    return feed;
}

api_obj.parseCollection = function(re) {
    var collection = {};
    parseId(re, collection)
    parseElement(re, collection, 'title');
    parseElement(re, collection, 'summary');
    parseElement(re, collection, 'updated')
    parseElement(re, collection, 'db:status', 'status')
    parseRating(re, collection);
    parseLinks(re, collection)
    collection.tag = [];
    if (re['db:tag'])
        for (var j=0; j<re['db:tag'].length; ++j)
            collection.tag.push({name:re['db:tag'][j]['@name']});
    if (re['db:subject']) collection.subject = api_obj.parseSubject(re['db:subject'])
    return collection;
}
api_obj.parseMultiCollection = function(results) {
    var feed = {}
    parseAuthor(results, feed)
    parseFeed(results, feed, api_obj.parseCollection)
    return feed;
}

api_obj.parseTag = function(re){
    var tag = {};
    parseElement(re, tag, 'id');
    if (tag.title) tag.name = tag.title
    parseElement(re, tag, 'title');
    parseElement(re, tag, 'count')
    return tag;
}
api_obj.parseTags = function(results){
    var feed = {}
    parseFeed(results, feed, api_obj.parseTag)
    return feed
}
})()