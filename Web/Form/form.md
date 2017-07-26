# 表单脚本
## 获取表单
* document.getElementById("")
* document.forms["name"]

### 防止重复提交表单
* 在第一次提交表单后就禁用提交按钮
* 利用onsubmit事件处理程序取消后续的表单提交操作

### autofocus
```html
<input type="text" autofocus>
```

### 共有的表单字段事件
* blur
* change: 在元素失去焦点且value值改变时触发
* focus

## 文本框脚本
### 取得选择地文本
* selectionStart和selectionEnd

## HTML5约束验证API
* required
* 其他输入类型: email, url...
* 数值范围: max, min, step...
* 输入模式: pattern(正则校验)
* checkValidity()
* novalidate(禁用验证)

## 选择框脚本
* 选择框的change事件与其他表单字段的change事件触发的条件不一样. 其他表单字段的change事件是在值被修改且焦点离开当前字段时触发, 而选择框的change事件只要选中了选项就会触发.