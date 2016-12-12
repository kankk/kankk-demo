#关于前端的一些demo

##布局
###grid01: 基本的响应式网格布局
* 使用`float`实现
* 根据屏幕宽度, 元素占的栏数不同
* col-md-x和col-sm-x的值通过百分比计算
* 因为使用了`float`所以记得要清除浮动
* 设置`boxing-sizing`为border-box, 防止padding和border造成影响

ps: less不支持不同单位的值运行, calc中需要给百分比值添加~'xx%'避免编译  
示例: <https://kankk.github.io/kankk-demo/grid01/index.html>  

### padding01: 多列等高布局  

!["padding01"](https://kankk.github.io/kankk-demo/padding01/padding01.png)  

* 利用`padding-bottom`和`margin-bottom`之间正负值相抵, 设置一个很大的值
* 父容器需要设置`overflow: hidden`隐藏超过的部分
* 这样的话, 父容器的高度会被撑到最大子容器的高度, 其他子容器显示的高度也随之改变(因为padding-bottom会补偿一部分高度)  

示例: <https://kankk.github.io/kankk-demo/padding01/index.html>  

### filter-blur01: 模拟遮罩效果

!["filter-blur01"](https://kankk.github.io/kankk-demo/filter-blur01/filter-blur01.png)  

* `filter: blur(xpx)`设置清晰度, 模糊
* 设置`overflow: hidden`隐藏超出部分
* 使用`position: absolute`定位  

示例: <https://kankk.github.io/kankk-demo/filter-blur01/index.html>  

### poplayout01: 拥有遮罩层的弹出窗口

多用于弹出拥有遮罩层的窗口登录窗口周围  

原生JavaScript 和 jQuery 实现

!["poplayout01"](https://kankk.github.io/kankk-demo/poplayout01/poplayout01.png)  

遮罩层(mask)使用absolute布局  

* 通过`height = document.body.scrollHeight`使高度等于页面总高度
* 通过`width = document.documentElement.clientWidth`使宽度等于视窗大小(不存在水平滚动条情况下)
* 透明效果使用`background-color: rgba(x, x, x, 0.x)`, 最好不要使用`opacity`, 会让子元素也透明
* 监听`click`事件, 当点击mask时移除mask

弹出层(poplayout)使用fixed布局

* 自定义函数`showPoplayoutWithMask(poplayout)`接收一个Element元素, 不关心其子元素
* 通过`offsetHeight`和`offsetWidth`获得poplayout的高度和宽度
* 通过计算规则算出poplayout的位置使其居中
* 监听`resize`事件, 当浏览器大小发生改变的时候, 改变poplayout的位置
* 由于poplayout为mask的子元素, 需要阻止poplayout的`click`事件冒泡. 不然会导致点击poplayout也移除mask  

功能还需要完善: 

* 改变浏览器大小的时候, `document.documentElement.clientHeight`和`clientWidth`会发生抖动  

示例: <https://kankk.github.io/kankk-demo/poplayout01/index.html>  

##样式
###arrowbox01: 带有箭头的盒子  

!["arrowbox"](https://kankk.github.io/kankk-demo/arrowbox01/arrowbox.png)  
示例: <https://kankk.github.io/kankk-demo/arrowbox01/index.html>

###three-bars: 纯css表示"三道杠"效果
常用于小布局中导航栏缩小的图标  

!["three-bars"](https://kankk.github.io/kankk-demo/three-bars/three-bars.png)  

* `background-clip: content-box`; 规定背景的绘制区域在内容框
* 使用`padding`把显示空白/父元素背景部分撑开
* 上下两条杠为`border-top`和`border-bottom`

示例: <https://kankk.github.io/kankk-demo/three-bars/index.html>  

### triangle: 纯css表示一个三角形/梯形  

!["triangle"](https://kankk.github.io/kankk-demo/triangle/triangle.png)  

* `width:0px`和`height:0px`, 调整width或者height的值可以创建梯形  
* 颜色使用`transparent`表示透明  

示例: <https://kankk.github.io/kankk-demo/triangle/index.html>

##JavaScript
###ajax01: 原生ajax的基本用法

* `cors`跨域的简单请求
* `jsonp`跨域的基本用法
* 跨浏览器的XHR对象
* 跨浏览器的CORS判断

###json01: 原生处理json格式的基本用法  

JSON对象转换为JSON字符串  
`JSON.stringify()`的执行顺序  
1. 如果存在`toJSON()`方法而且能通过它取得有效的值, 则调用该方法, 否则, 返回对象本身  
2. 如果提供了第二个参数, 应用这个函数过滤器, 传入函数过滤器的值是第1步返回的值  
3. 对于第2步返回的每个值进行相应的序列化  
4. 如果提供了第三个参数, 执行相应的格式化  

JSON字符串转换为JSON对象  
1. eval('(' + str + ')');  
2. JSON.parse(str);  

示例: <https://kankk.github.io/kankk-demo/json01/index.html>  

### create-object: 创建对象的方式  

创建对象的方法:  
* 工程模式  
  * 不足: 没有解决对象识别的问题(不知道一个对象的类型)
* 构造函数模式  
  * 不足: 每个方法都要在每个实例上重新创建一遍
* 原型模式  
  * 不足: 原型中所有属性被多个实例共享, 对于包含引用类型的值来说, 问题就比较突出
* 构造函数模式和原型模式组合  
  * 创建自定义类型的最常见方式 

示例: <https://kankk.github.io/kankk-demo/create-object/index.html>  