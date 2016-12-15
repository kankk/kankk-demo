;(function($) {
  $.fn.extend({
    "slider": function(options) {
      options = $.extend({
        isAutoslider: true, // 是否自动轮播, 默认是
        isWithbuttons: true, // 是否带有小圆点切换, 默认是
        isWitharrow: true,  // 是否带有箭头切换
        autoSliderInterval: 3000,
        moveSpeed: 300,
      }, options);

      var index = 1;
      var timer;

      // 容器的默认样式
      var sliderW = parseInt($(this).css('width'));
      var sliderH = parseInt($(this).css('height'));
      $(this).addClass('slider');
      $(this).css('position', 'relative').css('overflow', 'hidden').css('display', 'inline-block');

      var $imgs = $("img", this); // 所有图片元素
      var numOfImgs = $imgs.length;
      $imgs.eq(0).clone().insertAfter($imgs.eq($imgs.length - 1));  // 把第一张图片的副本复制到最后一张
      $imgs.eq($imgs.length - 1).clone().insertBefore($imgs.eq(0)); // 把最后一个图片的副本复制到第一张
      $imgs = $("img", this); // 重新获取imgs元素


      var $list = $("<div class='slider-list'></div>");
      var $listBox = $("<div class='silder-list-box'></div>");

      // 初始化list的样式
      $list.css('width', sliderW * $imgs.length + 'px')
      .css('height', sliderH + 'px')
      .css('position', 'absolute')
      .css('left', -sliderW + 'px');

      // 初始化listBox的样式
      $listBox.css('float', 'left')
      .css('width', sliderW + 'px')
      .css('height', sliderH + 'px');

      // 初始化img的样式
      $imgs.css('width', '100%')
      .css('height', '100%');

      // 包裹好图片元素
      $imgs.wrapAll($list);
      $imgs.wrap($listBox);

      // 重新获取list对象
      $list = $('.slider-list', this);

      var $sliderButtons = $("<div class='slider-buttons'></div>");
      var $buttons;
      // 如果带有小圆点切换
      if(options.isWithbuttons) {
        $(this).append($sliderButtons);
        for(var i = 1; i <= numOfImgs; i++) {
          $sliderButtons.append($("<span index='" + i + "'></span>"))
        }
        $buttons = $(".slider-buttons span", this);
        $buttons.eq(0).addClass("button-focus");

        $buttons.each(function() {
          $(this).bind("click", function() {
            if($list.is(":animated") || $(this).attr("class") == "button-focus") {
              return;
            }
            var clickIndex = parseInt($(this).attr("index"));
            var move = -sliderW * (clickIndex - index);

            moveListBox(move);
            index = clickIndex;
            changeButton();
          })
        });
      }

      // 改变button的状态
      function changeButton() {
          $buttons.eq(index - 1).addClass('button-focus').siblings().removeClass('button-focus');
      }

      // 移动listbox
      function moveListBox(offset) {
        newleft = parseInt($list.css('left')) + offset;
        if (offset > 0) {
          offset = '+=' + offset + 'px';
        } else {
          offset = '-=' + Math.abs(offset) + 'px';
        }
        $list.animate({'left': offset}, options.moveSpeed, function() {
          if(newleft > -1) {
            $list.css('left', -sliderW * numOfImgs + 'px');
          } else if (newleft < (-sliderW * numOfImgs)) {
            $list.css('left', -sliderW + 'px');
          }
        });
      }


      // 下一张图片的监听器
      function nextListener() {
        if($list.is(':animated')) {
          return;
        }
        if(index == numOfImgs) {
          index = 1;
        } else {
          index += 1;
        }
        moveListBox(-sliderW);
        if(options.isWithbuttons) {
          changeButton();
        }
      }

      // 上一张图片的监听器
      function prevListener() {
        if($list.is(':animated')) {
          return;
        }
        if(index == 1) {
          index = numOfImgs;
        } else {
          index -= 1;
        }
        moveListBox(sliderW);
        if(options.isWithbuttons) {
          changeButton();
        }
      }

      // 自动轮播
      function autoSlide() {
        timer = setTimeout(function() {
          nextListener();
          autoSlide();
        }, options.autoSliderInterval);
      }

      // 停止轮播
      function autoStop() {
        clearTimeout(timer);
      }

      var $prev;
      var $next;
      // 如果带有箭头切换
      if(options.isWitharrow) {
        $prev = $("<span class='slider-arrow slider-prev'>&lt;</span>");
        $next = $("<span class='slider-arrow slider-next'>&gt;</span>");
        $(this).append($prev).append($next);
        $prev.bind('click', prevListener);
        $next.bind('click', nextListener);
      }

      // 如果自动轮播
      if (options.isAutoslider) {
        $(this).hover(autoStop, autoSlide);
        autoSlide();
      }




      return this;
    },
  });
})(jQuery);
