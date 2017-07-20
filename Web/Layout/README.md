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

## 等分布局
* float
* flex
* table

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

# 两列布局(定宽+自定义)
## twoColumns01
float + margin
```html
<div class="parent">
  <div class="left">
    <p>left</p>
  </div>
  <div class="right">
    <p>right</p>
    <p>right</p>
  </div>
</div>

<style>
  .left {
    float: left;
    width: 100px;
  }
  .right {
    margin-left: 100px
    /*间距可再加入 margin-left */
  }
</style>
```

## twoColumns02
float + overflow
```html
<div class="parent">
  <div class="left">
    <p>left</p>
  </div>
  <div class="right">
    <p>right</p>
    <p>right</p>
  </div>
</div>

<style>
  .left {
    float: left;
    width: 100px;
  }
  .right {
    overflow: hidden;
  }
</style>
```
* 通过`overflow: hidden`会触发BFC模式(Block Formatting Context)块级格式上下文.

## twoColumns03
table
```html
<div class="parent">
  <div class="left">
    <p>left</p>
  </div>
  <div class="right">
    <p>right</p>
    <p>right</p>
  </div>
</div>

<style>
  .parent {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  .left {
    display: table-cell;
    width: 100px;
  }
  .right {
    display: table-cell;
    /*宽度为剩余宽度*/
  }
</style>
```
* `table`的显示特性为每列的单元格宽度和一定等于表格宽度. `table-layout: fixed`可以加速渲染, 也是设置布局优先.
* `table-cell`中不可以设置`margin`但是可以设置`padding`来设置间距

## twoColumns04
flex
```html
<div class="parent">
  <div class="left">
    <p>left</p>
  </div>
  <div class="right">
    <p>right</p>
    <p>right</p>
  </div>
</div>

<style>
  .parent {
    display: flex;
  }
  .left {
    width: 100px;
    margin-left: 20px;
  }
  .right {
    flex: 1;
  }
</style>
```
* 低版本浏览器兼容问题
* 性能问题, 只适合小范围布局

# 等分布局
## equalDivide01
```html
<div class="parent">
  <div class="column">
    <p>1</p>
  </div>
  <div class="column">
    <p>2</p>
  </div>
  <div class="column">
    <p>3</p>
  </div>
  <div class="column">
    <p>4</p>
  </div>
</div>
<style>
  .parent {
    margin-left: -20px;
  }
  .column {
    float: left;
    width: 25%;
    padding-left: 20px;
    box-sizing: border-box;
  }
</style>
```
* 完美兼容IE8以上版本

## equalDivide02
```html
<div class="parent">
  <div class="column">
    <p>1</p>
  </div>
  <div class="column">
    <p>2</p>
  </div>
  <div class="column">
    <p>3</p>
  </div>
  <div class="column">
    <p>4</p>
  </div>
</div>


<style>
  .parent {
    display: flex;
  }
  .column {
    flex: 1;
  }
  .column+.column { /* 相邻兄弟选择器 */
    margin-left: 20px;
  }
</style>
```
* 兼容问题

## equalDivide03
```html
<div class='parent-fix'>
  <div class="parent">
    <div class="column">
      <p>1</p>
    </div>
    <div class="column">
      <p>2</p>
    </div>
    <div class="column">
      <p>3</p>
    </div>
    <div class="column">
      <p>4</p>
    </div>
  </div>
</div>

<style>
  .parent-fix {
    margin-left: -20px;
  }
  .parent {
    display: table;
    width: 100%;
    /*可以布局优先，也可以单元格宽度平分在没有设置的情况下*/
    table-layout: fixed;
  }
  .column {
    display: table-cell;
    padding-left: 20px;
  }
</style>
```

# 等高布局
## equalHeight01
`table`的特性为每列等宽, 每行等高
```html
<div class="parent">
  <div class="left">
    <p>left</p>
  </div>
  <div class="right">
    <p>right</p>
    <p>right</p>
  </div>
</div>

<style>
  .parent {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  .left {
    display: table-cell;
    width: 100px;
  }
  .right {
    display: table-cell;
    /*宽度为剩余宽度*/
  }
</style>
```

## euqalHeight02
```html
<div class="parent">
  <div class="left">
    <p>left</p>
  </div>
  <div class="right">
    <p>right</p>
    <p>right</p>
  </div>
</div>

<style>
  .parent {
    display: flex;
  }
  .left {
    width: 100px;
  }
  .right {
    flex: 1;
  }
</style>
```
* 这里实际上使用了`align-items: stretch`, flex默认的`align-items`的值为`stretch`

## equalHeight03
```html
<div class="parent">
  <div class="left">
    <p>left</p>
  </div>
  <div class="right">
    <p>right</p>
    <p>right</p>
  </div>
</div>

<style>
  .parent {
    overflow: hidden;
  }
  .left,
  .right {
    padding-bottom: 9999px;
    margin-bottom: -9999px;
  }
  .left {
    float: left;
    width: 100px;
  }
  .right {
    overflow: hidden;
  }
</style>
```
* 此方法为伪等高(只有背景显示高度相同), 左右真实的高度其实不相等, 兼容性较好