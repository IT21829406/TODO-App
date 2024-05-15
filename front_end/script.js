document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const taskList = document.getElementById('task-list');
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');

    // Function to fetch tasks from backend
    function fetchTasks() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = '';
                tasks.forEach(task => {
                    const taskItem = document.createElement('div');
                    taskItem.classList.add('task');
                    if (task.completed) {
                        taskItem.classList.add('completed');
                    }
                    taskItem.innerHTML = `
                        <span>${task.text}</span>
                        <button class="delete-btn" data-id="${task._id}">Delete</button>
                        <button class="complete-btn" data-id="${task._id}">Complete</button>
                    `;
                    taskList.appendChild(taskItem);
                });
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }

    // Fetch tasks when the page loads
    fetchTasks();

    // Event listener for task form submission
    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const text = taskInput.value.trim();
        if (text !== '') {
            fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            })
            .then(response => response.json())
            .then(() => {
                taskInput.value = '';
                fetchTasks();
            })
            .catch(error => console.error('Error adding task:', error));
        }
    });

    // Event listener for complete/delete buttons
    taskList.addEventListener('click', function (event) {
        if (event.target.classList.contains('complete-btn')) {
            const taskId = event.target.getAttribute('data-id');
            fetch(`/api/tasks/${taskId}/complete`, {
                method: 'PUT'
            })
            .then(() => fetchTasks())
            .catch(error => console.error('Error completing task:', error));
        } else if (event.target.classList.contains('delete-btn')) {
            const taskId = event.target.getAttribute('data-id');
            fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE'
            })
            .then(() => fetchTasks())
            .catch(error => console.error('Error deleting task:', error));
        }
    });
});
