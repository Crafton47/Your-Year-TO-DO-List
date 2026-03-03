const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

let currentYear = 2025;
let currentMonth = null;
let allTasks = [];

// DOM Elements
const monthsGrid = document.getElementById('months-grid');
const yearSelect = document.getElementById('year-select');
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const taskInput = document.getElementById('task-input');
const cancelBtn = document.getElementById('cancel-btn');
const saveBtn = document.getElementById('save-btn');
const logoutBtn = document.getElementById('logout-btn');
const usernameDisplay = document.getElementById('username-display');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    const authData = await checkAuth();
    if (authData.logged_in) {
        loadTasks();
        renderMonthCards();
    }
});

// Event Listeners
yearSelect.addEventListener('change', (e) => {
    currentYear = parseInt(e.target.value);
    loadTasks();
});

cancelBtn.addEventListener('click', closeModal);
saveBtn.addEventListener('click', saveTask);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveTask();
    }
});

logoutBtn.addEventListener('click', logout);

// Auth Functions
async function checkAuth() {
    try {
        const response = await fetch('/api/auth/check', { credentials: 'same-origin' });
        const data = await response.json();
        
        if (!data.logged_in) {
            window.location.href = '/';
            return { logged_in: false };
        } else {
            usernameDisplay.textContent = data.username;
            return { logged_in: true, username: data.username };
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        window.location.href = '/';
        return { logged_in: false };
    }
}

async function logout() {
    try {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
        sessionStorage.clear();
        window.location.href = '/';
    } catch (error) {
        console.error('Logout failed:', error);
    }
}

// API Functions
async function loadTasks() {
    try {
        const response = await fetch(`/api/tasks/${currentYear}`, { credentials: 'same-origin' });
        if (response.status === 401) {
            window.location.href = '/';
            return;
        }
        allTasks = await response.json();
        renderMonthCards();
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

async function createTask(description) {
    console.log('Creating task:', { year: currentYear, month: currentMonth, description: description });
    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                year: currentYear,
                month: currentMonth,
                description: description
            })
        });
        
        console.log('Response status:', response.status);
        
        if (response.ok) {
            const newTask = await response.json();
            console.log('New task created:', newTask);
            allTasks.push(newTask);
            renderMonthCards();
        } else {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            alert('Error: ' + errorText);
        }
    } catch (error) {
        console.error('Error creating task:', error);
        alert('Error: ' + error.message);
    }
}

async function toggleTask(taskId) {
    const task = allTasks.find(t => t.id === taskId);
    if (!task) return;
    
    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                completed: !task.completed
            })
        });
        
        if (response.ok) {
            const updatedTask = await response.json();
            const index = allTasks.findIndex(t => t.id === taskId);
            allTasks[index] = updatedTask;
            renderMonthCards();
        }
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

async function deleteTask(taskId) {
    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE',
            credentials: 'same-origin'
        });
        
        if (response.ok) {
            allTasks = allTasks.filter(t => t.id !== taskId);
            renderMonthCards();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// UI Functions
function renderMonthCards() {
    monthsGrid.innerHTML = '';
    
    months.forEach((monthName, index) => {
        const monthNumber = index + 1;
        const monthTasks = allTasks.filter(t => t.month === monthNumber);
        const completedCount = monthTasks.filter(t => t.completed).length;
        
        const card = document.createElement('div');
        card.className = 'month-card';
        card.innerHTML = `
            <div class="month-header">
                <span class="month-name">${monthName}</span>
                <span class="task-count">${completedCount}/${monthTasks.length}</span>
            </div>
            <button class="add-task-btn" data-month="${monthNumber}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Task
            </button>
            <ul class="task-list" id="tasks-${monthNumber}">
                ${monthTasks.length === 0 ? '<li class="empty-tasks">No tasks yet</li>' : ''}
                ${monthTasks.map(task => createTaskItem(task)).join('')}
            </ul>
        `;
        
        monthsGrid.appendChild(card);
    });
    
    // Add event listeners to add buttons
    document.querySelectorAll('.add-task-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentMonth = parseInt(btn.dataset.month);
            openModal();
        });
    });
    
    // Add event listeners to checkboxes
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            toggleTask(parseInt(checkbox.dataset.taskId));
        });
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            deleteTask(parseInt(btn.dataset.taskId));
        });
    });
}

function createTaskItem(task) {
    return `
        <li class="task-item ${task.completed ? 'completed' : ''}">
            <input type="checkbox" class="task-checkbox" data-task-id="${task.id}" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${escapeHtml(task.description)}</span>
            <button class="delete-btn" data-task-id="${task.id}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        </li>
    `;
}

function openModal() {
    modalTitle.textContent = `Add Task - ${months[currentMonth - 1]}`;
    taskInput.value = '';
    modalOverlay.classList.add('active');
    taskInput.focus();
}

function closeModal() {
    modalOverlay.classList.remove('active');
    currentMonth = null;
}

function saveTask() {
    const description = taskInput.value.trim();
    if (description && currentMonth) {
        createTask(description);
        closeModal();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
