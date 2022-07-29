'use strict';

// 1.生成一个20以内的随机数
let randomNum = Math.floor(Math.random() * 20) + 1;
// 记录当前这局的分数
let score = 20;

// 2.给check按钮注册点击事件
let btnCheck = document.querySelector('.check');

btnCheck = onclick = function () {
    // 3.点击按钮时，获取文本框中的数字
    let textGuess = document.querySelector('.guess');
    // 用户无输入
    if (textGuess.value === "") {
        message.textContent = "No number!"
        return;
    }
    // 转换成数值类型
    let inputNum = parseInt(textGuess.value);

    // 显示提示用户猜数字结果的提示信息
    let message = document.querySelector('.message')

    // 更新页面score值
    document.querySelector('.score').textContent = score;

    // 判断
    if (inputNum > randomNum) {
        // 大于
        message.textContent = "Too hight!"
    } else if (inputNum < randomNum) {
        // 小于
        message.textContent = "Too low!"
    } else {
        // 相等
        message.textContent = "猜对了!"
        document.body.style.backgroundColor = "green"
    }
    score--;
}