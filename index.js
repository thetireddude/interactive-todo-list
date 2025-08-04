const input = document.querySelector('#input-todo')
const addBtn = document.querySelector('#addBtn')

const todos = []

const test = document.getElementById('test')

const todoList = document.querySelector('ul.todo-list')



loadJSON()

addBtn.addEventListener('click', addTodo)

function addTodo() {
    const text = input.value
    // test.innerHTML += `<h1>${text}</h1>`
    todoList.innerHTML += `
        <li class="todo">
            <input type="checkbox" id="${text}">
            <label for="${text}">${text}</label>
        </li>
    `
    input.value = ''

    todos.push(text)
    storeJSON()
}

function loadJSON() {
    const json = localStorage.getItem('todos')
    console.log(`stored json:\n ${json}`)

    if (json!= null) {
        const list = JSON.parse(json)

        for (const x of list){
            // test.innerHTML += `<h1>${x}</h1>`
            todoList.innerHTML += `
                <li class="todo">
                    <input type="checkbox" id="${x}">
                    <label for="${x}">${x}</label>
                </li>
            `
            todos.push(x)
        }
    }
}

function storeJSON() {
    const json = JSON.stringify(todos)
    localStorage.setItem('todos', json)
    console.log(json)
}

