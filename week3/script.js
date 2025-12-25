// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearAllBtn = document.getElementById('clearAllBtn');

let tasks = loadTasks();
renderTasks();

// Add task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if(taskText === '') return;
  
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };
  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = '';
});

// Toggle completed
taskList.addEventListener('click', (e) => {
  if(e.target.tagName === 'LI') {
    const id = Number(e.target.dataset.id);
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    saveTasks();
    renderTasks();
  }
});

// Delete task
taskList.addEventListener('click', (e) => {
  if(e.target.classList.contains('deleteBtn')){
    const id = Number(e.target.parentElement.dataset.id);
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
  }
});

// Clear all
clearAllBtn.addEventListener('click', () => {
  if(confirm('Are you sure you want to clear all tasks?')){
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

// Render tasks
function renderTasks(){
  taskList.innerHTML = '';
  if(tasks.length === 0){
    taskList.innerHTML = '<li style="text-align:center; color:#6b7280;">No tasks yet</li>';
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.dataset.id = task.id;
    if(task.completed) li.classList.add('completed');

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'deleteBtn';
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });
}

// Save to localStorage
function saveTasks(){
  localStorage.setItem('todo_tasks', JSON.stringify(tasks));
}

// Load from localStorage
function loadTasks(){
  const data = localStorage.getItem('todo_tasks');
  return data ? JSON.parse(data) : [];
}
