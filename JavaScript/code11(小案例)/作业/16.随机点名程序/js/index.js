/**
 * 
 * 该功能没有实现，想法是随机生成数组下标，然后给其添加样式，再通过setTimeout 1秒钟后清除，但是点击停止的时候，因为setTimeout是异步事件 会先于同步事件，将随机下标返回出来之后，也是会被 setTimeout 内的函数清除
 */


'use strict';

const btn = document.querySelector('#btn');

// 定义数组
let nameArr = ['于金元', '张云翔', '孟源', '张宇', '张文立', '谭增灯'];
let fig = false;
// 动态生成列表 
const ul = document.querySelector('.class_list');
nameArr.forEach((item) => {
    // 生成li
    const li = document.createElement('li');
    ul.append(li);
    // 生成img
    const img = document.createElement('img');
    img.src = 'images/kdy.gif'
    img.className = 'avatar';
    li.append(img);
    // 生成span
    const span = document.createElement('span');
    span.className = 'name';
    span.textContent = item;
    li.append(span);
})

//获取li
const myLi = document.querySelectorAll('li');

// 随机点名
function getName() {
    //随机数
    let classIndex = parseInt(Math.random() * myLi.length);

    myLi[classIndex].classList.add('active');

    if (!fig) {
        setTimeout(() => {
            myLi[classIndex].classList.remove('active');
        }, 1000);
    }
    return classIndex;
}

let timer = null;

btn.onclick = function () {

    if (!timer) {
        clearInterval(timer)
        timer = setInterval(getName, 1000);
        fig = false;
        btn.textContent = '停止';
    } else {
        clearInterval(timer);
        timer = null;
        fig = true;
        btn.textContent = '开始点名';
    }
}
console.log(getName());

// if (!!getName()) {
//     setTimeout(() => {
//         myLi[getName()].classList.add('active');
//     }, 2000)
// }



