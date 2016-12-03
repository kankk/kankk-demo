#关于前端的一些demo

##布局
###grid01 
基本的响应式网格布局
根据屏幕宽度, 元素占的栏数不同
col-md-x和col-sm-x的值通过百分比计算
因为使用了float所以记得要清除浮动
设置boxing-sizing为border-box, 防止padding和border造成影响
ps: less不支持不同单位的值运行, calc中需要给百分比值添加~'xx%'避免编译
示例: <https://kankk.github.io/kankk-demo/grid01/index.html>

##样式

##JavaScript
###ajax01
原生ajax的基本用法
* cors跨域的简单请求
* jsonp跨域的基本用法
* 跨浏览器的XHR对象
* 跨浏览器的CORS判断
示例: <https://kankk.github.io/kankk-demo/ajax01/index.html>