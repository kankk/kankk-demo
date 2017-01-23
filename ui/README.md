#UI

##布局
###grid01: 基本的响应式网格布局
* 使用`float`实现
* 根据屏幕宽度, 元素占的栏数不同
* col-md-x和col-sm-x的值通过百分比计算
* 因为使用了`float`所以记得要清除浮动
* 设置`boxing-sizing`为border-box, 防止padding和border造成影响

ps: less不支持不同单位的值运行, calc中需要给百分比值添加~'xx%'避免编译  
示例: <https://kankk.github.io/kankk-demo/ui/grid01/index.html>

### padding01: 多列等高布局  

!["padding01"](https://kankk.github.io/kankk-demo/ui/padding01/padding01.png)  

* 利用`padding-bottom`和`margin-bottom`之间正负值相抵, 设置一个很大的值
* 父容器需要设置`overflow: hidden`隐藏超过的部分
* 这样的话, 父容器的高度会被撑到最大子容器的高度, 其他子容器显示的高度也随之改变(因为padding-bottom会补偿一部分高度)  

示例: <https://kankk.github.io/kankk-demo/ui/padding01/index.html>  

### filter-blur01: 模拟遮罩效果

!["filter-blur01"](https://kankk.github.io/kankk-demo/ui/filter-blur01/filter-blur01.png)  

* `filter: blur(xpx)`设置清晰度, 模糊
* 设置`overflow: hidden`隐藏超出部分
* 使用`position: absolute`定位  

示例: <https://kankk.github.io/kankk-demo/ui/filter-blur01/index.html>  

### poplayout01: 拥有遮罩层的弹出窗口

多用于弹出拥有遮罩层的窗口登录窗口周围  

原生JavaScript 和 jQuery 实现

!["poplayout01"](https://kankk.github.io/kankk-demo/ui/poplayout01/poplayout01.png)  

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

示例: <https://kankk.github.io/kankk-demo/ui/poplayout01/index.html>  

### silder01: 焦点图滚动轮播

原生JavaScript和jQuery两种实现: 

* 通过`float`和`overflow:hidden`让不显示的图片隐藏
* 通过`relative`定位和控制`left`属性让图片定位到"显示容器"中
* 通过添加第一张图片的副本和最后一张图片的副本实现无限轮播
* 通过`setTimeout()`方法实现动画效果和自动轮播功能

实例: <https://kankk.github.io/kankk-demo/ui/slider01/index.html>

##样式
###arrowbox01: 带有箭头的盒子  

!["arrowbox"](https://kankk.github.io/kankk-demo/ui/arrowbox01/arrowbox.png)  
示例: <https://kankk.github.io/kankk-demo/ui/arrowbox01/index.html>

###three-bars: 纯css表示"三道杠"效果
常用于小布局中导航栏缩小的图标  

!["three-bars"](https://kankk.github.io/kankk-demo/ui/three-bars/three-bars.png)  

* `background-clip: content-box`; 规定背景的绘制区域在内容框
* 使用`padding`把显示空白/父元素背景部分撑开
* 上下两条杠为`border-top`和`border-bottom`

示例: <https://kankk.github.io/kankk-demo/ui/three-bars/index.html>  

### triangle: 纯css表示一个三角形/梯形  

!["triangle"](https://kankk.github.io/kankk-demo/ui/triangle/triangle.png)  

* `width:0px`和`height:0px`, 调整width或者height的值可以创建梯形  
* 颜色使用`transparent`表示透明  

示例: <https://kankk.github.io/kankk-demo/ui/triangle/index.html>  

### ball01: CSS3表示立体线性框球形

* 通过设置多个`div`元素的`border-radius:100%`实现多个圆形重叠
* 通过`transform: rotateY(x deg);`让圆形`div`基于Y轴旋转
* 设置`transform-style: preserve-3d;`使其子元素保留其3D位置

示例: <https://kankk.github.io/kankk-demo/ui/ball01/index.html>  

