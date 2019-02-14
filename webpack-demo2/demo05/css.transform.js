module.exports = function(css) {
  console.log(css); // 查看css
  return window.innerWidth < 500 ? css.replace("red", "green") : css; // 如果屏幕宽度 < 1000, 替换背景颜色
};