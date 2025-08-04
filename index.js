const input = document.querySelector('#input-todo')
const addBtn = document.querySelector('#addBtn')

const todos = []

const test = document.getElementById('test')

loadJSON()

addBtn.addEventListener('click', addTodo)

function addTodo() {
    const text = input.value
    test.innerHTML += `<h1>${text}</h1>`
    input.value = ''

    todos.push(text)
    storeJSON()

}


function loadJSON() {
    const json = localStorage.getItem('todos')
    console.log(json)

    if (json!= null) {
        console.log('true')
        const list = JSON.parse(json)

        for (const x of list){
            test.innerHTML += `<h1>${x}</h1>`
            todos.push(x)
        }
    }
}

function storeJSON() {
    const json = JSON.stringify(todos)
    localStorage.setItem('todos', json)
}

