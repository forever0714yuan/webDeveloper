

// 1. 获取元素
// 1.1 id为hours的li
var hours = document.querySelector('#hours');
// 1.2 id为minutes的li
var minutes = document.querySelector('#minutes');
// 1.3 id为seconds的li
var seconds = document.querySelector('#seconds');



// 2. 定义两个时间（开始和结束）
var start = new Date();
var end = new Date('2021-11-11 12:00:00');
// 3. 计算差值（总毫秒相减）
var temp = end - start;
// 4. 将差值转换为剩余多少小时、分钟、秒
var h = parseInt(temp / 1000 / 60 / 60);
h = h < 10 ? '0' + h : h;
var m = parseInt(temp / 1000 / 60 % 60);
m = m < 10 ? '0' + m : m;

var s = parseInt(temp / 1000 % 60);
s = s < 10 ? '0' + s : s;

// 5. 将计算好的小时、分钟、秒赋值给三个li
hours.innerText = h;
minutes.innerText = m;
seconds.innerText = s;

// 6. 产生一个定时器，在定时中实现一下操作
setInterval(function () {
  // 2. 定义两个时间（开始和结束）
  var start = new Date();
  // 3. 计算差值（总毫秒相减）
  var temp = end - start;
  // 4. 将差值转换为剩余多少小时、分钟、秒
  var h = parseInt(temp / 1000 / 60 / 60);
  h = h < 10 ? '0' + h : h;
  var m = parseInt(temp / 1000 / 60 % 60);
  m = m < 10 ? '0' + m : m;

  var s = parseInt(temp / 1000 % 60);
  s = s < 10 ? '0' + s : s;

  // 5. 将计算好的小时、分钟、秒赋值给三个li
  hours.innerText = h;
  minutes.innerText = m;
  seconds.innerText = s;
}, 1000);


