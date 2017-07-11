# 水平居中
## horizontal01
margin + 定宽
```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .child {
    width: 100px;
    margin: 0 auto;
  }
</style>
```

## horizontal02
margin + table(不定宽)
```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .child {
    display: table;
    margin: 0 auto;
  }
</style>
```
* `display: table`在表现上类似`block`元素, 但是宽度为内容宽.

## horizontal03
inline-block + text-align
```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .child {
    display: inline-block;
  }
  .parent {
    text-align: center;
  }
</style>
```
* 兼容性好

## horizontal04
absolute + margin-left
```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
.parent {
    position: relative;
  }
  .child {
    position: absolute;
    left: 50%;
    width: 100px;
    margin-left: -50px;  /* width/2 */
  }
</style>
```
* 宽度固定
* 相比使用`transform`, 兼容性更好

## horizontal05
absolute + transform
```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    position: relative;
  }
  .child {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
```
* 绝对定位脱离文档流
* `transform`为CSS3属性, 有兼容性问题

## horizontal06
flex + justify-content
```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    display: flex;
    justify-content: center;
  }
</style>
```
* 不定宽
* 只需要设置父节点
* `flex`有兼容性问题

