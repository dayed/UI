var $ = require('jquery'), Draggable = require('draggable');

var Slide = module.exports = function(opt) {
	this.options = $.extend({
		time: 1000,
		dom: null,
		cps: 1,
		noGap: false,
		easing: null,
		mode: 'horizontal',
		before: function(){},
		after: function(){}
	}, opt || {});

	this.init();
};

Slide.prototype = {
	init: function(){
		var self = this;
		self.index = 0;
		self.isRuning = false;
		self._start = 0;	//为了兼容日后的一个问题
		self.mode = Slide.getMode(self.options.mode);
		self.dom = $(self.options.dom);
		
		!/absolute|fixed/.test(self.dom.css('position')) && self.dom.css('position', 'relative');

		this.refresh();
		this.bindDrag();
	},

	refresh: function(){
		var self = this, opt = self.options, attr = Slide.DATA_CLONE;
		self.children = self.dom.children().filter(function(){
			return this.getAttribute(attr) == null;
		});

		if(opt.noGap){
			self.dom.children('[' +  attr + ']').remove();

			var $clone = self.children.clone().prependTo(self.dom).attr(attr, '');
			$clone.clone().appendTo(self.dom);

			self._start = self.children.length;
		}

		self.max = self.getMaxIndex();
		self.all = self.dom.children();
		self.dom.css(self.mode, self.getTargetValue(self.index));
	},

	bindDrag: function(){
		var x, y;

		new Draggable({
			dom: this.dom,
			start: function(x, y){

			},
			move: function(x, y){
				
			}
		});
	},

	to: function(index){
		var self = this;

		if(self.isRuning || self.index == index) return;

		if(!self.options.noGap){
			if(index < 0 || index > self.max) return;

			self.index = index;
			self.start();
		}else{
			self.index = index > self.max ? 0 : index < 0 ? self.max : index;
			self.start(index);
		}
	},

	start: function(index, callback){
		var self = this, opt = self.options, index = index || self.index, obj = {};

		obj[self.mode] = self.getTargetValue(index);

		self.isRuning = true;
		opt.before && opt.before.call(self);
		self.dom.animate(obj, opt.time, opt.easing, function(){
			if(index != self.index){
				self.dom.css(self.mode, self.getTargetValue(self.index));
			}
			
			self.isRuning = false;
			opt.after && opt.after.call(self);
		});
	},

	stop: function(){
		this.dom.stop();
		this.isRuning = false;
	},

	pause: function(){
		this.stop();
	},

	resume: function(){
		this.start(this.index);
	},

	toNext: function(){
		this.to(this.index + 1);
	},

	toPrev: function(){
		this.to(this.index - 1);
	},

	toFirst: function(){
		this.to(0);
	},

	toLast: function(){
		this.to(this.max);
	},

	isFirst: function(){
		return this.index == 0;
	},

	isLast: function(){
		return this.index == this.max;
	},

	getMaxIndex: function(){
		var self = this;
		return Math.ceil(self.children.length / self.options.cps) - 1;
	},

	getChildren: function(index){
		var self = this;
		return self.all.eq(self._start + index * self.options.cps);
	},

	getTargetValue: function(index){
		return -this.getChildren(index).position()[this.mode];
	}
};

$.extend(Slide, {
	DATA_CLONE: 'data-slide-clone',

	getMode: function(mode){
		return mode == 'horizontal' ? 'left' : 'top';
	}
});