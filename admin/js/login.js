$(function() {
	var withtext = "input-text-withtext",
		eventFun = function() {
			var Mask = $(this).parent();
			if (this.value) {
				if (!Mask.hasClass(withtext)) {
					Mask.addClass(withtext)
				}
			} else {
				Mask.removeClass(withtext)
			}
		}
	$(".input-text").each(function(i,input){
		$(input).on("input", eventFun).on("propertychange", eventFun)
		eventFun.call(input)
	})
})