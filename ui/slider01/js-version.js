var contains = document.getElementById('contains-js');
var list = document.getElementById('list-js');
var next = document.getElementById('next-js');
var prev = document.getElementById('prev-js');
var buttons = document.getElementById('buttons-js').getElementsByTagName('span');
var numOfImages = list.getElementsByTagName("img").length;
var index = 1;

var containsW = getStyle(contains).width;
var containsH = getStyle(contains).height;
var widthNum = parseInt(containsW);

list.style.width = widthNum * numOfImages + 'px';
list.style.left = -parseInt(containsW) + 'px';

var animated = false;
var interval = 3000;
var time;

function getStyle(element) {
    // ie浏览器没有getComputedStyle()方法
    if (typeof document.defaultView.getComputedStyle === 'function') {
        return document.defaultView.getComputedStyle(element, null);
    } else {
        return element.currentStyle;
    }
}

// 改变button的状态
function changeButton() {
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].className == 'button-focus') {
            buttons[i].className = '';
            break;
        }
    }
    buttons[index - 1].className = 'button-focus';
}

// 移动图片
function moveImages(offset) {
  if(offset == 0) {
    return;
  }
  animated = true;
  var time = 500;
  var moveinteval = 10;
  var speed = offset/(time/moveinteval);

    var newLeft = parseInt(list.style.left) + offset;
    var move = function() {
      if ( (speed > 0 && parseInt(list.style.left) < newLeft) || (speed < 0 && parseInt(list.style.left) > newLeft)) {
        list.style.left = parseInt(list.style.left) + speed + 'px';
        setTimeout(move, moveinteval);
      } else {
        list.style.left = newLeft + 'px';
        // 当到达第一张副本的时候left跳到第一张, 最后一张同理
        if (newLeft > -1) {
            list.style.left = -widthNum * (numOfImages - 2) + 'px';
        } else if (newLeft < (-widthNum * (numOfImages - 2))) {
            list.style.left = -widthNum + 'px';
        }
        animated = false;
      }
    }
    move();
}

function autoplay() {
  timer = setInterval(function() {
    // next.onclick();
    var e = document.createEvent('MouseEvent');
    e.initEvent('click', false, false);
    next.dispatchEvent(e);
  }, interval)
}
function autostop() {
  clearInterval(timer);
}


// 给button绑定点击事件
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(event) {
      if (animated) {
        return;
      }
        // 如果点击的是当前button, 不进行操作, 直接返回
        if (event.target.className == 'button-focus') {
            return;
        }
        // 获取被点击的button的index
        var myIndex = parseInt(event.target.getAttribute('index'));
        // 计算出相对位移的距离
        var move = -widthNum * (myIndex - index);

        moveImages(move);
        index = myIndex;
        changeButton();
    }, false);
}

next.addEventListener('click', function(event) {
  if (animated) {
    return;
  }
    if (index == buttons.length) {
        index = 1;
    } else {
        index += 1;
    }
    moveImages(-widthNum);
    changeButton();
}, false);

prev.addEventListener('click', function(event) {
  if (animated) {
    return;
  }
    if (index == 1) {
        index = buttons.length;
    } else {
        index -= 1;
    }
    moveImages(widthNum);
    changeButton();
}, false);

contains.onmouseover = autostop;
contains.onmouseout = autoplay;

autoplay();
