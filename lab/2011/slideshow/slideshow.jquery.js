/**
 * 简易图片slideshow
 * @version 0.1
 * @author	nomospace(jinlu_hz@163.com)
 * @depends jQuery 1.4
 */
(function($){
    $.SimpleSlideShowModule = function(){
        this.__currentIndex = 0;					//	默认已选择图片索引
        this.__switchTime = 3000; 					//	图片切换时间
        this.__slideData = slideData;
        this.__leftItems = $('#slider_left li'); 	//	左侧大图父节点数组
        this.__leftImages = $('#slider_left img'); //	左侧大图节点数组
        this.__rightItems = $('#slider_right li'); //	右侧缩略图父节点数组
        this.__mainCon = $('#slider_con ol');		//	两侧图片各自的容器对象
    };
    var __proModule = $.SimpleSlideShowModule.prototype;
	/**
	 * 显示模块
	 * @return {Void}
	 */
    __proModule._$show = function(){
        this.__rightItems.each(function(_index, _item){
            $.event.add(_item, 'mouseover', this.__onPlayStop.bind(this, _index));
        }.bind(this));
        this.__mainCon.bind('mouseout', this.__onPlayStart.bind(this, this.__currentIndex));
        this.__onPlayStart(0);
    };
	/**
	 * 停止播放
	 * @param {Number} _index	当前图片索引
	 * @return {Void}
	 */
	__proModule.__onPlayStop = function(_index){
		this.__tinv && clearInterval(this.__tinv);
		this.__onShow(_index);
		for (var i = 0; i < 5; i++) 
			this.__rightItems[i].className = i == _index ? 'on' : '';
		this.__currentIndex = _index;
	};
	/**
	 * 开始播放
	 * @param  {Number} _index 	当前图片索引
	 * @return {Void}
	 */
    __proModule.__onPlayStart = function(_index){
        this.__tinv && clearInterval(this.__tinv);
        var _index = _index || this.__currentIndex;
//        this.__onShow(_index);
        this.__tinv = setInterval(function(){
            this.__onShow(this.__currentIndex);
            this.__currentIndex == 4 ? this.__currentIndex = 0 : this.__currentIndex++;
        }.bind(this), this.__switchTime);
    };
	/**
	 * 显示当前图片索引的大图
	 * @param {Number} _index	特定项
	 */
    __proModule.__onShow = function(_index){
        if (!this.__leftImages[_index].src) 
            this.__leftImages[_index].src = this.__slideData[_index].bigurl;
        for (var i = 0; i < 5; i++) {
            this.__leftItems[i].style.display = i == _index ? '' : 'none';
            this.__rightItems[i].className = i == _index ? 'on' : '';
        }
    };
	/**
	 * 主模块类入口
	 */
	new $.SimpleSlideShowModule()._$show({});
//	$('#slider_con').SimpleSlideShowModule();
})(jQuery);