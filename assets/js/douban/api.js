/* Douban API Javascript Library 0.2

Copyright (2007) Douban Inc.  All rights reserved.

Some code is copied from jQuery 1.2.1 ( by John Resig ) which is licensed under the MIT license.
*/

(function(){
    var isFunction = function( fn ) {
        return !!fn && typeof fn != "string" && !fn.nodeName &&
            fn.constructor != Array && /function/i.test( fn + "" );
    }
    var buildURL = function(url, params){
        var tmp = url.split("?");
        var uri = tmp[0];
        var ps = null;
        if (tmp.length > 1) ps = tmp[1].split("&");
        var pnames = uri.match(/{\w+}/g);
        if (pnames != null) {
            for (var i=0; i<pnames.length; ++i){
                var pn = pnames[i];
                var ppn = pnames[i].match(/{(\w+)}/)[1];
                if (!params[ppn]) return null;
                else uri = uri.replace(pn, params[ppn]);
            }
        }
        if (!ps) return uri;
        var re_ps = [];
        for (var i=0; i<ps.length; ++i) {
            var tmp = ps[i].match(/{(\w+)}/);
            if (tmp==null) re_ps.push(ps[i]);
            else {
                var pn = tmp[0];
                var ppn = tmp[1];
                if (params[ppn]) re_ps.push(encodeURI(ps[i].replace(pn, params[ppn])));
            }
        }
        if (re_ps.length>0) return [uri, re_ps.join("&")].join("?");
        else return uri;
    }
    var jsc = (new Date).getTime();
    var buildTempFunction = function(cb){
        var jsonp = "jsonp" + jsc++;
        window[ jsonp ] = function(data){
            cb(data);
            // Garbage collect
            window[ jsonp ] = undefined;
            try{ delete window[ jsonp ]; } catch(e){}
        };
        return jsonp;
    }
    var sendScriptRequest = function(url){
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.src = url;
        script.charset = 'utf-8';
        head.appendChild(script);
    }
    var formatParams = function(params) {
        if (isFunction(params.callback)) params.callback = buildTempFunction(params.callback);
        if (!params.apikey) params.apikey = api_obj.apikey;
        return params;
    }
    var send = function(url, params){
        var url = buildURL(url, params);
        if (url!=null) sendScriptRequest(url);
    }

    var apikey = '';
    var namespace = 'DOUBAN';
    var obj = {
        apikey:apikey
    };
    var baseUri = 'http://api.douban.com/';
    var pp = 'start-index={startindex}&max-results={maxresults}';
    var sp = 'q={keyword}&'+pp;
    var pubp = 'published-min={publishedmin}&published-max={publishedmax}';
    var updp = 'updated-min={updatedmin}&updated-max={updatedmax}';
    var pup = pubp+'&'+updp;
    var ratp = 'rating-min={ratingmin}&rating-max={ratingmax}';
    var cp = 'apikey={apikey}&alt=xd&callback={callback}';
    var apis = {
        getUser: {url:baseUri+'people/{id}'},
        searchUsers: {url:baseUri+'people?'+sp},
        getBook: {url:baseUri+'book/subject/{id}'},
        getISBNBook: {url:baseUri+'book/subject/isbn/{isbn}'},
        searchBooks: {url:baseUri+'book/subjects?tag={tag}&'+sp},
        getMovie: {url:baseUri+'movie/subject/{id}'},
        searchMovies: {url:baseUri+'movie/subjects?tag={tag}&'+sp},
        getMusic: {url:baseUri+'music/subject/{id}'},
        searchMusic: {url:baseUri+'music/subjects?tag={tag}&'+sp},
        getReview: {url:baseUri+'review/{id}'},
        getUserReviews: {url:baseUri+'people/{uid}/reviews?'+pup+'&'+pp},
        getBookReviews: {url:baseUri+'book/subject/{sid}/reviews?'+pup+'&'+pp},
        getISBNBookReviews: {url:baseUri+'book/subject/isbn/{isbn}/reviews?'+pup+'&'+pp},
        getMovieReviews: {url:baseUri+'movie/subject/{sid}/reviews?'+pup+'&'+pp},
        getMusicReviews: {url:baseUri+'music/subject/{sid}/reviews?'+pup+'&'+pp},
        getCollection: {url:baseUri+'people/{uid}/collection/{cid}'},
        getUserCollection: {url:baseUri+'people/{uid}/collection?cat={cat}&tag={tag}&status={status}&'+updp+'&'+ratp+'&'+pp},
        getBookTags: {url:baseUri+'book/subject/{id}/tags?'+pp},
        getISBNBookTags: {url:baseUri+'book/subject/isbn/{isbn}/tags?'+pp},
        getMovieTags: {url:baseUri+'movie/subject/{id}/tags?'+pp},
        getMusicTags: {url:baseUri+'music/subject/{id}/tags?'+pp},
        getUserBookTags: {url:baseUri+'people/{id}/tags?cat=book&'+pp},
        getUserMovieTags: {url:baseUri+'people/{id}/tags?cat=movie&'+pp},
        getUserMusicTags: {url:baseUri+'people/{id}/tags?cat=music&'+pp}
    };
    for (var name in apis)
        if (apis[name].url.search(/\?/)!=-1) apis[name].url = apis[name].url + '&' + cp;
        else apis[name].url = apis[name].url + '?' + cp;

    //Set Global Values
    if (!window[namespace]) window[namespace] = {}
    var api_obj = window[namespace]; //a Temp Reference
    for (var name in obj) api_obj[name] = obj[name];
    for (var name in apis)
        api_obj[name] = (function(url){
            return function(params){
                send(url, formatParams(params));
            };
        })(apis[name].url)
})()
