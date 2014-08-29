var $ = require('jquery');

function PlaceHolder(opt){
	this.options = $.extend({
		dom: null,
		text: ''
	}, opt || {});

	this.init();
}

PlaceHolder.prototype = {
	init: function(){
		var $dom = $(this.options.dom);

		if(PlaceHolder.isSupport){
			if(this.options.text){
				$dom.attr('placeholder', this.options.text);
			}
		}else{
			if(!/fixed|absolute/.test($dom.parent().css('position'))){
				$dom.parent().css('position', 'relative');
			}

			var $input = this.placeholder = $dom.clone().attr({
				type: 'text',
				name: '',
				placeholder: '',
				id: ''
			}).css({
				top: $dom.position().top,
				left: $dom.position().left
			}).val(this.options.text || $dom.attr('placeholder')).insertAfter($dom).addClass('ui-placeholder');

			$input.click(function(){
				$input.hide();
				$dom.focus();
			});

			$dom.blur(function(){
				this.value == '' && $input.show();
			}).blur().attr('placeholder', '');
		}
	}
};

PlaceHolder.isSupport = 'placeholder' in document.createElement('input');

module.exports = PlaceHolder;