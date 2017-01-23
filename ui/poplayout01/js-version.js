// 该函数接受一个Element对象表示弹出层的内容
function showPoplayoutWithMaskJS(popLayout) {

    // 当传入的值不是Element元素返回false
    if (popLayout.nodeType !== 1) {
        return false;
    }

    // 整张网页的总高度和总宽度
    var sWidth = document.body.scrollWidth;
    var sHeight = document.body.scrollHeight;

    // 视口高度, 不包括滚动条的大小
    var vHeight = document.documentElement.clientHeight;
    var vWidth = document.documentElement.clientWidth;

    var mask = document.createElement('div');
    mask.setAttribute("id", "mask");
    mask.style.height = sHeight + "px";
    // mask.style.width = sWidth + "px";
    mask.style.width = vWidth + "px";

    // var popLayout = document.createElement('p');
    popLayout.setAttribute("id", "poplayout");
    mask.appendChild(popLayout);
    document.body.appendChild(mask);

    // Element.offsetHeight比Element.clientHeight多了边框的高度, 宽度同理
    var layoutHeight = popLayout.offsetHeight;
    var layoutWidth = popLayout.offsetWidth;

    // 使得popLayout居中
    popLayout.style.top = vHeight / 2 - layoutHeight / 2 + "px";
    popLayout.style.left = vWidth / 2 - layoutWidth / 2 + "px";


    // bug 改变浏览器大小的时候, vHeight和vWidth会发生抖动
    // 当浏览器大小发生改变的时候, poplayout的位置也发生改变
    var resizePoplayoutListener = function(event) {
        // 当浏览器大小发生改变的时候, 重新获取视口高度和宽度
        var vHeight = document.documentElement.clientHeight;
        var vWidth = document.documentElement.clientWidth;

        // 重新赋值mask层的宽度与视口宽度相等
        mask.style.width = vWidth + "px";

        // 重新让poplayout中居中
        popLayout.style.top = vHeight / 2 - layoutHeight / 2 + "px";
        popLayout.style.left = vWidth / 2 - layoutWidth / 2 + "px";
    };

    window.addEventListener('resize', resizePoplayoutListener, true);

    mask.addEventListener('click', function(event) {
        // 当poplayout消失的时候, 移除视口改变的监听器
        window.removeEventListener('resize', resizePoplayoutListener, true);
        // 点击mask层移除弹出层
        document.body.removeChild(mask);
    }, false);
    popLayout.addEventListener('click', function(event) {
        // 在冒泡阶段触发回调函数, 这里阻止事件继续冒泡调用mask的回调方法关闭弹出层
        event.stopPropagation();
    }, false);
}

var btnShowPopLayout = document.getElementById("showpoplayout-js");
btnShowPopLayout.addEventListener('click', function(event) {
    var popLayout = document.createElement('div');
    popLayout.setAttribute("class", "poplayout");

    // poplayout里面的内容
    var text = document.createElement('p');
    text.innerHTML = "这就是弹出层";

    popLayout.appendChild(text);
    showPoplayoutWithMaskJS(popLayout);
}, false);
