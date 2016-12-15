# slider.js

基于jQuery的滚动轮播插件  

提供基本的滚动轮播效果, 其他能力还在coding......  

`slider.css`为默认样式表  

## 用法

Step1: 指定滚动轮播的容器, 在该容器元素中添加图片属性`<img>`

```html
<section id="mySlider">
  <img src="img01.png" alt="img01.png">
  <img src="img02.png" alt="img02.png">
  <img src="img03.png" alt="img03.png">
</section>
```

Step2: 定义滚动轮播容器的宽高(固定值)

```css
#mySlider {
  width: 500px;
  height: 300px;
}
```

Step3: 引入jQuery库和slider.js库

```html
// jQuery要先于slider.js库先引入
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js"></script>
<script src="jquery.silder.js"></script>
```

Step4: 调用slider()方法

```javascript
$('#slider').slider();
```

## 自定义参数

slider()方法接收一个对象可以自定义滚动轮播的功能

```javascript
{
  isAutoslider: true, // 是否自动轮播, 默认是
  isWithbuttons: true, // 是否带有小圆点切换, 默认是
  isWitharrow: true,  // 是否带有左右箭头切换
  autoSliderInterval: 3000,	// 自动轮播的速度, 默认3000ms
  moveSpeed: 300,	// 滚动时的速度, 默认300ms
}
```

