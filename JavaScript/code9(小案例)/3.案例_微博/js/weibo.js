// 封装实现获取日期格式
function getTime() {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  let day = date.getDate();
  day = day < 10 ? '0' + day : day;
  let hours = date.getHours();
  hours = hours < 10 ? '0' + hours : hours;
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let seconds = date.getSeconds();
  seconds = seconds < 10 ? '0' + seconds : seconds;
  let str = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  // 返回日期格式
  return str;
}

// 1. 获取元素
// 1.1 文本域
const area = document.querySelector('#area');
// 1.2 类名为useCount的span元素
const useCount = document.querySelector('.useCount');
// 1.3 获取发布按钮
const send = document.querySelector('#send');
// 1.4 ul
const ul = document.querySelector('.contentList ul');

// 2.【功能1：输入框输入的过程中统计文字数量】
// 2.1 给文本域注册oninput事件
area.oninput = function () {
  // 2.2 在事件处理程序中，获取文本域中的内容（value）的长度给span
  useCount.innerText = this.value.length;
}


// 3.【功能2：点击发布按钮，实现微博发布】
// 3.1 给按钮注册onclick事件
send.onclick = function () {
  // 3.2 获取文本域中的内容
  const v = area.value;
  // 3.3 检测内容长度是否为0，若为0，提示信息不能为空
  if (v.length == 0) {
    alert('不能为空')
  } else {
    // 3.4 否则创建li,追加到ul里的最前面
    const li = document.createElement('li');
    ul.prepend(li);
    // 3.5 创建一个类名为info的div，追加到li中
    const info = document.createElement('div');
    info.className = 'info';
    li.appendChild(info);
    // 3.5.1 创建一个img元素 ，追加到info的div中，并且img要设置src
    const img = document.createElement('img');
    img.src = 'images/03.jpg';
    info.appendChild(img);
    // 3.5.2 创建一个span，追加到info的div中，设置内容
    const span = document.createElement('span');
    span.innerText = '百里守约';
    info.appendChild(span);
    // 3.5.3 创建一个p，追加到info的div中，设置发表时间
    const p = document.createElement('p');
    p.innerText = '发布于：' + getTime();
    info.appendChild(p);
    // 3.6 创建一个类名为content的div，追到li中，设置content的div的内容为文本域中的内容
    const content = document.createElement('div');
    content.className = 'content';
    li.appendChild(content);
    content.innerText = v;
    // 3.7 发布完成后，清空文本域内容,数字统计重置为0
    area.value = '';
    useCount.innerText = '0';
  }
};
