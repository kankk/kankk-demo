# 归总
## 水平居中
* margin + 定宽
* table + margin
* inline-block + text-align
* absolute + margin-left
* absolute + transform
* flex + justify-content

## 垂直居中
* table-cell + vertical-align
* absolute + transform
* flex + align-items

## 水平垂直居中
* absolute + transform
* inline-block + text-align + table-cell + vertical-align
* flex + justify-content + align-items

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

# 垂直居中
## vertical01
table-cell + vertical-align
```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    display: table-cell;
    vertical-align: middle;
  }
</style>
```
## vertical02
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
    top: 50%;
    transform: translateY(-50%);
  }
</style>
```
* 绝对定位脱离文档流, 不会对后续元素的布局造成影响, 但是如果绝对定位元素是唯一的元素则父元素也会失去高度
* `transform`为CSS3属性, 有兼容性问题
## vertical03
flex + align-items
```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    display: flex;
    align-items: center;
  }
</style>
```
* `flex`有兼容性问题

# 水平垂直居中
## horizontalVertical01
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
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
```
* 绝对定位脱离文档流, 不会对后续元素的布局造成影响

## horizontalVertical02
inline-block + text-align + table-cell + vertical-align
```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    text-align: center;
    display: table-cell;
    vertical-align: middle;
  }
  .child {
    display: inline-block;
  }
</style>
```


## horizontalVertical03
flex + justify-content + align-items
```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /*垂直居中*/
  }
</style>
```
* 只需设置父节点属性, 无需设置子元素