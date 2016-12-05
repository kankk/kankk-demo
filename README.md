#关于前端的一些demo

##布局
###grid01
基本的响应式网格布局
* 根据屏幕宽度, 元素占的栏数不同
* col-md-x和col-sm-x的值通过百分比计算
* 因为使用了`float`所以记得要清除浮动
* 设置`boxing-sizing`为border-box, 防止padding和border造成影响

ps: less不支持不同单位的值运行, calc中需要给百分比值添加~'xx%'避免编译  
示例: <https://kankk.github.io/kankk-demo/grid01/index.html>  

### padding01

css创建多列等高布局  
!["padding01"](https://kankk.github.io/kankk-demo/padding01/padding01.png)  

* 利用`padding-bottom`和`margin-bottom`之间正负值相抵, 设置一个很大的值
* 父容器需要设置`overflow:hidden`隐藏超过的部分
* 这样的话, 父容器的高度会被撑到最大子容器的高度, 其他子容器显示的高度也随之改变(因为padding-bottom会补偿一部分高度)  

示例: <(https://kankk.github.io/kankk-demo/padding01/index.html)  >  

##样式
###arrowbox01
带有箭头的盒子  
!["arrowbox"](https://kankk.github.io/kankk-demo/arrowbox01/arrowbox.png)  
示例: <https://kankk.github.io/kankk-demo/arrowbox01/index.html>

###three-bars
纯css表示"三道杠"效果, 常用于小布局中导航栏缩小的图标  
!["three-bars"](https://kankk.github.io/kankk-demo/three-bars/three-bars.png)  

* `background-clip: content-box`; 规定背景的绘制区域在内容框
* 使用`padding`把显示空白/父元素背景部分撑开
* 上下两条杠为`border-top`和`border-bottom`

示例: <https://kankk.github.io/kankk-demo/three-bars/index.html>  

### triangle

纯css创建一个三角形/梯形  
!["triangle"]((https://kankk.github.io/kankk-demo/triangle/triangle.png) )  

* `width:0px`和`height:0px`, 调整width或者height的值可以创建梯形  
* 颜色使用`transparent`表示透明  

示例: <(https://kankk.github.io/kankk-demo/triangle/index.html) >

##JavaScript
###ajax01
原生ajax的基本用法
* `cors`跨域的简单请求
* `jsonp`跨域的基本用法
* 跨浏览器的XHR对象
* 跨浏览器的CORS判断

###json01
原生处理json格式的基本用法  
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
