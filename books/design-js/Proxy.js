var myImage = (function () {
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);

  return function (src) {
    imgNode.src = src;
  }
})();

var proxyImage = (function () {
  var img = new Image;

  img.onload = function () {
    myImage(this.src);
  }

  return function (src) {
    myImage('loading.gif');
    img.src = src;
  }
})();

proxyImage('xxx.jpg');