var $contains = $('#contains-jquery');
var $list = $('#list-jquery');
var $next = $('#next-jquery');
var $prev = $('#prev-jquery');
var $buttons = $('#buttons-jquery > span');
var $numOfImage = $list.find('img').length;
var $index = 1;

var $containsW = $contains.css('width');
var $containsH = $contains.css('height');
var $widthNum = parseInt($containsW);

$list.css('width', $widthNum * $numOfImage + 'px');
$list.css('left', -$widthNum + 'px');

var $animated = false;
var $interval = 3000;
var $timer;

function changeButtonJquery() {
  $buttons.eq($index - 1).addClass('button-focus').siblings().removeClass('button-focus');
}

function moveImagesJquery($offset) {
  $newLeft = parseInt($list.css('left')) + $offset;
  if($offset > 0) {
    $offset = '+=' + $offset;
  } else {
    $offset = '-=' + Math.abs($offset);
  }
  $list.animate({'left': $offset}, 300, function() {
    if($newLeft > -1) {
      $list.css('left', -$widthNum * ($numOfImage - 2) + 'px');
    } else if($newLeft < (-$widthNum * ($numOfImage - 2))) {
      $list.css('left', -$widthNum + 'px');
    }
  })
}

function autoplayJquery()  {
  $timer = setTimeout(function() {
    $next.trigger('click');
    autoplayJquery();
  }, $interval);
}
function autostopJquery() {
  clearTimeout($timer);
}

$next.bind('click', function() {
  if($list.is(':animated')) {
    return;
  }
  if($index == buttons.length) {
    $index = 1;
  } else {
    $index += 1;
  }
  moveImagesJquery(-$widthNum);
  changeButtonJquery();
});

$prev.bind('click', function() {
  if($list.is(':animated')) {
    return;
  }
  if(index == 1) {
    $index = $buttons.length;
  } else {
    $index -= 1;
  }
  moveImagesJquery($widthNum);
  changeButtonJquery();
});

$buttons.each(function() {
  $(this).bind('click', function() {
    if($list.is(':animated') || $(this).attr('class')=='button-focus') {
      return;
    }
    var $myIndex = parseInt($(this).attr('index'));
    var $move = -$widthNum * ($myIndex - $index);

    moveImagesJquery($move);
    $index = $myIndex;
    changeButtonJquery();
  })
});

$contains.hover(autostopJquery, autoplayJquery);
autoplayJquery();
