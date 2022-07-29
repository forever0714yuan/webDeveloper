
// 1. 获取thead中一个复选框
let allck = document.querySelector('#all');
// 2. 获取tbody中一组复选框
//【功能1】
let cks = document.querySelectorAll('tbody input[type=checkbox]');
// 3. 给thead中一个复选框注册点击事件
allck.onclick = function () {
  // 3.1 获取thead中这个复选框的checked值
  let isOk = this.checked;
  // 3.2 循环遍历tbody中的每一个复选框，设置checked值为thead中这个复选框的checked值
  for (let i = 0; i < cks.length; i++) {
    cks[i].checked = isOk;
  }
};

//【功能2】
// 1. 循环遍历tbody中每一个复选框注册点击事件
for (let i = 0; i < cks.length; i++) {
  cks[i].onclick = function () {
   // 2. 获取tbody中所有的复选框的个数
    let len1 = cks.length; 
    //3. 获取tbody中选中的复选框的个数
    let len2 = document.querySelectorAll('tbody input:checked').length;
    // 4. 对比是否一致，若一致，则设置thead中全选框为true，否则为false
    if (len1 == len2) {
      allck.checked = true;
    } else {
      allck.checked = false;
    }
  };
}

