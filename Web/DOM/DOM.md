# 节点操作
* appendChild()
* insertBefore()
* replaceChild()
* removeChild()
* cloneNode(true/false): 不会复制添加到DOM节点中的JavaScript属性

# Document
* 通过将每个页面的`document.domain`设置为相同的值, 这些页面就可以互相访问对方包含的JavaScript对象
* document.getElementById()
* document.getElementsByTagName()
* document.getElementsByName()

# Element
## 特性
* getAttribute()
* setAttribute()
* removeAttribute()

# Text
* 如果在一个包含两个或多个文本节点的父元素上调用`normalize()`方法, 则会将所有文本节点合并成一个节点, 结果节点的nodeValue等于将合并前每个文本节点的nodeValue值拼接起来的值.

# DocumentFragment
* 使用文档片段可以优化批量插入元素的性能

# DOM扩展
## 选择符
* querySelector()
* querySelectorAll()

## 元素遍历
因为对于元素间的空格, IE9及之前不会反悔文本节点, 而其他所有浏览器都会返回文本节点, 导致childNodes和firstChild等属性行为不一致
* childElementCount
* firstElementChild
* lastElementChild
* previousElementSibling
* nextElementSibing

## HTML5
* getElementsByClassName()
* classList: add(), contains(), remove(), toggle()
* activeElement

### HTMLDocument
* document.readyState: loading/complete
* 兼容模式: document.compatMode = 'CSS1Compat/BackCompat'
* document.head: 与document.body类似

### 自定义数据属性
可以为元素添加非标准的属性, 要添加前缀`data-`
* dataset
* innerHTML: 为innerHTML设置HTML字符串后, 浏览器会将这个字符串解析为相应的DOM树. 因此设置了innerHTML之后, 再从中读取HTML字符串, 会得到与设置时不一样的结果, 原因在于返回的字符串是根据原始HTML字符串创建的DOM树经过序列化之后的结果

### 其他
* scrollIntoView()

### 专有扩展
* 强制IE浏览器以某种模式渲染页面
```html
<meta http-equiv="X-UA-Compatible" content="ie=ieVersion">
```