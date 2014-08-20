Mask
===============

##简介
分页组件


##使用
```js
var page = new Page({
 	dom: '#divContent',//外层dom元素
	pageIndex: 10,//显示页数总数
	pageTotal: 20,//实际页数总数
	navset:'word',//上一页，下一页选项，文字（'word'）或箭头('arrow')
	callback: function(){},//回调函数
});
```


##API
* init()

  初始化

* createPage()

  生成分页

* bindEvent()

  绑定事件

* pageTo()

  切换分页
