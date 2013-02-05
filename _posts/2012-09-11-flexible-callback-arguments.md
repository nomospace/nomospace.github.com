---
layout: post
title: 一种灵活的回调参数设计 [翻译]
category: javascript
---
本文地址：[http://nomospace.github.com/posts/flexible-callback-arguments.html]()  
原文地址：[http://caolanmcmahon.com/posts/flexible_callback_arguments/](http://caolanmcmahon.com/posts/flexible_callback_arguments/)  
原文作者：[Caolan McMahon](http://caolanmcmahon.com/)

---


在设计 [Nimble](http://caolan.github.com/nimble/) 时有个需求，需要合并 [Underscore.js](https://github.com/documentcloud/underscore) 与 [Async](https://github.com/caolan/async) 库的函数，使某些函数可以同步执行，同时也要支持异步执行。当然，为每个函数增加一个可选的回调函数很容易，困难的是修改函数迭代器 (iterator)。如下代码是一个同步函数：

	_.map([1,2,3], function (value) { ... });
	_.map([1,2,3], function (value, index) { ... });
	_.map([1,2,3], function (value, index, arr) { ... });

在此你可以指定所有参数，也可以只指定你需要的几个。然而在一个异步的循环中，我们需要传递一个回调函数。在 node.js 中通常最后一个参数是回调函数。所以问题来了，我们无法忽略中间的参数，因为此时总是需要最后一个参数（即回调函数）：

	_.map([1,2,3], function (value, index, arr, callback) { ... });

代码非常冗长，arr 和 index 参数大多数时候不会被用到。鉴于此，最初 Async 库的 map 函数是这么实现的：

	async.map([1,2,3], function (value, callback) { ... });

虽省略了一些繁杂的编码，但令人郁闷的是其他参数也无法使用了，也就是说 async api 与其他 synchronous api 的差异会更大。对此我的解决方案是在迭代访问参数时进行检查 (inspect the iterator's arity)。这个术语不是很好理解，直接看代码吧：

	var fn = f	unction (one, two, three) { ... };
	// fn.length == 3
	
	var fn = function (one) { ... };
	// fn.length == 1

这段代码能在各个浏览器下正常运行，并允许修改我们传入迭代器 (iterator) 的参数，首先定义一组参数，然后删除未被 async 迭代器 (iterator) 使用的元素，并在最后插入一个回调函数：
	
	var test = function (iterator) {
	    // the full list of available arguments
	    var args = ['value', 'index', 'arr'];
	
	    // remove the unused arguments
	    args = args.slice(0, iterator.length - 1);
	
	    // add the callback to the end
	    args.push('callback');
	
	    // run the iterator with the new arguments
	    return iterator.apply(this, args);
	};
	
	console.log('Example one:');
	
	test(function (value, index, arr, callback) {
	    console.log(value);
	    console.log(index);
	    console.log(arr);
	    console.log(callback);
	});
	
	console.log('Example two:');
	
	test(function (value, callback) {
	    console.log(value);
	    console.log(callback);
	});

执行结果如下：

	Example one:
	
	value
	index
	arr
	callback
	
	Example two:
	
	value
	callback

如上所示，执行结果已经和我们的预期保持一致了。如果不使用迭代而使用普通的 arguments 来访问：

	test(function () {
	    console.log(arguments[0]);
	    console.log(arguments[1]);
	    console.log(arguments[2]);
	    console.log(arguments[3]);
	});

输出结果是这样的：

	value
	index
	callback
	undefined

这并不是我们所预期的，那好，稍微重构一下 test 函数：

	var test = function (iterator) {
	    // the full list of available arguments
	    var args = ['value', 'index', 'arr'];
	
	    if (iterator.length) {
	        // remove the unused arguments
	        args = args.slice(0, iterator.length - 1);
	    }
	
	    // add the callback to the end
	    args.push('callback');
	
	    // run the iterator with the new arguments
	    return iterator.apply(this, args);
	};

输出结果：

	value
	index
	arr
	callback

至此，大功告成。如果你还想进一步实践，check out [Nimble](http://caolan.github.com/nimble/) 就可以了。如果遇到任何潜在问题，请随时提 [issue](https://github.com/caolan/nimble/issues)。
