'use strict';

// 1.获取要操作的对象

let nodeSmall = document.querySelector('#node_small');

let er = document.querySelector('#er');

// 2.添加事件
// 鼠标移入
nodeSmall.onmouseover = function () {
    er.classList.toggle('hide');
}
// 鼠标移出
nodeSmall.onmouseout = function () {
    er.classList.toggle('hide');
}
