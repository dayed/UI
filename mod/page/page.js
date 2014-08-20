var $ = require('jquery');

var Page = module.exports = function(opt){
	this.options = $.extend({
		dom: '',
		pageIndex: 10,
		pageTotal: 20,
		navset:'word',
		callback: function(){
		}
	}, opt || {});

	this.init();
};

Page.prototype = {
	init: function(){
		this.dom = $(this.options.dom);
		this.createPage();
		this.bindEvent(this.options.callback);
	},

	createPage: function(pageTarget){
		var pre = this.options.pre || 0,
			last = this.options.last || this.options.pageIndex,
			pageTarget = pageTarget || 1,
			className =this.options.navset == 'word' ? '':' ui-arrow'; 
			select = '',
			iPageComponent ='<ul class="ui-page-control' + className 
				+ '"><li><a class="p_pre" href="javascript:;">'
				+ (!className ? '< 上一页' : '')
				+'</a></li><li class="page_list">';
						
		if(last!=0){
			for(;pre<last;pre++){
				select = (pageTarget-1) == pre ? ' selected"': "";
				iPageComponent += '<a class="p' + select + '" href="javascript:;" data-p='+(pre+1)
					+'>' + (pre+1) + '</a>';
			}
			iPageComponent += '</li><li><a class="p_next" href="javascript:;">'
				+(!className ? '下一页 >' : '')
				+'</a></li></ul>';
			this.dom.html(iPageComponent).show();
		}else{
			this.dom.hide();
		}
	},

	bindEvent: function(callback){
		var page = this;
		this.dom.delegate('a', 'click', function() {
			_this = $(this);
			var dir = _this.attr('class');
			var current = parseInt(_this.parents('.page_control').find('.selected').attr('data-p'));
			var doAjax = false,
				target,target_no;
			
			if(dir == 'p_pre'){
				if(current!=1) {
					doAjax = true;
					target = current-1;
				}
			}else if(dir == 'p_next'){
				if(current!=page.options.pageTotal){
					doAjax = true;	
					target = current+1;
				}
			}else{
				if(_this.text() != current){
					doAjax = true;	
					target = parseInt(_this.text());
				}
			}
			if(doAjax){
				callback();
				page.pageTo(target);
			}
		});
	},

	pageTo: function(pageTarget){
		var pageTotal = this.options.pageTotal,
			pageIndex = this.options.pageIndex;
		var times = Math.floor(pageTotal/pageIndex),
			more = pageTotal%pageIndex,
			offsetPre = Math.floor(pageIndex/2)+1,
			offsetLast = pageIndex - offsetPre,
			pre,last,
			select;
		if(pageTotal<=pageIndex){
			pre = 0;
			last = pageTotal;
		}else{
			if(pageTarget < offsetPre){
				pre = 0;
				last = pageIndex;
			}else if(pageTotal-pageTarget >= offsetLast){
				pre = pageTarget - offsetPre;
				last = pageTarget + offsetLast;
			}else{
				last = pageTotal;
				pre = pageTotal-pageIndex;
			}
		}
		this.options.pre = pre;
		this.options.last = last;
		this.createPage(pageTarget)
	}
};

return Page;