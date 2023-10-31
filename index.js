const taskInput = document.getElementById('taskInput');
const taskList = document.querySelector('main');
const toggleListButton = document.getElementById('toggleList');
const filterAll = document.querySelector('.filters .all');
const filterActive = document.querySelector('.filters .active');
const filterCompleted = document.querySelector('.filters .completed');
const clearCompletedButton = document.querySelector('.clearCompletedTasks');

let tasks = [];

toggleListButton.addEventListener('click', function() {
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

    // Показывать или скрывать "Clear completed" в зависимости от наличия завершенных задач
    const completedTasks = tasks.filter(task => task.completed);
    if (completedTasks.length > 0) {
        clearCompletedButton.style.display = 'inline';
    } else {
        clearCompletedButton.style.display = 'none';
    }
}

function filterTasks(filter) {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        if ((filter === 'active' && !task.completed) || (filter === 'completed' && task.completed) || filter === 'all') {
            createTaskElement(task);
        }
    });
}

function createTaskElement(task) {
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

    checkbox.addEventListener('change', function() {
        task.completed = checkbox.checked;
        if (task.completed) {
            taskText.style.textDecoration = 'line-through';
            taskText.style.color = 'rgba(128, 128, 128, 0.3)';
        } else {
            taskText.style.textDecoration = 'none';
            taskText.style.color = 'inherit';
        }
        updateTaskCounter();
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', function() {
        tasks = tasks.filter(t => t !== task);
        newTask.remove();
        updateTaskCounter();
    });
    newTask.appendChild(deleteButton);

    newTask.addEventListener('mouseenter', function() {
        deleteButton.style.display = 'inline';
    });

    newTask.addEventListener('mouseleave', function() {
        deleteButton.style.display = 'none';
    });

    taskList.appendChild(newTask);
}

taskInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter' && taskInput.value.trim() !== '') {
        const task = {
            text: taskInput.value,
            completed: false,
        };
        tasks.push(task);
        createTaskElement(task);
        taskInput.value = '';
        updateTaskCounter();
    }
});

filterAll.addEventListener('click', () => filterTasks('all'));
filterActive.addEventListener('click', () => filterTasks('active'));
filterCompleted.addEventListener('click', () => filterTasks('completed'));

clearCompletedButton.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    filterTasks('all');
    updateTaskCounter();
});

clearCompletedButton.style.display = 'none';