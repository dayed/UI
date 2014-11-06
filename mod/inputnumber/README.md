InputNumber
================

兼容HTML4的
```html
<input type='number'/>
```组件

###使用
```html
<script>
require.async('inputnumber', function(InputNumber){
	new InputNumber({
		dom: '#num',
		max: 100,
		min:1,
		step:1
	});
});
</script>
```
