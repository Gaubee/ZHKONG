$(function init_banner() {
	var config = {
		start_index: 0,
		timeout: 2000
	}
	var banners = $(".banner-item");
	banners._jq_cache = [];
	var banner_nav = $("#banner-nav");
	banner_nav._jq_cache = [];
	banner_nav.active = function(i) {
		$.each(this._jq_cache, function(index, $banner_nav_item) {
			if (i === index) {
				$banner_nav_item.addClass("active");
			} else {
				$banner_nav_item.removeClass("active");
			}
		})
	};

	for (var i = banners.length, banner_nav_item; i > 0; i -= 1) {
		banner_nav_item = $('<li style="margin-left: -' + (9 + (2 * i - 1) * 10) + 'px; "></li>');
		banner_nav._jq_cache.push(banner_nav_item)
		banner_nav.append(banner_nav_item);
	}
	// banners.css({position:"absolute"});
	$.each(banner_nav._jq_cache, function(i, $banner_nav_item) {
		$banner_nav_item.on("click", function() {
			banners.addClass("tohidden").stop().animate({
				opacity: 0
			}, 200); //.hide(200);
			(banners._jq_cache[i] || (banners._jq_cache[i] = $(banners[i]))).removeClass("tohidden").stop().animate({
				opacity: 1
			}, 200);; //.show(200);
			banner_nav.active(i);
			autoPlay.index = i;
		}).on("mouseenter", function() {
			$banner_nav_item.addClass(".hover");
		}).on("mouseleave", function() {
			$banner_nav_item.removeClass(".hover");
		})
	});
	$("#banner").on("mouseenter", function() {
		autoPlay(false);
	}).on("mouseleave", function() {
		autoPlay(true);
	});
	function autoPlay(play) {
		if (play) {
			clearInterval(autoPlay.time);
			autoPlay.time = setInterval(function() {
				banner_nav._jq_cache[(++autoPlay.index)%banner_nav._jq_cache.length].click();
			}, config.timeout);
		} else {
			clearInterval(autoPlay.time);
		}
	};
	autoPlay.index = 0;

	banner_nav._jq_cache[config.start_index].click();
	autoPlay(true);
});