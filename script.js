let tasks = []

const taskContainer = document.getElementById('taskContainer')
const taskValue = document.getElementById('taskValue')
const plusButton = document.getElementById('plusButton')

const lis = document.querySelectorAll('li')

function loadTasks () {
  if (
    localStorage.getItem('tasks') !== null
  ) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
}

function addTask (taskName) {
  const task = {
    id: new Date().getTime(),
    name: taskName
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  displayTask(task)
}

function deleteTask (taskId) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      tasks.splice(i, 1)
      break
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function displayTask (task) {
  const li = document.createElement('li')
  taskContainer.appendChild(li)
  li.dataset.id = task.id
  
  const checkbox = document.createElement('input')
  li.appendChild(checkbox)
  checkbox.type = 'checkbox'
  
  const span = document.createElement('span')
  li.appendChild(span)
  span.innerHTML = task.name
  
  checkbox.onchange = function () {
    deleteTask(parseInt(li.dataset.id))
    taskContainer.removeChild(li)
  }
  
  //Bootstrap styles
  li.classList.add('list-group-item')
  checkbox.classList.add('form-check-input', 'me-2')
  span.classList.add('form-check-label')
}

window.onload = function () {
  loadTasks()
  if (tasks.length !== 0) {
    tasks.forEach(function (task) {
      displayTask(task)
    })
  }
  plusButton.onclick = function () {
    if (taskValue.value === '') {
      taskValue.value = ' '
    }
    addTask(taskValue.value)
    taskValue.value = ''
  }
}
