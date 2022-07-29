// 【准备：获取元素】
// 获取左侧盒子
var leftBox = document.querySelector('.fdj .leftBox');
// 获取小黄盒子
var tool = document.querySelector('.fdj .tool');
// 获取右侧盒子
var rightBox = document.querySelector('.fdj .rightBox');
// 获取右侧大图盒子 
var bigImg = document.querySelector('#_bImg');

//【 功能1： 鼠标进入左侧显示小黄盒子 和 右侧盒子】
// 1.1 给左侧盒子注册鼠标进入事件
leftBox.onmouseover = function () {
  // 1.2 显示小黄盒子 和 右侧盒子
  tool.style.display = 'block';
  rightBox.style.display = 'block';
};

//【 功能2： 鼠标离开左侧隐藏小黄盒子 和 右侧盒子】
// 2.1 给左侧盒子注册鼠标离开事件
leftBox.onmouseout = function () {
  // 2.2 隐藏小黄盒子 和 右侧盒子
  tool.style.display = 'none';
  rightBox.style.display = 'none';
};

//【 功能3： 鼠标在左侧盒子中移动小黄盒子 和 右侧盒子的图片按照比例移动】
// 目标1：根据鼠标的位置计算小黄的位置
// 目标2：前提，左右比例关系1:2，把计算出小黄的位置以2倍并且负值赋值给右侧大图的left和top值

// 3.1 给左侧盒子注册onmosuemove事件
leftBox.onmousemove = function (e) {
  // 3.2 计算出正确的位置
  var x = e.pageX - this.offsetLeft - tool.offsetWidth/2;
  var y = e.pageY - this.offsetTop - tool.offsetHeight / 2;
  
  // 限制位置
  if (x < 0) {
    x = 0;
  } else if (x > this.offsetWidth - tool.offsetWidth) {
    x = this.offsetWidth - tool.offsetWidth;
  }

  if (y < 0) {
    y = 0;
  }else if (y > this.offsetHeight - tool.offsetHeight) {
    y = this.offsetHeight - tool.offsetHeight;
  }

  // 3.3 赋值给小黄盒子的left和top
  tool.style.left = x + 'px';
  tool.style.top = y + 'px';

  // 3.4 把计算出小黄的位置以2倍并且负值赋值给右侧大图的left和top值
  bigImg.style.left = -2 * x + 'px';
  bigImg.style.top= -2 * y + 'px';

};

