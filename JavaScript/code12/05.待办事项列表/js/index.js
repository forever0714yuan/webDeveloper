'use strict';
// ● 待办事项列表

let todos = [
    { text: '吃饭', done: true },
    { text: '睡觉', done: false },
    { text: '打豆豆', done: false }
]

// 记录当前编辑操作的todo
let editingTodo = null;

// 记录当前编辑的之前的内容
let editingTodoText = '';

// 实际开发函数的时候，减少依赖全局变量
function loadTodos(todos) {
    const todoListUl = document.querySelector('.todo-list');

    let arr = [];

    todos.forEach((todo, index) => {
        arr.push(
            '<li class="' + (todo.done ? 'completed' : '') + (todo === editingTodo ? ' editing' : '') + '">' +
            '    <div class="view">' +
            '        <input class="toggle" data-index="' + index + '" type="checkbox"' + (todo.done ? 'checked' : '') + '>' +
            '            <label data-index="' + index + '">' + todo.text + '</label>' +
            '            <button data-index="' + index + '" class="destroy"></button>' +
            '    </div>' +
            '    <input class="edit" value="' + todo.text + '">' +
            '</li>'
        )
    })
    todoListUl.innerHTML = arr.join('')
    // 未完成的个数
    setUncompeletedCount(todos);
}

loadTodos(todos);

// ● 录入待办事项
const newTodo = document.querySelector('.new-todo');

newTodo.onkeyup = function (e) {

    if (e.key !== 'Enter') return;

    // 把新录入的代办事项添加到事项数组中
    todos.unshift({
        text: this.value,
        done: false
    });

    // 重新加载列表
    loadTodos(todos);

    // 清空文本框
    this.value = '';
}

// ● 删除选中的条目
const todoListUl = document.querySelector('.todo-list');

// 把删除按钮的点击事件通过事件委托，注册给父元素
todoListUl.onclick = function (e) {
    // 判断当前点击的是否是destroy
    if (e.target.matches('.destroy')) {
        // 获取到index
        let index = e.target.dataset.index;

        // 将数据从数组中删除
        todos.splice(index, 1);

        // 重新加载页面
        loadTodos(todos);
    }

    // 2.点击 子CheckBox ，如果有 子CheckBox 有一项没有选中，父CheckBox 就不选中

    if (e.target.matches('.toggle')) {
        // 获取点击的子checkbox,对应在数组中的索引
        const index = e.target.dataset.index;
        // 根据索引获取数组中对应的代办事项
        const todo = todos[index];
        // 更改代办事项的完成状态，和checkbox 的选中状态一直
        todo.done = e.target.checked

        // 重新加载列表
        loadTodos(todos);

        const chkCount = document.querySelectorAll('.todo-list li .toggle').length;
        const chkCheckedCount = document.querySelectorAll('.todo-list li .toggle:checked').length;
        toggleAll.checked = chkCount === chkCheckedCount;
    }

}

// ● 全选待办事项
// 1.点击全选按钮，让所有的子CheckBox和按钮的选中状态保持一致

const toggleAll = document.querySelector('.toggle-all');
// 1.1 点击全选按钮，触发点击事件
toggleAll.onclick = function () {

    // 1.2 修改所有子元素 checkbox 的状态，将其状态修改的和父元素的状态一直
    // 设置所有代办事项的状态
    todos.forEach((todo) => {
        todo.done = this.checked;
    })
    // 1.3 修改数据之后，重新加载数据，重新渲染
    // 重新加载
    loadTodos(todos);
}


// ● 显示未完成的条目
function setUncompeletedCount(todos) {
    // 获取未完成的个数
    const count = todos.filter((todo) => {
        return !todo.done
    }).length;

    document.querySelector('.todo-count strong').textContent = count
}
// ● 实现编辑功能
// 1.给label 注册双击事件，可以通过事件委托，委托给父元素 ul
todoListUl.ondblclick = function (e) {
    // 判断当前点击事件的是label
    if (e.target.matches('.todo-list li label')) {
        // 获取当前label对应的索引
        const index = e.target.dataset.index;

        // 记录代办事件
        editingTodo = todos[index];
        editingTodoText = editingTodo.text;

        loadTodos(todos);
    }
}

// ● 清除所有完成项
// ● 切换状态
// ● 存储待办事项