(function (window) {
  'use strict';
  // Your starting point. Enjoy the ride!
  let todos = getTodos();
  let editedTodo = null;
  let beforeEditCache = null;

  const todoUL = document.querySelector('.todo-list');

  // 1. 渲染列表
  function load (todos) {
    const list = [];
    todos.forEach(function (item, index) {
      list.push(`
        <li class="${item.completed ? 'completed' : ''}${editedTodo === item ? ' editing' : ''}">
          <div class="view">
            <input class="toggle" type="checkbox" ${item.completed ? 'checked' : ''}>
            <label data-index="${index}">${item.text}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${item.text}">
        </li>
      `)
    });
    todoUL.innerHTML = list.join('');

    // 6. 
    // 给所有编辑文本框注册事件
    const editInputs = document.querySelectorAll('.todo-list input.edit');
    editInputs.forEach(function (input) {
      // 遍历编辑文本框 注册事件
      input.addEventListener('blur', function () {
        edit(this);
      });

      input.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
          edit(this);
        }

        if (e.key === 'Escape') {
          editedTodo.text = beforeEditCache;
          editedTodo = null;
          load(todos);
        }
      })
    });

    function edit (input) {
      if (editedTodo === null) return;
        editedTodo.text = input.value.trim();
        editedTodo = null;

        const label = input.previousElementSibling.children[1];
        label.parentNode.parentNode.classList.remove('editing');

        if (!input.value) {
          // 删除
          const index = label.dataset.index;
          todos.splice(index, 1);
        }
        load(todos);
    }
  }

  hashchange();

  // 2. 录入待办事项
  const newTodo = document.querySelector('.new-todo');
  newTodo.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      todos.unshift({
        text: this.value,
        completed: false
      });
      this.value = '';
      load(todos);
      setTodos(todos);
    }
  });

  // 3. 删除选中的条目
  todoUL.addEventListener('click', function (e) {
    // 如果点击的是删除按钮
    if (e.target.matches('.destroy')) {
      const btn = e.target
      // 把当前数据从数组中删除
      // const label = btn.previousElementSibling;
      // const index = todos.findIndex(function (item) {
      //   return label.textContent === item.text;
      // });
      // todos.splice(index, 1);

      const label = btn.previousElementSibling;
      const index = label.dataset.index;
      todos.splice(index, 1);
      load(todos);
      setTodos(todos);

      // 把当前 li 从 ul 中移除
      // btn.parentNode.parentNode.remove();
    }

    // 如果点击的是 checkbox
    if (e.target.matches('.toggle')) {
      const chk = e.target;
      const label = chk.nextElementSibling;
      const index = todos.findIndex(function (item) {
        return label.textContent === item.text;
      });
      todos[index].completed = e.target.checked;
      load(todos);
      setTodos(todos);
    }
    setUnCompletedCount(todos);
  })

  // 4. 全选，点击某一项前面的checkbox改变完成状态
  const toggleAll = document.querySelector('#toggle-all');
  toggleAll.addEventListener('click', function (e) {
    // console.log(e.target.checked);
    const chks = document.querySelectorAll('.toggle');
    chks.forEach(function (chk) {
      chk.checked = e.target.checked;
    });
    setTodos(todos);

    setUnCompletedCount(todos);
  });

  // 5. 显示未完成项目条数
  function setUnCompletedCount(todos) {
    const count = todos.filter(function (todo) {
      return !todo.completed;
    }).length;

    const strong = document.querySelector('.todo-count strong');
    strong.textContent = count;
  }

  
  // 6. 双击实现编辑功能
  todoUL.addEventListener('dblclick', function (e) {
    if (e.target.matches('.todo-list li label')) {
      const label = e.target;
      label.parentNode.parentNode.classList.add('editing');
      // 保存当前要编辑的 todo
      const index = label.dataset.index;
      editedTodo = todos[index];
      beforeEditCache = todos[index]?.text;
    }
  });

  // 6. 清除所有完成项目
  const clearBtn = document.querySelector('.clear-completed');
  clearBtn.addEventListener('click', function () {
    todos = todos.filter(function (todo) {
      return !todo.completed;
    })
    setTodos(todos);
    load(todos);
  });

  // 7. 切换状态
  window.addEventListener('hashchange', hashchange);

  function hashchange () {
    const filterLis = document.querySelectorAll('.filters a');
    // 设置当前项的选中状态
    filterLis.forEach(function (link) {
      link.classList.remove('selected');
      if (link.href.endsWith(location.hash)) {
        link.classList.add('selected');
      }
    });

    const newTodos = todos.filter(function (todo) {
      switch (location.hash) {
        case '#/':
          return true;
        case '#/active':
          return !todo.completed;
        case '#/completed':
          return todo.completed;
        default:
          return true;
      }
    })
    load(newTodos);
  }
  hashchange();


  // 8. 本地存储
  // 添加的时候
  // 修改的时候
  // 删除的时候
  // 加载的时候
  // 修改状态的时候

  function setTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function getTodos() {
    return JSON.parse(localStorage.getItem('todos')) || [];
  }
})(window);
