var indexedDB = window.indexedDB || window.msIndexedDB || window.mozIndexdbDB || window.webkitIndexedDB;

var request, database;

// 数据库
request = indexedDB.open("admin");
request.onerror = function (event) {
  console.log("Something bad happened while trying to open: " + event.target.errorCode);
};
request.onsuccess = function (event) {
  database = event.target.result;
};

// 对象存储空间
var user = {
  username: "007",
  firstName: "James",
  lastName: "Bond",
  password: "foo"
}

var store = database.createObjectStore("users", {
  keyPath: "username"
});
store.add(user);

// 事务
var request = database.transaction("users").objectStore("users").get("007");
request.onerror = function(event) {
  console.log("Did not get the object!");
};
request.onsuccess = function(event) {
  var result = event.target.result;
  console.log(result.firstName);
};