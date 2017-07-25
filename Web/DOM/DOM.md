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

# 样式
## 访问元素的样式
任何支持style特性的HTML元素在JavaScript中都有一个对应的style属性, 这个style对象是CSSStyleDeclaration实例, 包含着通过HTML的style特性指定的任所有样式信息, 但不包含与外部样式表或嵌入样式表经层叠而来的样式.

## 计算的样式
* 非IE: document.defaultView.getComputedStyle(element, null)
* IE: element.currentStyle
* 无论在哪个浏览器中, 最重要的一条是要记住所有计算的样式都是只读的; 不能修改计算后样式对象中的CSS属性

## 元素大小
### 偏移值
* offsetHeight
* offsetWidth
* offsetLeft
* offsetTop

### 客户区大小
* clientWidht和clientHeight: 元素内容及其内边距所占据的空间大小

### 滚动大小
* scrollHeight
* scrollWidth
* scrollLeft
* scrollTop
