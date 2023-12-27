
var id = null
var temp = sessionStorage.getItem('id')
if (temp > 0) {
    id = sessionStorage.getItem('id')
} else {
    sessionStorage.setItem('id', 1)
}

function todo() {
    var sessionId = sessionStorage.getItem('id')
    var todoInput = document.getElementById('todo-input').value

    var date = new Date()
    var currentDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()

    if (todoInput.length === 0) {
        console.log("empty");
    } else {
        sessionId++
        sessionStorage.setItem('id', sessionId)
        sessionStorage.setItem('todo-' + sessionId, JSON.stringify({ date: currentDate, id: sessionId, todo: todoInput, checkFlag: null }))
        document.getElementById('todo-input').value = null;
        display_todo_list();
    }
}

function display_todo_list() {
    var displayTodoList = document.getElementById('display-todo-list')
    displayTodoList.innerHTML = '';
    var id = sessionStorage.getItem('id')

    var table = document.createElement('table');

    for (let index = 1; index <= id; index++) {
        var data = JSON.parse(sessionStorage.getItem('todo-' + index))

        console.log(data)
        if (data) {
            var row = table.insertRow(-1);

            var checkCell = row.insertCell(0);
            var todoCell = row.insertCell(1);
            var dateCell = row.insertCell(2);
            var actionCell = row.insertCell(3);

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = index;
            checkbox.onchange = function () {
                check_todo(index);
            };

            checkCell.appendChild(checkbox);
            todoCell.innerHTML = data.todo;
            dateCell.innerHTML = data.date;
            var checkFlag = data.checkFlag;

            if (index === checkFlag) {
                todoCell.style = "text-decoration:line-through";
                checkbox.checked = true;
            }

            actionCell.innerHTML = `<button id='delete-${index}' onclick='delete_todo(${index})' style='background-color: white'><i class="fa-solid fa-trash" style="font-size:20px;color:red;"></i></button>`;
        }

    }
    displayTodoList.appendChild(table);
}

function check_todo(id) {
    var todoId = 'todo-' + id;
    var data = JSON.parse(sessionStorage.getItem(todoId))
    if (data.checkFlag == null) {
        sessionStorage.setItem('todo-' + id, JSON.stringify({ date: data.date, id: data.id, todo: data.todo, checkFlag: id }))
        display_todo_list();
        return 1
    }
    if (data.checkFlag != null) {
        sessionStorage.setItem('todo-' + id, JSON.stringify({ date: data.date, id: data.id, todo: data.todo, checkFlag: null }))
        display_todo_list();
        return 0
    }
}

function delete_todo(id) {
    var todoId = 'todo-' + id;
    console.log(todoId);
    sessionStorage.removeItem(todoId)
    display_todo_list();
    console.log('Todo deleted');
}