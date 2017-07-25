// 自定义右键菜单
EventUtil.addHandler(window, "load", function (event) {
  event = EventUtil.getEvent(event);
  EventUtil.preventDefault();

  var menu = document.getElementById("myMenu");
  menu.style.left = event.clientX + "px";
  menu.style.top = event.clientY + "px";
  menu.style.visibility = "visible";

  EventUtil.addHandler(document, "click", function (event) {
    document.getElementById("myMenu").style.visibility = "hidden";
  });
});

// 加载外部JavaScript文件
EventUtil.addHandler(window, "load", function () {
  var script = document.createElement("script");
  EventUtil.addHandler(script, "readystatechange", function (event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    if (target.readyState == "loaded" || target.readyState == "complete") {
      EventUtil.removeHandler(target, "readystatechange", arguments.callee);
      console.log("Script Loaded");
    }
  });
  script.src = "example.js";
  document.body.appendChild(script);
});

// 加载外部CSS文件
EventUtil.addHandler(window, "load", function () {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  EventUtil.addHandler(link, "readystatechange", function (event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    if (target.readyState == "loaded" || target.readyState == "complete") {
      EventUtil.removeHandler(target, "readystatechange", arguments.callee);
      console.log("CSS Loaded");
    }
  });
  link.href = "example.css";
  document.getElementsByTagName("head")[0].appendChild(link);
});

// 事件委托
var list = document.getElementById("myLinks");
EventUtil.addHandler(list, "click", function (event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);

  switch (target.id) {
    case "doSomething":
      document.title = "I changed the document's title";
      break;
    case "goSomewhere":
      document.tile = "http://www.baidu.com";
      break;
    case "sayHi":
      console.log("hi");
      break;
  }
});