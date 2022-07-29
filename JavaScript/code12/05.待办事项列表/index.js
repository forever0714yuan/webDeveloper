// ● 待办事项列表
let todos = getTodos();

// 记录当前编辑行对应的todo项
let editingTodo = null;
// 当前编辑项的text
let currentEditing = '';

function loadTodos(todos) {
  const todoList = document.querySelector('.todo-list');
  const todoArr = [];
  todos.forEach(function (todo, index) {
    todoArr.push(
      '<li class="'+ (todo.completed ? 'completed' : '') + (editingTodo === todo ? ' editing' : '') +'">' +
      ' <div class="view">' +
      '   <input class="toggle" data-index="'+ index +'" type="checkbox" '+ (todo.completed ? 'checked' : '') +'>' +
      '   <label data-index="'+ index +'">'+ todo.text +'</label>' +
      '   <button data-index="'+ index +'" class="destroy"></button>' +
      ' </div>' +
      ' <input class="edit" data-index="'+ index +'" value="'+ todo.text +'">' +
      '</li>'
    )
  });
  todoList.innerHTML = todoArr.join('');

  // 显示未完成待办事项数目
  getUncompletedCount(todos);

  // 判断清除完成项按钮是否显示
  setCompeleted(todos);
}

loadTodos(todos);

// ● 录入待办事项
// 获取录入文本框
const txtNewTodo = document.querySelector('.new-todo');
txtNewTodo.onkeyup = function (e) {
  if (e.key === 'Enter') {
    if (this.value.length === 0) return;
    todos.unshift({
      text: this.value,
      completed: false
    });
    loadTodos(todos);

    this.value = '';

    setTodos(todos);
  }
};


// ● 删除选中的条目
// 使用事件委托，给ul注册事件
const todoList = document.querySelector('.todo-list');
todoList.onclick = function (e) {
  // 在生成列表的时候，给li记录一个索引，获取索引从数组中删除
  if (e.target.matches('.destroy')) {
    const index = e.target.dataset.index;
    todos.splice(index, 1);
    loadTodos(todos);

    setTodos(todos);

  }

  // 点击所有子的checkbox
  if (e.target.matches('.toggle')) {
    // 判断选中状态
    const count = document.querySelectorAll('.toggle').length;
    const checkedCount = document.querySelectorAll('.toggle:checked').length;
    const chkAll = document.querySelector('#toggle-all');
    chkAll.checked = count === checkedCount;
    const index = e.target.dataset.index;
    todos[index].completed = e.target.checked;
    loadTodos(todos);

    setTodos(todos);

  }
};

// ● 全选待办事项
const chkToggleAll = document.querySelector('#toggle-all');
chkToggleAll.onclick = function () {
  const that = this;
  todos.forEach(function (todo) {
    todo.completed = that.checked;
  });
  loadTodos(todos);
  setTodos(todos);

};

// 点击所有子的checkbox

// ● 显示未完成的条目
function getUncompletedCount(todos) {
  const count = todos.filter(function (todo) {
    return !todo.completed;
  }).length;
  document.querySelector('.todo-count strong').textContent = count;
}

// ● 实现编辑功能
todoList.ondblclick = function (e) {
  // 在生成列表的时候，给li记录一个索引，获取索引从数组中删除
  if (e.target.matches('.todo-list li label')) {
    const index = e.target.dataset.index;
    
    const todo = todos[index];
    editingTodo = todo;
    currentEditing = todo.text;
    loadTodos(todos);
  }
};

todoList.onkeyup = function (e) {
  if (!e.target.matches('.todo-list li .edit')) return;

  if (e.key === 'Enter') {
    edit(e.target);
  }

  if (e.key === 'Escape') {
    currentEditing = editingTodo.text;
    editingTodo = null;
    loadTodos(todos);
  }
}

function edit(txtEdit) {
  if (!editingTodo) return;

  editingTodo.text = txtEdit.value.trim();
  editingTodo = null;
  currentEditing = '';

  if (txtEdit.value.length === 0) {
    const index = txtEdit.dataset.index;
    todos.splice(index, 1);
  }
  loadTodos(todos);
  setTodos(todos);

}


// ● 清除所有完成项
function setCompeleted(todos) {
  const count = todos.filter(function (todo) {
    return todo.completed;
  }).length;
  // 判断清除清除完成项按钮是否显示
  const btn = document.querySelector('.clear-completed');
  if (count > 0) {
    btn.style.display = '';
  } else {
    btn.style.display = 'none';
  }
}

const btn = document.querySelector('.clear-completed');
btn.onclick = function () {
  todos = todos.filter(function (todo) {
    return !todo.completed;
  });
  loadTodos(todos);
  setTodos(todos);

};

// ● 切换状态
window.addEventListener('hashchange', handleHashChange);
function handleHashChange() {
  const links = document.querySelectorAll('.filters a');
  links.forEach(function (link) {
    const index = link.href.indexOf('#');
    const hash = link.href.substr(index);
    link.classList.remove('selected');
    if (hash === location.hash) {
      link.classList.add('selected');
    };
  });

  const newTodos = todos.filter(function (todo) {
    switch (location.hash) {
      case '#/':
        return true;
      case '#/active':
        return !todo.completed;
      case '#/completed':
        return todo.completed;
    }
  });
  loadTodos(newTodos);
}


// ● 存储待办事项
function setTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  return JSON.parse(localStorage.getItem('todos')) || [];
}