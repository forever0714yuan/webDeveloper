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

    todos && todos.forEach((todo, index) => {
        arr.push(
            '<li class="' + (todo.done ? 'completed' : '') + (todo === editingTodo ? ' editing' : '') + '">' +
            '    <div class="view">' +
            '        <input class="toggle" data-index="' + index + '" type="checkbox"' + (todo.done ? 'checked' : '') + '>' +
            '            <label data-index="' + index + '">' + todo.text + '</label>' +
            '            <button data-index="' + index + '" class="destroy"></button>' +
            '    </div>' +
            '    <input class="edit"  data-index="' + index + '" value="' + todo.text + '">' +
            '</li>'
        )
    })
    todoListUl.innerHTML = arr.join('')
    // 3. 给编辑按钮注册blur 事件
    const txtEdit = document.querySelectorAll('.edit');
    txtEdit.forEach((txt) => {
        txt.onblur = function () {
            editTdo(this)
        }
    })

    // 未完成的个数
    setUncompeletedCount(todos);
    //清除功能
    setCompletedBtn();

    // 获取本地存储
    getStorage();

    // 持久性存储
    setStorage(todos);
}
// 持久性存储
// 获取本地存储
getStorage();
setStorage(todos);
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

    // 持久性存储
    setStorage(todos);
    // 重新加载列表
    loadTodos(todos);

    // 清空文本框
    this.value = '';
    // 持久性存储
    setStorage(todos);
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
    // 持久性存储
    setStorage(todos);

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
    // 持久性存储
    setStorage(todos);
}


// ● 显示未完成的条目
function setUncompeletedCount(todos) {
    // 获取未完成的个数
    const count = todos && todos.filter((todo) => {
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
        // 在此处，等着列表渲染完毕，获取正咋编辑的文本框，让它获得焦点
        const txts = document.querySelectorAll('.edit');
        const txt = txts[index];
        txt.focus();
    }
}
// 2.给文本注册键盘事件keyup

todoListUl.onkeyup = function (e) {
    console.log(e.key);
    if (!e.target.matches('.edit')) return;
    // 2.1 按Esc 取消编辑，返回原样
    if (e.key === 'Escape') {
        // 不显示编辑文本框
        editingTodo = null;

        // 重新加载
        loadTodos(todos);
    }

    // 2.2 按下回车键或，如果内容是空的就删除，如果内容变化，就更新内容
    if (e.key === 'Enter') {
        editTdo(e.target);
    }
}

// 判断编辑的内容，如果内容改变，更新，如果内容为空，删除
function editTdo(txt) {
    if (txt.value.length === 0) {
        // 获取当前事项对应的索引值
        const index = txt.target.dataset.index;
        todos.splice(index, 1)
    } else {
        console.log('xxx');
        // 将编辑的内容设置给代办事项
        editingTodo.text = txt.value.trim();
        editingTodo = null;
    }
    loadTodos(todos);
    // 持久性存储
    setStorage(todos);
}
// ● 清除所有完成项 
// 1.判断当前todos 是否有被选中的项，如果有，显示清除按钮，如果没有，隐藏清除按钮
function setCompletedBtn() {
    // 获取 done 状态为true的项
    const count = todos && todos.filter((todo) => {
        return todo.done;
    }).length;

    const btn = document.querySelector('.clear-completed');
    if (count === 0) {
        // 隐藏按钮
        btn.style.display = 'none'
    } else {
        // 显示按钮
        btn.style.display = ''
    }
}
// 2. 点击清除按钮，将清除数组中被选中的项
const btn = document.querySelector('.clear-completed');

btn.onclick = function () {
    todos = todos.filter((todo) => {
        return !todo.done
    })
    // 持久性存储
    setStorage(todos);
    loadTodos(todos);
}

// ● 切换状态
// 所有
const selected = document.querySelector('.selected');
const active = document.querySelector('.active');
const completed = document.querySelector('.select-completed');

// 所有的
// 1.监听到地址栏锚点的变化
window.addEventListener('hashchange', function () {
    // 2.切换a标签的激活状态
    const links = document.querySelectorAll('.filters a');
    // 获取地址栏中的hash值
    const hash = location.hash;

    links.forEach((link) => {
        link.classList.remove('selected');

        // 当前锚点对应的a标签激活
        const index = link.href.indexOf('#');
        const href = link.href.substr(index);

        if (hash === href) {
            link.classList.add('selected');
        }
    });
    // 筛选列表中的数据

    const newTodos = todos.filter((todo) => {
        // hash是地址栏中的锚点
        switch (hash) {
            case '#/':
                return true;
            case '#/active':
                return !todo.done;
            case '#/completed':
                return todo.done;
            default:
                break;
        }
    })

    loadTodos(newTodos);
})

// ● 存储待办事项
// 存储本地数据
function setStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}
// 获取本地数据
function getStorage() {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
}
