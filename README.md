# 弹窗组件: 常用的信息框提示


### `alert`提示框
Dialog.alert(msg, icon)

### `confirm`提示框
Dialog.confirm(msg, icon)

### `load`加载页面
Dialog.load(url, title)

### `prompt`浮动提示
Dialog.prompt(msg)

### `loading`加载中
Dialog.loading()
Dialog.loading('off')


alert和confirm的区别：
+ alert只有一个取消按钮
+ confirm即有确定又有取消按钮


### confirm的使用
```javascript
// 确定事件
function ok() {
    console.log('click ok button');
}
// 取消事件
function cancel() {
    console.log('click cancel button');
}

var dialog= Dialog.confirm('我是信息框内容', 'inquiry')
	.on('ok', ok)
	.on('cancel', cancel);
```

+ on添加类型事件
+ un则是对on绑定的事件进行解除绑定

```javascript
// 解绑
dialog.un('ok', ok)
	.un('cancel', cancel);
```

