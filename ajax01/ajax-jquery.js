function ajaxByJquery() {
  $.get('http://api.jirengu.com/weather.php', function(data, textStatus) {
    console.log(data);
    console.log(textStatus);

    if(textStatus === "success") {
      alert(data);
    } else if (textStatus === "error") {
      alert('获取失败');
    }
  });
}
