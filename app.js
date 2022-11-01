const textbox = document.querySelector('.textbox-todo')
const addBtn = document.querySelector('.add')
const todoParagraph = document.querySelector('.toDo-container2')
const editTask = document.querySelector('.editTask')

function addItems() {
    let records = sessionStorage.getItem('todo')
    let textValue = textbox.value
    let result = textValue.trim()
    if(result !== '') {
        let todoList = []
        if(records === null) {
            todoList = []
        }else {
            todoList = JSON.parse(records)
        }
        
        todoList.push(textValue)
        sessionStorage.setItem('todo', JSON.stringify(todoList))
    }
    textbox.value = ''
    fetchData()
}

addBtn.addEventListener('click', addItems)  

function fetchData() {
    let records = sessionStorage.getItem("todo")
    let todoList
    if(records === null) {
        todoList = []
    }else {
        records = JSON.parse(records)
    }

    let Addhtml = ``
    if(records !== null) {
        records.forEach((arr,index) => {
            Addhtml += `<div class="todo-paragraph" data-id=${index}>
                            <p data-id=${index}>${records[index]}</p>
                            <input type="checkbox" name="delete-todo" class="delete" data-id=${index}>
                            <button class="editbtn" data-id=${index}><i class="fa-solid fa-pen-to-square"></i></button>
                        </div>
                    `
            todoParagraph.innerHTML = Addhtml
        })
    } else {
        Addhtml += `<div class="todo-paragraph">
                        <p>Todo List is empty...</p>
                    </div>`
        todoParagraph.innerHTML = Addhtml
    }

    const editbtn = document.querySelectorAll('.editbtn')
    const todoParagraph2 = document.querySelectorAll('.todo-paragraph p')
    
    editbtn.forEach((arr,index) => {
        editbtn[index].addEventListener('click', () => {
            textbox.value = todoParagraph2[index].innerHTML
            addBtn.style.display = 'none'
            editTask.style.display = 'block'
            editTask.setAttribute('data-id', index)         
        })
    })

    function editTaskFun() {
        let records = sessionStorage.getItem('todo')
        let textValue = textbox.value
        let result = textValue.trim()
        let editData = editTask.getAttribute('data-id')
       
        if(result !== '') {
            let todoList = []
            todoList = JSON.parse(records)
            todoList[editData] = textValue
            sessionStorage.setItem('todo', JSON.stringify(todoList))
        }
        textbox.value = ''
        addBtn.style.display = 'block'
        editTask.style.display = 'none'
        fetchData()
    }
    editTask.addEventListener('click',editTaskFun)

    let deletebtn = document.querySelectorAll('.delete')
    
    deletebtn.forEach((arr,index) => {
        deletebtn[index].addEventListener('change', () => {
            if(deletebtn[index].checked) {
                removeItems(index)
            }
        })
    })
}

function removeItems(index) {
    const todoParagraph2 = document.querySelectorAll('.todo-paragraph p')
    let records = sessionStorage.getItem('todo')
    todoList = JSON.parse(records);
    
    if(todoList.length <= 1) {
        todoList.pop()
        todoParagraph2[index].classList.add('strickParagraph')
        sessionStorage.removeItem('todo')
    }else {
        todoList.splice(index,1)
        todoParagraph2[index].classList.add('strickParagraph')
        sessionStorage.setItem('todo',JSON.stringify(todoList))
    }
    setTimeout(fetchData,800)
}

window.addEventListener('load',fetchData)