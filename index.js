const taskInput = document.getElementById('taskInput');
const taskList = document.querySelector('main');
const toggleListButton = document.getElementById('toggleList');

toggleListButton.addEventListener('click', function() {
    if (taskList.style.display === 'none' || taskList.style.display === '') {
        taskList.style.display = 'block';
    } else {
        taskList.style.display = 'none';
    }
});

taskInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter' && taskInput.value.trim() !== '') {
        const newTask = document.createElement('div');
        newTask.className = 'task';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        newTask.appendChild(checkbox);

        const taskText = document.createElement('p');
        taskText.textContent = taskInput.value;
        newTask.appendChild(taskText);

        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                taskText.style.textDecoration = 'line-through';
                taskText.style.color = 'rgba(128, 128, 128, 0.3)';
            } else {
                taskText.style.textDecoration = 'none';
                taskText.style.color = 'inherit';
                
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';
        deleteButton.addEventListener('click', function() {
            newTask.remove();
        });
        newTask.appendChild(deleteButton);

        newTask.addEventListener('mouseenter', function() {
            deleteButton.style.display = 'inline';
        });

        newTask.addEventListener('mouseleave', function() {
            deleteButton.style.display = 'none';
        });

        taskList.appendChild(newTask);

        taskInput.value = '';
    }
});



