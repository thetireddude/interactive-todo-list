const input = document.querySelector('#input-todo')
const addBtn = document.querySelector('#addBtn')
const todoList = document.querySelector('ul.todo-list')
const clearBtn = document.querySelector('button.clear')


let todos = []

// localStorage.clear()

loadJSON()

addBtn.addEventListener('click', addTodo)

clearBtn.addEventListener('click', () => {
    todos.splice(0)
    localStorage.clear()
    todoList.replaceChildren()
})


function deleteTodo(event, child, id) {
    child.remove()

    const idx = todos.indexOf(id)
    todos.splice(idx, 1)
    storeJSON()

    console.log(todos)

}

function addTodo() {
    const text = input.value
    input.value = ''

    const newChild = document.createElement('li')
    newChild.className = "todo"
    newChild.innerHTML = 
    `
            <input type="checkbox" id="${text}">
            <label for="${text}">${text}</label>
            <div><button class="delete-todo"><i class="fa-solid fa-trash-can"></i></button></div>
    `
    todoList.appendChild(newChild)
    todos.push(text)
    console.log(todos)


    const li = todoList.lastElementChild
    const delBtn = li.querySelector('.delete-todo')
    delBtn.addEventListener('click', () => deleteTodo(event, newChild, text))

    storeJSON()
}

function loadJSON() {
    const json = localStorage.getItem('todos')
    console.log(`stored json:\n ${json}`)

    if (json!= null) {
        const list = JSON.parse(json)

        for (const x of list){
            const newChild = document.createElement('li')
            newChild.className = "todo"
            newChild.innerHTML = 
            `
                    <input type="checkbox" id="${x}">
                    <label for="${x}">${x}</label>
                    <div><button class="delete-todo"><i class="fa-solid fa-trash-can"></i></button></div>
            `
            todoList.appendChild(newChild)
            todos.push(x)
            console.log(todos)

            const li = todoList.lastElementChild
            const delBtn = li.querySelector('.delete-todo')
            delBtn.addEventListener('click', () => deleteTodo(event, newChild, x))

        }
    }
}

function storeJSON() {
    const json = JSON.stringify(todos)
    localStorage.setItem('todos', json)
    console.log(`updated json: ${json}`)
}

