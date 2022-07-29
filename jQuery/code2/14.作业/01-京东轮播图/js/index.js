// 获取li标签
let lis = $('.slider ul li');
// 索引值 默认为0
let index = 0;

// 最大索引值
let maxIndex = lis.length - 1;

// 按钮左侧点击
$('.arrow-left').click(function () {
  lis.eq(index).fadeOut();

  if (index <= 0) {
    index = maxIndex;
  } else {
    index--;
  }
  lis.eq(index).fadeIn();
})
// 点击右侧按钮
$('.arrow-right').click(function () {
  lis.eq(index).fadeOut();
  if (index < maxIndex) {
    index++;
  } else {
    index = 0;
  }
  lis.eq(index).fadeIn();
})