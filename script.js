let tasks = []
if (localStorage.getItem('tasks') !== null) {
  tasks = tasks.concat(JSON.parse(localStorage.getItem('tasks')))
}

const ul = document.querySelector('ul')

function renderTask (data) {
  const li = document.createElement('li')
  li.classList.add(data.split(' ').join('-').toLowerCase())
  ul.appendChild(li)
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.classList.add('checkbox')
  li.appendChild(checkbox)
  const text = document.createElement('span')
  li.appendChild(text)
  text.innerHTML = data
  checkbox.addEventListener('change', function () {
    ul.removeChild(checkbox.parentNode)
    removeTask(checkbox.parentNode.classList[0])
  })
}

function addTask (taskName) {
  tasks.push(taskName)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  renderTask(taskName)
}

function removeTask (taskName) {
  let i = 0
  let j = 1
  tasks.forEach(function (task) {
    i += j
    if (task.split(' ').join('-').toLowerCase() === taskName) {
      j = 0
    }
  })
  tasks.splice(i - 1, 1)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

addEventListener('load', function () {
  if (tasks.length !== 0) {
    tasks.forEach(function (task) {
      renderTask(task)
    })
  }
})

const checkboxes = document.querySelectorAll('input.checkbox')
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    removeTask(checkbox.parentNode.classList[0])
  })
})

const main = document.getElementById('main')
main.style.height = innerHeight
window.addEventListener('resize', function () {
  main.style.height = innerHeight
})

const addButton = document.querySelector('#main > button')
const addTaskPrompt = document.querySelector('.add-task-prompt')
const addTaskInput = document.querySelector('.add-task-prompt > input')
const addTaskCancelButton = document.querySelector('.add-task-prompt > .buttons-container > #cancel')
const addTaskButton = document.querySelector('.add-task-prompt > .buttons-container > #add')

addButton.addEventListener('click', function () {
  addTaskPrompt.classList.add('active')
})
addTaskCancelButton.addEventListener('click', function () {
  addTaskPrompt.classList.remove('active')
})
addTaskButton.addEventListener('click', function () {
  if (addTaskInput.value === '') {
    addTaskInput.value = ' '
  }
  addTask(addTaskInput.value)
  addTaskInput.value = ''
  addTaskPrompt.classList.remove('active')
})
