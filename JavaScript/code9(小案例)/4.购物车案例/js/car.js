
// 1. 获取thead中一个复选框
var allck = document.querySelector('#all');
// 2. 获取tbody中一组复选框
//【功能1】
var cks = document.querySelectorAll('tbody input[type=checkbox]');
// 3. 给thead中一个复选框注册点击事件
allck.onclick = function () {
  // 3.1 获取thead中这个复选框的checked值
  var isOk = this.checked;
  // 3.2 循环遍历tbody中的每一个复选框，设置checked值为thead中这个复选框的checked值
  for (var i = 0; i < cks.length; i++) {
    cks[i].checked = isOk;
  }
};

//【功能2】
// 1. 循环遍历tbody中每一个复选框注册点击事件
for (var i = 0; i < cks.length; i++) {
  cks[i].onclick = function () {
    // 2. 在点击事件中，循环遍历tbody中每一个复选框，检测是否存在没有选中的复选中，若有，则设置thead中复选框为false，否则是true
    var isOk = true;
    // 2.1 循环遍历tbody中每一个复选框，
    for (var j = 0; j < cks.length; j++) {
      // 2.2 检测是否存在没有选中的复选中
      if (cks[j].checked == false) {
        // 若有，则设置thead中复选框为false
        isOk = false;
        break;
      }
    }
    // 2.3 把isOk赋值给thead中复选框
    allck.checked = isOk;
  };
}

