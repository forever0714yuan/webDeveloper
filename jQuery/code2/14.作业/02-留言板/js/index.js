// 点击提交
$('.btn-default').click(function () {
  let nickname = $('.form-group input[type=text]').val();
  let evalute = $('.form-group textarea').val();

  let $tr = $(`
    <div class="message">
      <div class="box">
        <img src="./images/1.webp" alt="" />
        <div class="item">
          <div class="user">${nickname}</div>
          <div class="content">${evalute}</div>
        </div>
      </div>
      <span class="time">5秒前</span>
      <span class="close">X</span>
    </div>
  `);

  // 插入节点
  $('.list').prepend($tr);

  // 清空文本框
  $('.form-group input[type=text]').val('');
  $('.form-group textarea').val('');


  console.log($('.list'));
  // 留言的数目
  let lenth = $('.list').children().length;

  $('#title').text(`最新留言（${lenth}）`);
})

$('.list').on('click', '.close', function () {
  $(this).parent().remove()
})