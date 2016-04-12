# 弹窗组件: 常用的信息框提示

## 用法：dialog(type, msg, icon)
+ {[string]} type: alert|confirm|load|prompt 	弹窗类型
+ {[string]} msg: 信息框内容
+ {[string]} icon: success|warn|error|inquiry 	图标


### 使用示例
```javascript
// 确定事件
function ok() {
    console.log('click ok button');
}
// 取消事件
function cancel() {
    console.log('click cancel button');
}
var dg = dialog('confirm', '我是信息框内容', 'inquiry')
	.on('ok', ok)
	.on('cancel', cancel);
```

+ on加入回调函数，ok点击确定时触发，cancel点击取消时触发;
+ un则是对已绑定的事件进行解绑，还是上面的例子


```javascript
// 解绑确定，取消按钮点击事件
dg.un('ok', ok).un('cancel', cancel);
```

未完待补充中