const taskInput = document.getElementById('taskInput');
const taskList = document.querySelector('main');
const toggleListButton = document.getElementById('toggleList');
const filterAll = document.querySelector('.filters .all');
const filterActive = document.querySelector('.filters .active');
const filterCompleted = document.querySelector('.filters .completed');
const clearCompletedButton = document.querySelector('.clearCompletedTasks');
const filterButtons = document.querySelectorAll('.filters .links');

let tasks = [];

toggleListButton.addEventListener('click', function () {
    if (taskList.style.display === 'none' || taskList.style.display === '') {
        taskList.style.display = 'block';
    } else {
        taskList.style.display = 'none';
    }
});

function updateTaskCounter() {
    const taskCounter = document.querySelector('.filters .task-counter');
    const activeTasks = tasks.filter(task => !task.completed).length;
    taskCounter.textContent = `${activeTasks} item${activeTasks === 1 ? '' : 's'} left`;

    const completedTasks = tasks.filter(task => task.completed);
    if (completedTasks.length > 0) {
        clearCompletedButton.style.display = 'inline';
    } else {
        clearCompletedButton.style.display = 'none';
    }
}

function filterTasks(filter) {
    taskList.innerHTML = '';

    let tasksToDisplay;

    if (filterActive.classList.contains('activeLinks')) {
        tasksToDisplay = tasks.filter(task => !task.completed);
    } else if (filterCompleted.classList.contains('activeLinks')) {
        tasksToDisplay = tasks.filter(task => task.completed);
    } else {
        tasksToDisplay = tasks;
    }

    tasksToDisplay.forEach(task => {
        createTaskElement(task, filter);
    });
}

function createTaskElement(task, filter) {
    const newTask = document.createElement('div');
    newTask.className = 'task';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = task.completed;
    newTask.appendChild(checkbox);

    const taskText = document.createElement('p');
    taskText.textContent = task.text;
    if (task.completed) {
        taskText.style.textDecoration = 'line-through';
        taskText.style.color = 'rgba(128, 128, 128, 0.3)';
    }
    newTask.appendChild(taskText);

    checkbox.addEventListener('change', function () {
        task.completed = checkbox.checked;
        if (task.completed) {
            taskText.style.textDecoration = 'line-through';
        } else {
            taskText.style.textDecoration = 'none';
            taskText.style.color = 'inherit';
        }
        
        updateTaskCounter();
        saveTasks();
        filterTasks(filter);
    });

    if (filterActive.classList.contains('activeLinks') && task.completed) {
        newTask.style.display = 'none';
    } else if (filterCompleted.classList.contains('activeLinks') && !task.completed) {
        newTask.style.display = 'none';
    }

    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', function () {
        tasks = tasks.filter(t => t !== task);
        newTask.remove();
        updateTaskCounter();
        saveTasks();
    });
    newTask.appendChild(deleteButton);

    newTask.addEventListener('mouseenter', function () {
        deleteButton.style.display = 'inline';
    });

    newTask.addEventListener('mouseleave', function () {
        deleteButton.style.display = 'none';
    });

    taskList.appendChild(newTask);
}

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    const activeLinks = Array.from(filterButtons).filter(button => button.classList.contains('activeLinks'));
    if (activeLinks.length === 0) {
        filterAll.classList.add('activeLinks');
    }
    filterTasks(filterAll.classList.contains('activeLinks') ? 'all' : filterActive.classList.contains('activeLinks') ? 'active' : 'completed');
    updateTaskCounter();

    const completedTasks = tasks.filter(task => task.completed);
    if (completedTasks.length > 0) {
        clearCompletedButton.style.display = 'inline';
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter' && taskInput.value.trim() !== '') {
        const task = {
            text: taskInput.value,
            completed: false,
        };
        tasks.push(task);
        createTaskElement(task, filterAll.classList.contains('activeLinks') ? 'all' : filterActive.classList.contains('activeLinks') ? 'active' : 'completed');
        taskInput.value = '';
        updateTaskCounter();
        saveTasks();
    }
});

filterAll.addEventListener('click', () => {
    filterButtons.forEach(button => button.classList.remove('activeLinks'));
    filterAll.classList.add('activeLinks');
    filterTasks('all');
});

filterActive.addEventListener('click', () => {
    filterButtons.forEach(button => button.classList.remove('activeLinks'));
    filterActive.classList.add('activeLinks');
    filterTasks('active');
});

filterCompleted.addEventListener('click', () => {
    filterButtons.forEach(button => button.classList.remove('activeLinks'));
    filterCompleted.classList.add('activeLinks');
    filterTasks('completed');
});

clearCompletedButton.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    filterTasks(filterAll.classList.contains('activeLinks') ? 'all' : filterActive.classList.contains('activeLinks') ? 'active' : 'completed');
    updateTaskCounter();

    const completedTasks = tasks.filter(task => task.completed);
    if (completedTasks.length > 0) {
        clearCompletedButton.style.display = 'inline';
    } else {
        clearCompletedButton.style.display = 'none';
    }

    saveTasks();
});

clearCompletedButton.style.display = 'none';

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    const activeLinks = Array.from(filterButtons).filter(button => button.classList.contains('activeLinks'));
    if (activeLinks.length === 0) {
        filterAll.classList.add('activeLinks');
    }
    filterTasks(filterAll.classList.contains('activeLinks') ? 'all' : filterActive.classList.contains('activeLinks') ? 'active' : 'completed');
    updateTaskCounter();

    const completedTasks = tasks.filter(task => task.completed);
    if (completedTasks.length > 0) {
        clearCompletedButton.style.display = 'inline';
    } else {
        clearCompletedButton.style.display = 'none';
    }
}