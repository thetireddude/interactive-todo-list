const input = document.querySelector('#input-todo')
const addBtn = document.querySelector('#addBtn')
const todoList = document.querySelector('ul.todo-list')
const clearBtn = document.querySelector('button.clear')
const summary = document.querySelector('.todo-summary')
const emptyState = document.querySelector('.empty-state')

let todos = []

loadJSON()

addBtn.addEventListener('click', addTodo)

clearBtn.addEventListener('click', () => {
    todos = []
    storeJSON()
    todoList.replaceChildren()
    renderStatus()
})

function renderStatus() {
    const total = todos.length
    const completed = todos.filter((todo) => todo.completed).length
    const active = total - completed

    summary.textContent = `${active} active • ${completed} done`

    if (total === 0) {
        emptyState.classList.remove('hidden')
    } else {
        emptyState.classList.add('hidden')
    }
}

function deleteTodo(child, id) {
    child.remove()

    const idx = todos.findIndex((todo) => todo.id === id)
    if (idx >= 0) {
        todos.splice(idx, 1)
    }
    storeJSON()
    renderStatus()
}

function editTodo(child, id) {
    const hidden = child.querySelector('.edit-hide')
    hidden.style.display = 'none'

    const childText = child.querySelector('.text')
    const todoText = childText.textContent.trim()

    const newChild = document.createElement('div')
    newChild.innerHTML = '<input type="text" id="textbox">'
    newChild.className = 'input-edit'
    const textbox = newChild.querySelector('#textbox')
    textbox.value = todoText

    child.appendChild(newChild)
    textbox.focus()

    textbox.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const updatedTodo = textbox.value.trim()
            if (updatedTodo.length === 0) {
                return
            }

            childText.innerHTML = `${updatedTodo}`

            const idx = todos.findIndex((todo) => todo.id === id)
            if (idx >= 0) {
                todos[idx].text = updatedTodo
            }
            storeJSON()

            newChild.remove()
            hidden.style.display = 'flex'
        }
    })
}

function toggleTodo(id, checked, item) {
    const idx = todos.findIndex((todo) => todo.id === id)
    if (idx >= 0) {
        todos[idx].completed = checked
    }

    if (checked) {
        item.classList.add('completed')
    } else {
        item.classList.remove('completed')
    }

    storeJSON()
    renderStatus()
}

function createTodoElement(todo) {
    const item = document.createElement('li')
    item.className = `todo ${todo.completed ? 'completed' : ''}`
    item.innerHTML =
    `
        <div class="edit-hide">
            <label class="checkbox-label">
                <input type="checkbox" id="${todo.id}" ${todo.completed ? 'checked' : ''}>
                <i class="fa-regular fa-square unchecked"></i>
                <i class="fa-regular fa-square-check checked"></i>
                <div class="text">${todo.text}</div>
            </label>
            <div class="todo-buttons">
                <button class="delete-todo" aria-label="Delete todo"><i class="fa-solid fa-trash-can"></i></button>
                <button class="edit-todo" aria-label="Edit todo"><i class="fa-solid fa-pen-to-square"></i></button>
            </div>
        </div>
    `

    const checkbox = item.querySelector('input[type="checkbox"]')
    const delBtn = item.querySelector('.delete-todo')
    const editBtn = item.querySelector('.edit-todo')

    checkbox.addEventListener('change', (event) => toggleTodo(todo.id, event.target.checked, item))
    delBtn.addEventListener('click', () => deleteTodo(item, todo.id))
    editBtn.addEventListener('click', () => editTodo(item, todo.id))

    return item
}

function addTodo() {
    const text = input.value.trim()
    if (!text) {
        return
    }

    input.value = ''

    const todo = {
        id: crypto.randomUUID(),
        text,
        completed: false,
    }

    todoList.appendChild(createTodoElement(todo))
    todos.push(todo)

    storeJSON()
    renderStatus()
}

function loadJSON() {
    const json = localStorage.getItem('todos')

    if (json != null) {
        const parsed = JSON.parse(json)

        todos = parsed.map((todo) => {
            if (typeof todo === 'string') {
                return { id: crypto.randomUUID(), text: todo, completed: false }
            }

            return {
                id: todo.id ?? crypto.randomUUID(),
                text: todo.text ?? '',
                completed: Boolean(todo.completed),
            }
        }).filter((todo) => todo.text)

        for (const todo of todos) {
            todoList.appendChild(createTodoElement(todo))
        }
    }

    renderStatus()
}

function storeJSON() {
    const json = JSON.stringify(todos)
    localStorage.setItem('todos', json)
}
