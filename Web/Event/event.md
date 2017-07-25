# 事件
## 事件流
* 事件冒泡(IE): 由最具体的元素开始接收(常用)
* 事件捕获流: 由不太具体的节点先接收

## 事件处理
* addEventListener()
* removeEventListener()
* 只有在事件处理程序执行期间, event对象才会存在; 一旦事件处理程序执行完成, event对象就会被销毁

## 事件类型
* UI事件
* 焦点事件: focus和blur不冒泡
* 滚轮事件
* 文本事件
* 键盘事件
* 合成事件
* 变动事件

### onload
* window
* Image
* script
* link

### 鼠标和滚轮
* click
* dblclick
* mousedown
* mouseenter
* mouseleave
* mousemove
* mouseout
* mouseover
* mouseup  
顺序  
1. mousedown
2. mouseup
3. click
4. mousedown
5. mouseup
6. click
7. dblclick  
页面上的所有元素都支持鼠标事件. 除了mouseenter和mouseleave, 所有鼠标事件都会冒泡, 也可以被取消, 而取消鼠标事件将会影响浏览器的默认行为.

### 鼠标位置
* clientX 和 clientY
* pageX 和 pageY
* screenX 和 screenY
* 没有滚动条情况下, client和page相等

### DOMContentLoaded事件
DOMContentLoaded事件在形成完整的DOM树之后就会触发, 不理会图像, js文件, css文件或者其他资源是否已经下载完毕

### readystatechange事件
* uninitialized: 为初始化
* loading: 正在加载
* interactive: 交互
* complete: 完成
ps: 虽然使用readystatechange可以十分近似地模拟DOMContentLoaded事件, 但它们本质还是不同的. 在不同的页面中, load事件与readystatechange事件并不能保证以相同的顺序触发