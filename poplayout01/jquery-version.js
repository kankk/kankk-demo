function showPoplayoutWithMaskJquery($popLayout) {
    if ($popLayout[0].nodeType !== 1) {
        return false;
    }

    // $(document).height() === document.body.scrollHeight, 宽度同理
    var sWidth = $(document).height();
    var sHeight = $(document).width();

    // $(window).height() === document.documentElement.clientHeight, 宽度同理
    var vHeight = $(window).height();
    var vWidth = $(window).width();

    var $mask = $('<div></div>');
    $mask.attr("id", "mask");
    $mask.css("height", sHeight + "px");
    $mask.css("width", vWidth + "px");
    $mask.css("opacity", "0");

    $popLayout.attr("id", "poplayout");
    $mask.append($popLayout);
    $('body').append($mask);

    $mask.animate({opacity: "1"}, 500);

    var layoutHeight = $popLayout.height();
    var layoutWidth = $popLayout.width();

    $popLayout.css("top", vHeight / 2 - layoutHeight / 2 + "px");
    $popLayout.css("left", vWidth / 2 - layoutWidth / 2 + "px");

    var resizePoplayoutListener = function(event) {
        var vHeight = $(window).height();
        var vWidth = $(window).width();

        $mask.css("width", vWidth + "px");

        $popLayout.css("top", vHeight / 2 - layoutHeight / 2 + "px");
        $popLayout.css("left", vWidth / 2 - layoutWidth / 2 + "px");
    };

    $(window).bind('resize', resizePoplayoutListener);

    $mask.click(function(event) {
        // 当poplayout消失的时候, 移除视口改变的监听器
        $(window).unbind("resize");
        $mask.animate({opacity: "0"},500, function() {
          $mask.remove();
        });
        // 点击mask层移除弹出层
        // $mask.remove();
    });

    $popLayout.click(function(event) {
        // 在冒泡阶段触发回调函数, 这里阻止事件继续冒泡调用mask的回调方法关闭弹出层
        event.stopPropagation();
    });

}

var $btnShowPopLayout = $('#showpoplayout-jquery');
$btnShowPopLayout.click(function(event) {
    var $popLayout = $("<div></div>");
    $popLayout.attr("class", "poplayout");

    // var $text = $("<p></p>");
    // $text.html("这就是弹出层");
    var $text = $("<p>这就是弹出层</p>");

    $popLayout.append($text);
    showPoplayoutWithMaskJquery($popLayout);
});
